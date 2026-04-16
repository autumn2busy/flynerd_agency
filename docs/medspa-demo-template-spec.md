---
project: flynerd-agency
type: spec
created: 2026-04-16
tags: [medspa, demo-template, profile-2, tech-enabled-premium]
status: awaiting-approval
---

# Medspa Demo Template — Build Spec

Companion to [medspa-site-research.md](./medspa-site-research.md). Read that first. This spec operationalizes the findings into a buildable template for Profile 2 (`tech_enabled_premium`) medspa prospects.

## 1. Scope and Routing

### What we're building
A Profile 2 medspa demo template that renders at the existing `/demo/[leadId]` route when the lead meets ANY of the following:
- `lead.qualificationProfile === 'tech_enabled_premium'`
- `lead.niche` matches one of: `medspa`, `med-spa`, `medical-spa`, `dental`, `chiropractic`, `fitness-studio`

For any other lead, the existing Profile 1 template renders unchanged.

### Why this routing approach
No new route needed. `leadId` is already the primary key. Branching inside `page.tsx` keeps the demo URL stable if a lead is reclassified between profiles, and avoids a schema migration.

### Files this build will touch

| File | Action |
|---|---|
| `app/demo/[leadId]/page.tsx` | Add branching logic. Route Profile 2 to new component. |
| `components/demo/MedspaExperience.tsx` | NEW. Top-level Profile 2 template. |
| `components/demo/MedspaHero.tsx` | NEW. Hero section. |
| `components/demo/MedspaServices.tsx` | NEW. 6-card services grid. |
| `components/demo/MedspaAIEmployee.tsx` | NEW. Centerpiece AI booking agent block. |
| `components/demo/MedspaCredibility.tsx` | NEW. Platform-aware trust block. |
| `components/demo/MedspaResults.tsx` | NEW. Reviews / before-after / social proof. |
| `components/demo/MedspaAboutBuild.tsx` | NEW. "What we built for you" tiles. |
| `components/demo/MedspaCTA.tsx` | NEW. Bottom commitment CTAs. |
| `components/demo/FlyNerdChatBubble.tsx` | NEW. Floating FlyNerd-brand chat bubble (bottom-right). |
| `components/demo/medspaDefaults.ts` | NEW. Default treatments, hooks, platform copy bank. |
| `components/demo/DemoChatWidget.tsx` | LIGHT EXTEND. Accept `mode: 'medspa-native' \| 'flynerd-floating'` prop. |
| `app/demo/[leadId]/layout.tsx` | ADD Google Fonts (Playfair Display + Montserrat) via `next/font`. |

### Files this build will NOT touch
- `app/api/agents/*` — no agent changes (per user rule today)
- `prisma/schema.prisma` — no schema migration; new data goes in `intelData` JSON
- `lib/prompts.ts` — no prompt version bumps today
- Profile 1 demo components

## 2. Design Direction

Luxurious-clinical with editorial polish. Primary reference: ELLEMES Medical Spa. The site must pass a "looks like a real medspa site" test when a Profile 2 prospect's son or assistant sees it. No agency-sales vibe in the main scroll; FlyNerd branding is footer-only plus the floating chat bubble.

## 3. Color System

Light theme. Dark is wrong for this vertical — 10 of 10 researched sites were light-background-dominant.

### Base layer (fixed)
- Background: `#FAF9F6` (warm cream)
- Surface: `#FFFFFF`
- Text primary: `#1A1A1A`
- Text secondary: `#555555`
- Divider: `#E8E5DF`

### Accent layer (dynamic from Yonce brandPalette, with medspa-safe fallback)
- Primary: `lead.intelData.brandColors.primary` OR fallback `#8EACAC` (sage, ELLEMES-style)
- Accent: `lead.intelData.brandColors.accent` OR fallback `#1A1A1A`

### Guardrail
If Yonce returns a bright primary (red/orange/hot pink) that breaks medspa palette conventions, clamp to the sage fallback. Check: if `getLuminance(primary)` is too bright or saturation is above 70%, fall back. Implement with a small helper in `medspaDefaults.ts`.

## 4. Typography

### Defaults (ship with the template)
- Display: **Playfair Display** (700) — headers, pricing numbers
- Body: **Montserrat** (400/500/600) — everything else
- Both via `next/font/google` in the demo layout, preloaded, display: swap

### Why
This pairing appeared on the single best-scoring reference site (ELLEMES) and is the most common premium-medspa lockup. Google Fonts availability means no licensing concerns.

## 5. Page Structure

All sections use a max-width of 1200px centered container with responsive padding. Section spacing is `py-20 md:py-28` on desktop, `py-14` on mobile.

