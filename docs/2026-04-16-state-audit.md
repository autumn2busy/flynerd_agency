---
project: flynerd-agency
type: audit
created: 2026-04-16
tags: [audit, state, plan-vs-reality, critical-path, execution-strategy]
---

# State Audit — 2026-04-16

Read-only audit against the 2026-04-08 execution strategy, the 10 blocking decisions, and the full changelog trail. Quotes evidence as `file:line` or `changelog-sonata.md → YYYY-MM-DD` entries. No code was modified.

Canonical status values (live in the `agency_lead_status_check` constraint, confirmed via Supabase MCP):
```
PROSPECT, DISCOVERED, AUDITED, DEMO_BUILT, OUTREACH_SENT, REPLIED,
CALL_BOOKED, CLOSED_WON, CLOSED_LOST, OUTREACH_EXHAUSTED,
DEMO_EXPIRED, INBOUND_NEW, CLIENT_ACTIVE
```

Live Supabase distribution (all 12 leads, `SELECT status, COUNT(*) FROM "AgencyLead" GROUP BY status`):
- DISCOVERED: 5
- OUTREACH_SENT: 4
- DEMO_BUILT: 2
- REPLIED: 1

All 12 leads have `stage: null`. All 12 default to `qualificationProfile: 'underserved_local'`. Zero have `tech_enabled_premium`.

---

## 1. Plan vs. Reality Matrix

