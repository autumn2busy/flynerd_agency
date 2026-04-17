/**
 * Medspa demo template defaults.
 * All copy, fallback data, and helpers for the Profile 2 (tech_enabled_premium) template.
 * See docs/medspa-demo-template-spec.md for context.
 */

export type BookingPlatform =
  | "mindbody"
  | "aesthetic-record"
  | "boulevard"
  | "vagaro"
  | "zenoti"
  | "unknown";

export interface Treatment {
  name: string;
  description: string;
  imageSlug: string;
}

export interface CredibilityCopy {
  headline: string;
  body: string;
}

export const DEFAULT_TREATMENTS: Treatment[] = [
  {
    name: "Botox & Dysport",
    description: "Precision wrinkle relaxation with licensed injectors.",
    imageSlug: "botox",
  },
  {
    name: "Dermal Fillers",
    description: "Restore volume and shape without surgery.",
    imageSlug: "filler",
  },
  {
    name: "HydraFacial",
    description: "Cleanse, extract, and hydrate in a single session.",
    imageSlug: "hydrafacial",
  },
  {
    name: "Laser Hair Removal",
    description: "FDA-cleared lasers for all skin types and body areas.",
    imageSlug: "laser",
  },
  {
    name: "Microneedling",
    description: "Collagen induction therapy for texture and tone.",
    imageSlug: "microneedling",
  },
  {
    name: "Medical Weight Loss",
    description: "Supervised GLP-1 programs with lab-based monitoring.",
    imageSlug: "weight-loss",
  },
];

export const CREDIBILITY_COPY: Record<BookingPlatform, CredibilityCopy> = {
  mindbody: {
    headline: "Built for Mindbody operators.",
    body: "Our team has direct experience with the franchise booking integration that powers multi-location operations like yours. Most agencies can only sync a single location. We've mapped the HQ-down.",
  },
  "aesthetic-record": {
    headline: "Native to Aesthetic Record.",
    body: "We build on Aesthetic Record's native integration hub, which most agencies don't even know exists.",
  },
  boulevard: {
    headline: "Wired into Boulevard.",
    body: "We've built custom integrations between booking platforms and marketing automation that go beyond what Zapier can handle.",
  },
  vagaro: {
    headline: "Wired into Vagaro.",
    body: "We've built custom integrations between booking platforms and marketing automation that go beyond what Zapier can handle.",
  },
  zenoti: {
    headline: "Wired into Zenoti.",
    body: "We've built custom integrations between booking platforms and marketing automation that go beyond what Zapier can handle.",
  },
  unknown: {
    headline: "We wrap AI around the stack you already run.",
    body: "Whatever booking platform runs your front desk, we build the AI layer on top, not the other way around.",
  },
};

export const PLATFORM_LABEL: Record<BookingPlatform, string> = {
  mindbody: "Mindbody",
  "aesthetic-record": "Aesthetic Record",
  boulevard: "Boulevard",
  vagaro: "Vagaro",
  zenoti: "Zenoti",
  unknown: "Your platform",
};

export const STARTER_PROMPTS: string[] = [
  "How much is Botox?",
  "Do you have anything available Saturday?",
  "What is the difference between HydraFacial and microneedling?",
];

export const HERO_HOOK_FALLBACKS: string[] = [
  "Your reviews say you're the best in town. Your website does not say it loudly enough.",
  "The hours you lose to 'we will call you back' add up fast.",
  "After-hours bookings are still on the table. We just need the AI to answer.",
];

/**
 * Pick a deterministic hero hook fallback based on the lead id
 * so a given lead always sees the same fallback on refresh.
 */
export function pickHeroHookFallback(leadId: string): string {
  let hash = 0;
  for (let i = 0; i < leadId.length; i++) {
    hash = (hash * 31 + leadId.charCodeAt(i)) & 0x7fffffff;
  }
  return HERO_HOOK_FALLBACKS[hash % HERO_HOOK_FALLBACKS.length];
}

/**
 * Normalize a booking platform string from Yonce intel into our enum.
 * Accepts partial matches and is case-insensitive.
 */
export function normalizeBookingPlatform(raw: unknown): BookingPlatform {
  if (typeof raw !== "string") return "unknown";
  const s = raw.toLowerCase().trim();
  if (s.includes("mindbody")) return "mindbody";
  if (s.includes("aesthetic") || s.includes("ar ")) return "aesthetic-record";
  if (s.includes("boulevard") || s.includes("blvd")) return "boulevard";
  if (s.includes("vagaro")) return "vagaro";
  if (s.includes("zenoti")) return "zenoti";
  return "unknown";
}

/**
 * Compute relative luminance of a hex color (0..1).
 * Used to decide whether text-on-color should be black or white.
 */
export function getLuminance(hex: string): number {
  const clean = hex.replace(/^#/, "");
  if (clean.length !== 6) return 0.5;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const srgb = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Crude saturation estimate of a hex color (0..1).
 * High saturation on a medspa template is usually a mistake from the brand scraper;
 * we clamp to a medspa-safe sage fallback in that case.
 */
export function getSaturation(hex: string): number {
  const clean = hex.replace(/^#/, "");
  if (clean.length !== 6) return 0;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  return (max - min) / max;
}

export const MEDSPA_FALLBACK_PRIMARY = "#8EACAC"; // sage
export const MEDSPA_FALLBACK_ACCENT = "#1A1A1A";

/**
 * Pick a medspa-safe primary color. If the scraped brand primary is too
 * saturated (bright red/orange/pink) or too light to read on cream, fall
 * back to the sage default used by ELLEMES-caliber sites.
 */
export function pickMedspaPrimary(rawPrimary: string | undefined): string {
  if (!rawPrimary) return MEDSPA_FALLBACK_PRIMARY;
  const hex = rawPrimary.startsWith("#") ? rawPrimary : `#${rawPrimary}`;
  const sat = getSaturation(hex);
  const lum = getLuminance(hex);
  // Too saturated, or too light to read on cream: fall back
  if (sat > 0.7 || lum > 0.85) return MEDSPA_FALLBACK_PRIMARY;
  return hex;
}

export function pickMedspaAccent(rawAccent: string | undefined): string {
  if (!rawAccent) return MEDSPA_FALLBACK_ACCENT;
  return rawAccent.startsWith("#") ? rawAccent : `#${rawAccent}`;
}

/**
 * Contrast-safe text color on a given background hex.
 * Returns black for light backgrounds, white for dark.
 */
export function textOn(bgHex: string): string {
  return getLuminance(bgHex) > 0.55 ? "#1A1A1A" : "#FFFFFF";
}