### Section A: Hero
- **Layout:** Split 60/40 desktop, stacked on mobile. Left column: copy + CTAs. Right column: hero image.
- **Primary copy:** `lead.intelData.heroHook` (from Yonce, fallback supplied). If hook is missing, assemble: `"Welcome to {businessName}."` as eyebrow + default copy library hook (see §13).
- **Subhead:** One-liner positioning the AI booking employee as already-deployed for this business. Example: `"Meet the AI receptionist we built for {businessName} — ready to book consultations around the clock."`
- **Primary CTA:** `"Try the AI Booking Assistant"` (anchor-scrolls to Section C).
- **Secondary CTA:** `"Explore Treatments ↓"` (anchor-scrolls to Section B).
- **Video:** If `lead.walkthroughVideoUrl` exists, embed as a small bottom-left floating video card (ELLEMES cinematic-zoom pattern, scaled down). If absent, hidden.
- **Background:** Hero image (see §7, Decision 2).

### Section B: Services Grid (6 cards)
- **Source:** `lead.intelData.treatments[]` if present. Fallback to default medspa treatment set in `medspaDefaults.ts` (Botox, Dermal Fillers, HydraFacial, Laser Hair Removal, Microneedling, Medical Weight Loss).
- **Card shape:** Image (stock or placeholder), treatment name, one-line description, "Ask about this" button.
- **Interaction:** Each "Ask about this" click opens the AI Booking Employee panel pre-loaded with a prompt like `"Tell me about {treatmentName} pricing and availability"`. PostHog event fires.

### Section C: AI Booking Employee (THE CENTERPIECE)
- **Heading:** `"Your 24/7 booking employee"` (h2, Playfair 700)
- **Subhead:** `"Ask anything a new patient would. This is the same AI we'd install into your site."`
- **Chat widget:** Embedded `DemoChatWidget` in `mode="medspa-native"`. Styled to match the lead's palette. Live conversation, not a screenshot.
- **Starter prompts (pills above the input):**
  - `"How much is Botox?"`
  - `"Do you have anything available Saturday?"`
  - `"What's the difference between HydraFacial and microneedling?"`
- **Clearly-labeled-as-demo framing:** Small badge above widget reading `"Demo preview of {businessName}'s AI assistant"`. Not hidden, not screaming. (See Decision 3.)

### Section D: Platform-Aware Credibility Block (NEW)
- **Heading:** `"This was built with your booking stack in mind."`
- **Body:** Dynamic copy based on `lead.intelData.bookingPlatform`:
  - `mindbody` → `"Our team has direct experience with the franchise booking integration that powers multi-location operations like yours. Most agencies can only sync a single location. We've mapped the HQ-down."`
  - `aesthetic-record` → `"We build on Aesthetic Record's native integration hub, which most agencies don't even know exists."`
  - `boulevard` or `vagaro` → `"We've built custom integrations between booking platforms and marketing automation that go beyond what Zapier can handle."`
  - `zenoti` → same as Boulevard/Vagaro copy
  - unknown / missing → `"Whatever booking platform runs your front desk, we wrap AI around it — not the other way around."` (generic, still credible)
- **No AC mention anywhere.** All claims are true when traced back to the operator's experience. Zero brand-name of the day job.
- **Visual:** Simple two-column block. Left: headline + copy. Right: three small logo tiles of platforms we integrate with, with the detected one highlighted. Logos are public brand marks used in fair-use comparison context.

### Section E: Results / Reputation
- If `lead.intelData.rating >= 4.0` AND `lead.intelData.reviewCount > 0`: show review count + star rating + `reputationSummary` as the hero trust line.
- If review data is thin: show a "Your reviews, front and center" placeholder card that reads `"Once live, this panel pulls your reviews from Google and Yelp in real time — the same integration we already run for every {businessName}-caliber operator."`
- Include 1-3 testimonial cards if `intelData` has any; fallback to placeholder cards with neutral copy.
- Before/after: not included in v1 unless Yonce explicitly scraped images.

### Section F: "What We Built For You" (personalized three tiles)
- Tile 1: Pain-point-to-solution framing from `lead.intelData.painPoints[0]`
- Tile 2: Same for `painPoints[1]` or second-best-available
- Tile 3: Third pain point, or generic "After-hours conversion — locked down."
- Each tile: short headline, 2-sentence body, no CTA (CTAs are gated in Section G only).

### Section G: Commitment CTA (NOT a "book a call" CTA for unpaid leads)
Per user decision: no one books a call without a payment commitment OR a reply to the outreach email. Post-deposit, the CTA swaps to a kickoff call link.

