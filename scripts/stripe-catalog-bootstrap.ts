// Load STRIPE_*_API_KEY (and any other env) from flynerd-agency/.env.
// Keeps the live secret out of argv and out of shell history.
import "dotenv/config";

/**
 * FlyNerd Stripe Catalog Bootstrap
 * ================================
 *
 * Idempotently creates/updates Stripe Products, Prices, and Payment Links
 * for the 2026-04-20 FlyNerd catalog rebuild. Writes a mapping file to
 * docs/billing/stripe_catalog_mapping[.test].{csv,md}.
 *
 * Usage
 * -----
 *   # dry run (reads Stripe to see what exists, makes no writes)
 *   npm run stripe:bootstrap:dry
 *
 *   # test mode (writes to Stripe TEST env, outputs *.test.{csv,md} locally)
 *   npm run stripe:bootstrap:test
 *
 *   # live mode (writes to Stripe LIVE env, outputs committed mapping files)
 *   npm run stripe:bootstrap:live
 *
 * Idempotency + drift repair
 * --------------------------
 *   - Prices are looked up by lookup_key. If a price exists at the same
 *     amount, it is reused. Different amount aborts (prices immutable).
 *   - Products reuse the existing product behind the reused price. If the
 *     product's name or description drifts from spec, it is updated in
 *     place (stripe.products.update).
 *   - Payment Links are searched by metadata.lookup_key. If found but with
 *     drift on payment_method_types or after_completion redirect URL, they
 *     are updated in place. If not found, a new link is created with the
 *     current spec applied.
 *   - Key-prefix guard: mode=test requires sk_test_, mode=live requires
 *     sk_live_. Refuses to run if mismatched.
 *
 * Never re-runs destructively. Never deletes anything.
 */

import Stripe from "stripe";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// ─────────────────────────────────────────────────────────────
// Catalog definition
// ─────────────────────────────────────────────────────────────

type Profile = "underserved_local" | "tech_enabled_premium" | "all";

interface CatalogItem {
  lookupKey: string;
  name: string;
  /**
   * Customer-facing description shown on the Stripe Checkout page just
   * beneath the product name. Keep 1-3 sentences, plain text. Stripe
   * truncates long descriptions on narrow viewports.
   */
  description: string;
  amountUsd: number;
  recurring?: "month";
  offerType: string;
  qualificationProfile: Profile;
  fileField: string;
  /** Internal-only note for the mapping CSV/MD output. */
  notes: string;
}

// Payment methods the site accepts: card + Stripe Link wallet + ACH.
// Stripe enforces this as an allow-list on the Payment Link checkout page.
const PAYMENT_METHOD_TYPES: Array<
  Stripe.PaymentLinkCreateParams.PaymentMethodType
> = ["card", "link", "us_bank_account"];

// Where Stripe sends the customer after a successful payment link checkout.
// {CHECKOUT_SESSION_ID} is substituted by Stripe; we tag with lookup_key so
// the /thanks page can personalize per product.
function successRedirectUrl(lookupKey: string): string {
  const base =
    process.env.STRIPE_AFTER_PAYMENT_REDIRECT_BASE ??
    "https://flynerd.tech/thanks";
  return `${base}?session_id={CHECKOUT_SESSION_ID}&lookup_key=${encodeURIComponent(
    lookupKey,
  )}`;
}

