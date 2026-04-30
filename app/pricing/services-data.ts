// FlyNerd Service Catalog
// =======================
//
// SINGLE SOURCE OF TRUTH for every price displayed on the marketing site.
// app/ai-website/page.tsx, components/home/PricingPreview.tsx, and
// app/pricing/** all read from SERVICES below.
//
// Stripe IDs mirror docs/billing/stripe_catalog_mapping.csv
// Note: Stripe IDs will be reconciled in Phase 4.

export interface ServiceMilestone {
  label: string;
  dueAt: string;
  price: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export type QualificationProfile =
  | "underserved_local"
  | "tech_enabled_premium"
  | "all";

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  categoryColor: string;
  priceDisplay: string;
  priceSub: string;
  about: string[];
  inThePackage: { bold: string; detail: string }[];
  process: ProcessStep[];
  milestones: ServiceMilestone[];
  projectDuration: string;
  ctaLabel: string;
  ctaHref: string;
  qualificationProfile?: QualificationProfile;
  stripeDepositPriceId?: string;
  stripeFinalPriceId?: string;
  stripeMonthlyPriceId?: string;
  stripeDepositLink?: string; // portal.flynerd.tech payment link
  stripeFinalLink?: string;
  stripeMonthlyLink?: string;
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: "automation-audit",
    name: "Automation Audit + Roadmap",
    tagline:
      "A 60-90 minute systems audit, 3 quick wins, and a 30-day implementation roadmap — before we build anything.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$495",
    priceSub: "one-time · credited toward any build",
    stripeDepositPriceId: "price_1TOS2LRVuKVVmtoDOuOiM0eY",
    stripeDepositLink: "https://portal.flynerd.tech/b/6oU3cxeGh4JacUbcOCbo40h",
    about: [
      "Before building anything, you need to know what to build — and in what order. The Automation Audit is a focused 60-90 minute strategy session followed by a complete written analysis of your current tech stack, workflows, and automation gaps.",
      "We identify your three highest-impact quick wins, rank every opportunity by ROI, and hand you a 30-day implementation roadmap you can execute with or without us.",
      "The $495 fee is credited toward any build purchased within 30 days. Think of it as a paid scoping session that pays for itself.",
    ],
    inThePackage: [
      { bold: "60-90 Minute Strategy Session", detail: "Deep dive into your current tools, workflows, team size, and biggest operational pain points." },
      { bold: "Full Tech Stack Audit", detail: "We map everything you're using and identify gaps, redundancies, and integration opportunities." },
      { bold: "3 Quick Wins Identified", detail: "Immediate, actionable improvements you can implement this week — no build required." },
      { bold: "ROI-Ranked Opportunity List", detail: "Every automation opportunity ranked by revenue impact and implementation effort." },
      { bold: "30-Day Implementation Roadmap", detail: "A prioritized, step-by-step plan you can begin executing immediately after the session." },
      { bold: "Tool Recommendations", detail: "Best-fit AI and automation tools for your specific stack and budget." },
    ],
    process: [
      { title: "Intake Form", description: "Short pre-call form covering your current tools, team size, and top three operational headaches. Takes 5 minutes." },
      { title: "Strategy Session", description: "60-90 minute video call. We go deep on your workflow and map the full automation landscape." },
      { title: "Audit + Analysis", description: "We document your stack, score each automation opportunity, and build your prioritized roadmap within a few business days of the call." },
      { title: "Roadmap Delivery", description: "Written 30-day roadmap delivered with tool recommendations, priority order, and estimated time savings." },
    ],
    milestones: [
      { label: "Audit Fee", dueAt: "Due at booking", price: "$495" },
      { label: "Build Credit", dueAt: "Applied if upgrading within 30 days", price: "−$495" },
    ],
    projectDuration: "1 week",
    ctaLabel: "Book Audit — $495",
    ctaHref: "/contact?package=audit",
  },

  {
    slug: "quickstart-workflow-build",
    name: "Quickstart Workflow Build",
    tagline:
      "One high-impact automation built end-to-end with up to 3 tool integrations, QA, documentation, and a 14-day support window.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$1,250",
    priceSub: "split 50/50 · deposit secures your start date",
    stripeDepositPriceId: "price_1TOS2MRVuKVVmtoDQGhi1jUT",
    stripeFinalPriceId: "price_1TOS2NRVuKVVmtoDtsyWpyto",
    stripeDepositLink: "https://portal.flynerd.tech/b/6oUdRbbu5cbC6vN01Qbo40i",
    stripeFinalLink: "https://portal.flynerd.tech/b/5kQcN78hTgrS1bt15Ubo40j",
    about: [
      "You've identified the workflow that's costing you the most time or revenue. Now you need someone to build it correctly — with real integrations, proper error handling, and documentation your team can actually use.",
      "The Automation Sprint Build takes one fixed-scope automation and turns it into a production-ready system. From scoping and tool selection through QA, handoff, and 14-day post-launch support.",
      "Most common sprints: lead capture to CRM, appointment booking flows, review request sequences, invoice follow-up automations, and internal operations triggers. If you're not sure which to build first, start with the Audit.",
    ],
    inThePackage: [
      { bold: "Fixed Scope, One Workflow", detail: "One automation built end-to-end. Scope is locked before we start — no surprise invoices." },
      { bold: "Up to 3 Tool Integrations", detail: "Connects your CRM, email platform, forms, spreadsheets, calendar, or booking system." },
      { bold: "Business Logic + Error Handling", detail: "Proper conditional logic, failure alerts, and edge case handling built in from day one." },
      { bold: "Full QA Across Conditions", detail: "System tested in live conditions before handoff. We don't ship anything that hasn't been stress-tested." },
      { bold: "Loom Walkthrough + SOP", detail: "A recorded video walkthrough and written standard operating procedure your team can reference." },
      { bold: "14-Day Post-Launch Support", detail: "Bugs, edge cases, or adjustments handled within 24 hours." },
    ],
    process: [
      { title: "Scoping", description: "We define exact inputs, outputs, triggers, and edge cases. Scope is locked in writing before build begins." },
      { title: "Build", description: "One production-ready automation built using your existing tools. We handle all configuration, API connections, and logic." },
      { title: "QA", description: "Full testing across live conditions — normal flow, edge cases, and failure handling confirmed before handoff." },
      { title: "Handoff", description: "Loom walkthrough + written SOP delivered. 14-day support window begins." },
    ],
    milestones: [
      { label: "Project Deposit (50%)", dueAt: "Due at checkout · secures your start date", price: "$625" },
      { label: "Final Payment (50%)", dueAt: "Due on delivery", price: "$625" },
    ],
    projectDuration: "1–2 weeks",
    ctaLabel: "Start Build — Pay $625 Deposit",
    ctaHref: "/contact?package=quickstart-workflow-build",
  },

  {
    slug: "ai-concierge-launch",
    name: "AI Concierge Launch",
    tagline:
      "A fully deployed AI lead or support agent — channel setup, knowledge base, qualification flow, CRM integration, and handoff training.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$2,400",
    priceSub: "split 50/50 · deposit secures your start date",
    stripeDepositPriceId: "price_1TOS2ORVuKVVmtoDUlLySaPP",
    stripeFinalPriceId: "price_1TOS2PRVuKVVmtoDm2aUsOAU",
    stripeDepositLink: "https://portal.flynerd.tech/b/14AdRb69LgrS2fxbKybo40k",
    stripeFinalLink: "https://portal.flynerd.tech/b/7sYfZjbu56RibQ77uibo40l",
    featured: true,
    about: [
      "Your business should be answering questions, qualifying leads, and booking appointments around the clock. The AI Concierge Launch deploys a fully trained AI agent — customized to your exact services, pricing, and business logic — ready to handle real customer conversations.",
      "This isn't a chatbot template. We build a knowledge base from your real business data, configure qualification flows, set up human handoff logic, wire it to your CRM, and train your team on managing it.",
      "Ideal for local service businesses, law firms, med spas, HVAC companies, and any business where a single missed lead represents hundreds of dollars in lost revenue.",
    ],
    inThePackage: [
      { bold: "Channel Setup", detail: "AI agent deployed to your website, and optionally SMS or other channels based on your stack." },
      { bold: "Custom Knowledge Base", detail: "Built from your real services, pricing, FAQs, team info, and service area — not a generic script." },
      { bold: "Lead Qualification Flow", detail: "Custom logic that identifies high-intent leads and separates them from general inquiries." },
      { bold: "Human Handoff Logic", detail: "The agent knows when to escalate — routing hot leads to your team, calendar, or booking link automatically." },
      { bold: "CRM Integration", detail: "Every lead captured, tagged, and routed in your CRM (ActiveCampaign, HubSpot, or equivalent)." },
      { bold: "Launch Checklist + Team Training", detail: "Full walkthrough of what was built, how to manage it, and how to update the knowledge base as your business evolves." },
    ],
    process: [
      { title: "Discovery", description: "We gather your service list, pricing, FAQs, team details, and service area. We audit your current lead flow to identify where the agent should plug in." },
      { title: "Knowledge Base Build", description: "Your AI agent's knowledge base is built from real business data — not a template. Services, objections, pricing ranges, availability." },
      { title: "Qualification + Handoff Logic", description: "We build and test the full conversation flow — from first message to booking confirmation or human escalation." },
      { title: "CRM Integration", description: "Every captured lead flows into your CRM with proper tagging, pipeline stage, and follow-up trigger." },
      { title: "Client Review + Testing", description: "Full live demo of the agent. You test it, we adjust. One revision round included." },
      { title: "Launch + Training", description: "Agent goes live. You receive a system map, knowledge base documentation, and a 30-minute team training call." },
    ],
    milestones: [
      { label: "Project Deposit (50%)", dueAt: "Due at checkout · secures your start date", price: "$1,200" },
      { label: "Final Payment (50%)", dueAt: "Due on launch", price: "$1,200" },
    ],
    projectDuration: "2–3 weeks",
    ctaLabel: "Launch Agent — Pay $1,200 Deposit",
    ctaHref: "/contact?package=ai-concierge",
  },

  {
    slug: "monthly-care-plan",
    name: "Monthly Care Plan",
    tagline:
      "Ongoing monitoring, issue triage, and iterative improvements for your active automations. No tickets go stale.",
    category: "Automation Retainer",
    categoryColor: "#a1a1aa",
    priceDisplay: "$750",
    priceSub: "/month · cancel anytime with 30 days notice",
    stripeMonthlyPriceId: "price_1TOS2QRVuKVVmtoDfTR1O9SO",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/4gM9AVgOp6Ri4nF01Qbo40m",
    about: [
      "Automations break. APIs change. Business processes evolve. The Automation Care Plan keeps your systems healthy and improving without you needing to manage it yourself.",
      "Each month you get continuous health monitoring, two improvement tickets for enhancements or new micro-automations, rapid bug fixes, and a plain-English performance summary.",
      "Best for businesses running 1-3 core automations who want consistent improvement without hiring a full-time ops person. Month-to-month, 30-day notice to cancel.",
    ],
    inThePackage: [
      { bold: "System Monitoring", detail: "Continuous health checks on all active automations. We catch failures before you notice them." },
      { bold: "2 Improvement Tickets/Month", detail: "Two scoped improvement requests per month — enhancements, new micro-automations, or integrations." },
      { bold: "Issue Triage + Bug Fixes", detail: "Rapid response to any system failures or unexpected behavior, resolved within 24 hours." },
      { bold: "Monthly Performance Report", detail: "Plain-English summary of what's running, what improved, and what's next." },
      { bold: "Monthly Optimization Review", detail: "We proactively flag inefficiencies and recommend improvements each month." },
      { bold: "Priority Async Support", detail: "Dedicated support channel with faster response times than project clients." },
    ],
    process: [
      { title: "Onboarding", description: "Full audit of your current automation stack, documentation of all active flows, and monitoring setup." },
      { title: "Monthly Operations", description: "Improvement tickets are submitted by you, scoped by us, and completed within the month." },
      { title: "Monthly Report", description: "Performance summary delivered monthly with uptime stats, ticket outcomes, and forward recommendations." },
      { title: "Quarterly Review", description: "Every three months we review what's working, what's not, and plan the next quarter." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$750" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$750/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Care Plan — $750/mo",
    ctaHref: "/contact?package=monthly-care-plan",
  },

  {
    slug: "multi-system-ops-retainer",
    name: "Multi-System Ops Retainer",
    tagline:
      "Multi-workflow execution, advanced automation experiments, cross-channel reporting, and a dedicated ops partner — every month.",
    category: "Automation Retainer",
    categoryColor: "#a1a1aa",
    priceDisplay: "$1,800",
    priceSub: "/month · cancel anytime with 30 days notice",
    stripeMonthlyPriceId: "price_1TOS2RRVuKVVmtoDFwiT1AHQ",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/14AbJ3aq14JabQ73e2bo40n",
    about: [
      "You're not missing automations — you're missing the capacity to build, manage, and improve them fast enough. Growth Ops Partner gives you dedicated operations bandwidth every month: multi-workflow execution, advanced automation experiments, and a strategic partner who's thinking about your ops full-time.",
      "Everything in the Automation Care Plan, plus up to 6 active workflow initiatives per month, quarterly strategic roadmap sessions, Slack-based priority support, and cross-channel reporting that shows you exactly what your systems are producing.",
      "Ideal for growing teams with active outbound campaigns, multi-location operations, or a backlog of automation needs that never seem to get cleared.",
    ],
    inThePackage: [
      { bold: "Everything in Automation Care Plan", detail: "All monthly monitoring, issue triage, bug fixes, and reporting included." },
      { bold: "Multi-Workflow Optimization", detail: "Up to 6 active workflow initiatives per month — new builds, optimizations, or agent rollouts." },
      { bold: "Quarterly Roadmap", detail: "End-of-quarter strategic session to set the next 90-day automation priorities." },
      { bold: "Advanced Automation Experiments", detail: "We propose and test new automation approaches to find what drives the most ROI for your business." },
      { bold: "Cross-Channel Reporting", detail: "A unified view of what your automations are producing across CRM, email, lead flow, and bookings." },
      { bold: "Slack + Priority Support", detail: "Direct Slack channel with faster turnaround. Most requests completed within 3–5 business days." },
    ],
    process: [
      { title: "Kickoff + Audit", description: "Full audit of your current automation stack, CRM, and growth bottlenecks. 90-day roadmap set in week one." },
      { title: "Sprint Execution", description: "Monthly sprint model — initiatives are scoped, built, and shipped in focused two-week cycles." },
      { title: "Biweekly Check-in", description: "Short async or video check-in every two weeks to review progress and reprioritize as needed." },
      { title: "Monthly Report", description: "Full performance dashboard — automation ROI, lead flow metrics, ticket outcomes, and pipeline impact." },
      { title: "Quarterly Roadmap", description: "End-of-quarter planning session to set the next 90-day growth and automation priorities." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$1,800" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$1,800/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Apply — $1,800/mo",
    ctaHref: "/contact?package=multi-system-ops",
  },
];

export const SERVICE_CATEGORIES = [
  {
    label: "Project Services",
    tag: "One-Time",
    tagColor: "var(--accent)",
    tagBorder: "var(--accent)",
    filter: (s: Service) => s.category === "Project",
  },
  {
    label: "Automation Retainers",
    tag: "Monthly",
    tagColor: "#a1a1aa",
    tagBorder: "#555",
    filter: (s: Service) => s.category === "Automation Retainer",
  },
];