**State machine — CTA block has two states driven by URL `?deposit=success`:**

**Pre-deposit state (default):**
- Primary: `"Reserve this build — $500 deposit"` → Stripe payment link (placeholder ENV var `STRIPE_PROFILE2_DEPOSIT_LINK`). Deposit credits toward the $5,500 build.
- Secondary: `"Questions? Reply to our email."` → mailto with prefilled subject.
- Explicit absence: NO "book a call," NO "schedule a consultation," NO Calendly link.

**Post-deposit state (triggered by `?deposit=success` on URL):**
- Top banner (dismissable): `"Payment confirmed. Book your kickoff call →"` linking to `CAL_COM_KICKOFF_LINK` ENV var.
- Below banner (permanent): `"We just emailed you this same link. If it doesn't arrive in 5 minutes, reply to this demo's email and we'll resend."`
- Section G swaps its primary CTA to `"Book your kickoff call →"` (Cal.com).
- Secondary CTA becomes `"Not ready yet? Reply to our email."`

**Post-deposit email (fires from Stripe webhook on `checkout.session.completed` — webhook IMPLEMENTATION is NOT in scope today; template just renders the UX. Webhook stub to be added later.):**
- Payment receipt (Stripe handles this natively)
- Kickoff call link (same as banner)
- Reply-ask: `"Just reply with a 👍 so we know this landed. It helps us keep your future messages out of your spam folder."`
- Rationale: a reply from a new client is the single strongest inbox-reputation signal for deliverability to that address going forward.

### Section H: Footer
- `{businessName}` logotype (text-only, Playfair)
- Address if present in intel, otherwise location city
- Small line: `"Powered by FlyNerd Tech"` linking to flynerd.tech
- Demo expiry notice in soft language: `"Preview live through {expiresLabel}"` — no red countdown timer.

### Floating FlyNerd Chat Bubble (separate from Section C)
- Bottom-right, fixed position, `z-50`
- Label on open: `"Questions about FlyNerd? Ask here."`
- This is the CLIENT-facing FlyNerd chat, unrelated to the demo AI employee in Section C.
- Uses `DemoChatWidget` with `mode="flynerd-floating"`, different system prompt focused on FlyNerd services.
- Mobile: becomes a regular button that expands a full-screen drawer.

## 6. Platform-Aware Credibility Copy Bank

Centralized in `medspaDefaults.ts`:

```ts
export const CREDIBILITY_COPY = {
  mindbody: {
    headline: "Built for Mindbody operators.",
    body: "Our team has direct experience with the franchise booking integration that powers multi-location operations like yours. Most agencies can only sync a single location. We've mapped the HQ-down."
  },
  'aesthetic-record': {
    headline: "Native to Aesthetic Record.",
    body: "We build on Aesthetic Record's native integration hub, which most agencies don't even know exists."
  },
  boulevard: {
    headline: "Wired into Boulevard.",
    body: "We've built custom integrations between booking platforms and marketing automation that go beyond what Zapier can handle."
  },
  vagaro: {
    headline: "Wired into Vagaro.",
    body: "We've built custom integrations between booking platforms and marketing automation that go beyond what Zapier can handle."
  },
  zenoti: {
    headline: "Wired into Zenoti.",
    body: "We've built custom integrations between booking platforms and marketing automation that go beyond what Zapier can handle."
  },
  unknown: {
    headline: "We wrap AI around the stack you already run.",
    body: "Whatever booking platform runs your front desk, we build the AI layer on top — not the other way around."
  }
}
```

## 7. The Five Design Decisions

Three of these you already decided inside the action plan; I'm surfacing them as locked calls. Two are open and I'm recommending.

### Decision 1: Dark or light background?
**My recommendation: LIGHT (warm cream `#FAF9F6`).**
- Every ELLEMES / SkinSpirit / Alchemy 43 / Everbody / Ageless / BeautyFix hero runs light.
- Dark makes the demo feel like the current Profile 1 template, which is the exact wrong signal.
- Dark was historically associated with urgency/service-now; medspa is relaxation/self-care.

### Decision 2: Hero background — full-width photo or solid color?
**My recommendation: HERO IMAGE, right column only, not full-width.**
- Split 60/40 hero (copy left, image right) is cleaner than full-width with overlay text.
- Stock photos risk generic feel; generated images risk uncanny feel. Split layout sidesteps both — image is large but not load-bearing.
- **ChatGPT image prompt to generate a reusable default medspa hero image:**
  > `"Soft, editorial photograph of a calm treatment room in an upscale medical spa. Warm natural window light, sage-green accent wall, minimalist reclined treatment chair in pale linen, single fresh white orchid on a marble side table. No people, no branding, no text. Shot on medium-format camera, shallow depth of field, film grain. Color palette: warm cream, sage, muted ivory, soft gold highlights. Composition: vertical-friendly right-third of frame, with soft negative space on the left for headline overlay. Hyper-realistic, premium interior photography style."`