const CATALOG: CatalogItem[] = [
  // ── Core build — Profile 1 (Underserved Local) ──────────────
  {
    lookupKey: "flynerd_website_ul_deposit_v1",
    name: "AI Website Quickstart (Underserved Local) - Deposit",
    description:
      "50% deposit to start your FlyNerd-built AI website. Covers scoping and AI-informed design from your actual reputation data. Balance due on launch (7-day delivery).",
    amountUsd: 750,
    offerType: "core_build",
    qualificationProfile: "underserved_local",
    fileField: "stripeDepositPriceId / stripeDepositLink",
    notes: "50% deposit for $1,500 total build",
  },
  {
    lookupKey: "flynerd_website_ul_final_v1",
    name: "AI Website Quickstart (Underserved Local) - Final",
    description:
      "Final 50% payment due on launch day for your AI Website Quickstart build.",
    amountUsd: 750,
    offerType: "core_build",
    qualificationProfile: "underserved_local",
    fileField: "stripeFinalPriceId / stripeFinalLink",
    notes: "Final 50% payment",
  },

  // ── Core build — Profile 2 (Tech-Enabled Premium) ───────────
  {
    lookupKey: "flynerd_website_tp_deposit_v1",
    name: "AI Website Concierge (Tech-Enabled Premium) - Deposit",
    description:
      "50% deposit for your premium AI Website Concierge build. Includes advanced personalization, richer integrations, and concierge-tier project management. Balance due on launch.",
    amountUsd: 1750,
    offerType: "core_build",
    qualificationProfile: "tech_enabled_premium",
    fileField: "STRIPE_PROFILE2_DEPOSIT_LINK (env) + stripeDepositPriceId/Link",
    notes: "50% deposit for $3,500 total build",
  },
  {
    lookupKey: "flynerd_website_tp_final_v1",
    name: "AI Website Concierge (Tech-Enabled Premium) - Final",
    description:
      "Final 50% payment due on launch day for your AI Website Concierge build.",
    amountUsd: 1750,
    offerType: "core_build",
    qualificationProfile: "tech_enabled_premium",
    fileField: "stripeFinalPriceId / stripeFinalLink",
    notes: "Final 50% payment",
  },

  // ── Strategy / Build ────────────────────────────────────────
  {
    lookupKey: "flynerd_audit_deposit_v1",
    name: "Automation Audit + Roadmap",
    description:
      "Paid scoping session: 60-90 minute strategy call plus a written 30-day roadmap delivered within 48 hours. Identifies your three highest-ROI automations and ranks every opportunity. $495 credits back toward any build purchased within 30 days.",
    amountUsd: 495,
    offerType: "strategy",
    qualificationProfile: "all",
    fileField: "stripeDepositPriceId / stripeDepositLink",
    notes: "Creditable toward any build",
  },
  {
    lookupKey: "flynerd_sprint_deposit_v1",
    name: "Automation Sprint Build - Deposit",
    description:
      "50% deposit to start a fixed-scope automation sprint. One high-impact workflow built end-to-end in 1-2 weeks with up to 3 tool integrations, full QA, and documentation.",
    amountUsd: 750,
    offerType: "build",
    qualificationProfile: "all",
    fileField: "stripeDepositPriceId / stripeDepositLink",
    notes: "50% deposit for $1,500 sprint",
  },
  {
    lookupKey: "flynerd_sprint_final_v1",
    name: "Automation Sprint Build - Final",
    description:
      "Final 50% payment due at delivery for your Automation Sprint Build.",
    amountUsd: 750,
    offerType: "build",
    qualificationProfile: "all",
    fileField: "stripeFinalPriceId / stripeFinalLink",
    notes: "Final 50%",
  },
  {
    lookupKey: "flynerd_concierge_deposit_v1",
    name: "AI Concierge Launch - Deposit",
    description:
      "50% deposit to deploy a fully trained AI agent on your site: custom knowledge base, qualification flow, human handoff logic, and CRM integration. 2-3 week delivery.",
    amountUsd: 1500,
    offerType: "build",
    qualificationProfile: "all",
    fileField: "stripeDepositPriceId / stripeDepositLink",
    notes: "50% deposit for $3,000 concierge",
  },
  {
    lookupKey: "flynerd_concierge_final_v1",
    name: "AI Concierge Launch - Final",
    description:
      "Final 50% payment due on launch day for your AI Concierge deployment.",
    amountUsd: 1500,
    offerType: "build",
    qualificationProfile: "all",
    fileField: "stripeFinalPriceId / stripeFinalLink",
    notes: "Final 50%",
  },

  // ── Retainers ───────────────────────────────────────────────
  {
    lookupKey: "flynerd_care_monthly_v1",
    name: "Automation Care Plan",
    description:
      "Monthly plan: continuous automation monitoring, 2 improvement tickets, rapid bug fixes, and a plain-English performance report. Best for 1-3 active automations. Cancel anytime with 30 days notice.",
    amountUsd: 997,
    recurring: "month",
    offerType: "retainer",
    qualificationProfile: "all",
    fileField: "stripeMonthlyPriceId / stripeMonthlyLink",
    notes: "Core maintenance + 2 improvements",
  },
  {
    lookupKey: "flynerd_growthops_monthly_v1",
    name: "Growth Ops Partner",
    description:
      "Dedicated automation ops bandwidth: up to 6 active workflow initiatives per month, quarterly strategic roadmap, Slack priority support, and cross-channel reporting. Cancel anytime with 30 days notice.",
    amountUsd: 1997,
    recurring: "month",
    offerType: "retainer",
    qualificationProfile: "all",
    fileField: "stripeMonthlyPriceId / stripeMonthlyLink",
    notes: "Expanded initiative capacity",
  },
  {
    lookupKey: "flynerd_scaleops_monthly_v1",
    name: "Scale Ops Partner",
    description:
      "Enterprise-grade automation partnership: SLA-backed support, multi-location capacity, unlimited initiatives within scope, executive quarterly reviews.",
    amountUsd: 3497,
    recurring: "month",
    offerType: "retainer",
    qualificationProfile: "all",
    fileField: "stripeMonthlyPriceId / stripeMonthlyLink",
    notes: "Enterprise SLA + multi-location",
  },

  // ── Add-ons: Reputation ─────────────────────────────────────
  {
    lookupKey: "flynerd_rep_lite_monthly_v1",
    name: "Reputation Management Lite (Per Location)",
    description:
      "Per-location review management: automated review request cadence, response template library, and response coaching for your team.",
    amountUsd: 299,
    recurring: "month",
    offerType: "addon_reputation",
    qualificationProfile: "all",
    fileField: "addons[].stripeMonthlyPriceId / addons[].stripeMonthlyLink",
    notes: "Review requests + response templates",
  },
  {
    lookupKey: "flynerd_rep_growth_monthly_v1",
    name: "Reputation Management Growth (Per Location)",
    description:
      "Per-location active reputation management: escalation handling, negative review offset content, and direct response drafting by the FlyNerd team.",
    amountUsd: 599,
    recurring: "month",
    offerType: "addon_reputation",
    qualificationProfile: "all",
    fileField: "addons[].stripeMonthlyPriceId / addons[].stripeMonthlyLink",
    notes: "Escalation + active management",
  },

  // ── Add-ons: SEO ────────────────────────────────────────────
  {
    lookupKey: "flynerd_localseo_monthly_v1",
    name: "Local SEO Foundation",
    description:
      "Monthly local SEO for building search presence from zero: Google Business Profile management, local citations, 2 SEO-optimized blog posts, and ranking reports.",
    amountUsd: 699,
    recurring: "month",
    offerType: "addon_seo",
    qualificationProfile: "all",
    fileField: "stripeMonthlyPriceId / stripeMonthlyLink",
    notes: "GBP + citations + 2 posts",
  },
  {
    lookupKey: "flynerd_compseo_monthly_v1",
    name: "Competitive SEO + Reputation",
    description:
      "Full-scale SEO for competitive markets: 80 keywords, E-E-A-T authority, 4 long-form posts per month, outreach-based link building, and active reputation management.",
    amountUsd: 1499,
    recurring: "month",
    offerType: "addon_seo",
    qualificationProfile: "all",
    fileField: "stripeMonthlyPriceId / stripeMonthlyLink",
    notes: "4 posts + link outreach + gap analysis",
  },
  {
    lookupKey: "flynerd_authoritygeo_monthly_v1",
    name: "Authority SEO + GEO",
    description:
      "Top-tier SEO + Generative Engine Optimization (GEO). Everything in Competitive SEO plus 6 pillar+cluster posts per month, digital PR link building, and AI citation monitoring across ChatGPT, Perplexity, and Google AI Overviews.",
    amountUsd: 2499,
    recurring: "month",
    offerType: "addon_seo_geo",
    qualificationProfile: "all",
    fileField: "stripeMonthlyPriceId / stripeMonthlyLink",
    notes: "AEO/GEO authority layer",
  },

  // ── Add-ons: Journey Build ──────────────────────────────────
  {
    lookupKey: "flynerd_journey_lite_onetime_v1",
    name: "Automation Journey Build (Lite)",
    description:
      "A 3-stage automated customer journey built end-to-end: intake trigger, middle-stage nurture, and conversion step. Fixed scope, 1-2 week delivery.",
    amountUsd: 1200,
    offerType: "addon_journey",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes: "3-stage journey",
  },
  {
    lookupKey: "flynerd_journey_pro_onetime_v1",
    name: "Automation Journey Build (Pro)",
    description:
      "A 6-stage automated customer journey: multi-step nurture, lead scoring, branching logic, and conversion handoff. Fixed scope, 2-3 week delivery.",
    amountUsd: 2400,
    offerType: "addon_journey",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes: "6-stage journey",
  },

  // ── Add-ons: Integration Packs ──────────────────────────────
  {
    lookupKey: "flynerd_integration_std_onetime_v1",
    name: "Integration Pack (Standard)",
    description:
      "One tool-to-tool integration built cleanly: API or webhook-based, documented, QA'd. Typical use: CRM to booking tool, form to CRM, or payment to CRM.",
    amountUsd: 350,
    offerType: "addon_integration",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes: "1 integration",
  },
  {
    lookupKey: "flynerd_integration_adv_onetime_v1",
    name: "Integration Pack (Advanced)",
    description:
      "2-3 integrations built together, including custom business logic and error handling. For multi-tool workflows that need to stay in sync.",
    amountUsd: 900,
    offerType: "addon_integration",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes: "2-3 integrations",
  },

  // ── Add-ons: SLA ────────────────────────────────────────────
  {
    lookupKey: "flynerd_sla_priority_monthly_v1",
    name: "Priority SLA Support Add-on",
    description:
      "Upgrade your support response: same-business-day response on all tickets. Stacks on top of any retainer.",
    amountUsd: 300,
    recurring: "month",
    offerType: "addon_sla",
    qualificationProfile: "all",
    fileField: "addons[].stripeMonthlyPriceId / addons[].stripeMonthlyLink",
    notes: "Same-business-day response",
  },

  // ── Add-ons: Email ──────────────────────────────────────────
  {
    lookupKey: "flynerd_email_migration_onetime_v1",
    name: "Email Migration",
    description:
      "Migrate up to 10 mailboxes from Wix, GoDaddy, or any IMAP provider to Google Workspace. Current email only (no historical archive). 7-day delivery. Includes MX cutover and post-migration incoming/outgoing verification.",
    amountUsd: 995,
    offerType: "addon_email",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes:
      "Wix / GoDaddy / IMAP -> Google Workspace; up to 10 mailboxes; current email only; 7-day delivery",
  },
  {
    lookupKey: "flynerd_email_historical_onetime_v1",
    name: "Historical Email Transfer",
    description:
      "Ingest prior email archives (PST/MBOX) into your Google Workspace mailboxes with folder structure preserved. Upsell to Email Migration; can be sold standalone.",
    amountUsd: 495,
    offerType: "addon_email",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes:
      "Upsell to Email Migration; PST/MBOX archive ingest; standalone allowed",
  },
];

