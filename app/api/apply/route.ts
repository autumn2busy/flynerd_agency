import { NextResponse } from "next/server";
import { SERVICES } from "@/app/pricing/services-data";

// Route Handler for the /apply page.
//
// Two modes:
//   1. Package mode — request body has `packageName` that maps to a
//      services-data slug (or a legacy short alias). Returns the live
//      Stripe deposit link for that service so the /apply page can
//      redirect straight to Stripe checkout.
//   2. URL-only mode — request body has `website_url` but no recognized
//      packageName. Captures the lead into AC with an INBOUND_URL_CAPTURED
//      tag and returns a redirect to a "demo being prepared" success
//      state. Stripe URL is null in this mode (lead flow, not checkout).
//
// The previous implementation relied on env vars like STRIPE_LINK_BUILD_DEPOSIT
// that weren't being kept in sync with the live Stripe catalog. All Stripe URLs
// now come from services-data.ts which is the canonical source.

// Legacy short-alias -> services-data slug mapping. These aliases showed up
// in older CTAs (/apply?package=build, ?package=agent, etc.) and we want
// those bookmarks to keep resolving to the right product after the rename.
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
  // Exact match first (caller passed a real services-data slug)
  if (SERVICES.some((s) => s.slug === trimmed)) return trimmed;
  // Fall back to legacy alias lookup
  return PACKAGE_ALIASES[trimmed] ?? null;
}

function getDepositLinkForSlug(slug: string): string | null {
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return null;
  // Prefer deposit link, fall back to monthly link for retainer-style packages
  return svc.stripeDepositLink ?? svc.stripeMonthlyLink ?? null;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, business_name, website_url, packageName } = data;

    const apiUrl = process.env.ACTIVECAMPAIGN_URL;
    const apiKey = process.env.ACTIVECAMPAIGN_KEY;

    // AC sync is non-blocking — if credentials are missing we still try to
    // return a Stripe URL so the form isn't broken for dev/preview envs.
    if (apiUrl && apiKey) {
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

      try {
        const contactRes = await fetch(`${apiUrl}/api/3/contact/sync`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            contact: { email, firstName, lastName },
          }),
        });

        if (contactRes.ok) {
          const contactData = await contactRes.json();
          const contactId = contactData.contact.id;

          // Tag based on mode: CHECKOUT-INITIATED for package selections,
          // INBOUND_URL_CAPTURED for URL-only entries (warm lead pipeline).
          const tagName = packageName
            ? "CHECKOUT-INITIATED"
            : "INBOUND_URL_CAPTURED";

          const tagQuery = await fetch(
            `${apiUrl}/api/3/tags?search=${tagName}`,
            { headers },
          );
          const tagQueryData = await tagQuery.json();

          let tagId;
          if (tagQueryData.tags && tagQueryData.tags.length > 0) {
            tagId = tagQueryData.tags[0].id;
          } else {
            const createTagRes = await fetch(`${apiUrl}/api/3/tags`, {
              method: "POST",
              headers,
              body: JSON.stringify({
                tag: {
                  tag: tagName,
                  tagType: "contact",
                  description:
                    tagName === "CHECKOUT-INITIATED"
                      ? "Started checkout but hasn't paid"
                      : "Submitted /apply with a URL, awaiting demo generation",
                },
              }),
            });
            const createTagData = await createTagRes.json();
            tagId = createTagData.tag.id;
          }

          await fetch(`${apiUrl}/api/3/contactTags`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              contactTag: { contact: contactId, tag: tagId },
            }),
          });
        }
      } catch (acErr) {
        console.error("Apply API: AC sync failed (non-blocking):", acErr);
      }
    } else {
      console.warn(
        "[apply] Missing ActiveCampaign credentials. Skipping AC sync.",
      );
    }

    // Resolve Stripe URL based on package selection
    const slug = resolveServiceSlug(packageName);
    const stripeUrl = slug ? getDepositLinkForSlug(slug) : null;

    if (stripeUrl) {
      // Package mode: send the caller to live Stripe checkout.
      return NextResponse.json({
        success: true,
        mode: "checkout",
        stripeUrl,
        packageSlug: slug,
      });
    }

    // URL-only mode (no package resolved): acknowledge the capture and
    // redirect to a "thanks, your demo is being prepared" state.
    if (website_url || (!packageName && email)) {
      return NextResponse.json({
        success: true,
        mode: "demo-pending",
        stripeUrl: null,
        redirect: "/thanks?flow=demo-pending",
        message:
          "Lead captured. A personalized demo will be prepared and emailed.",
      });
    }

    // Neither a valid package nor a URL-only lead capture — surface a
    // clear error rather than falling back to a dead /contact URL.
    return NextResponse.json(
      {
        success: false,
        stripeUrl: null,
        error:
          packageName
            ? `Unknown package "${packageName}". Pass a services-data slug or a known alias.`
            : "Missing packageName or website_url.",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("Apply API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