- **Fallback:** If image generation isn't ready on the first build, ship a solid cream gradient hero with a subtle sage radial glow. Still passes the "looks real" test.
- Stored at `/public/demo/medspa/hero-default.jpg` so every Profile 2 demo defaults to it.

### Decision 3: AI chat widget — native-looking or clearly-labeled demo?
**Locked per user: NATIVE-LOOKING with a small badge labeling it as a demo preview.**
- Native styling matches the lead's palette and sits inside a card that matches the rest of the site.
- Small `Demo preview of {businessName}'s AI assistant` badge above the widget keeps it honest without killing the illusion.
- Separately: a FLOATING FlyNerd-branded chat bubble bottom-right for the client to ask about FlyNerd services. This is the second chat widget. It is NOT the same as the Section C centerpiece.

### Decision 4: How many service cards?
**Locked per user: 6 cards.**
- Six is comprehensive without looking like a menu.
- Ships with default treatments: Botox, Dermal Fillers, HydraFacial, Laser Hair Removal, Microneedling, Medical Weight Loss. Yonce can override with `intelData.treatments[]`.

### Decision 5: FlyNerd pricing on this page?
**Locked per user: NO pricing visible.**
- Primary conversion is `"Reserve this build — $500 deposit"` (Stripe payment link).
- Secondary is reply-to-email for questions.
- No "book a call" CTA, no Calendly, no consult-request form.
- Audit/Quickstart/Concierge are Profile 1 offers — they do NOT appear on Profile 2 demos.

## 8. Data Requirements from Yonce

### Already populated today (verified in existing page.tsx)
- `businessName`
- `niche`
- `intelData.painPoints[]`
- `intelData.reputationSummary`
- `intelData.rating`
- `intelData.reviewCount`
- `intelData.brandColors.primary`
- `intelData.brandColors.accent`
- `walkthroughVideoUrl`
- `validUntil`
- `intelScore`

### New fields the template will READ (template ships with graceful fallbacks if absent)
- `intelData.heroHook` — personalized pain-point framed as a single line. Fallback: default copy library.
- `intelData.treatments[]` — array of `{ name, description, imageSlug }`. Fallback: default medspa treatments.
- `intelData.bookingPlatform` — one of `mindbody | aesthetic-record | boulevard | vagaro | zenoti | unknown`. Fallback: `unknown`.
- `intelData.providerName` — string. For the results/credibility section. Fallback: silent.

### NEW field on AgencyLead (schema decision — NO migration today)
All new fields live inside the existing `intelData` JSON column. Yonce can populate them later without a schema change. The template works today with every one of these being absent.

### NOT needed today
- `qualificationProfile` — already in production per user. Template reads it but doesn't require it if `niche` matches a Profile 2 vertical.

## 9. PostHog Events

### Carry forward from Profile 1 (all 11 existing events)
Keep every existing `demo_*` event firing the same way. No regressions.

### New events for Profile 2
- `demo_medspa_loaded` `{ leadId, businessName, niche, bookingPlatform }`
- `demo_service_card_clicked` `{ leadId, treatmentName, position }`
- `demo_ai_starter_prompt_clicked` `{ leadId, promptText }`
- `demo_credibility_block_viewed` `{ leadId, bookingPlatform }` (fires on intersection observer)
- `demo_commitment_cta_clicked` `{ leadId, ctaLabel }` — fires on deposit OR reply-to-email
- `demo_flynerd_bubble_opened` `{ leadId }`

## 10. What This Template Does NOT Include (scope-lock)

- Real booking functionality (the AI chat simulates it)
- Real payments (Stripe deposit link is the only real transaction; AI does not process payments)
- Real before/after images unless Yonce scraped them
- Blog or content sections
- E-commerce / product sales
- Membership signup
- Calendly / booking call UI
- Any Profile 1 service tile (audit / quickstart / concierge)

## 11. Copy Bank (defaults, all overridable by Yonce intel)

### Hero hook fallbacks (when `intelData.heroHook` is missing)
- `"Your reviews say you're the best in {city}. Your website doesn't say it loudly enough."`
- `"The hours you're losing to 'we'll call you back' add up fast."`
- `"After-hours bookings: still on the table. We just need the AI to answer."`

### Service card button
- `"Ask about this"` (opens AI Booking Employee with pre-filled prompt)