| Fix # | Spec says | Ground truth | Status | Evidence |
|---|---|---|---|---|
| 0.1 & 1.3 | Next.js middleware in `nested-objects` web-members / web-firms. Delete `ContentProtection.tsx`. | Out of scope for this repo audit (nested-objects not scanned). No entry in `changelog-sonata.md` after 2026-04-02 references middleware landing. | NOT VERIFIED | No changelog entry between 2026-04-02 and 2026-04-16 describes middleware implementation. |
| 0.2 | Implement Pipeline API routes. Replace dummy payloads in `app/api/agents/*/route.ts` with real MCP calls. | 11 routes exist under `app/api/agents/`. Outreach, intel, closer, scout, orchestrator, builder, expire write canonical status. **`demo-builder/route.ts` and `email-sender/route.ts` still listed as "mocked completely with TODOs" in execution-strategy.md P3.** | PARTIAL | `changelog-sonata.md → 2026-04-08 Phase 0.2c` lists real payloads for outreach/closer/contact/orchestrator/ac-upsell. Not verified for demo-builder/email-sender. |
| 0.3 & 1.4 | Scaffold `.env.example`. Clean `web-firms/` structure. | **`.env.example` is 116 bytes, 2 keys.** `.env` has ~30 keys. No refresh. | NOT STARTED | `ls .env.example` → only `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST`. |
| 0.4 | Status/stage separation. Canonical 13-value enum on `status`. | **Constraint IS LIVE** with exact 13 values per spec. Code in sonata-stack (Projects copy) writes canonical values. **Two violations remain in flynerd-agency:** `app/api/agents/expire/route.ts:58` writes `"EXPIRED"` and `app/api/agents/growth/route.ts:20,22` reads/writes `"ACTIVE"`. Both will throw on CHECK constraint next time they fire. | SHIPPED WITH GAPS | Supabase MCP `SELECT conname, pg_get_constraintdef` returns canonical 13. `changelog-sonata.md → 2026-04-08 Phase 0.2b/0.2c`. Code grep: `Grep status:\s*["']` over `app/api/agents/`. |
| 1.1 | Purge localhost from production flow. | Not audited in this pass (Grep not run for `localhost:3000`). | NOT VERIFIED | — |
| 1.2 | Un-stub AC orchestration. End-to-end pipeline pings AC via `ac-sync-logic.ts`. Contact lands in AC Deals with correct tag. | **Working in production.** AC automation `489 B2B Cold Outreach - Underserved Local` shows 17 entered / 12 exited. `FLYNERD_OUTREACH_PENDING` tag has 13 subscribers (`updated_timestamp: 2026-04-15 14:12:46`). | SHIPPED | AC MCP `list_automations` id 489, `list_tags` id 842. |
| 2.1 | Scrub legacy app references. Correct global support email. | Completed 2026-04-27 in this audit cleanup commit. Remaining public architecture now points at `flynerd-agency` for the storefront/admin surface and `sonata-stack` for agent orchestration. | COMPLETED | See this migration cleanup commit. |
| 2.2 | Kris Jenner webhook wired. | **STUB.** `sonata-stack/src/webhook.ts:47` literally says `// TODO: invoke kris_jenner with payload`. Webhook returns 200 but never calls the MCP tool. `src/agents/kris.ts:22-30` mocks both Yoncé and Dre invocations. | NOT STARTED | `sonata-stack/src/webhook.ts:47`, `src/agents/kris.ts:22,24,30`. |
| Pipeline 5 (added) | 10 stages, all map to `CLIENT_ACTIVE` except Churned → `CLOSED_LOST`. | **Live in AC.** Pipeline `5` exists with stages 25-34 matching spec exactly. RAID Security has 2 deals in it ($299 + $750). | SHIPPED | AC MCP `list_deal_pipelines` group 5. `changelog-sonata.md → 2026-04-08 — Pipeline 5 Built + RAID Onboarded`. |
| AC Tag Sync workflow (added) | n8n workflow `d42cyp27QDIqZczu` maps 8 AC tags to Supabase status. | Workflow was created INACTIVE 2026-04-08, then 2026-04-13 changelog describes manual editor fixes (Switch split, payload extraction). **Activation status today: not directly verifiable — no n8n MCP in this session.** | PARTIAL / NOT VERIFIED | `changelog-sonata.md → 2026-04-08` (created INACTIVE), `2026-04-13` (editor fixes applied). |
| Medspa track (added) | Profile 2 demo template rendering ELLEMES-caliber layout for medspa leads. | **SHIPPED today.** 11 new components + 2 modifications + 2 docs. `npm run build` green. Profile 1 unchanged. | SHIPPED | `changelog-sonata.md → 2026-04-16`. `ls components/demo/Medspa*.tsx`. |
| Profile 2 agent plumbing | Simon profile-aware filter; Yoncé profile-aware intel; Hov P2 copy. | Hov P2 copy lives in AC automation `500 Cold Outreach — Tech-Enabled Premium` (ACTIVE, 0 entered). Simon/Yoncé not branched. | PARTIAL | AC MCP `list_automations` id 500, cdate 2026-04-15. Memory note `project_qualification_profiles.md`. No code-level changes to Simon/Yoncé filter logic. |

---

## 2. The 10 Blocking Decisions — current status