// ─────────────────────────────────────────────────────────────
// CLI args
// ─────────────────────────────────────────────────────────────

interface CliArgs {
  mode: "test" | "live";
  dryRun: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  let mode: "test" | "live" | null = null;
  let dryRun = false;
  for (const arg of args) {
    if (arg === "--mode=test") mode = "test";
    else if (arg === "--mode=live") mode = "live";
    else if (arg === "--dry-run") dryRun = true;
    else {
      console.error(`[bootstrap] Unknown arg: ${arg}`);
      process.exit(1);
    }
  }
  if (!mode) {
    console.error("[bootstrap] Missing --mode=test or --mode=live");
    process.exit(1);
  }
  return { mode, dryRun };
}

function validateKey(key: string, mode: "test" | "live"): void {
  if (mode === "test" && !key.startsWith("sk_test_")) {
    console.error(
      `[bootstrap] mode=test requires an sk_test_ key. Got prefix "${key.slice(
        0,
        8,
      )}". Aborting.`,
    );
    process.exit(1);
  }
  if (mode === "live" && !key.startsWith("sk_live_")) {
    console.error(
      `[bootstrap] mode=live requires an sk_live_ key. Got prefix "${key.slice(
        0,
        8,
      )}". Aborting.`,
    );
    process.exit(1);
  }
}