### Starter prompts (in Section C)
- `"How much is Botox?"`
- `"Do you have anything available Saturday?"`
- `"What's the difference between HydraFacial and microneedling?"`

### Commitment CTAs
- Primary: `"Reserve this build — $500 deposit"`
- Secondary: `"Questions? Reply to our email."`

### Expired state (reuse Profile 1 logic)
Same language as existing `page.tsx` expired block.

## 12. Stripe / Email Integration

### Deposit link
- ENV var: `STRIPE_PROFILE2_DEPOSIT_LINK`
- Flow: user clicks → Stripe-hosted checkout → redirects back to `/demo/[leadId]?deposit=success` → page shows confirmation banner + kickoff CTA swap.
- If ENV var is missing: CTA is disabled with hover tooltip `"Deposit link not configured"`. Build does NOT crash.

### Kickoff call link (post-deposit)
- ENV var: `CAL_COM_KICKOFF_LINK`
- Shown only when URL has `?deposit=success`.
- If ENV var is missing when a lead returns with `?deposit=success`: banner shows `"Payment confirmed. We'll send your kickoff call link by email within the hour."` and no broken link renders.

### Reply-to-email
- `mailto:hello@flynerd.tech?subject=Questions%20about%20our%20proposal%20-%20{encodeURIComponent(businessName)}`
- No tracking beyond the PostHog click event.

### New PostHog events for post-deposit flow
- `demo_deposit_success_viewed` `{ leadId }` — fires when user lands with `?deposit=success`
- `demo_kickoff_cta_clicked` `{ leadId }` — fires on the swapped primary CTA

## 13. Verification Checklist (must pass before declaring done)

### Build
- [ ] `npm run build` succeeds with zero type errors
- [ ] `npm run lint` passes
- [ ] No changes to `lib/prompts.ts` (prompt version lock)

### Profile 1 regression safety
- [ ] Existing Profile 1 demo URL still renders for a non-medspa lead
- [ ] Profile 1 dark theme unchanged
- [ ] All 11 existing PostHog events still fire on Profile 1

### Profile 2 smoke test (run with a seeded medspa lead)
- [ ] Hero renders with personalized hook OR fallback
- [ ] 6 service cards render with Yonce data OR defaults
- [ ] AI booking employee chat opens, accepts input, streams response
- [ ] Starter prompts click through to pre-filled conversation
- [ ] Credibility block shows correct copy for each `bookingPlatform` value (test all 6 branches including `unknown`)
- [ ] Floating FlyNerd bubble opens and is visually distinct from the Section C chat
- [ ] Primary CTA attempts to redirect to Stripe (or disables cleanly if ENV missing)
- [ ] Reply-to-email mailto opens with correct prefill
- [ ] Expired state still works (reuse existing logic)

### Visual QA
- [ ] Desktop 1280px: split hero renders correctly, no overflow
- [ ] Tablet 768px: hero stacks, services grid reflows 2-col
- [ ] Mobile 375px: hero stacks, services grid 1-col, floating bubble is a proper bottom button
- [ ] Text readable in both brandColor.primary + fallback sage

### Branch check
- [ ] Demo a lead whose `niche` is `hvac`: renders Profile 1 template, not Profile 2
- [ ] Demo a lead whose `niche` is `med-spa` OR `qualificationProfile` is `tech_enabled_premium`: renders Profile 2 template

## 14. Open Questions for User (answer before build starts)

1. **Stripe deposit link:** do you have a `$500 Profile 2 deposit` link ready, or should I ship with `STRIPE_PROFILE2_DEPOSIT_LINK` as a placeholder ENV var and you plug it in later?
2. **Hero image:** generate the default image via ChatGPT with the prompt in §7 before the build, or ship the gradient fallback for v1 and swap later?
3. **Deposit redirect page:** on successful Stripe payment, land the lead back on `/demo/[leadId]?deposit=success` with a confirmation banner — or on a dedicated thank-you route? I recommend the former (same URL, one less page to build).
4. **Credibility block logos:** need small logo tiles for Mindbody, Aesthetic Record, Boulevard, Vagaro, Zenoti. I can use their public wordmarks under fair-use comparison context. Green-light that, or should the block be text-only for v1?

## 15. Post-build checklist (per repo CLAUDE.md rules)

- [ ] Append entry to `C:/Users/Mother/Vault/command-center/00-Inbox/changelog-sonata.md`
- [ ] Sync this spec and the research doc to both `Projects/.../docs/` and `Vault/.../docs/`
- [ ] Run `npm run build` one final time before declaring done
- [ ] No conventional-commits violations in the commit message
