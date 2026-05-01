
### 2026-04-21 — Kris writes paymentLink to AC field 173 + post-call email spec

**Repo:** sonata-stack

**Files changed:**
- `src/agents/kris.ts` — added `CONTACT_FIELD_OFFER_SLUG = "173"`. After creating the Stripe Checkout Session, Kris now writes `paymentLink` to AC contact field 173 via `updateContactField()`, in parallel with the existing close_demo_url writeback to field 171. Both writes are independently try/caught and their failures surface as separate warning codes (`ac_writeback_close_demo_url_failed` / `ac_writeback_offer_slug_failed`). If Stripe session creation fails (`paymentLink === ""`), the field 173 write is skipped and a `ac_writeback_offer_slug_skipped_no_stripe` warning is emitted.
- `docs/specs/2026-04-21-ac-post-call-close-email.md` — NEW. Full AC post-call close email template spec: subject line, preheader, plain-text + block-structured HTML body, AC personalization-tag reference table, required prerequisites, known race condition between webhook + automation with a 60s-wait mitigation, and a two-phase smoke-test runbook against `info@nestedobjects.com`.

**Decisions made:**
- Parallelized both AC writebacks in a `Promise.all` of inline async IIFEs instead of sequential awaits. Cuts total AC round-trip time roughly in half (AC adds ~150ms each) which matters because the automation's 60s-wait needs to cover Kris's whole run.
- Skipped field 173 write when Stripe failed rather than writing empty string. Writing empty would break the email button explicitly; leaving the field at its prior value (usually empty on first run) degrades the same way but doesn't actively corrupt a populated value from a prior run.
- Email template structured as AC editor blocks rather than one big HTML blob so Autumn can rebuild in AC's UI without fighting raw HTML.

**Verification:**
- `npm run build` passed (tsc clean).
- `grep dist/agents/kris.js` shows 4 references to the new symbols (imports + write call + log lines).

**Notes / pending:**
- Smoke test per the spec runbook is the next concrete step. Phase 1 validates email template rendering with manually-populated fields. Phase 2 validates the full Kris webhook path end-to-end.
- The 60-second wait in the AC automation MUST be configured before activating against real prospects, or the email will race Kris and render with empty buttons.
- Landing-v2 FinalCTA rewrite (flynerd-agency side) is the sibling commit — new copy: "Ready when you are." + "$750 deposit" primary CTA + trust strip. Same turn, different repo.

---

### 2026-04-22 — SitePreview section + saas/digital niche routing
**Repo:** flynerd-agency
**Files changed:**
- `components/demo/SitePreview.tsx` — new: browser-chrome-wrapped simulated client site (header, hero, 3-col services, testimonial, sticky CTA); appears below pricing in DemoExperience
- `components/demo/nicheConfig.ts` — added getNicheColors() returning niche-aware palette; added saas/digital to MEDSPA_KEYWORDS so those leads route to Profile 2
- `components/demo/DemoExperience.tsx` — added rawServices? prop; imports and renders SitePreview after pricing
- `app/demo/[leadId]/page.tsx` — extracts intelData.services as rawServices; passes to DemoExperience
**Decisions made:**
- SitePreview uses getNicheColors() not lead brand colors (warm leads haven't been scouted, brand colors would be default placeholder values)
- rawServices optional so existing cold-lead demos require zero prop changes

---

- ab768dabc8ba10ff0f6a2d68f7dac933a6489482 chore: finish legacy domain migration and remove dead links (audit cleanup)
- b22c3115be0aa0896b057c3b98431250a9a46cfb chore: remove tmp-builder-syres.json and add PII gitignore patterns (audit cleanup)
- ebd2f6f96aac604c1bff3401033b75020b947c4c chore(config): read Vercel target project and base URL from env vars (audit cleanup)
- 1c6c671e099157f491a147ea9cbec660a50b9895 fix(api): normalize /api/kb category to canonical lowercase snake_case
- ca71ade2a0a00a0c244f3c9ae91542871ef9634f fix(status): patch forbidden status literals and add contract test (Audit Fix 1)

---

### 2026-05-01 - DELETED: n8n workspace junk files + workflow reorg
**Repo:** flynerd-agency

**Files deleted:**
- public/n8n-niche-workflows/err.txt - error log artifact, no replacement
- public/n8n-niche-workflows/test.js - empty test file, no replacement

**Files moved (history preserved via git mv):**
- Deployed chat workflows moved to workflows/n8n/chat/ with `.deployed.json` suffixes
- Niche workflows moved to workflows/n8n/niche/ with `.draft.json` suffixes
- Estimate subworkflows moved to workflows/n8n/estimate/ with `.draft.json` suffixes
- Duplicate and legacy HVAC chat agents, one-shot SQL setup files, and generator script moved to workflows/n8n/archive/
- n8n reference docs moved to workflows/n8n/docs/

**New file:** workflows/n8n/manifest.yaml - workflow registry

**Reason:** Q6 audit decision - n8n workflows organized by domain at top level, lifecycle as filename suffix. Also removes n8n workflow JSON files from public/ where they were inadvertently web-accessible.

**Owner review needed:** Two duplicate "hvac chat agent" files moved to archive/. Diff and pick the canonical copy.