function resolveKey(mode: "test" | "live"): string {
  const specific =
    mode === "test"
      ? process.env.STRIPE_TEST_API_KEY
      : process.env.STRIPE_LIVE_API_KEY;
  const fallback = process.env.STRIPE_API_KEY;
  const key = specific ?? fallback;
  if (!key) {
    const wanted =
      mode === "test" ? "STRIPE_TEST_API_KEY" : "STRIPE_LIVE_API_KEY";
    console.error(
      `[bootstrap] No key found. Set ${wanted} (preferred) or STRIPE_API_KEY in .env.`,
    );
    process.exit(1);
  }
  return key;
}

// ─────────────────────────────────────────────────────────────
// Upsert logic (idempotent + drift repair)
// ─────────────────────────────────────────────────────────────

type Action =
  | "created"
  | "reused"
  | "updated"
  | "would-create"
  | "would-update";

interface ResolvedItem extends CatalogItem {
  productId: string;
  priceId: string;
  paymentLink: string;
  action: Action;
  drift: string[]; // human-readable list of what changed
}

async function findPriceByLookupKey(
  stripe: Stripe,
  lookupKey: string,
): Promise<Stripe.Price | null> {
  const resp = await stripe.prices.list({
    lookup_keys: [lookupKey],
    limit: 1,
    active: true,
  });
  return resp.data[0] ?? null;
}

