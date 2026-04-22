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
// AC contact field for agency_lead_id (Supabase AgencyLead.id uuid).
// Populated by /api/apply after sonata-stack confirms the Supabase row
// was inserted. n8n's tag-sync workflow (d42cyp27QDIqZczu) reads this
// field to resolve which Supabase row a tag event corresponds to.
const CONTACT_FIELD_AGENCY_LEAD_ID = 165;

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

    // Hoisted to outer scope so they can be threaded into the
    // sonata-stack dispatch + returned in the final response.
    let contactId: string | null = null;
    let agencyLeadId: string | null = null;

    if (!apiUrl || !apiKey) {
      console.warn(
        "[apply] Missing ActiveCampaign credentials. Skipping AC sync.",
      );
    } else {
      // Each step wrapped independently so a single failure doesn't
      // cascade into missing-deal / missing-fields symptoms like the
      // 2026-04-21 smoke test where applyTag threw and blocked
      // downstream deal creation.
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

      // ── Step 1: sync contact ───────────────────────────
      try {
        const contactRes = await fetch(`${apiUrl}/api/3/contact/sync`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            contact: { email, firstName, lastName },
          }),
        });
        if (!contactRes.ok) {
          const body = await contactRes.text().catch(() => "");
          console.error(
            `[apply][step=contact_sync] AC returned ${contactRes.status} body=${body.slice(0, 300)}`,
          );
        } else {
          const contactData = await contactRes.json();
          contactId = contactData?.contact?.id ?? null;
          if (!contactId) {
            console.error(
              "[apply][step=contact_sync] response missing contact.id:",
              JSON.stringify(contactData).slice(0, 300),
            );
          }
        }
      } catch (err) {
        console.error("[apply][step=contact_sync] threw:", err);
      }

      // Without a contactId we can't do anything else AC-side. Skip the
      // rest but still fire Resend + warm-apply (which don't need it).
      if (contactId) {
        // ── Step 2: write niche to contact field 167 ────────
        if (niche) {
          try {
            const nicheRes = await fetch(`${apiUrl}/api/3/fieldValues`, {
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
            if (!nicheRes.ok) {
              const body = await nicheRes.text().catch(() => "");
              console.error(
                `[apply][step=niche_write] AC returned ${nicheRes.status} body=${body.slice(0, 300)}`,
              );
            }
          } catch (err) {
            console.error("[apply][step=niche_write] threw:", err);
          }
        }

        // ── Step 3: sync warm-lead with sonata-stack (BEFORE tag) ─
        // Creates Supabase AgencyLead row synchronously so n8n's
        // tag-sync workflow can resolve it when DEMO_QUALIFIED fires.
        // Returns agencyLeadId (uuid) so we can stamp it on AC field 165.
        // Uses the outer-scoped agencyLeadId.
        try {
          const sonataResult = await syncWarmLeadWithSonata({
            email,
            name,
            businessName: business_name,
            websiteUrl: normalizedUrl,
            niche,
            services,
            painPoint: pain_point,
            leadVolume: lead_volume,
            timeline,
            tools: tools ?? "",
            applyId,
            contactId,
          });
          agencyLeadId = sonataResult?.agencyLeadId ?? null;
        } catch (err) {
          console.error("[apply][step=sonata_sync] threw:", err);
        }

        // ── Step 4: write agencyLeadId to AC contact field 165 ────
        // Required for n8n's AC→Supabase sync workflow to look up the
        // right AgencyLead row. Skipped if sonata-stack sync failed.
        if (agencyLeadId) {
          try {
            const agencyLeadIdRes = await fetch(
              `${apiUrl}/api/3/fieldValues`,
              {
                method: "POST",
                headers,
                body: JSON.stringify({
                  fieldValue: {
                    contact: contactId,
                    field: String(CONTACT_FIELD_AGENCY_LEAD_ID),
                    value: agencyLeadId,
                  },
                }),
              },
            );
            if (!agencyLeadIdRes.ok) {
              const body = await agencyLeadIdRes.text().catch(() => "");
              console.error(
                `[apply][step=agency_lead_id_write] AC returned ${agencyLeadIdRes.status} body=${body.slice(0, 200)}`,
              );
            } else {
              console.log(
                `[apply][step=agency_lead_id_write] wrote agencyLeadId=${agencyLeadId} to AC contact field ${CONTACT_FIELD_AGENCY_LEAD_ID} for contactId=${contactId}`,
              );
            }
          } catch (err) {
            console.error("[apply][step=agency_lead_id_write] threw:", err);
          }
        } else {
          // Sonata sync failed or skipped — tag the contact as an orphan
          // so Autumn can manually trigger Dre later. Do NOT apply
          // DEMO_QUALIFIED since the pre-call email would have an empty
          // %DEMOURL% button.
          try {
            await applyTag(apiUrl, apiKey, contactId, "WARM_APPLY_ORPHAN");
            console.log(
              `[apply][step=orphan_tag] applied WARM_APPLY_ORPHAN to contactId=${contactId} — sonata sync failed, DEMO_QUALIFIED skipped`,
            );
          } catch (err) {
            console.error("[apply][step=orphan_tag] threw:", err);
          }
        }

        // ── Step 5: apply DEMO_QUALIFIED tag ─────────────────
        // Only fires if sonata sync succeeded — guarantees the Supabase
        // row exists before n8n's tag-sync workflow sees this tag.
        if (agencyLeadId) {
          try {
            await applyTag(apiUrl, apiKey, contactId, "DEMO_QUALIFIED");
          } catch (err) {
            console.error("[apply][step=apply_tag] threw (non-blocking):", err);
          }
        }

        // ── Step 6: create deal ─────────────────────────────
        let dealId: string | null = null;
        try {
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
          if (!dealRes.ok) {
            const body = await dealRes.text().catch(() => "");
            console.error(
              `[apply][step=create_deal] AC returned ${dealRes.status} body=${body.slice(0, 400)}`,
            );
          } else {
            const dealData = await dealRes.json();
            dealId = dealData?.deal?.id ?? null;
            if (!dealId) {
              console.error(
                "[apply][step=create_deal] response missing deal.id:",
                JSON.stringify(dealData).slice(0, 300),
              );
            }
          }
        } catch (err) {
          console.error("[apply][step=create_deal] threw:", err);
        }

        // ── Step 7: populate deal custom fields ──────────────
        if (dealId) {
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

          for (const { id, key, label } of AC_DEAL_FIELDS) {
            const value = fieldPayload[key];
            if (!value) continue;
            try {
              const fieldRes = await fetch(
                `${apiUrl}/api/3/dealCustomFieldData`,
                {
                  method: "POST",
                  headers,
                  body: JSON.stringify({
                    dealCustomFieldDatum: {
                      dealId,
                      customFieldId: id,
                      fieldValue: value,
                    },
                  }),
                },
              );
              if (!fieldRes.ok) {
                const body = await fieldRes.text().catch(() => "");
                console.error(
                  `[apply][step=deal_field][id=${id}][${label}] AC returned ${fieldRes.status} body=${body.slice(0, 200)}`,
                );
              }
            } catch (err) {
              console.error(
                `[apply][step=deal_field][id=${id}][${label}] threw:`,
                err,
              );
            }
          }
        }
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
    // Warm-apply sync already fired above (Step 3) BEFORE DEMO_QUALIFIED
    // was applied. Sonata-stack continues Dre build async in the
    // background and writes %DEMOURL% to AC field 168 when ready.
    // No additional dispatch needed here.
    // ───────────────────────────────────────────────────

    return NextResponse.json({
      success: true,
      mode: "demo-pending",
      applyId,
      agencyLeadId,
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

// ─────────────────────────────────────────────────────────────
// Sync warm-lead with sonata-stack (blocking — ~1-2s normal, 10s max).
//
// Sonata-stack's /webhooks/warm-apply handler is two-phase:
//   Phase 1 (sync): insert AgencyLead row in Supabase, return 202 with
//                   agencyLeadId in the body. ~200-500ms.
//   Phase 2 (async): Dre build + AC field 168 writeback. 30-90s.
//
// /api/apply awaits the 202 response to Phase 1 so it has agencyLeadId
// BEFORE applying the DEMO_QUALIFIED tag. That closes the race where
// n8n's tag-sync workflow would fire on DEMO_QUALIFIED, look up Supabase
// by email / agency_lead_id, not find the row yet, and fall back to the
// orphan list.
//
// AbortController with 10s timeout guards against sonata-stack hanging.
// On timeout or failure, we return null so the caller can apply the
// WARM_APPLY_ORPHAN tag and skip DEMO_QUALIFIED (preventing the pre-call
// email from firing with an empty %DEMOURL%).
//
// Env:
//   SONATA_STACK_URL           — e.g. https://sonata-stack-production.up.railway.app
//   SONATA_WEBHOOK_SECRET      — shared secret, matches sonata-stack's WEBHOOK_SECRET
// ─────────────────────────────────────────────────────────────
interface WarmApplyDispatch {
  email: string;
  name: string;
  businessName: string;
  websiteUrl: string;
  niche: string;
  services: string;
  painPoint: string;
  leadVolume: string;
  timeline: string;
  tools: string;
  applyId: string;
  contactId?: string;
}

interface SonataWarmApplyResponse {
  status?: string;
  agent?: string;
  email?: string;
  agencyLeadId?: string;
  error?: string;
}

async function syncWarmLeadWithSonata(
  input: WarmApplyDispatch,
): Promise<{ agencyLeadId: string } | null> {
  const sonataUrl = process.env.SONATA_STACK_URL;
  const sonataSecret = process.env.SONATA_WEBHOOK_SECRET;

  if (!sonataUrl || !sonataSecret) {
    console.warn(
      `[apply] SONATA_STACK_URL or SONATA_WEBHOOK_SECRET missing — skipping warm-apply sync for applyId=${input.applyId}. No Supabase row will be created.`,
    );
    return null;
  }

  const base = sonataUrl.replace(/\/$/, "");
  const target = `${base}/webhooks/warm-apply`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": sonataSecret,
      },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const preview = (await res.text().catch(() => "")).slice(0, 300);
      console.error(
        `[apply] warm-apply sync FAILED applyId=${input.applyId} status=${res.status} body=${preview}`,
      );
      return null;
    }

    const data = (await res.json()) as SonataWarmApplyResponse;
    if (!data?.agencyLeadId) {
      console.error(
        `[apply] warm-apply sync returned 2xx but no agencyLeadId applyId=${input.applyId} body=${JSON.stringify(data).slice(0, 200)}`,
      );
      return null;
    }

    console.log(
      `[apply] warm-apply synced applyId=${input.applyId} email=${input.email} agencyLeadId=${data.agencyLeadId}`,
    );
    return { agencyLeadId: data.agencyLeadId };
  } catch (err: unknown) {
    clearTimeout(timeout);
    const msg = err instanceof Error ? err.message : String(err);
    const isTimeout = msg.includes("aborted") || msg.includes("timeout");
    console.error(
      `[apply] warm-apply sync threw ${isTimeout ? "(TIMEOUT)" : ""} applyId=${input.applyId}: ${msg}`,
    );
    return null;
  }
}

// DELETED: dispatchWarmApplyToSonata — removed 2026-04-21 because
// /api/apply now uses the sync variant (syncWarmLeadWithSonata) above
// and /api/webhooks/cal-booking has its own local dispatchWarmApplyFromBooking.
// Nothing else called it.

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
