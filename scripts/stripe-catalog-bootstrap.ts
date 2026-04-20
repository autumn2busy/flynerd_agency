// Load STRIPE_API_KEY (and any other env) from flynerd-agency/.env.
// Keeps the live secret out of argv and out of shell history.
import "dotenv/config";

/**
 * FlyNerd Stripe Catalog Bootstrap
 * ================================
 *
 * Idempotently creates Stripe Products, Prices, and Payment Links for the
 * 2026-04-20 FlyNerd catalog rebuild. Writes a mapping file to
 * docs/billing/stripe_catalog_mapping[.test].{csv,md}.
 *
 * Usage
 * -----
 *   # dry run (reads Stripe to see what exists, makes no writes)
 *   $env:STRIPE_API_KEY = "sk_test_..."
 *   npm run stripe:bootstrap:dry
 *
 *   # test mode (writes to Stripe TEST env, outputs *.test.{csv,md} locally)
 *   $env:STRIPE_API_KEY = "sk_test_..."
 *   npm run stripe:bootstrap:test
 *
 *   # live mode (writes to Stripe LIVE env, outputs committed mapping files)
 *   $env:STRIPE_API_KEY = "sk_live_..."
 *   npm run stripe:bootstrap:live
 *
 * Idempotency
 * -----------
 *   - Prices are looked up by lookup_key before create. If a price with the
 *     same lookup_key exists at the same amount, it is reused. If it exists
 *     at a different amount, the script aborts (Stripe Prices are immutable).
 *   - Payment Links are searched by metadata.lookup_key (first 100 links).
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
  amountUsd: number;
  recurring?: "month";
  offerType: string;
  qualificationProfile: Profile;
  fileField: string;
  notes: string;
}

const CATALOG: CatalogItem[] = [
  // ── Core build — Profile 1 (Underserved Local) ──────────────
  {
    lookupKey: "flynerd_website_ul_deposit_v1",
    name: "AI Website Quickstart (Underserved Local) - Deposit",
    amountUsd: 750,
    offerType: "core_build",
    qualificationProfile: "underserved_local",
    fileField: "stripeDepositPriceId / stripeDepositLink",
    notes: "50% deposit for $1,500 total build",
  },
  {
    lookupKey: "flynerd_website_ul_final_v1",
    name: "AI Website Quickstart (Underserved Local) - Final",
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
    amountUsd: 1750,
    offerType: "core_build",
    qualificationProfile: "tech_enabled_premium",
    fileField: "STRIPE_PROFILE2_DEPOSIT_LINK (env) + stripeDepositPriceId/Link",
    notes: "50% deposit for $3,500 total build",
  },
  {
    lookupKey: "flynerd_website_tp_final_v1",
    name: "AI Website Concierge (Tech-Enabled Premium) - Final",
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
    amountUsd: 495,
    offerType: "strategy",
    qualificationProfile: "all",
    fileField: "stripeDepositPriceId / stripeDepositLink",
    notes: "Creditable toward any build",
  },
  {
    lookupKey: "flynerd_sprint_deposit_v1",
    name: "Automation Sprint Build - Deposit",
    amountUsd: 750,
    offerType: "build",
    qualificationProfile: "all",
    fileField: "stripeDepositPriceId / stripeDepositLink",
    notes: "50% deposit for $1,500 sprint",
  },
  {
    lookupKey: "flynerd_sprint_final_v1",
    name: "Automation Sprint Build - Final",
    amountUsd: 750,
    offerType: "build",
    qualificationProfile: "all",
    fileField: "stripeFinalPriceId / stripeFinalLink",
    notes: "Final 50%",
  },
  {
    lookupKey: "flynerd_concierge_deposit_v1",
    name: "AI Concierge Launch - Deposit",
    amountUsd: 1500,
    offerType: "build",
    qualificationProfile: "all",
    fileField: "stripeDepositPriceId / stripeDepositLink",
    notes: "50% deposit for $3,000 concierge",
  },
  {
    lookupKey: "flynerd_concierge_final_v1",
    name: "AI Concierge Launch - Final",
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
    amountUsd: 1200,
    offerType: "addon_journey",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes: "3-stage journey",
  },
  {
    lookupKey: "flynerd_journey_pro_onetime_v1",
    name: "Automation Journey Build (Pro)",
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
    amountUsd: 350,
    offerType: "addon_integration",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes: "1 integration",
  },
  {
    lookupKey: "flynerd_integration_adv_onetime_v1",
    name: "Integration Pack (Advanced)",
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
    amountUsd: 995,
    offerType: "addon_email",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes:
      "Wix / GoDaddy / IMAP -> Google Workspace; up to 10 mailboxes; current email only (no historical archive); 7-day delivery",
  },
  {
    lookupKey: "flynerd_email_historical_onetime_v1",
    name: "Historical Email Transfer",
    amountUsd: 495,
    offerType: "addon_email",
    qualificationProfile: "all",
    fileField: "addons[].stripeDepositPriceId / addons[].stripeDepositLink",
    notes:
      "Upsell to Email Migration; ingest PST/MBOX archives into Google Workspace mailboxes; standalone allowed",
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
      )}". Aborting to prevent writing test data to your live account.`,
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

/**
 * Resolve the Stripe API key for the requested mode. Priority:
 *   test  -> STRIPE_TEST_API_KEY, then STRIPE_API_KEY
 *   live  -> STRIPE_LIVE_API_KEY, then STRIPE_API_KEY
 * This lets the same .env hold both keys without juggling which is "active".
 */
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
// Upsert logic (idempotent)
// ─────────────────────────────────────────────────────────────

