// Load STRIPE_API_KEY from flynerd-agency/.env.
import "dotenv/config";

/**
 * FlyNerd Custom Invoice Helper
 * =============================
 *
 * Sends one-off Stripe Invoices for client-specific quotes that are NOT in
 * the public catalog. Each client's invoices are hardcoded below so every
 * custom price lives in git history for audit.
 *
 * Usage
 * -----
 *   # dry run (validates spec, hits Stripe read APIs only)
 *   npm run invoice:raid:dry
 *
 *   # send for real (live Stripe)
 *   $env:STRIPE_API_KEY = "sk_live_..."  # or via .env
 *   npm run invoice:raid
 *
 * Idempotency
 * -----------
 *   Each invoice spec has a stable `quoteId`. Before creating, the script
 *   searches Stripe for an existing invoice with the same metadata.quote_id.
 *   If found, it is skipped and the existing hosted URL is printed. To
 *   re-issue, archive the old invoice in the dashboard and bump the quoteId
 *   suffix (e.g. `_2026_04_20` -> `_2026_04_20b`).
 *
 * Customer matching
 * -----------------
 *   Stripe Customer is looked up by email (first match). If not found, a
 *   new Customer is created with legal name + metadata.client_key so future
 *   runs reuse it.
 */

import Stripe from "stripe";

// ─────────────────────────────────────────────────────────────
// Invoice specs (one per client, one entry per quote)
// ─────────────────────────────────────────────────────────────

interface CustomInvoiceSpec {
  quoteId: string; // stable idempotency key in metadata.quote_id
  invoiceDescription: string; // appears as the invoice header
  lineDescription: string; // appears on the line item
  amountCents: number;
  sendNow: boolean; // true = finalize + email; false = leave as draft
  dueOnReceipt: boolean;
  memo?: string; // footer memo on invoice
}

interface ClientSpec {
  key: string;
  customerEmail: string;
  customerName: string;
  metadata: Record<string, string>;
  invoices: CustomInvoiceSpec[];
}

// Booking link surfaced in every invoice footer so the client always sees
// the next step right next to "amount due". Env var CAL_COM_KICKOFF_LINK
// matches the convention already used in app/demo/[leadId]/page.tsx.
// Hardcoded final fallback keeps the memo usable even if env isn't loaded.
const KICKOFF_BOOKING_URL =
  process.env.CAL_COM_KICKOFF_LINK ??
  "https://calendar.app.google/ZPyA64TEyjD7E99P8";