| # | Question | Status | Evidence |
|---|---|---|---|
| 1 | When separating `status` and `stage`, what is the precise mapped stage for `Hov` outbounding? | **ANSWERED partially.** `status = OUTREACH_SENT` on Hov write (`app/api/agents/outreach/route.ts:22,97`). AC deal moves to stage 11 (`1. Outreach Pitched`) via the `create-ac-pipeline` flow. `stage` column in Supabase remains null for all 12 leads. | Code: `outreach/route.ts:22`. Data: Supabase `GROUP BY stage` → all null. |
| 2 | Kris Jenner webhook payload schema? | **ANSWERED (shape), NOT WIRED (logic).** Schema is `{ contactId, dealId, websiteUrl }` per `sonata-stack/src/webhook.ts:6-10`. But `webhook.ts:47` is still `TODO: invoke kris_jenner with payload`. | `sonata-stack/src/webhook.ts:6-10,47`. |
| 3 | Legal string for Footers / TOS (`flynerd-agency` vs LLC name)? | **PARTIALLY ANSWERED.** Legacy domain references were cleaned up during audit cleanup. The remaining question is the formal LLC/legal entity string for footer, Terms, and Privacy copy. | Confirm legal entity name before final footer/TOS pass. |
| 4 | Does the audit need payment upfront before conversion in AC? | **ANSWERED.** Yes — AC automation `495 Stripe Payment Received - Welcome & Onboarding` (ACTIVE, 1 entered / 1 exited) fires on the Stripe integration tag and moves the deal to Closed Won. | AC MCP automation id 495. |
| 5 | Web-Firms Signup — Outseta or custom? | 🔴 **UNANSWERED.** Outside flynerd-agency scope; no entry in this changelog stream. | No evidence. |
| 6 | Billing: Outseta vs Stripe? | 🔴 **UNANSWERED.** Outside flynerd-agency scope. | No evidence. |
| 7 | Demo CTA — Calendly or Agent? | **ANSWERED.** Profile 1: `calendar.app.google/LJAyZTGZShyjP8QB6` hardcoded in `components/demo/DemoExperience.tsx:60`. Profile 2: `CAL_COM_KICKOFF_LINK` env var, `STRIPE_PROFILE2_DEPOSIT_LINK` env var. Both treat booking as post-commitment only. | `DemoExperience.tsx:60`, `MedspaCTA.tsx`, `changelog-sonata.md → 2026-04-16`. |
| 8 | AgencyLead → Client transition on CLOSED_WON? | 🔴 **UNANSWERED.** `src/agents/tiny.ts` acknowledges in comments that real code should query `Client` table but uses `mockClients` array instead. No route in either repo converts AgencyLead to Client row on win. | `sonata-stack/src/agents/tiny.ts:35-40`. |
| 9 | Correct global support email? | **ANSWERED FOR CODE.** Production files now use `hello@flynerd.tech` for public inquiries and `info@flynerd.tech` for transactional sender addresses. | Verify `hello@flynerd.tech` exists as a mailbox or alias in Google Workspace. |
| 10 | Onboarding — Yelp URL → Builder Agent flow? | 🔴 **UNANSWERED.** Execution strategy called this out 2026-04-08; no entry in changelog since describes wiring. `app/onboarding/` page still exists — behavior not audited in this pass but no code-level change describes replacing the `await new Promise()` stub. | No changelog entry matches. |

**Score: 5 of 10 answered. 5 red.** The five red decisions are: (3) legal/support email, (5) web-firms signup, (6) billing truth, (8) AgencyLead→Client transition, (10) onboarding flow.

---

## 3. Drift Report

### Shipped that was not in the plan

- **Kendrick agent + SEO puppeteer system** — `sonata-stack/src/agents/kendrick.ts` (97 lines) + `runKendrickAudit` registered as the 9th MCP tool. `CLAUDE.md` describes it as STUB but it contains full puppeteer + Anthropic code. Not mentioned in 2026-04-08 execution strategy. Introduced silently around the 2026-04-09 timeframe (imported from `kendrick.js` in `src/index.ts:13`).
- **Homepage brutalist redesign (2026-04-10)** — Full design-system rewrite (`app/globals.css`, `app/page.tsx`, `components/layout/*`, new `HomeChatWidget.tsx`, new color system). Not in execution strategy. (`changelog-sonata.md → 2026-04-10 — Homepage Redesign`).
- **E2E test suite (2026-04-13)** — 6-criterion live test with Gmail API verification. Not in execution strategy. (`changelog-sonata.md → 2026-04-13 — E2E Test Suite`).
- **`qualification_profile_check` DB constraint** — Added to Supabase (`'underserved_local'` | `'tech_enabled_premium'`). Not in the 2026-04-08 specs; added in the 2026-04-14 profile architecture described in `project_qualification_profiles.md` memory. Not yet reflected in `prisma/schema.prisma`.
- **Profile 2 medspa demo template (2026-04-16, today)** — 11 new components. Not in original execution strategy; new vertical added 2026-04-14.

### In the plan but quietly dropped or replaced

