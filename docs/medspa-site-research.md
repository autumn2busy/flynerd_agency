---
project: flynerd-agency
type: research
created: 2026-04-16
tags: [medspa, competitive-research, demo-template, profile-2, tech-enabled-premium]
---

# Medspa Competitive Research — Demo Template Input

> **Purpose:** Input for the `profile: tech_enabled_premium` medspa demo template being built 2026-04-16. We are NOT targeting these sites as prospects. We are studying what category-leading medspas do so the Dre-generated demo credibly competes with what the prospect sees every day on competitor sites.
>
> **Profile 2 reminder:** Our target prospect HAS a website and HAS booking integration (Mindbody, Boulevard, Vagaro, Zenoti, Aesthetic Record). Their gap is AI. The demo must prove we can wrap an AI layer around the booking stack they already trust.

---

## Patterns Across Top Medspa Sites

### UNIVERSAL (appears on 9-10 of 10 sites)
- **"Book Now" as the dominant primary CTA.** Present in header, hero, and repeated 3-5 times down the page. Never absent.
- **Dark/luxe color discipline.** Every site uses a restrained 3-4 color palette. Sage, forest green, teal, black, and off-white dominate. Zero bright primary reds/oranges.
- **Serif display font + sans-serif body.** Playfair Display, Lora, Futura PT, Voga for headers. Montserrat, Poppins, Manrope for body. This pairing IS the category signature.
- **Hero headline is aspirational, not transactional.** "The Best Work Goes Unnoticed" (Alchemy 43), "Expert-led Cosmetic Dermatology" (Everbody), "Your Place to Look & Feel Amazing" (Zare). Never "20% off Botox this week."
- **Provider credibility required.** Every site names at least one MD, NP, or RN. ELLEMES lists 4 providers with photos. Ageless Center leads with location credibility (Lenox Rd Atlanta).
- **Third-party booking platform as the conversion mechanic.** Every single site punts booking to an external system. The platform IS the booking UX.

### COMMON BUT VARIABLE (appears on 5-8 of 10)
- **Before/After gallery.** Alchemy 43 puts it in primary nav. Everbody, SkinSpirit reference it in footer. Radiance and Zare don't show it on the homepage at all.
- **Press logo strip (Vogue, ELLE, NYT, Forbes).** SkinSpirit, Alchemy 43, BeautyFix do this aggressively. Atlanta local sites skip it (their trust comes from local authority instead).
- **Memberships / subscription pricing.** ELLEMES, SkinSpirit, Alchemy 43, The Ageless Center, Zare all push membership programs as the second CTA. It's not a coincidence. Medspa economics run on recurring injectable cadences.
- **Financing partner named on homepage.** Care Credit, Cherry, Afterpay. ELLEMES and BeautyFix surface this above the fold.
- **Location name in hero/title.** "Med Spa Atlanta" (Ageless), "Voted #1 Med Spa of Atlanta 2026" (ELLEMES), "Medspa in Baltimore, Maryland" (Zare). Local SEO + trust.

### RARE BUT POWERFUL (appears on 1-2 sites)
- **Transparent per-unit pricing in hero service cards.** ELLEMES does this ("Botox $13/unit, HydraFacial $199-$375, RF Microneedling $800-$1,350"). Nobody else does it this boldly. It is the strongest single move in the entire sample. Reading the prices makes the practice feel honest, confident, and non-predatory.
- **AI Skin Analysis quiz widget.** ELLEMES has an "Age Estimator Tool" at `/age-estimator-tool/`. This is the ONLY piece of legitimate AI-like personalization in the entire 10-site sample. Even ELLEMES doesn't have a chatbot.
- **Video hero with cinematic zoom.** ELLEMES again. 25-second slow zoom on a founder/treatment scene. Feels premium in a way that a static photo never will.
- **Counter-positioning copy.** Glo Medspa's anti-upsell line ("We will never try to upsell you") in the Antigravity research sample stands out precisely because nobody else commits to it.

