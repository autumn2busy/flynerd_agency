export interface NicheBullet {
  title: string;
  desc: string;
}

const MEDSPA_KEYWORDS = [
  "medspa", "med spa", "medispa", "aesthetics", "botox", "laser",
  "dermatology", "skincare", "beauty", "cosmetic", "facial",
];
const HOME_SERVICES_KEYWORDS = [
  "hvac", "plumbing", "plumb", "water damage", "roofing", "landscaping", "pest",
  "cleaning", "painting", "flooring", "contractor", "handyman",
  "senior home care", "home care", "electrical", "heating", "cooling",
  "restoration", "air condition",
];

export type NicheType = "medspa" | "home-services" | "general";

export function getNicheType(niche: string): NicheType {
  const lower = (niche || "").toLowerCase();
  if (MEDSPA_KEYWORDS.some((k) => lower.includes(k))) return "medspa";
  if (HOME_SERVICES_KEYWORDS.some((k) => lower.includes(k))) return "home-services";
  return "general";
}

export function getNicheBullets(niche: string): NicheBullet[] {
  const lower = (niche || "").toLowerCase();
  if (lower.includes("hvac") || lower.includes("heating") || lower.includes("cooling") || lower.includes("air condition")) {
    return [
      { title: "24/7 emergency booking", desc: "Capture 2am AC failures before the competition picks up the phone." },
      { title: "Instant quote form", desc: "Qualify system size, age, and urgency before your tech rolls a truck." },
      { title: "Review wall", desc: "Google and Yelp reviews pulled in live to build trust above the fold." },
      { title: "AI concierge", desc: "Answers pricing, scheduling, and service-area questions around the clock." },
    ];
  }
  if (lower.includes("plumb")) {
    return [
      { title: "Emergency intake", desc: "Leak and flooding triage routed straight to your on-call tech." },
      { title: "Service-area map", desc: "Visitors see upfront whether you cover their zip before filling a form." },
      { title: "Photo-upload intake", desc: "Prospects send a photo of the problem so you quote accurately." },
      { title: "AI concierge", desc: "Handles after-hours quotes and books the slot your dispatcher confirms." },
    ];
  }
  if (lower.includes("water damage") || lower.includes("restoration")) {
    return [
      { title: "60-minute response promise", desc: "Above-the-fold commitment with live response-time badge." },
      { title: "Insurance intake", desc: "Captures claim number and carrier so your ops team moves first." },
      { title: "Certifications wall", desc: "IICRC and bonding visible in the hero, not buried in a footer." },
      { title: "AI concierge", desc: "Walks panicked homeowners through the first 10 minutes while dispatch rolls." },
    ];
  }
  if (lower.includes("senior") || lower.includes("home care")) {
    return [
      { title: "Family-first intake", desc: "Designed for adult children, not the client themselves. Short and calm." },
      { title: "Care-level selector", desc: "Personal care, companionship, or medication management routed differently." },
      { title: "Caregiver bios", desc: "Real photos and tenure build trust faster than a services list." },
      { title: "AI concierge", desc: "Answers the hard questions families are embarrassed to ask a salesperson." },
    ];
  }
  if (MEDSPA_KEYWORDS.some((k) => lower.includes(k))) {
    return [
      { title: "Treatment menu with pricing", desc: "Transparent pricing filters tire-kickers before they book a consult." },
      { title: "Consult booking flow", desc: "Self-serve calendar with deposit collection built in." },
      { title: "Before-and-after gallery", desc: "Client-consent managed gallery with treatment tags and filters." },
      { title: "AI concierge", desc: "Answers skincare, downtime, and pricing questions 24/7." },
    ];
  }
  return [
    { title: "Clear service menu", desc: "Prospects see what you do and what it costs in under 10 seconds." },
    { title: "Instant quote form", desc: "Pre-qualifies leads so your team only calls the ones that convert." },
    { title: "Review wall", desc: "Google and Yelp reviews pulled in live. Social proof above the fold." },
    { title: "AI concierge", desc: "Answers questions and books appointments 24/7, even while you sleep." },
  ];
}