- **2026-04-10 niche-routing demo templates** — The changelog claims creation of `components/demo/MedSpaTemplate.tsx`, `HomeServicesTemplate.tsx`, `GeneralTemplate.tsx`, `PhoneChatWidget.tsx`. **3 of those 4 files are absent from the repo today.** Only `components/home/PhoneChatWidget.tsx` exists (different folder). The dispatch-by-niche pattern was silently replaced by today's Profile 2 orchestrator. The intent of "3 distinct templates" is only partially preserved: medspa is now Profile 2; HVAC and general collapse into a single `DemoExperience` (Profile 1).
- **`status FSM` in repo CLAUDE.md** — Still reads `PROSPECT→AUDITED→BUILT→OUTREACH_SENT→ACTIVE→EXPIRED`. Uses pre-refactor names (`BUILT`, `ACTIVE`, `EXPIRED`) that are forbidden on the live CHECK constraint. This is a doc-drift time bomb.
- **sonata-stack `CLAUDE.md` agent status table** — Claims Hov, Tyrion, Cersei, Tiny Harris, Kris Jenner, Kendrick are STUB. Actually: Hov is PARTIAL, Tyrion is IMPLEMENTED (skeleton runs), Cersei is PARTIAL-BROKEN, Tiny is STUB, Kris is STUB, Kendrick is IMPLEMENTED. Table is stale.
- **`AgencyLead-Schema.md`** — Doc explicitly flagged as known-stale in repo `CLAUDE.md` footer ("⚠️ Known doc drift: AgencyLead-Schema.md still lists pre-refactor status values"). Nobody's fixed it.

### Scope changes mid-build

- **Profile 2 (`tech_enabled_premium`)** was added 2026-04-14. The 2026-04-08 execution strategy never mentions profiles. This was an addition, not a pivot, but it reshapes the demo template track significantly.
- **Hov contract** got a full "Read Before Touching" subsection in `flynerd-agency/CLAUDE.md`. Content of that subsection is not in-scope of this audit but its presence signals there was an incident where Hov (agent) was confused with Hov (something else). Worth mentioning in any future Hov refactor.

### Cross-repo Vault vs Projects drift

- `C:/Users/Mother/Vault/command-center/sonata-stack/src/` is an **older snapshot** (has pre-0.2c literals: `BUILT` at `index.ts:346`, `NEGOTIATING` at `index.ts:400`, `BUILT` at `lib/db.ts:59`). The canonical working copy lives at `C:/Users/Mother/Projects/flynerd/flynerd.code-workspace/sonata-stack/`. Future audits should read the Projects path only.

### Agent code violations of canonical status

| File:line | Writes | Canonical | Will constraint reject? |
|---|---|---|---|
| `flynerd-agency/app/api/agents/expire/route.ts:58` | `"EXPIRED"` | `DEMO_EXPIRED` | Yes |
| `flynerd-agency/app/api/agents/growth/route.ts:20,22` | `"ACTIVE"` (read + where filter) | `CLIENT_ACTIVE` | Yes (on any WRITE); reads return 0 rows (no lead ever has status=ACTIVE) |
| `sonata-stack/src/index.ts` (Projects copy) `updateLeadStatus(lead.id, "EXPIRED")` at the cersei tool body L274 | `"EXPIRED"` | `DEMO_EXPIRED` | Yes |

Reality check: DB has zero leads with status `ACTIVE` or `EXPIRED`, meaning these paths either (a) never fire in production, or (b) fail silently at the CHECK constraint and leave the row in its prior status. Either way they are non-functional today.

---

## 4. Critical Path — what unblocks revenue RIGHT NOW

The bar: one paid lead flows from Simon → Yoncé → Dre → Hov → paid audit → Kris Jenner (post-call) → Client table → Tiny Harris (monthly nurture).

What already works (end-to-end for the first 4 stages):
- **Simon → Yoncé → Dre → AC tag**: verified. `changelog-sonata.md → 2026-04-09 Bug 1+2 Fix` reports `scoutedRaw=20, qualifiedAndSaved=2`. AC has 17 deals in AC `489 B2B Cold Outreach`. 4 leads sitting at `OUTREACH_SENT` in Supabase.
- **Deal attribution and tag fires**: `FLYNERD_OUTREACH_PENDING` tag has 13 subscribers, last updated 2026-04-15. AC deals moving through pipeline 3 stages.

