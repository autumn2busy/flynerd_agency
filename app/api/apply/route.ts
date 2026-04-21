import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SERVICES } from "@/app/pricing/services-data";

// Route Handler for the /apply page.
//
// Two modes:
//   1. checkout — request body has `packageName` that maps to a
//      services-data slug (or legacy short alias). Returns the live
//      Stripe deposit link for that service so the /apply page can
//      redirect straight to Stripe checkout. Qualification fields are
//      optional in this mode because the prospect is paying first.
//   2. demo-pending — full qualification form with all required fields.
//      Creates AC contact + deal with every field populated, applies
//      DEMO_QUALIFIED tag, emails Autumn a rich notification, returns
//      success so the /apply page can reveal the Cal.com booking step.
//      The Dre trigger for this mode is TODO (see inline note).
//
// All Stripe URLs come from services-data.ts (single source of truth).

const PACKAGE_ALIASES: Record<string, string> = {
  build: "ai-website-quickstart-ul",
  quickstart: "ai-website-quickstart-ul",
  concierge: "ai-website-concierge-tp",
  agent: "ai-concierge-launch",
  audit: "automation-audit",
  sprint: "automation-sprint-build",
  "care-plan": "automation-care-plan",
  "growth-partner": "growth-ops-partner",
  "scale-ops": "scale-ops-partner",
  "email-migration": "email-migration",
};

function resolveServiceSlug(packageName: string | undefined | null): string | null {
  if (!packageName) return null;
  const trimmed = packageName.trim();
  if (!trimmed) return null;
  if (SERVICES.some((s) => s.slug === trimmed)) return trimmed;
  return PACKAGE_ALIASES[trimmed] ?? null;
}

function getDepositLinkForSlug(slug: string): string | null {
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return null;
  return svc.stripeDepositLink ?? svc.stripeMonthlyLink ?? null;
}

// Normalize URL input. Accepts "none" or empty for people without a site yet,
// otherwise prepends https:// if missing.
function normalizeUrl(raw: string | undefined | null): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^none$/i.test(trimmed)) return "(no website yet)";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

// Server-side validation for the qualification path. Must match the
// client-side rules in /apply/page.tsx so users don't bypass via curl.
function validateQualification(data: Record<string, unknown>): string | null {
  const str = (k: string) =>
    typeof data[k] === "string" ? (data[k] as string).trim() : "";
  if (!str("name")) return "Name required.";
  if (!str("email") || !str("email").includes("@")) return "Valid email required.";
  if (!str("business_name")) return "Business name required.";
  if (!str("website_url")) return "Website URL required (enter 'none' if n/a).";
  if (!str("niche")) return "Niche required.";
  if (str("services").length < 10) return "Services field too short.";
  if (str("pain_point").length < 50)
    return "Pain point must be at least 50 characters.";
  if (!str("lead_volume")) return "Lead volume required.";
  if (!str("timeline")) return "Timeline required.";
  return null;
}

// AC deal custom fields populated on qualification.
// IDs match what /api/contact/route.ts already uses for shared fields,
// plus the three dedicated fields Autumn created 2026-04-21 for the
// /apply qualification path.
const AC_DEAL_FIELDS: Array<{
  id: number;
  key: string;
  personalization: string;
  label: string;
}> = [
  { id: 21, key: "business_name", personalization: "%DEAL_BUSINESS_NAME%", label: "Business Name" },
  { id: 37, key: "business_name", personalization: "%DEAL_ORGANIZATION_NAME%", label: "Organization Name (outreach)" },
  { id: 22, key: "niche", personalization: "%DEAL_INDUSTRY%", label: "Industry (legacy)" },
  { id: 24, key: "pain_point", personalization: "%DEAL_CHALLENGE%", label: "Biggest challenge" },
  { id: 25, key: "tools", personalization: "%DEAL_TOOLS%", label: "Current tools" },
  { id: 27, key: "timeline", personalization: "%DEAL_TIMELINE%", label: "Timeline" },
  { id: 48, key: "website_url", personalization: "%DEAL_WEBSITE_URL%", label: "Website URL" },
  { id: 49, key: "services", personalization: "%DEAL_SERVICES%", label: "Services" },
  { id: 50, key: "lead_volume", personalization: "%DEAL_LEAD_VOLUME%", label: "Lead Volume" },
];

