import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Anthropic from "@anthropic-ai/sdk";
import { buildCloserSystemPrompt, CLOSER_PROMPT_VERSION } from "@/lib/prompts";
import {
  upsertContact,
  addTagToContact,
  getDealsByContact,
  updateDealStage,
} from "@/lib/activecampaign";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ActiveCampaign Stage IDs (Flynerd Auto-Pilot Pipeline)
const STAGE_NEGOTIATING = "12";

// ─────────────────────────────────────────────────────────────────────────────
// FLYNERD TECH KNOWLEDGE BASE
// Source of truth for the closer agent. Update here, not in the prompt.
// ─────────────────────────────────────────────────────────────────────────────
const FLYNERD_KB = `
## Company
FlyNerd Tech is an Atlanta-based AI agency that builds AI-powered websites for local
service businesses. Founded by a Solutions Architect with 15+ years in technology,
marketing operations, and business systems design. Atlanta-based, serving clients globally.
Tagline: "Where intelligence meets influence."

## Core Product: The AI-Powered Website
This is NOT a generic website. It is a "Digital Employee" — a website that actively
works for the business 24/7: booking appointments, answering customer questions,
qualifying leads, and converting visitors without the owner being involved.

Every FlyNerd AI Website includes the "Core Five":
1. AI Booking & Support Agent — 24/7 conversational agent trained on the client's
   services, pricing, and availability. Not a contact form. Not a script.
2. AI-Generated Personalization — Design and copy generated from Yelp reviews and
   reputation data. Every site is unique to the business.
3. 7-Day Launch Guarantee — AI-accelerated pipeline delivers live sites in 7 days.
4. Local SEO Architecture — Next.js headless with schema markup, sub-second load times.
5. Managed Monthly — Hosting, SSL, security, and AI updates bundled in monthly plan.

## Why FlyNerd vs Wix or Generic Designers
- Wix sends you a form submission at 2 AM. FlyNerd's AI agent books the appointment.
- Wix requires you to write your own copy. FlyNerd's Intel Agent reads your Yelp data.
- Wix takes 4-6 weeks with you doing the work. FlyNerd launches in 7 days.

## Pricing — AI Website Packages (PUBLIC)

### Quickstart Build — $1,250 setup + $197/month
Target: Local service businesses (HVAC, salons, lawyers, contractors, real estate agents)
Includes: Custom niche design, AI booking agent, local SEO, Vercel hosting, monthly maintenance.
Payment: 50/50 split — $625 deposit to start, $625 on delivery.
Link: https://www.flynerd.tech/pricing

### AI Concierge Bundle — $2,400 setup + $750/month
Target: High lead volume businesses or multi-location operations
Includes: Everything in Quickstart + advanced AI agents (custom KB), CRM automation
(ActiveCampaign), lead qualification + routing, 2 improvement tickets/month.
Payment: 50/50 split — $1,200 deposit, $1,200 on launch.
Link: https://www.flynerd.tech/pricing

### INTERNAL ONLY — Cold Pitch Special — $997 setup + $197/month
FOR SCOUTED PROSPECTS ONLY. This is the price for a prospect who received a
personalized demo through FlyNerd's automated pipeline to "claim" their site.
NEVER quote this to inbound or organic prospects. NEVER mention this publicly.

## Pricing — Automation Retainers (PUBLIC)

### Automation Audit — $495 one-time
Best first step for businesses unsure where to start. 60-90 min session, systems
audit, roadmap. Credit toward any build.

### Monthly Care Plan — $750/month
System monitoring, 2 improvement tickets/month, performance reports, optimization.
Cancel anytime at portal.flynerd.tech

### Growth Ops Partner — $1,800/month
Everything in Care Plan + multi-workflow optimization, quarterly roadmap, Slack support.
Best for businesses running multiple workflows or wanting their own automation pipeline.

## The Scouting Pipeline as a Service
If a prospect asks how FlyNerd finds and pitches local businesses automatically,
and they want that capability for their OWN business — this is a premium custom
implementation. Position it as: "We can build you your own automated outreach
pipeline — your own Scout, Intel, and Builder agents. Book a strategy call."
This falls under AI Concierge Bundle ($2,400) or Growth Ops Partner ($1,800/mo).
Never give away implementation details. Just position it as a custom scope.

## Booking
Best next step: https://www.flynerd.tech/contact or https://www.flynerd.tech/pricing

## What We Do NOT Do
- No static brochure websites
- No Wix, Squarespace, or WordPress
- Never quote $997 to inbound/organic prospects
- Never reveal internal pipeline or agent architecture to prospects
`;


// ─────────────────────────────────────────────────────────────────────────────
// HELPERS — extract clean fields from n8n Gmail trigger payload
// n8n Gmail trigger sends nested objects, not flat TextBody/From
// ─────────────────────────────────────────────────────────────────────────────
function extractEmail(from: any): string {
  // Handle "Name <email@domain.com>" format
  if (typeof from === "string") {
    const match = from.match(/<([^>]+)>/);
    return (match ? match[1] : from).toLowerCase().trim();
  }
  // Handle n8n Gmail trigger format: from.value[0].address
  if (Array.isArray(from?.value)) {
    return (from.value[0]?.address || "").toLowerCase().trim();
  }
  return "";
}

function extractTextBody(body: any): string {
  // Direct TextBody (Postmark/webhook format)
  if (typeof body.TextBody === "string" && body.TextBody.trim()) {
    return body.TextBody.trim();
  }
  // n8n Gmail format: body.text or body.body
  if (typeof body.text === "string" && body.text.trim()) {
    return body.text.trim();
  }
  if (typeof body.body === "string" && body.body.trim()) {
    return body.body.trim();
  }
  // Fallback: snippet (truncated but better than nothing)
  if (typeof body.snippet === "string" && body.snippet.trim()) {
    return body.snippet.trim();
  }
  return "";
}