### CONSISTENTLY MISSING — THIS IS OUR OPPORTUNITY ZONE
- **AI chat / AI booking agent.** ZERO of the 10 sites had a conversational AI on the homepage. Not one. Cookie consent banners and live chat widgets were absent too. This is the single biggest exposed flank in the category.
- **After-hours booking guarantee.** Nobody advertises "book at 11pm, get an answer immediately." Every site punts to a form or a platform that still runs on staff response time.
- **Real-time treatment availability on the hero.** Even sites with deep integrations don't show "next available: tomorrow 2pm." The booking platform knows. The homepage doesn't surface it.
- **Pricing transparency beyond the one ELLEMES example.** Most sites hide pricing behind "consult required." Profile 2 prospects are already sold on paying — they need friction removed, not invented.
- **Live review aggregation on hero.** Review counts shown, live review carousels absent. Embedding a Google review feed in the hero is trivial and nobody does it.

### PALETTE & TYPE PATTERNS (ship these defaults)

**Color vocabulary (most common across top tier):**
- Sage / muted teal: `#8eacac`, `#9fbfbf` (ELLEMES)
- Forest / deep green: `#00322b` (SkinSpirit), `#005453` (Everbody)
- Warm off-white / cream: `#f7f5f2`, `#f7f5e7`
- Neutral gray for body text: `#555555`, `#1d1d1d`
- Sparing use of pink/rose as accent: `#DA5693` (Radiance)

**Typography lockups (ship one of these):**
1. `Playfair Display` (headers) + `Montserrat` (body) — ELLEMES, premium feel
2. `Lora` (headers) + `Manrope` (body) — Everbody, editorial feel
3. `Futura PT` (headers) + system sans (body) — Revive, modern-clinical

**CTA button style:**
- Rectangular, 4-8px corner radius (not pill, not sharp). Everbody, SkinSpirit, ELLEMES all land here.
- All-caps or title-case label. "BOOK NOW" or "Book Now." Never "book now."
- Dark button on light background is more common than vice versa.

### BOOKING PLATFORM LANDSCAPE (critical Profile 2 insight)

Observed booking destinations in this sample:
| Site | Platform |
|---|---|
| Everbody | Gravity Forms (internal) |
| SkinSpirit | Zenoti |
| Alchemy 43 | Mindbody-style subdomain |
| ELLEMES | Vagaro (`vagaro.com/ellemesmedspa`) |
| The Ageless Center | Zenoti (`amp.zenoti.com`) |
| Radiance Atlanta | Not confirmed (likely Mindbody or Vagaro) |
| BeautyFix | Internal booking tool + Shopify |
| RevIVe Wellness | Boulevard (`dashboard.boulevard.io`) |
| Zare Medspa | Aesthetic Record (`myaestheticrecord.com`) |
| LaserAway | Internal (blocked from crawl) |

**The finding:** Mindbody is NOT the dominant booking layer in premium medspa. Boulevard, Zenoti, Vagaro, and Aesthetic Record are. Simon's Profile 2 detection logic (currently planned for later this week) should screen for ANY of these platforms, not just Mindbody.

---

## Tier 1 — National Best-in-Class

### 1. Everbody — everbody.com

**HERO**
- Headline: "Expert-led Cosmetic Dermatology | Botox, Lasers, and Facials"
- Subhead: Image-based, not text
- Primary CTA: "Book Now" (teal `#005453`)
- Background: Photo/video with overlay
- Feel: Luxurious, clinical, upscale

**NAVIGATION**
- Services/Treatments, About/Providers, Locations (NYC + DC), Book Now
- Booking button: Top-right fixed; also floats in mobile footer

**SERVICES**
- 3-column grid cards; tab-based treatment carousel
- Categories: Botox, Lasers, Facials
- Pricing: Consult-only

**BOOKING FLOW**
- CTA: "Book Now"
- Destination: Gravity Forms modal/page (`.gform_wrapper`)
- Info collected: Email required; name/service selection likely

**TRUST SIGNALS**
- Provider bios implied (`text-content__person` sections)
- Testimonials section present
- No before/after gallery on homepage
- No explicit certifications

**CHAT/AI**
- None detected

**PALETTE / TYPE**
- Teal `#005453`, black `#1d1d1d`, cream `#f7f5f2`
- Headers: Lora (serif). Body: Manrope (sans)

**WHAT WORKS**
Fixed "Book Now" dropdown in the header plus luxury branding (teal + Lora/Manrope) conveys professionalism without clinical coldness.

**WHAT'S MISSING**
No AI chatbot for instant service/pricing questions or after-hours lead capture.

---

### 2. SkinSpirit — skinspirit.com

