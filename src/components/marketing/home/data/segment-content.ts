import { Segment } from "@/lib/design-tokens";

export type ServiceItem = {
  title: string;
  summary: string;
  signals: string[];
  details: {
    what: string;
    timeline: string;
    inputs: string;
    outcomes: string;
  };
  audience: Segment;
};

type SegmentContent = {
  label: string;
  heroSubline: string;
  ctaLabel: string;
  blueprintLabel: string;
  proofRow: { label: string; value: string; method: string }[];
};

export const segmentContent: Record<Segment, SegmentContent> = {
  franchise: {
    label: "Franchise",
    heroSubline: "Enterprise-grade AI automations for multi-location teams that must move fast without losing brand control.",
    ctaLabel: "Book a Franchise Systems Call",
    blueprintLabel: "Get a Franchise Personalization Blueprint",
    proofRow: [
      { label: "Lead response", value: "-63%", method: "Median drop in response-time from CRM timestamps over 45 days." },
      { label: "Attribution confidence", value: "+29%", method: "Increase in channel-level source match rates across locations." },
      { label: "Franchisee adoption", value: "87%", method: "Percent of locations active weekly after guided rollout." },
    ],
  },
  memberhub: {
    label: "Member Hub",
    heroSubline: "Enterprise-grade AI automations that feel human—from onboarding to retention—for high-trust member experiences.",
    ctaLabel: "Book a Member Hub Systems Call",
    blueprintLabel: "Get a Member Hub Personalization Blueprint",
    proofRow: [
      { label: "Onboarding completion", value: "+34%", method: "Lift measured against prior cohort conversion to first milestone." },
      { label: "Re-activation wins", value: "2.2x", method: "Increase in dormant users returning within 30-day nurture windows." },
      { label: "Support load", value: "-28%", method: "Reduction in repetitive tickets after AI-guided workflows." },
    ],
  },
  enterprise: {
    label: "Enterprise Ops",
    heroSubline: "Enterprise-grade automations with governance, observability, and measurable commercial impact across business units.",
    ctaLabel: "Book an Enterprise Architecture Call",
    blueprintLabel: "Get an Enterprise Personalization Blueprint",
    proofRow: [
      { label: "SLA breaches", value: "-41%", method: "Decrease in workflow misses after rule-based orchestration and alerts." },
      { label: "Compliance drift", value: "-52%", method: "Drop in policy exceptions using automated checkpoints." },
      { label: "Exec reporting", value: "6 hrs/wk", method: "Time saved by automated attribution and performance rollups." },
    ],
  },
};

export const serviceItems: ServiceItem[] = [
  {
    title: "Franchise Growth Engine",
    summary: "Speed-to-lead, follow-up, and local offer orchestration with corporate-level controls.",
    signals: ["Attribution", "Governance", "Personalization"],
    audience: "franchise",
    details: {
      what: "Connects ad leads, call events, and CRM states to trigger immediate, context-aware outreach.",
      timeline: "3-5 weeks",
      inputs: "CRM schema, location hierarchy, campaign taxonomy.",
      outcomes: "Faster follow-up, cleaner reporting, higher location consistency.",
    },
  },
  {
    title: "Multi-Location Attribution",
    summary: "Unify paid, organic, and referral channels into auditable source-of-truth dashboards.",
    signals: ["Attribution", "Observability", "Compliance"],
    audience: "franchise",
    details: {
      what: "Builds normalized tracking and location-level funnel visibility across your stack.",
      timeline: "2-4 weeks",
      inputs: "UTM standards, call tracking feeds, BI access.",
      outcomes: "Confident spend allocation and less channel noise.",
    },
  },
  {
    title: "Lifecycle Nurture + Re-activation",
    summary: "Behavior-triggered journeys that restart stalled leads and reactivate dormant contacts.",
    signals: ["Personalization", "Retention", "Governance"],
    audience: "franchise",
    details: {
      what: "Maps lifecycle states to AI-assisted messaging and follow-up timing.",
      timeline: "3-4 weeks",
      inputs: "Audience segments, suppression rules, approved messaging.",
      outcomes: "Higher conversion from neglected pipeline and reduced manual chase.",
    },
  },
  {
    title: "Onboarding + Gating",
    summary: "Guide new members through milestones with adaptive prompts and role-aware access.",
    signals: ["Personalization", "Governance", "Security"],
    audience: "memberhub",
    details: {
      what: "Delivers personalized checklists and unlock logic based on real user actions.",
      timeline: "2-3 weeks",
      inputs: "Member states, offer rules, content map.",
      outcomes: "Faster time-to-value and better member confidence.",
    },
  },
  {
    title: "Retention Loops",
    summary: "Detect churn risk early and deploy human-sounding intervention flows.",
    signals: ["Retention", "AI Ops", "Compliance"],
    audience: "memberhub",
    details: {
      what: "Combines event scoring with AI-authored outreach that respects brand tone and consent.",
      timeline: "3-5 weeks",
      inputs: "Product events, support tags, message channels.",
      outcomes: "Improved member stickiness and lower voluntary churn.",
    },
  },
  {
    title: "AI Resume/Match Workflows",
    summary: "Automate profile-to-opportunity routing with transparent scoring logic.",
    signals: ["Matching", "Observability", "Governance"],
    audience: "memberhub",
    details: {
      what: "Ingests profile data and applies explainable fit scoring for accurate matchmaking.",
      timeline: "4-6 weeks",
      inputs: "Data model, ranking criteria, compliance constraints.",
      outcomes: "Higher placement quality with auditable decisioning.",
    },
  },
  {
    title: "Governance Guardrails",
    summary: "Policy-aware automation paths with approval gates and audit logs.",
    signals: ["Compliance", "Security", "Governance"],
    audience: "enterprise",
    details: {
      what: "Applies role-based checks and exceptions handling before sensitive actions run.",
      timeline: "2-4 weeks",
      inputs: "Policy docs, system roles, escalation paths.",
      outcomes: "Reduced risk while preserving execution speed.",
    },
  },
  {
    title: "Observability Layer",
    summary: "Track workflow health, model behavior, and revenue impact in one place.",
    signals: ["Observability", "Attribution", "AI Ops"],
    audience: "enterprise",
    details: {
      what: "Instruments every automation with latency, accuracy, and conversion markers.",
      timeline: "3-4 weeks",
      inputs: "Logging endpoints, KPI definitions, alert thresholds.",
      outcomes: "Faster troubleshooting and board-ready visibility.",
    },
  },
  {
    title: "Executive Insight Streams",
    summary: "Weekly decision briefs generated from campaign, ops, and lifecycle data.",
    signals: ["Attribution", "Governance", "Executive"],
    audience: "enterprise",
    details: {
      what: "Synthesizes pipeline and performance data into strategic recommendations.",
      timeline: "2-3 weeks",
      inputs: "KPI targets, current dashboards, org priorities.",
      outcomes: "Better prioritization and clearer accountability.",
    },
  },
];

export const getOrderedServices = (segment: Segment) => {
  return [...serviceItems].sort((a, b) => {
    const aPriority = a.audience === segment ? 0 : 1;
    const bPriority = b.audience === segment ? 0 : 1;
    return aPriority - bPriority;
  });
};

export const getSegmentFromParam = (value?: string | null): Segment | null => {
  if (!value) return null;
  if (value === "franchise" || value === "memberhub" || value === "enterprise") {
    return value;
  }
  return null;
};