function extractThreadId(body: any): string | null {
  return body.threadId || body.ThreadId || body.thread_id || null;
}

function extractMessageId(body: any): string | null {
  return body.id || body.messageId || body.MessageId || null;
}

function extractFromRaw(body: any): string {
  // Support both flat and nested n8n Gmail formats
  if (body.From) return body.From;
  if (body.from) {
    if (typeof body.from === "string") return body.from;
    if (Array.isArray(body.from?.value)) {
      const v = body.from.value[0];
      return v?.name ? `${v.name} <${v.address}>` : v?.address || "";
    }
  }
  return "";
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSATION MEMORY — Supabase via Prisma raw queries
// Table: email_conversation_threads
// ─────────────────────────────────────────────────────────────────────────────
async function getThreadHistory(threadId: string): Promise<Array<{ role: string; content: string }>> {
  try {
    const rows = await prisma.$queryRaw<Array<{ role: string; content: string; created_at: Date }>>`
      SELECT role, content, created_at
      FROM email_conversation_threads
      WHERE thread_id = ${threadId}
      ORDER BY created_at ASC
      LIMIT 20
    `;
    return rows.map((r) => ({ role: r.role, content: r.content }));
  } catch {
    // Table may not exist yet — fail gracefully, stateless fallback
    console.warn("[Closer] Thread history unavailable — running stateless");
    return [];
  }
}

async function saveThreadMessage(
  threadId: string,
  leadEmail: string,
  role: "user" | "assistant",
  content: string
): Promise<void> {
  try {
    await prisma.$executeRaw`
      INSERT INTO email_conversation_threads (thread_id, lead_email, role, content, created_at)
      VALUES (${threadId}, ${leadEmail}, ${role}, ${content}, NOW())
    `;
  } catch (e) {
    console.warn("[Closer] Could not save thread message:", e);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Claude Sonnet — primary LLM for closer agent
// ─────────────────────────────────────────────────────────────────────────────
async function generateReply(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const formattedMessages = messages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const completion = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    system: systemPrompt,
    messages: formattedMessages,
    temperature: 0.4,
    max_tokens: 600,
  });

  return completion.content[0]?.type === "text"
    ? completion.content[0].text.trim()
    : "";
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const start = Date.now();

  try {
    const body = await req.json();

    // Extract fields — handles both n8n Gmail format and direct webhook format
    const fromRaw = extractFromRaw(body);
    const leadEmail = extractEmail(fromRaw || body.from || body.From);
    const textBody = extractTextBody(body);
    const threadId = extractThreadId(body);
    const messageId = extractMessageId(body);

    if (!leadEmail) {
      console.error("[Closer] Could not extract sender email. Payload:", JSON.stringify(body).slice(0, 500));
      return NextResponse.json({ error: "Missing or unreadable sender email" }, { status: 400 });
    }

    if (!textBody) {
      console.error("[Closer] Could not extract message body. Payload:", JSON.stringify(body).slice(0, 500));
      return NextResponse.json({ error: "Missing or unreadable message body" }, { status: 400 });
    }

    // Find lead in DB
    const lead = await prisma.agencyLead.findFirst({
      where: { contactEmail: leadEmail },
    });

    // Use business name from DB or fall back to email domain
    const businessName = lead?.businessName || leadEmail.split("@")[1]?.split(".")[0] || "there";

    // Update lead status if found
    if (lead) {
      await prisma.agencyLead.update({
        where: { id: lead.id },
        data: { status: "NEGOTIATING" },
      });
    }

    // Build conversation history for this thread
    const sessionId = threadId || leadEmail; // fall back to email if no threadId
    const history = await getThreadHistory(sessionId);

    // Save the incoming user message to thread history
    await saveThreadMessage(sessionId, leadEmail, "user", textBody);

    // Build messages array: history + current message
    const messages = [
      ...history,
      { role: "user", content: textBody },
    ];

    // Generate AI reply
    const systemPrompt = buildCloserSystemPrompt(businessName, FLYNERD_KB);
    const aiReplyDraft = await generateReply(systemPrompt, messages);

    if (!aiReplyDraft) {
      return NextResponse.json({ error: "AI returned empty reply" }, { status: 500 });
    }

    // Save AI reply to thread history
    await saveThreadMessage(sessionId, leadEmail, "assistant", aiReplyDraft);

    // ActiveCampaign: tag + move deal
    if (lead) {
      try {
        const contactRes = await upsertContact(leadEmail, lead.businessName, "Business");
        const contactId = contactRes.contact?.id;
        if (contactId) {
          await addTagToContact(contactId, "AI_REPLY_READY");
          await addTagToContact(contactId, "email replied");
          const dealsRes = await getDealsByContact(contactId);
          const openDeal = dealsRes.deals?.find((d: any) => d.status === "0");
          if (openDeal) {
            await updateDealStage(openDeal.id, STAGE_NEGOTIATING);
            console.log(`[Closer] Moved Deal ${openDeal.id} to Negotiating`);
          }
        }
      } catch (acErr: any) {
        // AC failure should not break the reply
        console.warn("[Closer] ActiveCampaign update failed:", acErr.message);
      }
    }

    const durationMs = Date.now() - start;
    console.log(`[Closer] Reply generated in ${durationMs}ms for ${leadEmail}`);

    return NextResponse.json({
      message: "Reply processed. Deal moved to Negotiating.",
      draftedReply: aiReplyDraft,
      threadId: sessionId,
      durationMs,
    });
  } catch (error: any) {
    console.error("Closer Agent Error:", error);
    return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
  }
}