**HERO**
- Headline: "introducing the skinspirit laser facial"
- Subhead: "microneedling + Catalyst serums / for visibly remarkable results"
- Primary CTA: "learn more"
- Background: High-quality treatment photography
- Feel: Luxurious-approachable, editorial

**NAVIGATION**
- Treatments (nested: Injectables, Lasers, Body, Facials, Consultations), Locations, SHOP, SPECIAL OFFERS, More
- Booking button: Top-right "Book now"; also in hero and footer

**SERVICES**
- Grid cards with hover
- Categories: Injectables, Lasers & Lights, Body, Facials & Peels
- Pricing: Not shown (consult-only model)

**BOOKING FLOW**
- CTA: "Book now" (5+ instances)
- Destination: `/book-an-appointment` (Zenoti)
- Info: Collected in-platform

**TRUST SIGNALS**
- 3 client testimonials (named initials + city)
- Press logo strip: Vogue, ELLE, Women's Health, NYT, USA Today, Style
- Medical Advisory Board referenced
- No before/after on homepage

**CHAT/AI**
- None

**PALETTE / TYPE**
- Forest green `#00322b`, white
- Fonts: Montserrat, Poppins, Noto Serif, Oooh Baby

**WHAT WORKS**
Press logo strip + medical advisory board framing builds trust without shouting. Treatment-focused nav structure gives every visitor a visible on-ramp.

**WHAT'S MISSING**
No pricing transparency and no AI. An interactive "what's your skin goal?" quiz or chatbot would bridge browse-to-book for first-timers.

---

### 3. Alchemy 43 — alchemy43.com

**HERO**
- Headline: "The Best Work Goes Unnoticed"
- Subhead: "Medical Aesthetics + Wellness"
- Primary CTA: "BOOK NOW"
- Background: Warm-lit photography (woman with curly hair)
- Feel: Luxurious-approachable, female-founded tone

**NAVIGATION**
- Services (6 nested categories), About Us, For You, Before & Afters, Locations, Shop, Membership
- Booking button: Top-right; external platform redirect

**SERVICES**
- Horizontal scrollable carousel of cards
- Categories: Injectables, Skin Treatments, Laser & Energy, Wellness, Shop
- Pricing: Consult-only

**BOOKING FLOW**
- CTA: "BOOK NOW"
- Destination: `booking.alchemy43.com/webstoreNew` (Mindbody-style)
- Info: Handled by external platform

**TRUST SIGNALS**
- Before & Afters in primary nav (strong)
- 4.7 stars from ~400 reviews (schema)
- Publication logos: Forbes, Byrdie, Glamour
- Provider page linked but not on homepage

**CHAT/AI**
- None

**PALETTE / TYPE**
- Neutral whites, soft grays, black text
- Warm accent in photography
- Fonts: modern sans-serif stack

**WHAT WORKS**
"Natural-looking enhancement" positioning combined with female-led messaging plus Forbes/Byrdie logos gives credibility without hard-selling.

**WHAT'S MISSING**
No AI chat. Real-time availability + pricing transparency would cut the friction before the external booking redirect.

---

### 4. LaserAway — laseraway.com (crawl blocked, characterized from search)

**HERO**
- Positioning: "Transform your skin with LaserAway's advanced laser hair removal, skin treatments, and body contouring services."
- Primary CTA: "Book Now" / "Free Consultation"
- Feel: National-chain polish, mass-market premium

**NAVIGATION**
- Services, Locations, Book Now
- Booking button: Prominent header CTA

**BOOKING FLOW**
- CTA: "Book Your Free Consultation"
- Destination: Internal booking flow at `/book-now/`
- Consultation-first for most services; Hydrafacial is direct-bookable

**TRUST SIGNALS**
- Aggressive location footprint (nationwide)
- Clinical-professional framing

**CHAT/AI**
- Not confirmed (site blocked crawl)

**WHAT WORKS**
Hard-focused on a single flagship service (laser hair removal) and rides that to national scale. Single-product clarity is a category outlier.

**WHAT'S MISSING**
Site blocked automated crawling. That defense suggests a large, sophisticated marketing team — not relevant to a Profile 2 demo template but noted.

---

## Tier 2 — Premium Atlanta Local

### 5. ELLEMES Medical Spa — ellemesmedspa.com