async function findPaymentLinkByLookupKey(
  stripe: Stripe,
  lookupKey: string,
): Promise<Stripe.PaymentLink | null> {
  const resp = await stripe.paymentLinks.list({ limit: 100, active: true });
  return resp.data.find((l) => l.metadata?.lookup_key === lookupKey) ?? null;
}

function productNeedsUpdate(
  product: Stripe.Product,
  item: CatalogItem,
): string[] {
  const drift: string[] = [];
  if (product.name !== item.name) drift.push("name");
  if ((product.description ?? "") !== item.description) drift.push("description");
  return drift;
}

function paymentLinkNeedsUpdate(
  link: Stripe.PaymentLink,
  item: CatalogItem,
): string[] {
  const drift: string[] = [];
  const expectedMethods = [...PAYMENT_METHOD_TYPES].sort();
  const actualMethods = [...(link.payment_method_types ?? [])].sort();
  if (
    actualMethods.length !== expectedMethods.length ||
    actualMethods.some((m, i) => m !== expectedMethods[i])
  ) {
    drift.push("payment_method_types");
  }

  const expectedUrl = successRedirectUrl(item.lookupKey);
  const actualType = link.after_completion?.type;
  const actualUrl = link.after_completion?.redirect?.url;
  if (actualType !== "redirect" || actualUrl !== expectedUrl) {
    drift.push("after_completion");
  }
  return drift;
}