const CONTACT_FIELD_NICHE = 167;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      business_name,
      website_url,
      niche,
      services,
      pain_point,
      lead_volume,
      timeline,
      tools,
      packageName,
    } = data;

    const apiUrl = process.env.ACTIVECAMPAIGN_URL;
    const apiKey = process.env.ACTIVECAMPAIGN_KEY;

    // ───────────────────────────────────────────────────
    // Checkout mode — legacy path, just resolves to Stripe
    // ───────────────────────────────────────────────────
    const slug = resolveServiceSlug(packageName);
    if (slug) {
      const stripeUrl = getDepositLinkForSlug(slug);
      if (!stripeUrl) {
        return NextResponse.json(
          {
            success: false,
            error: `No Stripe deposit link for "${slug}".`,
          },
          { status: 500 },
        );
      }

      // Fire-and-forget AC tag for checkout-initiated (don't block the
      // Stripe redirect if AC is slow or misconfigured).
      if (apiUrl && apiKey && email) {
        void tagContact(apiUrl, apiKey, email, name, "CHECKOUT-INITIATED").catch(
          (err) => console.error("[apply] AC tag failed (non-blocking):", err),
        );
      }

      return NextResponse.json({
        success: true,
        mode: "checkout",
        stripeUrl,
        packageSlug: slug,
      });
    }

    // ───────────────────────────────────────────────────
    // Qualification mode — the commitment gate
    // ───────────────────────────────────────────────────
    const validationError = validateQualification(data);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 },
      );
    }

    const normalizedUrl = normalizeUrl(website_url);
    const applyId = crypto.randomUUID();

    if (!apiUrl || !apiKey) {
      console.warn(
        "[apply] Missing ActiveCampaign credentials. Skipping AC sync.",
      );
    } else {
      try {
        // 1. Sync contact
        let firstName = name;
        let lastName = "";
        if (name && name.includes(" ")) {
          const parts = String(name).split(" ");
          firstName = parts[0];
          lastName = parts.slice(1).join(" ");
        }

        const headers = {
          "Api-Token": apiKey,
          "Content-Type": "application/json",
        };

        const contactRes = await fetch(`${apiUrl}/api/3/contact/sync`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            contact: { email, firstName, lastName },
          }),
        });

        if (contactRes.ok) {
          const contactData = await contactRes.json();
          const contactId: string = contactData.contact.id;

          // 2. Write niche to contact-level field 167
          if (niche) {
            try {
              await fetch(`${apiUrl}/api/3/fieldValues`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                  fieldValue: {
                    contact: contactId,
                    field: String(CONTACT_FIELD_NICHE),
                    value: niche,
                  },
                }),
              });
            } catch (err) {
              console.error("[apply] niche write failed (non-blocking):", err);
            }
          }

          // 3. Apply DEMO_QUALIFIED tag (this prospect finished the form)
          await applyTag(apiUrl, apiKey, contactId, "DEMO_QUALIFIED");

          // 4. Create deal with all qualification fields
          const dealRes = await fetch(`${apiUrl}/api/3/deals`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              deal: {
                title: `Warm lead: ${business_name} (${name})`,
                contact: contactId,
                value: 0,
                currency: "usd",
                group: "3",
                stage: "8",
              },
            }),
          });

          if (dealRes.ok) {
            const dealData = await dealRes.json();
            const dealId = dealData.deal.id;

            // 5. Populate deal custom fields
            const fieldPayload: Record<string, string> = {
              business_name: business_name ?? "",
              niche: niche ?? "",
              pain_point: pain_point ?? "",
              tools: tools ?? "",
              timeline: timeline ?? "",
              website_url: normalizedUrl,
              services: services ?? "",
              lead_volume: lead_volume ?? "",
            };

            for (const { id, key } of AC_DEAL_FIELDS) {
              const value = fieldPayload[key];
              if (!value) continue;
              try {
                await fetch(`${apiUrl}/api/3/dealCustomFieldData`, {
                  method: "POST",
                  headers,
                  body: JSON.stringify({
                    dealCustomFieldDatum: {
                      dealId,
                      customFieldId: id,
                      fieldValue: value,
                    },
                  }),
                });
              } catch (err) {
                console.error(
                  `[apply] deal field ${id} write failed (non-blocking):`,
                  err,
                );
              }
            }
          }
        }
      } catch (acErr) {
        console.error("[apply] AC sync failed (non-blocking):", acErr);
      }
    }

    // ───────────────────────────────────────────────────
    // Internal notification email so Autumn sees the full
    // qualification submission before the strategy call.
    // ───────────────────────────────────────────────────
    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "FlyNerd /apply <info@flynerdtech.com>",
          to: ["hello@flynerd.tech"],
          subject: `Qualified demo request: ${business_name}`,
          html: `
            <h2>New qualified demo request</h2>
            <p><strong>Apply ID:</strong> ${applyId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Business:</strong> ${business_name}</p>
            <p><strong>Website:</strong> ${normalizedUrl}</p>
            <p><strong>Niche:</strong> ${niche}</p>
            <p><strong>Services:</strong> ${services}</p>
            <p><strong>Pain point:</strong> ${pain_point}</p>
            <p><strong>Lead volume:</strong> ${lead_volume}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Tools:</strong> ${tools || "(not provided)"}</p>
            <hr />
            <p><em>Cal.com booking webhook will fire at /api/webhooks/cal-booking when this prospect picks a slot.</em></p>
          `,
        });
      }
    } catch (emailErr) {
      console.error(
        "[apply] Resend notification failed (non-blocking):",
        emailErr,
      );
    }

    // ───────────────────────────────────────────────────
    // TODO — fire Dre demo build for this warm lead.
    //
    // Next turn: POST to sonata-stack's /webhooks/warm-apply endpoint
    // (or MCP tool) passing { applyId, email, business_name,
    // website_url, niche, services, pain_point, lead_volume, timeline }.
    // Sonata-stack creates the AgencyLead row, runs Simon+Yoncé+Dre
    // against the URL, populates intelData + demoSiteUrl, writes %DEMOURL%
    // back to AC contact field 168, then triggers the pre-call email.
    //
    // For now we log the intent so the flow shape is clear in logs.
    // ───────────────────────────────────────────────────
    console.log(
      `[apply] DEMO_QUALIFIED applyId=${applyId} email=${email} url=${normalizedUrl} — TODO: trigger Dre`,
    );

    return NextResponse.json({
      success: true,
      mode: "demo-pending",
      applyId,
      message:
        "Qualification captured. Cal.com booking step should now render on the client.",
    });
  } catch (error) {
    console.error("Apply API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

async function tagContact(
  apiUrl: string,
  apiKey: string,
  email: string,
  name: string | undefined,
  tagName: string,
): Promise<void> {
  const headers = {
    "Api-Token": apiKey,
    "Content-Type": "application/json",
  };

  let firstName = name ?? "";
  let lastName = "";
  if (name && name.includes(" ")) {
    const parts = name.split(" ");
    firstName = parts[0];
    lastName = parts.slice(1).join(" ");
  }

  const contactRes = await fetch(`${apiUrl}/api/3/contact/sync`, {
    method: "POST",
    headers,
    body: JSON.stringify({ contact: { email, firstName, lastName } }),
  });
  if (!contactRes.ok) throw new Error("contact sync failed");
  const { contact } = await contactRes.json();
  await applyTag(apiUrl, apiKey, contact.id, tagName);
}

async function applyTag(
  apiUrl: string,
  apiKey: string,
  contactId: string,
  tagName: string,
): Promise<void> {
  const headers = {
    "Api-Token": apiKey,
    "Content-Type": "application/json",
  };

  const tagQuery = await fetch(`${apiUrl}/api/3/tags?search=${tagName}`, {
    headers,
  });
  const tagData = await tagQuery.json();

  let tagId;
  if (tagData.tags && tagData.tags.length > 0) {
    tagId = tagData.tags[0].id;
  } else {
    const createRes = await fetch(`${apiUrl}/api/3/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        tag: {
          tag: tagName,
          tagType: "contact",
          description: `Auto-created by /api/apply (${new Date().toISOString()})`,
        },
      }),
    });
    const createData = await createRes.json();
    tagId = createData.tag.id;
  }

  await fetch(`${apiUrl}/api/3/contactTags`, {
    method: "POST",
    headers,
    body: JSON.stringify({ contactTag: { contact: contactId, tag: tagId } }),
  });
}