**HERO**
- Headline: "Voted #1 Med Spa of Atlanta 2026" (header badge + page title)
- Subhead: "Book Your Complimentary Consultation Today"
- Primary CTA: "Book Now →"
- Background: Video with cinematic 25s zoom animation; dark-to-transparent gradient overlay
- Feel: Luxurious + approachable

**NAVIGATION**
- Conditions, Treatments, Pricing, About, Patient Resources, Discover & Media
- Booking button: Fixed desktop header right; mobile drawer footer

**SERVICES**
- Slick carousel with numbered tab dots
- Categories: Injectables, Facials/Peels, Lasers/Devices, Wellness/Specialty
- **Pricing: YES — ranges and per-unit ("Botox $13/unit", "HydraFacial $199-$375")**

**BOOKING FLOW**
- CTA: "Book Now" / "Book Your Complimentary Consultation Today"
- Destination: `vagaro.com/ellemesmedspa/book-now`
- Info: Vagaro-handled

**TRUST SIGNALS**
- 5.0 rating, 340 reviews (schema)
- 4 named providers with bios
- Medical Director: Dr. Mark Grimsley, MD
- "Voted #1 Med Spa of Atlanta 2026" badge
- Before/After page in footer

**CHAT/AI**
- No chat widget
- **AI Skin Analysis tool at `/age-estimator-tool/`** — ONLY AI-ish feature in the entire sample

**PALETTE / TYPE**
- Sage accent `#8eacac`, `#9fbfbf`
- Black `#1a1a1a`, text gray `#555555`, cream `#f7f5e7`
- Headers: Playfair Display. Body: Montserrat

**WHAT WORKS**
Pricing transparency + MD oversight + sage-and-serif visual discipline + 5.0 stars. This is the template winner and should be the primary reference for our build.

**WHAT'S MISSING**
The "AI Skin Analysis" quiz exists but isn't on the hero. No conversational AI. A "book via chat" flow would convert visitors who won't commit to a consult but will ask a question.

---

### 6. The Ageless Center — theagelesscenter.com

**HERO**
- Headline: "Med Spa Atlanta" / "We Are All About You"
- Subhead: "Your beauty, your skin, your radiance — enhanced."
- Primary CTA: "Book an Appointment"
- Background: Lifestyle photography of woman
- Feel: Luxurious, wellness-focused

**NAVIGATION**
- Home, Our Treatments (20+ sub-items), Meet The Team, About Your Visit, Treatment Results, Contact
- Secondary: Memberships, Gift Cards, Patient Financing

**SERVICES**
- Grid/carousel treatment cards
- Categories: Wrinkle Relaxers, Dermal Fillers, Targeted Treatments
- **Pricing: YES ($9-$2,385 range, per unit/treatment)**

**BOOKING FLOW**
- CTA: "Book an Appointment" / "Book Your Appointment Today!"
- Destination: `amp.zenoti.com/webstoreNew/services/` (Zenoti)

**TRUST SIGNALS**
- Address: 2770 Lenox Rd NE, Atlanta (local cred)
- "Meet The Team" page linked
- "Treatment Results" gallery
- No testimonials on homepage
- Provider credentials not on homepage hero

**CHAT/AI**
- None detected

**PALETTE / TYPE**
- Teal `#b9f0ed`, dark blue `#5898c4`, dark gray `#2a2a2a`
- Poppins throughout (300-700)

**WHAT WORKS**
Pricing transparency + multiple booking CTAs + deep treatment catalog. Rare to see this much inventory on the homepage without it feeling overwhelming.

**WHAT'S MISSING**
No AI chat, no hero-level testimonials, no provider credibility in the fold. The site assumes you already know them.

---

### 7. Radiance Medspa Atlanta — radiancemedspaatlanta.com

**HERO**
- Headline: "RADIANCE" (84px stylized)
- Subhead: "SKIN REJUVENATION" (16px uppercase)
- Primary CTA: "BOOK NOW"
- Background: Full-width hero image with 50% dark overlay
- Feel: Luxury-modern

**NAVIGATION**
- Standard medspa nav (not fully exposed in scrape)
- Booking button: Top nav + hero

**SERVICES**
- 3-column overlay card grid
- Card format: heading, divider, description, "Learn More"
- Pricing: Not shown

**BOOKING FLOW**
- CTA: "BOOK NOW"
- Destination: Not specified in homepage HTML (likely Mindbody or Vagaro)

