# Deprecated FlyNerd Products

Tracks products retired from the FlyNerd catalog during the **2026-04-20**
rebuild. Per Autumn's confirmation that day: none of the retired products
were ever on live customer-facing pages.

## Retired 2026-04-20

### Fully removed (no replacement in new catalog)

| Old product | Old price | Rationale |
|---|---|---|
| B2B Email Marketing | $399/mo | Rolled into Growth Ops Partner retainer; clients who specifically want email-only should take Audit + Sprint Build instead. |
| Growth Retainer Bundle | $1,098/mo | Replaced by the new Reputation + Local SEO add-on model, which lets clients pick their own stack instead of a fixed bundle. |

### Replaced with new pricing and/or positioning

| Old slug | Old price | New product (new price) |
|---|---|---|
| `quickstart-workflow-build` | $1,250 | `automation-sprint-build` ($1,500) |
| `ai-concierge-launch` | $2,400 | `ai-concierge-launch` ($3,000) |
| `automation-care-plan` | $750/mo | `automation-care-plan` ($997/mo) |
| `growth-ops-partner` | $1,800/mo | `growth-ops-partner` ($1,997/mo) |
| `local-seo-foundation` | $449/mo | `local-seo-foundation` ($699/mo) |
| `competitive-seo-reputation` | $799/mo | `competitive-seo-reputation` ($1,499/mo) |
| `authority-seo-aeo` | $1,299/mo | `authority-seo-geo` ($2,499/mo) — renamed AEO to GEO |
| `site-care-plan` | $299/mo | Removed. The $299/mo tier is now `reputation-management-lite` with different positioning. Site hosting/care rolls into `automation-care-plan`. |

### Net-new products (not in the old catalog)

- AI Website Quickstart (Underserved Local) — $1,500
- AI Website Concierge (Tech-Enabled Premium) — $3,500
- Scale Ops Partner — $3,497/mo
- Reputation Management Lite — $299/mo
- Reputation Management Growth — $599/mo
- Automation Journey Build (Lite / Pro) — $1,200 / $2,400
- Integration Pack (Standard / Advanced) — $350 / $900
- Priority SLA Support — $300/mo

## Retired Stripe IDs (archive in Stripe dashboard)

### Prices to deactivate

| Price ID | Attached to | Old product |
|---|---|---|
| `price_1TDr8NRVuKVVmtoDxjmFLW6M` | *look up product in dashboard* | Automation Audit + Roadmap (deposit) |
| `price_1TDrDPRVuKVVmtoDXipbO9KN` | *look up* | Quickstart Workflow Build (deposit) |
| `price_1TDrJsRVuKVVmtoD2f7QpFDP` | *look up* | Quickstart Workflow Build (final) |
| `price_1TDrLhRVuKVVmtoD0YfWNJ1D` | *look up* | AI Concierge Launch (deposit, old $1,200) |
| `price_1TDrRbRVuKVVmtoDAAlAFLAP` | *look up* | AI Concierge Launch (final, old $1,200) |
| `price_1TDrZGRVuKVVmtoDMa1UdeEg` | *look up* | Automation Care Plan (monthly, old $750) |
| `price_1TDrbDRVuKVVmtoDMtued2fJ` | *look up* | Growth Ops Partner (monthly, old $1,800) |
| `price_1THVEeRVuKVVmtoDzgXmycIa` | *look up* | Local SEO Foundation (monthly, old $449) |
| `price_1THVEfRVuKVVmtoDjDrFJcfs` | *look up* | Competitive SEO + Reputation (monthly, old $799) |
| `price_1TKmKGRVuKVVmtoD4v40C0Xx` | *look up* | Authority SEO + AEO (monthly, old $1,299) |
| `price_1THVEiRVuKVVmtoDmjoTRrot` | *look up* | B2B Email Marketing (fully removed) |
| `price_1THVEhRVuKVVmtoD1ZftuZ6M` | *look up* | Growth Retainer Bundle (fully removed) |
| `price_1THVEgRVuKVVmtoDZmyOohTE` | *look up* | Site Care Plan (repositioned) |

**Note:** Re-add `price_1TDr8NRVuKVVmtoDxjmFLW6M` to "keep" if you want to
preserve the original Audit at $495. The new catalog keeps Automation Audit
at the same $495 but uses a new price/product with the `flynerd_audit_deposit_v1`
lookup key. If you want to keep the old one and skip creating a new one,
edit `scripts/stripe-catalog-bootstrap.ts` to remove that entry before
running live. Current plan: create fresh, archive old for consistency.

### Payment Links to deactivate

All currently point at `portal.flynerd.tech/b/...`:

- `/b/6oU4gBeGhcbCf2jbKybo400` (Audit)
- `/b/fZu6oJbu56RicUb4i6bo401` (Quickstart deposit)
- `/b/4gMbJ3fKla3ug6n4i6bo402` (Quickstart final)
- `/b/dRm4gBeGh1wY1btaGubo403` (Concierge deposit old)
- `/b/28E00lgOpa3u07p01Qbo404` (Concierge final old)
- `/b/6oU9AVdCd2B21bt3e2bo405` (Automation Care old)
- `/b/14A00lbu58Zq4nFdSGbo406` (Growth Ops old)
- `/b/14A4gBcy94Ja1bt4i6bo407` (Local SEO old)
- `/b/8x214peGha3ucUbcOCbo408` (Competitive SEO old)
- `/b/9B6dRb0Prb7yaM35mabo40c` (Authority SEO old)
- `/b/28EfZjgOpgrS1bt8ymbo40b` (B2B Email)
- `/b/8x23cx41D0sUbQ7eWKbo40a` (Growth Bundle)
- `/b/28E6oJdCd0sUbQ7g0Obo409` (Site Care)

Deactivate via Stripe dashboard → Payment Links → find by URL slug → Deactivate.
