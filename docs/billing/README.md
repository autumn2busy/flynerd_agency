# FlyNerd Billing Catalog

Canonical location for the FlyNerd Stripe catalog. Everything that displays
a price on the site consumes `app/pricing/services-data.ts`, which in turn
references the IDs mapped here.

## Files

| File | Purpose | Tracked? |
|---|---|---|
| `stripe_catalog_mapping.csv` | Machine-readable live catalog | yes |
| `stripe_catalog_mapping.md` | Human-readable live catalog | yes |
| `stripe_catalog_mapping.test.csv` | Test-mode output | gitignored |
| `stripe_catalog_mapping.test.md` | Test-mode output | gitignored |
| `deprecations.md` | Retired products and old Stripe IDs | yes |
| `README.md` | This file | yes |

## Workflow

The bootstrap lives at `scripts/stripe-catalog-bootstrap.ts` and is invoked
via npm scripts. All three run via `tsx` so no compile step is needed.

### 1. Dry run (reads Stripe, makes no writes)

```powershell
$env:STRIPE_API_KEY = "sk_test_..."
npm run stripe:bootstrap:dry
```

Validates the catalog definition against your Stripe account. Shows what
would be created vs reused. Safe to run repeatedly.

### 2. Test mode (writes to Stripe test environment)

```powershell
$env:STRIPE_API_KEY = "sk_test_..."
npm run stripe:bootstrap:test
```

Writes products, prices, and payment links to your Stripe **test** account
and generates `stripe_catalog_mapping.test.{csv,md}` locally. These files
are gitignored — they are for local validation only.

**Before proceeding to live mode**, open 2–3 of the test-mode payment link
URLs from the generated MD file in a browser and confirm they load a Stripe
Checkout page with the correct price and product name. Pick at least:
- one one-time core build (AI Website Quickstart Deposit)
- one recurring retainer (Automation Care Plan)

### 3. Live mode (writes to Stripe live environment)

```powershell
$env:STRIPE_API_KEY = "sk_live_..."
npm run stripe:bootstrap:live
```

Writes to your Stripe **live** account and generates committed
`stripe_catalog_mapping.{csv,md}` files at `docs/billing/`.

### 4. Commit the live mapping

```powershell
git add docs/billing/stripe_catalog_mapping.csv docs/billing/stripe_catalog_mapping.md
git commit -m "chore(billing): publish live catalog mapping"
```

## Idempotency

- **Prices** are looked up by `lookup_key` before create. If a price with the
  same `lookup_key` exists at the same amount, it is reused. If it exists at
  a different amount, the script aborts. Stripe Prices are immutable, so you
  must either bump the lookup_key suffix (`_v1` → `_v2`) or archive the
  existing price in the Stripe dashboard and re-run.
- **Products** are created fresh alongside new prices. When a price is
  reused, the existing product is also reused.
- **Payment Links** are searched by `metadata.lookup_key` and reused when
  found. The search scans the first 100 active payment links. If your
  workspace has more than 100 active links, older matches may be missed
  and a duplicate link will be created.

## Key-prefix guard

`--mode=test` refuses to run with an `sk_live_` key. `--mode=live` refuses
to run with an `sk_test_` key. This prevents test data from contaminating
the live account and vice versa.

## Archiving old products

The old v1 catalog (pre-2026-04 pricing) needs to be deactivated in the
Stripe dashboard once the new catalog is live. Stripe Prices cannot be
deleted, only deactivated.

The list of retired IDs lives in `deprecations.md`. For each entry:

1. Open the Product in the Stripe dashboard (https://dashboard.stripe.com/products).
2. Archive all Prices attached to the Product.
3. Archive the Product itself.
4. Deactivate all Payment Links that reference those Prices (Payment Links
   section of dashboard).

This is manual on purpose. Bulk-archive via API is destructive and we want
a human to confirm each one.

## QA checklist (after every catalog change)

- [ ] Dry run passes with matching key prefix.
- [ ] Test mode run writes `stripe_catalog_mapping.test.{csv,md}`.
- [ ] At least 2 test payment links open a working Stripe Checkout page.
- [ ] Live mode run writes committed mapping files.
- [ ] `app/pricing/services-data.ts` price IDs match the live mapping.
- [ ] `npm run build` in flynerd-agency succeeds.
- [ ] `/`, `/pricing`, and `/ai-website` render with the new prices.
- [ ] Kris Jenner close flow returns a valid Checkout URL for both profiles
      (trigger the MCP tool manually with a test lead of each profile).