async function upsertOne(
  stripe: Stripe,
  item: CatalogItem,
  dryRun: boolean,
): Promise<ResolvedItem> {
  const amountCents = item.amountUsd * 100;
  const drift: string[] = [];

  const existingPrice = await findPriceByLookupKey(stripe, item.lookupKey);

  if (existingPrice) {
    if (existingPrice.unit_amount !== amountCents) {
      throw new Error(
        `price with lookup_key "${item.lookupKey}" exists at ${existingPrice.unit_amount} cents, ` +
          `spec wants ${amountCents}. Stripe Prices are immutable. Bump the lookup_key suffix ` +
          `(e.g. _v1 -> _v2) or archive the existing price in the dashboard, then re-run.`,
      );
    }

    const productId = existingPrice.product as string;

    // Check product drift and update if needed.
    const existingProduct = await stripe.products.retrieve(productId);
    const productDrift = productNeedsUpdate(existingProduct, item);
    if (productDrift.length > 0) {
      drift.push(...productDrift.map((d) => `product.${d}`));
      if (!dryRun) {
        await stripe.products.update(productId, {
          name: item.name,
          description: item.description,
        });
      }
    }

    // Check payment link drift and update/create as needed.
    let existingLink = await findPaymentLinkByLookupKey(stripe, item.lookupKey);
    let paymentLink: string;

    if (existingLink) {
      const linkDrift = paymentLinkNeedsUpdate(existingLink, item);
      if (linkDrift.length > 0) {
        drift.push(...linkDrift.map((d) => `link.${d}`));
        if (!dryRun) {
          existingLink = await stripe.paymentLinks.update(existingLink.id, {
            payment_method_types: PAYMENT_METHOD_TYPES,
            after_completion: {
              type: "redirect",
              redirect: { url: successRedirectUrl(item.lookupKey) },
            },
          });
        }
      }
      paymentLink = existingLink.url;
    } else if (dryRun) {
      drift.push("link.create");
      paymentLink = "(dry-run: would create new payment link)";
    } else {
      drift.push("link.create");
      const newLink = await stripe.paymentLinks.create({
        line_items: [{ price: existingPrice.id, quantity: 1 }],
        payment_method_types: PAYMENT_METHOD_TYPES,
        after_completion: {
          type: "redirect",
          redirect: { url: successRedirectUrl(item.lookupKey) },
        },
        metadata: {
          lookup_key: item.lookupKey,
          service_family: "flynerd_agency",
          offer_type: item.offerType,
          qualification_profile: item.qualificationProfile,
        },
      });
      paymentLink = newLink.url;
    }

    const action: Action =
      drift.length === 0 ? "reused" : dryRun ? "would-update" : "updated";

    return {
      ...item,
      productId,
      priceId: existingPrice.id,
      paymentLink,
      action,
      drift,
    };
  }

  // Not found -> create fresh
  if (dryRun) {
    return {
      ...item,
      productId: "(dry-run)",
      priceId: "(dry-run)",
      paymentLink: "(dry-run)",
      action: "would-create",
      drift: ["product.create", "price.create", "link.create"],
    };
  }

  const product = await stripe.products.create({
    name: item.name,
    description: item.description,
    metadata: {
      service_family: "flynerd_agency",
      offer_type: item.offerType,
      qualification_profile: item.qualificationProfile,
      lookup_key: item.lookupKey,
      file_field: item.fileField,
    },
  });

  const priceParams: Stripe.PriceCreateParams = {
    product: product.id,
    unit_amount: amountCents,
    currency: "usd",
    lookup_key: item.lookupKey,
    metadata: {
      service_family: "flynerd_agency",
      offer_type: item.offerType,
      qualification_profile: item.qualificationProfile,
      file_field: item.fileField,
    },
  };
  if (item.recurring === "month") {
    priceParams.recurring = { interval: "month" };
  }
  const price = await stripe.prices.create(priceParams);

  const link = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    payment_method_types: PAYMENT_METHOD_TYPES,
    after_completion: {
      type: "redirect",
      redirect: { url: successRedirectUrl(item.lookupKey) },
    },
    metadata: {
      lookup_key: item.lookupKey,
      service_family: "flynerd_agency",
      offer_type: item.offerType,
      qualification_profile: item.qualificationProfile,
    },
  });

  return {
    ...item,
    productId: product.id,
    priceId: price.id,
    paymentLink: link.url,
    action: "created",
    drift: [],
  };
}

// ─────────────────────────────────────────────────────────────
// Output writers
// ─────────────────────────────────────────────────────────────