**TRUST SIGNALS**
- Minimal on homepage: no reviews, no before/after, no providers, no certifications visible
- Brand positioning leans on "50+ years of experience" (from third-party listings)

**CHAT/AI**
- None

**PALETTE / TYPE**
- Cyan `#6EC1E4`, green `#61CE70`, rose `#DA5693`, dark `#2E2925`
- Headers: Acumin 900 uppercase. Subheads: Voga. Body: Josefin Sans 300

**WHAT WORKS**
Clean visual hierarchy and typography discipline. The "RADIANCE" hero wordmark treatment is bold.

**WHAT'S MISSING**
Trust signals are invisible on the homepage. No testimonials, no before/after, no provider credibility. This is a surprising gap for a site claiming 50+ years. Also no AI.

---

## Tier 3 — Booking-Integration-Present (Profile 2 Comparables)

### 8. BeautyFix Medspas — beautyfixmedspa.com

**HERO**
- Headline: "Customized treatments for you!"
- Subhead: "Exclusive seasonal pricing on select injectables, skin boosters, and regenerative treatments..."
- Primary CTA: "SHOP NOW" / "BOOK NOW" (dual)
- Background: Gradient image with promotional messaging
- Feel: Modern, luxury-commercial, playful

**NAVIGATION**
- SHOP, Learn, LOCATIONS, MEMBERSHIP, WEIGHT LOSS, BOOK
- 40+ service options in dropdowns
- Booking: Top-right + "SCHEDULE NOW" mid-nav

**SERVICES**
- Grid cards with images, names, prices
- Categories: Face Fixes, Booty Fixes, Body Fixes, Skin Fixes (branded category naming)
- **Pricing: YES ($229-$7,500 range shown on cards)**

**BOOKING FLOW**
- CTA: "BOOK NOW" / "SCHEDULE NOW" / "FREE CONSULTATION"
- Destination: Internal `/pages/booking-tool` (EN/ES options)
- Platform: Shopify-based site, internal booking

**TRUST SIGNALS**
- Press logos: OK!, People, BET, Glamour, Business Insider, Guest of a Guest
- "Our Doctors" and "Our Providers" linked
- Loox reviews widget integrated
- No homepage before/after

**CHAT/AI**
- None detected

**PALETTE / TYPE**
- Black `#000`, magenta `#FF00C8`, cyan `#00CCCC`, white
- Sans-serif system stack (not declared)

**WHAT WORKS**
Playful branded category names ("Booty Fixes") + visible pricing + bilingual booking. Rare EN/ES support is a differentiator in multi-ethnic markets.

**WHAT'S MISSING**
No chat, no AI. The playful voice could carry a chatbot persona really well and isn't being used.

---

### 9. RevIVe MedSpa & Wellness — revivemedspawellness.com

**HERO**
- Headline: "SPECIALIZING IN AESTHETICS, WELLNESS AND ALL THINGS YOU"
- Subhead: "YOUR OASIS FOR REJUVENATION"
- Primary CTA: "BOOK NOW"
- Background: Rotating image carousel (6.5s intervals)
- Feel: Luxury, rejuvenation-focused

**NAVIGATION**
- Home, About, Injectables, Face, Body, Wellness, Contact
- Secondary: Gift Cards, Call Now, Schedule Online
- Booking: Top-right header + multiple in-page CTAs

**SERVICES**
- Tabbed interface (Face / Microneedling / Body / Wellness)
- Treatments: Botox, fillers, Kybella, Moxi, BBL, Halo, microneedling, HRT, medical weight loss, O-Shot, P-Shot
- Pricing: Not shown

**BOOKING FLOW**
- CTA: "SCHEDULE ONLINE" / "BOOK NOW"
- Destination: `dashboard.boulevard.io/booking/businesses/...`
- **Platform: Boulevard** (premium direct Mindbody competitor)

**TRUST SIGNALS**
- 4.8 stars, 260 Google reviews
- Led by Lindsey N. Jackson, MD and PhD
- Instagram feed embedded
- No before/after on homepage

**CHAT/AI**
- None

**PALETTE / TYPE**
- Black `#000000`, white `#ffffff`, purple accent `#c8b2c1`
- Headers: Futura PT. Body: system sans

**WHAT WORKS**
Boulevard integration suggests the operator is paying for premium tooling. MD+PhD leadership is strong. Tabbed service interface reduces page length cleanly.