interface ResolvedItem extends CatalogItem {
  productId: string;
  priceId: string;
  paymentLink: string;
  action: "created" | "reused" | "would-create";
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
  // Stripe paymentLinks.list does not accept metadata filter, so we scan.
  // We scan up to 100 active links. If you have more than 100, older links
  // may be missed and a duplicate will be created. See README.md.
  const resp = await stripe.paymentLinks.list({ limit: 100, active: true });
  return resp.data.find((l) => l.metadata?.lookup_key === lookupKey) ?? null;
}

async function upsertOne(
  stripe: Stripe,
  item: CatalogItem,
  dryRun: boolean,
): Promise<ResolvedItem> {
  const amountCents = item.amountUsd * 100;

  const existingPrice = await findPriceByLookupKey(stripe, item.lookupKey);

  if (existingPrice) {
    if (existingPrice.unit_amount !== amountCents) {
      throw new Error(
        `price with lookup_key "${item.lookupKey}" exists at ${existingPrice.unit_amount} cents, ` +
          `spec wants ${amountCents}. Stripe Prices are immutable. Bump the lookup_key suffix ` +
          `(e.g. _v1 -> _v2) or archive the existing price in the dashboard, then re-run.`,
      );
    }

    const existingLink = await findPaymentLinkByLookupKey(stripe, item.lookupKey);
    let paymentLink: string;

    if (existingLink) {
      paymentLink = existingLink.url;
    } else if (dryRun) {
      paymentLink = "(dry-run: would create new payment link)";
    } else {
      const newLink = await stripe.paymentLinks.create({
        line_items: [{ price: existingPrice.id, quantity: 1 }],
        metadata: {
          lookup_key: item.lookupKey,
          service_family: "flynerd_agency",
          offer_type: item.offerType,
          qualification_profile: item.qualificationProfile,
        },
      });
      paymentLink = newLink.url;
    }

    return {
      ...item,
      productId: existingPrice.product as string,
      priceId: existingPrice.id,
      paymentLink,
      action: "reused",
    };
  }

  // Not found → create fresh
  if (dryRun) {
    return {
      ...item,
      productId: "(dry-run)",
      priceId: "(dry-run)",
      paymentLink: "(dry-run)",
      action: "would-create",
    };
  }

  const product = await stripe.products.create({
    name: item.name,
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
    ``,
    `| product_name | price_id | payment_link | file_field | lookup_key | amount | profile | action |`,
    `|---|---|---|---|---|---|---|---|`,
    ...resolved.map((r) => {
      const amount =
        r.recurring === "month" ? `$${r.amountUsd}/mo` : `$${r.amountUsd}`;
      return `| ${r.name} | \`${r.priceId}\` | ${r.paymentLink} | \`${r.fileField}\` | \`${r.lookupKey}\` | ${amount} | ${r.qualificationProfile} | ${r.action} |`;
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

  const stripe = new Stripe(key);

  const resolved: ResolvedItem[] = [];
  for (const item of CATALOG) {
    try {
      const r = await upsertOne(stripe, item, dryRun);
      console.log(
        `  [${r.action.padEnd(13)}] ${item.lookupKey.padEnd(42)} -> ${r.priceId}`,
      );
      resolved.push(r);
    } catch (err) {
      console.error(`  [FAILED       ] ${item.lookupKey}: ${(err as Error).message}`);
      process.exit(1);
    }
  }

  // Resolve output paths relative to this script so `npx tsx` cwd doesn't matter.
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

  const created = resolved.filter((r) => r.action === "created").length;
  const reused = resolved.filter((r) => r.action === "reused").length;
  console.log(
    `[bootstrap] done. ${created} created, ${reused} reused, ${resolved.length} total.`,
  );
}

main().catch((err) => {
  console.error("[bootstrap] FATAL:", err);
  process.exit(1);
});