function csvEscape(v: string | number): string {
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function writeCsv(resolved: ResolvedItem[], filePath: string): void {
  const header = [
    "product_name",
    "price_id",
    "payment_link",
    "file_field",
    "lookup_key",
    "amount_usd",
    "recurring",
    "offer_type",
    "qualification_profile",
    "action",
    "drift",
    "notes",
  ].join(",");
  const rows = resolved.map((r) =>
    [
      r.name,
      r.priceId,
      r.paymentLink,
      r.fileField,
      r.lookupKey,
      r.amountUsd,
      r.recurring ?? "one_time",
      r.offerType,
      r.qualificationProfile,
      r.action,
      r.drift.join(";"),
      r.notes,
    ]
      .map(csvEscape)
      .join(","),
  );
  fs.writeFileSync(filePath, `${header}\n${rows.join("\n")}\n`, "utf8");
}

function writeMd(
  resolved: ResolvedItem[],
  mode: "test" | "live",
  filePath: string,
): void {
  const now = new Date().toISOString();
  const summary: Record<string, number> = {};
  for (const r of resolved) {
    summary[r.action] = (summary[r.action] ?? 0) + 1;
  }
  const summaryLine = Object.entries(summary)
    .map(([a, n]) => `${n} ${a}`)
    .join(", ");

  const lines = [
    `# Stripe Catalog Mapping — ${mode.toUpperCase()} mode`,
    ``,
    `Generated: \`${now}\``,
    `Summary: ${summaryLine}`,
    `Payment methods allowed: ${PAYMENT_METHOD_TYPES.join(", ")}`,
    `After-payment redirect: ${successRedirectUrl("<lookup_key>")}`,
    ``,
    `| product_name | price_id | payment_link | file_field | lookup_key | amount | profile | action | drift |`,
    `|---|---|---|---|---|---|---|---|---|`,
    ...resolved.map((r) => {
      const amount =
        r.recurring === "month" ? `$${r.amountUsd}/mo` : `$${r.amountUsd}`;
      const driftCell = r.drift.length > 0 ? r.drift.join(", ") : "-";
      return `| ${r.name} | \`${r.priceId}\` | ${r.paymentLink} | \`${r.fileField}\` | \`${r.lookupKey}\` | ${amount} | ${r.qualificationProfile} | ${r.action} | ${driftCell} |`;
    }),
    ``,
  ];
  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { mode, dryRun } = parseArgs();

  const key = resolveKey(mode);
  validateKey(key, mode);

  console.log(
    `[bootstrap] mode=${mode} dryRun=${dryRun} items=${CATALOG.length}`,
  );
  console.log(`[bootstrap] key prefix: ${key.slice(0, 8)}...`);
  console.log(
    `[bootstrap] payment_method_types: ${PAYMENT_METHOD_TYPES.join(", ")}`,
  );
  console.log(
    `[bootstrap] after_completion redirect: ${successRedirectUrl("<lookup_key>")}`,
  );

  const stripe = new Stripe(key);

  const resolved: ResolvedItem[] = [];
  for (const item of CATALOG) {
    try {
      const r = await upsertOne(stripe, item, dryRun);
      const driftLabel = r.drift.length > 0 ? ` (${r.drift.join(",")})` : "";
      console.log(
        `  [${r.action.padEnd(13)}] ${item.lookupKey.padEnd(42)} -> ${r.priceId}${driftLabel}`,
      );
      resolved.push(r);
    } catch (err) {
      console.error(`  [FAILED       ] ${item.lookupKey}: ${(err as Error).message}`);
      process.exit(1);
    }
  }

  // Resolve output paths relative to this script so npx tsx cwd doesn't matter.
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const outDir = path.resolve(scriptDir, "../docs/billing");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const suffix = mode === "test" ? ".test" : "";
  const csvPath = path.join(outDir, `stripe_catalog_mapping${suffix}.csv`);
  const mdPath = path.join(outDir, `stripe_catalog_mapping${suffix}.md`);

  if (dryRun) {
    console.log(
      "\n[bootstrap] dry-run: no Stripe mutations were made, no mapping files written.",
    );
    return;
  }

  writeCsv(resolved, csvPath);
  writeMd(resolved, mode, mdPath);
  console.log(`\n[bootstrap] wrote ${csvPath}`);
  console.log(`[bootstrap] wrote ${mdPath}`);

  const counts: Record<string, number> = {};
  for (const r of resolved) counts[r.action] = (counts[r.action] ?? 0) + 1;
  const summary = Object.entries(counts)
    .map(([k, v]) => `${v} ${k}`)
    .join(", ");
  console.log(`[bootstrap] done. ${summary} (${resolved.length} total).`);
}

main().catch((err) => {
  console.error("[bootstrap] FATAL:", err);
  process.exit(1);
});