const CLIENTS: Record<string, ClientSpec> = {
  raid: {
    key: "raid",
    customerEmail: "jovel24family@gmail.com",
    customerName: "RAID Security Corp",
    metadata: {
      client_key: "raid",
      client_slug: "raid-security-corp",
      primary_domain: "raidsecuritycorp.com",
    },
    invoices: [
      {
        quoteId: "raid_email_migration_2026_04_20",
        invoiceDescription: "FlyNerd Tech - Email Migration (Phase 1)",
        // Newlines render on the Stripe hosted invoice page as a scoped bullet list.
        lineDescription: [
          "Email Migration (founding-client rate)",
          "",
          "Scope:",
          "- Set up Google Workspace account",
          "- Migrate existing mailboxes (1-10) from Smarterasp to Google Workspace",
          "- Transfer current email only (no historical archive)",
          "- Connect admin@raidsecuritycorp.com to Wix-hosted DNS",
          "- Verify incoming + outgoing email",
          "",
          "Delivery: 7 days from kickoff.",
        ].join("\n"),
        amountCents: 60000, // $600
        sendNow: true,
        dueOnReceipt: true,
        memo: [
          `Next step after payment: book your kickoff call at ${KICKOFF_BOOKING_URL}`,
          "",
          "Founding-client rate. Public list price $995.",
          "",
          "Phase 2 (Historical Email Transfer, $250) is quoted separately and billed only on your written go-ahead after site4now is live.",
        ].join("\n"),
      },
      {
        quoteId: "raid_email_historical_2026_04_20",
        invoiceDescription:
          "FlyNerd Tech - Historical Email Transfer (Phase 2, draft)",
        lineDescription: [
          "Historical Email Transfer (founding-client rate)",
          "",
          "Scope:",
          "- Ingest prior Smarterasp email archives into the new Google Workspace mailboxes",
          "- Preserve folder structure",
          "",
          "Upsell to Phase 1 Email Migration. Billed only upon written go-ahead from RAID Security Corp after site4now is live.",
        ].join("\n"),
        amountCents: 25000, // $250
        sendNow: false, // leave as DRAFT
        dueOnReceipt: true,
        memo: [
          "Draft invoice. Finalize and send only after Jovel confirms she wants historical archives migrated. Decision happens once site4now is live; invoice is sent within 24h of confirmation.",
          "",
          "Founding-client rate. Public list price $495.",
        ].join("\n"),
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// CLI args
// ─────────────────────────────────────────────────────────────

interface CliArgs {
  clientKey: string;
  mode: "test" | "live";
  dryRun: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  let clientKey: string | null = null;
  let mode: "test" | "live" = "test"; // default to test so no one sends live invoices by accident
  let dryRun = false;
  for (const arg of args) {
    if (arg.startsWith("--client=")) {
      clientKey = arg.slice("--client=".length);
    } else if (arg === "--mode=test") {
      mode = "test";
    } else if (arg === "--mode=live") {
      mode = "live";
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else {
      console.error(`[invoice] Unknown arg: ${arg}`);
      process.exit(1);
    }
  }
  if (!clientKey) {
    console.error(
      "[invoice] Missing --client=<key>. Known clients: " +
        Object.keys(CLIENTS).join(", "),
    );
    process.exit(1);
  }
  if (!(clientKey in CLIENTS)) {
    console.error(`[invoice] Unknown client "${clientKey}"`);
    process.exit(1);
  }
  return { clientKey, mode, dryRun };
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
      `[invoice] No key found. Set ${wanted} (preferred) or STRIPE_API_KEY in .env.`,
    );
    process.exit(1);
  }
  return key;
}

function validateKey(key: string, mode: "test" | "live"): void {
  if (mode === "test" && !key.startsWith("sk_test_")) {
    console.error(
      `[invoice] mode=test requires an sk_test_ key. Got prefix "${key.slice(
        0,
        8,
      )}". Aborting.`,
    );
    process.exit(1);
  }
  if (mode === "live" && !key.startsWith("sk_live_")) {
    console.error(
      `[invoice] mode=live requires an sk_live_ key. Got prefix "${key.slice(
        0,
        8,
      )}". Aborting.`,
    );
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────
// Customer lookup/create
// ─────────────────────────────────────────────────────────────

async function findOrCreateCustomer(
  stripe: Stripe,
  spec: ClientSpec,
  dryRun: boolean,
): Promise<{ id: string; created: boolean }> {
  const existing = await stripe.customers.list({
    email: spec.customerEmail,
    limit: 1,
  });
  if (existing.data.length > 0) {
    return { id: existing.data[0].id, created: false };
  }
  if (dryRun) {
    return { id: "(dry-run: would create customer)", created: false };
  }
  const created = await stripe.customers.create({
    email: spec.customerEmail,
    name: spec.customerName,
    metadata: spec.metadata,
  });
  return { id: created.id, created: true };
}

// ─────────────────────────────────────────────────────────────
// Invoice lookup (idempotency)
// ─────────────────────────────────────────────────────────────

async function findInvoiceByQuoteId(
  stripe: Stripe,
  customerId: string,
  quoteId: string,
): Promise<Stripe.Invoice | null> {
  // Stripe invoices.list doesn't filter by metadata. Scan up to 100
  // recent invoices for this customer. Customer-scoped + bounded is fine
  // for our per-client volume.
  //
  // Skip VOIDED and DELETED invoices so that voiding an invoice in the
  // dashboard effectively "resets" the idempotency slot — the next script
  // run will create a fresh invoice for the same quoteId.
  if (customerId.startsWith("(dry-run")) return null;
  const resp = await stripe.invoices.list({ customer: customerId, limit: 100 });
  const DEAD_STATUSES = new Set(["void", "deleted"]);
  return (
    resp.data.find(
      (inv) =>
        inv.metadata?.quote_id === quoteId &&
        !DEAD_STATUSES.has(String(inv.status ?? "")),
    ) ?? null
  );
}

// ─────────────────────────────────────────────────────────────
// Invoice creation
// ─────────────────────────────────────────────────────────────

interface InvoiceResult {
  quoteId: string;
  action: "created" | "reused" | "would-create";
  invoiceId: string;
  hostedUrl: string | null;
  status: string;
  amountDue: number;
}

async function upsertInvoice(
  stripe: Stripe,
  customerId: string,
  spec: CustomInvoiceSpec,
  dryRun: boolean,
): Promise<InvoiceResult> {
  const existing = await findInvoiceByQuoteId(stripe, customerId, spec.quoteId);
  if (existing) {
    return {
      quoteId: spec.quoteId,
      action: "reused",
      invoiceId: existing.id ?? "(unknown)",
      hostedUrl: existing.hosted_invoice_url ?? null,
      status: existing.status ?? "unknown",
      amountDue: existing.amount_due ?? spec.amountCents,
    };
  }

  if (dryRun) {
    return {
      quoteId: spec.quoteId,
      action: "would-create",
      invoiceId: "(dry-run)",
      hostedUrl: null,
      status: spec.sendNow ? "would-be-open" : "would-be-draft",
      amountDue: spec.amountCents,
    };
  }

  // Attach a pending InvoiceItem to the customer so it gets pulled into the
  // next created Invoice. Items are stamped with quote_id metadata so they
  // can be traced back to this spec.
  await stripe.invoiceItems.create({
    customer: customerId,
    amount: spec.amountCents,
    currency: "usd",
    description: spec.lineDescription,
    metadata: {
      quote_id: spec.quoteId,
      service_family: "flynerd_agency",
      billing_mode: "custom_invoice",
    },
  });

  const invoice = await stripe.invoices.create({
    customer: customerId,
    collection_method: "send_invoice",
    days_until_due: spec.dueOnReceipt ? 0 : 14,
    description: spec.invoiceDescription,
    pending_invoice_items_behavior: "include",
    auto_advance: spec.sendNow, // draft if false
    metadata: {
      quote_id: spec.quoteId,
      service_family: "flynerd_agency",
      billing_mode: "custom_invoice",
    },
    footer: spec.memo ?? undefined,
  });

  if (!invoice.id) {
    throw new Error("[invoice] Stripe created an invoice with no id");
  }

  if (!spec.sendNow) {
    // Leave as DRAFT. Human finalize + send from dashboard.
    return {
      quoteId: spec.quoteId,
      action: "created",
      invoiceId: invoice.id,
      hostedUrl: null,
      status: "draft",
      amountDue: invoice.amount_due ?? spec.amountCents,
    };
  }

  const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
  if (!finalized.id) {
    throw new Error("[invoice] Stripe finalized an invoice with no id");
  }
  const sent = await stripe.invoices.sendInvoice(finalized.id);

  return {
    quoteId: spec.quoteId,
    action: "created",
    invoiceId: sent.id ?? finalized.id,
    hostedUrl: sent.hosted_invoice_url ?? finalized.hosted_invoice_url ?? null,
    status: sent.status ?? finalized.status ?? "open",
    amountDue: sent.amount_due ?? spec.amountCents,
  };
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { clientKey, mode, dryRun } = parseArgs();
  const client = CLIENTS[clientKey];

  const key = resolveKey(mode);
  validateKey(key, mode);

  console.log(
    `[invoice] client=${clientKey} mode=${mode.toUpperCase()} dryRun=${dryRun}`,
  );
  console.log(`[invoice] key prefix: ${key.slice(0, 8)}...`);
  console.log(
    `[invoice] customer: ${client.customerName} <${client.customerEmail}>`,
  );
  console.log(`[invoice] invoices planned: ${client.invoices.length}`);

  if (mode === "live" && !dryRun) {
    console.log(
      "[invoice] WARNING: LIVE mode, --dry-run not set. Real invoices will be created and Stripe will email the client if sendNow=true.",
    );
  }

  const stripe = new Stripe(key);

  const { id: customerId, created: customerCreated } = await findOrCreateCustomer(
    stripe,
    client,
    dryRun,
  );
  console.log(
    `[invoice] customer ${customerCreated ? "CREATED" : "found"}: ${customerId}`,
  );

  const results: InvoiceResult[] = [];
  for (const spec of client.invoices) {
    try {
      const r = await upsertInvoice(stripe, customerId, spec, dryRun);
      results.push(r);
      console.log(
        `  [${r.action.padEnd(13)}] ${spec.quoteId}  ->  ${r.invoiceId}  status=${r.status}`,
      );
      if (r.hostedUrl) {
        console.log(`      hosted_url: ${r.hostedUrl}`);
      }
    } catch (err) {
      console.error(`  [FAILED       ] ${spec.quoteId}: ${(err as Error).message}`);
      process.exit(1);
    }
  }

  console.log("\n[invoice] summary:");
  for (const r of results) {
    const amount = `$${(r.amountDue / 100).toFixed(2)}`;
    console.log(
      `  ${r.quoteId}: ${r.action} | status=${r.status} | ${amount} | ${r.hostedUrl ?? "(no hosted url / draft)"}`,
    );
  }
  console.log("\n[invoice] done.");
}

main().catch((err) => {
  console.error("[invoice] FATAL:", err);
  process.exit(1);
});