Everything after the audit purchase is still broken or stubbed. Dependency-ordered list to close the loop:

| # | Work | Est. hours | Risk | Blocking decision | Why it's on the critical path |
|---|---|---|---|---|---|
| 1 | Fix `expire/route.ts:58` (EXPIRED → DEMO_EXPIRED) and sonata-stack Cersei tool body (EXPIRED → DEMO_EXPIRED). Add fallback to Prisma type union. | 0.5 | Low | None | Without this, every demo that reaches day 7 silently fails to expire. Breaks scarcity. |
| 2 | Fix `growth/route.ts:20,22` (ACTIVE → CLIENT_ACTIVE) and confirm Prisma types. | 0.5 | Low | Depends on #1 schema comprehension | Tiny Harris cannot even filter clients today. |
| 3 | Wire Kris Jenner webhook: replace `// TODO: invoke kris_jenner with payload` in `sonata-stack/src/webhook.ts:47` with an actual tool call to the registered `kris_jenner` MCP tool, OR direct invocation of `runKrisJennerClose`. | 1.5 | Medium | #2 from the 10 (payload schema — already answered) | Today, when a prospect books a call, nothing happens automatically. No demo rebuild, no close email. |
| 4 | De-stub `src/agents/kris.ts`: replace the `mockIntel` (line 24) and "Mock launching Yoncé / Dre" comments with real calls to `execYonce` and `execDre`. | 2 | Medium | None | Even if #3 wires the webhook, Kris still mocks. This makes Kris actually build the post-call asset. |
| 5 | Implement AgencyLead → Client table transition on CLOSED_WON (new route or AC webhook). Answer decision #8. | 3 | High | Decision #8 | Without this, the `Client` table stays empty forever. Tiny Harris can't operate on real data. |
| 6 | De-stub `src/agents/tiny.ts`: replace `mockClients` with real Supabase query against the `Client` table (once #5 populates it). | 2 | Medium | #5 | Monthly retainer reports don't fire today. |
| 7 | Add Profile 2 ENV wiring and 1-deposit smoke test: create Stripe product for $500 Profile 2 deposit, set `STRIPE_PROFILE2_DEPOSIT_LINK`, set `CAL_COM_KICKOFF_LINK`. Validate the Profile 2 demo CTA clicks through. | 1 | Low | None | The Profile 2 demo ships today; revenue can't collect until these links exist. |
| 8 | Reconcile `flynerd-agency/CLAUDE.md` status FSM line + `AgencyLead-Schema.md` with the live CHECK constraint. (Both docs still show pre-refactor names.) | 0.5 | Low | None | Next agent session WILL write a pre-refactor status value and fail if docs aren't fixed. |

**Total to one verifiable end-to-end paid lead cycle: 11 hours of focused work, sequenced above.** Eight items. Five are low-risk. Nothing before item 3 touches production data models.

**Hov is actually fine for "one paid lead."** Hov today generates email copy via Anthropic + writes `REPLIED` status. It does not move the AC deal stage and doesn't use the tag-trigger flow the Hov Contract demands — but that shortcoming only bites when Hov replies to inbound replies from cold prospects, which is later in the sales motion. The first paid lead comes from the cold-outreach → demo → Stripe path, which is already working.

---

## 5. Defer List (things NOT to build until §4 is done)

These are tempting, expensive, and every hour spent on them is an hour not spent closing the revenue loop.

- 🔴 **Simon Profile 2 filter branching.** Today's research shows premium medspa runs on Boulevard/Zenoti/Vagaro/Aesthetic Record; Simon needs platform detection logic. **But zero leads are currently `tech_enabled_premium`.** Deferring Simon P2 costs nothing. Building it before the post-payment loop closes means a medspa lead can become a prospect but can't become a paid client.
- 🔴 **Yoncé Profile 2 intel framing (heroHook, treatments[], bookingPlatform).** Same reason. Profile 2 demo template ships today with graceful fallbacks. Intel enrichment is a polish item, not a revenue item.
- 🔴 **New demo templates (dental, chiropractic, fitness).** Profile 2 medspa just shipped. Don't build the next three niches while Kris Jenner is still `// TODO`. The demo that sells nothing is worth less than the close flow that converts.
- 🔴 **Premium pricing page rework, tier rename, new $5,500 Profile 2 audit SKU in Stripe.** Stripe `STRIPE_PROFILE2_DEPOSIT_LINK` is the only Profile 2 payment surface needed to collect money today. A full pricing-page redesign is not. (The 2026-04-13 changelog open item `$197/month Quickstart pricing exists in closer KB but not on pricing page — reconcile` is also a reconcile item, not a revenue item.)
- 🔴 **MedSpaTemplate / HomeServicesTemplate / GeneralTemplate archaeology.** The 2026-04-10 three-template dispatch is gone. Don't resurrect it. Profile 1 consolidation into a single `DemoExperience` is fine for the underserved_local vertical. Verify after critical path closes.
- **Domain migration cleanup.** Public code/content now uses `flynerd.tech`; the remaining Cal.com username is intentionally preserved because the booking flow depends on it.
- 🔴 **Hov tag-trigger refactor to match the Hov Contract.** Today's `updateLeadStatus(leadId, "REPLIED")` + direct Anthropic call ships working email. The architecturally-pure version can wait until after item 6 on the critical path.
- 🔴 **Kendrick SEO orchestrator productization.** The code exists and runs. Don't productize SEO as a line-item offering until you have one paid Profile 1 client using it. Revenue > features.
- 🔴 **Next.js middleware refactor in nested-objects.** Different repo, different track. Not on the FlyNerd revenue path.
- 🔴 **Stage column writes / `agency_lead_stage_check` constraint.** All 12 leads have `stage: null`. Nothing reads stage. Adding the CHECK constraint and enforcing Pipeline 5 stage mapping adds complexity without closing the revenue loop.

**The bright-line rule:** If a task does not move money from a prospect into your bank account, or does not prevent the FIRST paid lead from flowing end-to-end, it goes on the Defer list. Every shiny-new-feature hour drains the finite hours that actually ship revenue.

**Brutal truth for the owner:** You are about to build premium medspa marketing polish while Kris Jenner is literally `// TODO: invoke kris_jenner with payload`. That is building the storefront while the cash register has no drawer. Close the drawer first.

---

## 6. Next 5 Actions (concrete, ordered, < 4h each)

### Action 1: Un-poison `status` writes in flynerd-agency
- **Files:**
  - `app/api/agents/expire/route.ts:58` → change `status: "EXPIRED"` to `status: "DEMO_EXPIRED"`
  - `app/api/agents/growth/route.ts:20` → change `singleLead.status === "ACTIVE"` to `=== "CLIENT_ACTIVE"`
  - `app/api/agents/growth/route.ts:22` → change `where: { status: "ACTIVE" }` to `where: { status: "CLIENT_ACTIVE" }`
  - `sonata-stack/src/index.ts` Cersei tool body → change `updateLeadStatus(lead.id, "EXPIRED")` to `updateLeadStatus(lead.id, "DEMO_EXPIRED")`
- **Acceptance criteria:** Grep returns zero matches for `status:\s*["'](EXPIRED|ACTIVE|BUILT|PITCHED|NEGOTIATING|ONBOARDING)["']` across both repos. Fire expire route against a test demo lead whose `validUntil < now`. Supabase shows `status = DEMO_EXPIRED`. No CHECK constraint error in logs.
- **Test lead alias:** `autumn.s.williams+expire_fix@gmail.com`
- **Rollback:** `git revert` the status-constant changes. Leads stay in `DEMO_BUILT` until next cron.
- **Estimated hours:** 0.5
- **Risk:** Low

### Action 2: Reconcile `flynerd-agency/CLAUDE.md` + `AgencyLead-Schema.md` to canonical 13
- **Files:**
  - `flynerd-agency/CLAUDE.md` line that reads `status FSM: PROSPECT→AUDITED→BUILT→OUTREACH_SENT→ACTIVE→EXPIRED` — replace with canonical 13-value enum.
  - `sonata-stack/docs/architecture/AgencyLead-Schema.md` — update the status section.
- **Acceptance criteria:** Both docs enumerate exactly: `PROSPECT, DISCOVERED, AUDITED, DEMO_BUILT, OUTREACH_SENT, REPLIED, CALL_BOOKED, CLOSED_WON, CLOSED_LOST, OUTREACH_EXHAUSTED, DEMO_EXPIRED, INBOUND_NEW, CLIENT_ACTIVE`. Agent status table in sonata-stack `CLAUDE.md` updated to reflect actual state (Hov=PARTIAL, Tyrion=IMPLEMENTED, Cersei=FIXED (post-Action-1), Kendrick=IMPLEMENTED, Kris=STUB, Tiny=STUB).
- **Rollback:** `git revert`. Docs stay stale.
- **Estimated hours:** 0.75
- **Risk:** Low

### Action 3: Wire Kris Jenner webhook to the actual agent
- **File:** `sonata-stack/src/webhook.ts:47`
- **Change:** Replace `// TODO: invoke kris_jenner with payload` with either (a) a direct import and call to `runKrisJennerClose({ contactId, dealId, websiteUrl })` from `src/agents/kris.ts`, or (b) an internal HTTP call to the `/mcp` endpoint with a `kris_jenner` tools/call payload. Preference: (a), since webhook runs in-process.
- **Acceptance criteria:** POST to `/webhook/post-call` with valid payload and `X-Webhook-Secret` returns 200 AND triggers a `[Kris Jenner]` log line AND the AC deal referenced moves to a stage defined in Pipeline 4 (`Demo Completed` id 17 or later).
- **Test lead alias:** `autumn.s.williams+webhook@gmail.com`
- **Rollback:** Revert webhook.ts to the TODO comment; incoming webhooks return 200 with no downstream effect (current state).
- **Estimated hours:** 1.5
- **Risk:** Medium (touches live agent invocation path)

### Action 4: De-stub `src/agents/kris.ts` — real Yoncé + Dre
- **File:** `sonata-stack/src/agents/kris.ts:22-33`
- **Change:** Replace `mockIntel` object literal with `const intel = await execYonce(...)` from `pipeline.ts`. Replace the mock Dre section with `const dre = await execDre(...)`. Keep the Claude `getAnthropic()` closing-email flow; inject real `intel.opportunityScore`, real demo URL from `dre.demoSiteUrl`, real Stripe close link. Remove the `mockIntel` identifier entirely.
- **Acceptance criteria:** `runKrisJennerClose({ contactId, dealId, websiteUrl })` returns an object where `demoUrl` starts with `https://flynerd-demo-` (real Vercel URL) AND `intelScore` is derived from Yoncé's actual output (not the hardcoded `85`).
- **Test lead alias:** `autumn.s.williams+kris_real@gmail.com`
- **Rollback:** Revert kris.ts. Webhook still logs payload but uses mocked values (current post-Action-3 state).
- **Estimated hours:** 2.0
- **Risk:** Medium (integrates real APIs)

### Action 5: Design + wire AgencyLead → Client table transition on CLOSED_WON
- **Files:**
  - New: `flynerd-agency/app/api/webhooks/ac-closed-won/route.ts` (or extend `ac-upsell/route.ts`).
  - Update: `sonata-stack/docs/architecture/Client-Schema.md` with the trigger source.
- **Change:** On Stripe-payment-received OR AC automation 495 firing, upsert into `Client` table with `originLeadId = AgencyLead.id`, `status = 'ONBOARDING'`, copy business fields over. Flip `AgencyLead.status` to `CLIENT_ACTIVE`.
- **Acceptance criteria:** Manually trigger the Stripe webhook against `autumn.s.williams+won@gmail.com`. Supabase shows: (a) `AgencyLead.status = CLIENT_ACTIVE`, (b) one new `Client` row with `originLeadId` matching, (c) `updatedAt` populated. AC contact has `stripe-integration-Customer` tag per existing automation 495.
- **Test lead alias:** `autumn.s.williams+won@gmail.com`
- **Rollback:** Drop the new route; AC 495 automation continues to fire but nothing populates `Client` table (current state).
- **Estimated hours:** 3.5
- **Risk:** High (touches schema, AC webhook, and the Stripe path all at once)

**Sequence discipline:** do 1 → 2 → 3 → 4 → 5 in order. Do not parallelize — each action's test data depends on the prior action's fix. Actions 1 and 2 can be same-commit if preferred (both are doc/data hygiene). Actions 3, 4, 5 must each commit and verify in isolation.

---

## Appendix A: Evidence ledger

**Supabase MCP queries (project_id `juzyzjcfayuegbbgtxsy`):**
- `SELECT status, COUNT(*) FROM "AgencyLead" GROUP BY status` → `DISCOVERED=5, OUTREACH_SENT=4, DEMO_BUILT=2, REPLIED=1`.
- `SELECT stage, COUNT(*) FROM "AgencyLead" GROUP BY stage` → `null=12`.
- `SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE conrelid = '"AgencyLead"'::regclass AND contype = 'c'` → `agency_lead_status_check` with 13 canonical values; `qualification_profile_check` with `underserved_local | tech_enabled_premium`.
- `SELECT "qualificationProfile", "offerTier", COUNT(*) FROM "AgencyLead" GROUP BY ...` → `underserved_local / null / 12`. Zero `tech_enabled_premium`.

**ActiveCampaign MCP:**
- Pipelines: 3 (Outbound/Cold, 35 deals), 4 (Inbound/Warm, 1 deal), 5 (Client/Post-Sale, 2 deals).
- Pipeline 5 stages 25-34 exactly match `2026-04-08-pipeline-5-spec.md`.
- FLYNERD tags: `FLYNERD_OUTREACH_PENDING` (13 subs, updated 2026-04-15), `FLYNERD_MONTHLY_REPORT_TRIGGER` (1 sub), `FLYNERD-FORM-PENDING` (3 subs).
- Automations: `489 B2B Cold Outreach - Underserved Local` (ACTIVE, 17 entered / 12 exited), `500 Cold Outreach — Tech-Enabled Premium` (ACTIVE, 0 entered), `495 Stripe Payment Received` (ACTIVE, 1 entered / 1 exited), `498 Warm Lead Follow-up Sequence` (ACTIVE, 4 entered / 4 exited).

**Vercel MCP (team `team_uSLsRZHA5u8JAkI9tVVipAFi`):**
- `flynerd_agency`, `flynerd-demo-lead`, `nested-objects-public`, `nested-objects-starter`, `nested-objects-firms`, `raidsecuritycorp`, `fn-real-estate` (DEPRECATED but still present).

**n8n:** NOT DIRECTLY VERIFIED — no n8n MCP available in this session. Last known state per changelog: workflow `d42cyp27QDIqZczu` was created 2026-04-08 INACTIVE, edited 2026-04-13 (manual fixes to Switch routing + payload extraction). Owner must manually confirm activation status.

**Canonical code paths (Projects working copy, not Vault snapshot):**
- `C:/Users/Mother/Projects/flynerd/flynerd.code-workspace/flynerd-agency/`
- `C:/Users/Mother/Projects/flynerd/flynerd.code-workspace/sonata-stack/`

**Profile 2 demo components (11 files, shipped 2026-04-16):**
`medspaDefaults.ts`, `MedspaChatWidget.tsx`, `MedspaHero.tsx`, `MedspaServices.tsx`, `MedspaAIEmployee.tsx`, `MedspaCredibility.tsx`, `MedspaResults.tsx`, `MedspaAboutBuild.tsx`, `MedspaCTA.tsx`, `FlyNerdChatBubble.tsx`, `MedspaExperience.tsx`.