**WHAT'S MISSING**
No AI chat. Instagram embed is a lazy substitute for real-time social proof. A live review embed + chatbot would upgrade this site substantially — and this operator is exactly the Profile 2 buyer who would pay for it.

---

### 10. Zare MedSpa & Wellness — zaremedspa.com

**HERO**
- Headline: "Zare Medspa" / "Your Place to Look & Feel Amazing"
- Subhead: "Where Beauty, Wellness, and You Come First!"
- Primary CTA: "Reserve Now"
- Background: Spa/beauty hero image
- Feel: Luxury, wellness-focused, spiritually framed

**NAVIGATION**
- Home, About, Treatments (Injectables / Face & Body / Wellness & IV), Membership, Shop, Events, Contact
- Booking: Top-right header + below-hero

**SERVICES**
- Grid of category cards
- 3 main categories, 15+ individual treatments
- Pricing: Retail products only ($40.99-$120); treatment pricing absent

**BOOKING FLOW**
- CTA: "Reserve Now"
- Destination: `zaremedspa.myaestheticrecord.com/online-booking`
- **Platform: Aesthetic Record** (medspa-specific booking SaaS)

**TRUST SIGNALS**
- Led by NP Zare
- Spiritual framing: "we invite God's healing hands to guide every treatment" — polarizing but differentiating
- Before/after gallery not on homepage
- Reviews not on homepage

**CHAT/AI**
- No chat. Only cookie consent widget at bottom-left

**PALETTE / TYPE**
- White background, navy/teal `#1863DC`
- Roboto + serif headers

**WHAT WORKS**
Aesthetic Record integration + NP-led + spiritual voice creates genuine differentiation in a category where every site sounds the same.

**WHAT'S MISSING**
No AI. No reviews. No before/after. No treatment pricing. Significant low-hanging fruit. Exactly the Profile 2 prospect Yonce should love.

---

## Implications for Demo Template (hand-off to Block 2)

1. **Use ELLEMES as the primary visual reference.** Playfair Display + Montserrat + sage palette + pricing-visible service cards is the winning formula in this sample. The ELLEMES AI Skin Analysis quiz is a near-miss that we can out-build.

2. **AI booking agent is the UNCONTESTED opportunity.** Zero of 10 sites have one. The demo must put this front and center, not buried.

3. **Pricing transparency is a secondary differentiator.** Only 2-3 sites in 10 show real treatment pricing. If Yonce can detect or infer treatment prices, the demo should show them. If not, explicit price ranges still beat "consult only."

4. **Do NOT target Mindbody specifically in Simon's Profile 2 filter.** The premium medspa category runs on Boulevard, Zenoti, Vagaro, and Aesthetic Record far more than on Mindbody. Simon's Profile 2 tech-detection logic should check for ALL of these domains on the prospect's site.

5. **The demo's AI chat should look native, not bolted on.** Every site in the sample has a cohesive visual language. A chatbot that feels like a pop-up ad will break the illusion. It needs to use the lead's palette, live inside a card that matches the site's grid, and speak in the business's voice.

6. **Provider credibility is non-negotiable.** The demo needs a provider/founder block. If Yonce didn't scrape one, the template needs a graceful fallback that still reads credible.

7. **Third-party platform framing.** The demo must not claim to BE the booking platform. It must visibly wrap around the platform the prospect already uses. Copy should read "Works with your Boulevard / Vagaro / Aesthetic Record booking" not "Our booking system."

---

## Sources

- [Everbody](https://everbody.com)
- [SkinSpirit](https://skinspirit.com)
- [Alchemy 43](https://alchemy43.com)
- [LaserAway](https://www.laseraway.com/) (blocked automated fetch; search-sourced characterization)
- [ELLEMES Medical Spa](https://ellemesmedspa.com/)
- [The Ageless Center](https://www.theagelesscenter.com/)
- [Radiance Medspa Atlanta](https://radiancemedspaatlanta.com/)
- [BeautyFix Medspa](https://www.beautyfixmedspa.com/)
- [RevIVe MedSpa & Wellness](https://revivemedspawellness.com/)
- [Zare MedSpa & Wellness](https://www.zaremedspa.com/)
- [Antigravity competitive benchmark](../../../../Downloads/2026-04-15-competitive-benchmark-hvac-medspa.md) (cross-reference)
