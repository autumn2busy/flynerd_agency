// FlyNerd Service Catalog
// =======================
//
// SINGLE SOURCE OF TRUTH for every price displayed on the marketing site.
// app/ai-website/page.tsx, components/home/PricingPreview.tsx, and
// app/pricing/** all read from SERVICES below.
//
// Stripe IDs mirror docs/billing/stripe_catalog_mapping.csv (2026-04-20 live
// run). Never hand-edit a price ID here without also updating the mapping
// file. To change a price, bump the lookup_key suffix in
// scripts/stripe-catalog-bootstrap.ts (Stripe Prices are immutable) and
// re-run `npm run stripe:bootstrap:live`.

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
  /** Used by AI Website page + demo routing to pick the right core build tier. */
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

  // ─────────────────────────────────────────
  // CORE BUILDS — Profile-specific
  // ─────────────────────────────────────────

  {
    slug: "ai-website-quickstart-ul",
    name: "AI Website Quickstart",
    tagline:
      "The underserved-local core offer. A conversion-first AI website built from your actual reputation data, live in 7 days.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$1,500",
    priceSub: "split 50/50 · deposit secures your start date",
    qualificationProfile: "underserved_local",
    stripeDepositPriceId: "price_1TOS2GRVuKVVmtoDoqEHTqLK",
    stripeFinalPriceId: "price_1TOS2HRVuKVVmtoDsGmQyChm",
    stripeDepositLink: "https://portal.flynerd.tech/b/6oU8wR1Tv2B2f2jbKybo40d",
    stripeFinalLink: "https://portal.flynerd.tech/b/fZu8wR7dP3F62fxg0Obo40e",
    featured: true,
    about: [
      "If your phone stops ringing, so does your revenue. The AI Website Quickstart replaces a dead Wix, Squarespace, or GoDaddy brochure with a Next.js site that actually answers questions, qualifies leads, and books appointments around the clock.",
      "Everything comes from your real business data. Our Intel Agent reads your Yelp reviews, rating, and category, extracts your best customer quotes and brand signals, and the site is generated from that — not a template you fill in yourself.",
      "Built for the underserved local service business: HVAC, plumbing, roofing, salons, restoration, home care. Live in 7 days from deposit, with speed-to-launch as the whole point.",
    ],
    inThePackage: [
      { bold: "Custom AI-Informed Design", detail: "Brand palette, copy, and layout pulled from your Yelp reviews and reputation signals. Not a template." },
      { bold: "24/7 AI Booking Agent", detail: "Answers pricing, scheduling, and service-area questions. Books appointments while you're on a job." },
      { bold: "Lead Capture + CRM Routing", detail: "Every inquiry tagged and routed into your CRM (ActiveCampaign, HubSpot, or equivalent) automatically." },
      { bold: "Local SEO Foundation", detail: "Schema markup, sub-second load times, and site structure built for local search ranking." },
      { bold: "High-Speed Vercel Hosting", detail: "Global edge network, SSL, and uptime monitoring included." },
      { bold: "7-Day Launch Guarantee", detail: "From deposit to live site in 7 calendar days, or we extend support at no charge." },
    ],
    process: [
      { title: "AI Discovery", description: "Our Intel Agent reads your reviews, category, and reputation signals. No intake forms, no 20-page discovery docs." },
      { title: "Design + Build", description: "Custom niche design generated from your actual reputation. Built on Next.js for speed and SEO." },
      { title: "AI Agent Training", description: "Booking agent trained on your services, pricing, and availability. Specific to your business, not a generic script." },
      { title: "QA + Your Review", description: "Full walkthrough video delivered. You review, request adjustments. One revision round included." },
      { title: "Launch", description: "Domain connected, SSL live, AI agent active. Your digital employee starts its first shift." },
    ],
    milestones: [
      { label: "Deposit (50%)", dueAt: "Due at checkout · secures your start date", price: "$750" },
      { label: "Final Payment (50%)", dueAt: "Due at launch", price: "$750" },
    ],
    projectDuration: "7 days",
    ctaLabel: "Start Build — Pay $750 Deposit",
    ctaHref: "/contact?package=ai-website-quickstart-ul",
  },

  {
    slug: "ai-website-concierge-tp",
    name: "AI Website Concierge",
    tagline:
      "The tech-enabled premium core offer. Richer integrations, concierge-tier management, premium UX. For med spas, solar, and high-ticket services.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$3,500",
    priceSub: "split 50/50 · deposit secures your start date",
    qualificationProfile: "tech_enabled_premium",
    stripeDepositPriceId: "price_1TOS2IRVuKVVmtoDRaFgSq0O",
    stripeFinalPriceId: "price_1TOS2JRVuKVVmtoDe0ONyehM",
    stripeDepositLink: "https://portal.flynerd.tech/b/00wdRbaq13F6f2j8ymbo40f",
    stripeFinalLink: "https://portal.flynerd.tech/b/6oU8wR69L1wY9HZ7uibo40g",
    featured: true,
    about: [
      "For businesses where every lead is worth hundreds or thousands and the website needs to behave like a premium brand asset, not a billboard. The Concierge tier is the Quickstart foundation plus advanced personalization, richer integrations, and concierge project management.",
      "Best fit: med spas, aesthetics, solar, legal, high-ticket home services, and other categories where your audience expects polish and where your conversion path involves multiple touchpoints before booking.",
      "Everything in AI Website Quickstart plus custom treatment/service detail pages, advanced booking platform integration (Zenoti, Vagaro, or equivalent), deeper CRM wiring, and a hands-on project manager for the duration.",
    ],
    inThePackage: [
      { bold: "Everything in AI Website Quickstart", detail: "AI booking agent, AI-informed design, CRM routing, local SEO, Vercel hosting." },
      { bold: "Treatment / Service Detail Pages", detail: "Each offering gets its own page with pricing, provider info, and conversion-optimized copy." },
      { bold: "Advanced Booking Integration", detail: "Direct integration with Zenoti, Vagaro, Boulevard, Calendly, Cal.com, or your existing tool." },
      { bold: "Premium Visual Treatment", detail: "Hero photography, video backgrounds, and brand-tier design systems. Not a stock template." },
      { bold: "CRM Deep Wire", detail: "Lead scoring, pipeline stages, and post-booking automations wired into your CRM or we set one up." },
      { bold: "Concierge Project Management", detail: "Dedicated PM through launch. Weekly check-ins, Slack or email, not a ticket queue." },
    ],
    process: [
      { title: "Concierge Intake", description: "Scoped 60-minute call covering services, integrations, content, and brand direction. No forms to fill." },
      { title: "Design + Build", description: "Custom premium design system built around your real brand and services. Integrated with your booking tool." },
      { title: "AI Agent + Automation Training", description: "Booking agent trained on full service catalog; CRM automations built to match your pipeline." },
      { title: "Client Review + QA", description: "Full walkthrough. You test every page, every flow. Two revision rounds included." },
      { title: "Launch + 14-Day Concierge Support", description: "Domain live, agent active, 14 days of concierge post-launch support." },
    ],
    milestones: [
      { label: "Deposit (50%)", dueAt: "Due at checkout · secures your start date", price: "$1,750" },
      { label: "Final Payment (50%)", dueAt: "Due at launch", price: "$1,750" },
    ],
    projectDuration: "2-3 weeks",
    ctaLabel: "Start Build — Pay $1,750 Deposit",
    ctaHref: "/contact?package=ai-website-concierge-tp",
  },

  // ─────────────────────────────────────────
  // PROJECT SERVICES — Universal
  // ─────────────────────────────────────────

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
      { title: "Audit + Analysis", description: "We document your stack, score each automation opportunity, and build your prioritized roadmap within 48 hours of the call." },
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
    slug: "automation-sprint-build",
    name: "Automation Sprint Build",
    tagline:
      "One high-impact automation built end-to-end with up to 3 tool integrations, QA, documentation, and a 14-day support window.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$1,500",
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
      { label: "Project Deposit (50%)", dueAt: "Due at checkout · secures your start date", price: "$750" },
      { label: "Final Payment (50%)", dueAt: "Due on delivery", price: "$750" },
    ],
    projectDuration: "1–2 weeks",
    ctaLabel: "Start Build — Pay $750 Deposit",
    ctaHref: "/contact?package=automation-sprint-build",
  },

  {
    slug: "ai-concierge-launch",
    name: "AI Concierge Launch",
    tagline:
      "A fully deployed AI lead or support agent — channel setup, knowledge base, qualification flow, CRM integration, and handoff training.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$3,000",
    priceSub: "split 50/50 · deposit secures your start date",
    stripeDepositPriceId: "price_1TOS2ORVuKVVmtoDUlLySaPP",
    stripeFinalPriceId: "price_1TOS2PRVuKVVmtoDm2aUsOAU",
    stripeDepositLink: "https://portal.flynerd.tech/b/14AdRb69LgrS2fxbKybo40k",
    stripeFinalLink: "https://portal.flynerd.tech/b/7sYfZjbu56RibQ77uibo40l",
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
      { label: "Project Deposit (50%)", dueAt: "Due at checkout · secures your start date", price: "$1,500" },
      { label: "Final Payment (50%)", dueAt: "Due on launch", price: "$1,500" },
    ],
    projectDuration: "2–3 weeks",
    ctaLabel: "Launch Agent — Pay $1,500 Deposit",
    ctaHref: "/contact?package=ai-concierge",
  },

  // ─────────────────────────────────────────
  // ADD-ONS — One-time
  // ─────────────────────────────────────────

  {
    slug: "email-migration",
    name: "Email Migration",
    tagline:
      "Move your business email from Wix, GoDaddy, or any IMAP provider to Google Workspace. Up to 10 mailboxes, 7-day delivery.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$995",
    priceSub: "one-time · up to 10 mailboxes",
    stripeDepositPriceId: "price_1TOS2dRVuKVVmtoDuf1yCJxm",
    stripeDepositLink: "https://portal.flynerd.tech/b/eVq6oJ55Ha3u4nF8ymbo40z",
    about: [
      "If your email lives on a legacy host (Wix Mail, GoDaddy, or any IMAP-only provider), you're paying for an inbox that doesn't integrate with Google Calendar, Drive, or Workspace collaboration. Email Migration moves all of it to a clean Google Workspace setup with zero downtime.",
      "We handle domain verification, mailbox provisioning, MX cutover, client reconfiguration, and full incoming/outgoing verification. Current email only — if you want historical archives migrated, add the Historical Email Transfer upsell.",
      "Best for small teams with 1-10 mailboxes that have outgrown their legacy email host and want Workspace-tier collaboration.",
    ],
    inThePackage: [
      { bold: "Google Workspace Setup", detail: "New Workspace tenant, domain verification, user provisioning, and billing transferred or established." },
      { bold: "Mailbox Migration (1-10)", detail: "Each mailbox moved from your legacy host to Google Workspace. Current email only; no data loss on active messages." },
      { bold: "MX + DNS Cutover", detail: "DNS records updated with a rollback-safe cutover window. No dropped emails during transition." },
      { bold: "Client Reconfiguration", detail: "Desktop + mobile email clients reconfigured for each mailbox so nothing breaks for your team." },
      { bold: "Incoming + Outgoing Verification", detail: "Post-cutover test suite across every mailbox confirms real-world delivery." },
    ],
    process: [
      { title: "Scoping Call", description: "15-minute call to confirm source provider, mailbox list, and any aliases or distribution groups to preserve." },
      { title: "Workspace Build", description: "New tenant created, users provisioned, domain verified, billing set. Nothing cut over yet." },
      { title: "Migration + Cutover", description: "Mailboxes migrated, MX updated, clients reconfigured. Cutover window is 1-2 hours of reduced delivery risk." },
      { title: "Verification + Handoff", description: "Full delivery test across every mailbox. Admin credentials handed off with a written runbook." },
    ],
    milestones: [
      { label: "Email Migration", dueAt: "Due at booking", price: "$995" },
    ],
    projectDuration: "7 days",
    ctaLabel: "Start Migration — Pay $995",
    ctaHref: "/contact?package=email-migration",
  },

  {
    slug: "historical-email-transfer",
    name: "Historical Email Transfer",
    tagline:
      "Ingest prior email archives (PST/MBOX) into your Google Workspace mailboxes with folder structure preserved.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$495",
    priceSub: "one-time · upsell to Email Migration",
    stripeDepositPriceId: "price_1TOS2eRVuKVVmtoDPkxwguGu",
    stripeDepositLink: "https://portal.flynerd.tech/b/aFa8wR69L2B2g6ndSGbo40A",
    about: [
      "Email Migration moves your current mail. Historical Email Transfer moves your past — years of archived messages, contracts, and customer threads — into the same Workspace mailboxes without losing folder structure or metadata.",
      "Works with PST exports from Outlook, MBOX exports from most email clients, and direct IMAP archive sources. Best sold alongside Email Migration, but available standalone if you're already on Workspace.",
    ],
    inThePackage: [
      { bold: "Archive Intake", detail: "We accept PST, MBOX, or IMAP archive sources. No size limit within reason (multi-GB archives supported)." },
      { bold: "Folder Structure Preserved", detail: "Your old folder hierarchy is replicated in the new Workspace mailbox — nothing flattened into Inbox." },
      { bold: "Metadata Preserved", detail: "Sent dates, original recipients, and thread context preserved on every message." },
      { bold: "De-duplication", detail: "Duplicate messages (e.g. already migrated as 'current email') are detected and skipped." },
    ],
    process: [
      { title: "Archive Handoff", description: "You export PST/MBOX or grant IMAP access. We confirm archive size and scope." },
      { title: "Ingest + Verify", description: "Archive is ingested into Google Workspace, folder structure reconstructed, and checksum verified." },
      { title: "Client Review", description: "You spot-check the migrated archive. Any gaps are re-ingested before sign-off." },
    ],
    milestones: [
      { label: "Historical Email Transfer", dueAt: "Due at booking", price: "$495" },
    ],
    projectDuration: "3-5 days",
    ctaLabel: "Add Historical Transfer — $495",
    ctaHref: "/contact?package=historical-email-transfer",
  },

  {
    slug: "automation-journey-lite",
    name: "Automation Journey Build (Lite)",
    tagline:
      "A 3-stage automated customer journey: intake trigger, middle-stage nurture, conversion step. Fixed scope.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$1,200",
    priceSub: "one-time · 3-stage journey",
    stripeDepositPriceId: "price_1TOS2YRVuKVVmtoDbTWdXKtJ",
    stripeDepositLink: "https://portal.flynerd.tech/b/fZu4gBgOpdfG07p6qebo40u",
    about: [
      "A customer journey is a multi-step automation that guides a lead from first contact to conversion. The Lite tier gives you three stages built end-to-end: intake trigger, middle-stage nurture, and a conversion step.",
      "Best for simple funnels: lead magnet download, nurture email, booking prompt. Or: quote request, follow-up, proposal send. If you need branching logic or more stages, step up to Pro.",
    ],
    inThePackage: [
      { bold: "3-Stage Journey", detail: "Intake trigger + middle-stage nurture + conversion step, all wired end-to-end in your existing CRM or email platform." },
      { bold: "Copy + Assets", detail: "All stage content (email copy, subject lines, CTAs) written and QA'd before launch." },
      { bold: "Tracking + Reporting Setup", detail: "Journey stages wired to your analytics so you see where leads convert and where they drop." },
      { bold: "14-Day Support Window", detail: "Post-launch adjustments and tuning for two weeks." },
    ],
    process: [
      { title: "Journey Mapping", description: "We map the 3 stages with you: trigger event, nurture content, conversion action." },
      { title: "Build + Copy", description: "All stages built in your CRM; all content written. QA'd before it goes live." },
      { title: "Launch + Tune", description: "Journey goes live. 14-day support window begins for copy tweaks and timing adjustments." },
    ],
    milestones: [
      { label: "Journey Build", dueAt: "Due at booking", price: "$1,200" },
    ],
    projectDuration: "1-2 weeks",
    ctaLabel: "Start Journey — Pay $1,200",
    ctaHref: "/contact?package=automation-journey-lite",
  },

  {
    slug: "automation-journey-pro",
    name: "Automation Journey Build (Pro)",
    tagline:
      "A 6-stage automated journey: multi-step nurture, lead scoring, branching logic, and conversion handoff.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$2,400",
    priceSub: "one-time · 6-stage journey",
    stripeDepositPriceId: "price_1TOS2ZRVuKVVmtoDSSUrKn1M",
    stripeDepositLink: "https://portal.flynerd.tech/b/6oUaEZ0Pr7Vm8DV15Ubo40v",
    about: [
      "The Pro tier covers longer, branched customer journeys with 6 stages: intake, multi-touch nurture, lead scoring, branching decision points, and conversion handoff.",
      "Best for higher-value funnels where lead-to-customer takes more than one touchpoint: consultation bookings, high-ticket e-commerce, B2B outbound, multi-stage application processes.",
    ],
    inThePackage: [
      { bold: "6-Stage Journey", detail: "Full journey built end-to-end including branching logic based on behavior or attributes." },
      { bold: "Lead Scoring Model", detail: "Score model wired so hot leads route to sales and cool leads stay in nurture." },
      { bold: "Copy + Assets", detail: "All stage content written, tested, and QA'd before launch." },
      { bold: "Behavioral Triggers", detail: "Journey branches based on opens, clicks, form fills, or custom events." },
      { bold: "Tracking + Reporting Setup", detail: "Full journey analytics wired to your reporting tool so you see per-stage conversion." },
      { bold: "14-Day Support Window", detail: "Post-launch adjustments and tuning for two weeks." },
    ],
    process: [
      { title: "Journey Mapping", description: "We map the full 6-stage flow including branch points, lead scoring thresholds, and handoff logic." },
      { title: "Build + Copy", description: "All stages built, all content written. Lead scoring model calibrated." },
      { title: "QA + Launch", description: "Full test across both branches. Journey goes live." },
      { title: "Tune", description: "14-day support window for behavioral trigger adjustments and copy tweaks." },
    ],
    milestones: [
      { label: "Journey Build (Pro)", dueAt: "Due at booking", price: "$2,400" },
    ],
    projectDuration: "2-3 weeks",
    ctaLabel: "Start Journey — Pay $2,400",
    ctaHref: "/contact?package=automation-journey-pro",
  },

  {
    slug: "integration-pack-standard",
    name: "Integration Pack (Standard)",
    tagline: "One tool-to-tool integration, clean and documented.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$350",
    priceSub: "one-time · 1 integration",
    stripeDepositPriceId: "price_1TOS2aRVuKVVmtoDZgUNhA6n",
    stripeDepositLink: "https://portal.flynerd.tech/b/cNi14p2Xz0sUg6ncOCbo40w",
    about: [
      "You have two tools that don't talk to each other. Form to CRM, booking to calendar, payment to CRM, whatever. The Standard Integration Pack wires them together cleanly — API- or webhook-based, documented, and QA'd.",
      "Built as a single-purpose engagement for when you already know exactly what you need.",
    ],
    inThePackage: [
      { bold: "One Integration", detail: "Direct API, webhook, or Zapier/Make middleware — whichever is right for the tools involved." },
      { bold: "Field Mapping", detail: "Every field mapped correctly between the two systems. No data loss, no duplicate records." },
      { bold: "Error Handling", detail: "Retry logic and failure alerts so a third-party API hiccup doesn't break your pipeline silently." },
      { bold: "Documentation", detail: "Written runbook so your team knows how to troubleshoot or modify later." },
    ],
    process: [
      { title: "Scope", description: "We confirm the two tools, the trigger event, and the fields that should move between them." },
      { title: "Build + QA", description: "Integration built, tested across edge cases, and documented." },
      { title: "Handoff", description: "You receive credentials, runbook, and a 7-day support window for adjustments." },
    ],
    milestones: [
      { label: "Integration Pack", dueAt: "Due at booking", price: "$350" },
    ],
    projectDuration: "3-5 days",
    ctaLabel: "Start Integration — $350",
    ctaHref: "/contact?package=integration-pack-standard",
  },

  {
    slug: "integration-pack-advanced",
    name: "Integration Pack (Advanced)",
    tagline: "2-3 integrations with custom business logic and error handling.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$900",
    priceSub: "one-time · 2-3 integrations",
    stripeDepositPriceId: "price_1TOS2bRVuKVVmtoDhHN5uQdu",
    stripeDepositLink: "https://portal.flynerd.tech/b/00w7sN69L6Ri3jB5mabo40x",
    about: [
      "For multi-tool workflows where data needs to stay in sync across 2-3 systems with non-trivial business logic. Think: booking creates a CRM deal which triggers an invoice which syncs to accounting.",
      "Includes custom logic that Zapier alone can't handle cleanly.",
    ],
    inThePackage: [
      { bold: "2-3 Integrations", detail: "Cross-tool wiring with bidirectional sync where needed." },
      { bold: "Custom Business Logic", detail: "Conditional routing, field transformations, and multi-step processing that off-the-shelf middleware can't handle." },
      { bold: "Full Error Handling", detail: "Retry logic, fallback paths, and alerting across every integration." },
      { bold: "Documentation + Runbook", detail: "Written SOP covering all flows and troubleshooting steps." },
      { bold: "14-Day Support Window", detail: "Post-launch adjustments and edge-case tuning." },
    ],
    process: [
      { title: "Scope + Architecture", description: "We map every flow, every field, every edge case before build begins." },
      { title: "Build + QA", description: "Each integration built and tested independently, then tested as a full multi-tool system." },
      { title: "Launch + Support", description: "14-day support window for production edge cases." },
    ],
    milestones: [
      { label: "Advanced Integration Pack", dueAt: "Due at booking", price: "$900" },
    ],
    projectDuration: "1-2 weeks",
    ctaLabel: "Start Integration — $900",
    ctaHref: "/contact?package=integration-pack-advanced",
  },

  // ─────────────────────────────────────────
  // AUTOMATION RETAINERS — Monthly
  // ─────────────────────────────────────────

  {
    slug: "automation-care-plan",
    name: "Automation Care Plan",
    tagline:
      "Ongoing monitoring, issue triage, and iterative improvements for your active automations. No tickets go stale.",
    category: "Automation Retainer",
    categoryColor: "#a1a1aa",
    priceDisplay: "$997",
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
      { label: "Month 1", dueAt: "Due at signup", price: "$997" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$997/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Care Plan — $997/mo",
    ctaHref: "/contact?package=automation-care",
  },

  {
    slug: "growth-ops-partner",
    name: "Growth Ops Partner",
    tagline:
      "Multi-workflow execution, advanced automation experiments, cross-channel reporting, and a dedicated ops partner — every month.",
    category: "Automation Retainer",
    categoryColor: "#a1a1aa",
    priceDisplay: "$1,997",
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
      { label: "Month 1", dueAt: "Due at signup", price: "$1,997" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$1,997/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Apply — $1,997/mo",
    ctaHref: "/contact?package=growth-ops",
  },

  {
    slug: "scale-ops-partner",
    name: "Scale Ops Partner",
    tagline:
      "Enterprise-grade automation partnership: SLA-backed support, multi-location capacity, unlimited initiatives within scope.",
    category: "Automation Retainer",
    categoryColor: "#a1a1aa",
    priceDisplay: "$3,497",
    priceSub: "/month · cancel anytime with 30 days notice",
    stripeMonthlyPriceId: "price_1TOS2SRVuKVVmtoDtdqXTmMS",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/6oU5kF8hT7Vm7zR01Qbo40o",
    about: [
      "For multi-location operations, enterprise accounts, or high-growth companies where automation capacity is the limiting factor. Scale Ops Partner is the top-tier FlyNerd retainer: SLA-backed support, multi-location automation capacity, and unlimited initiatives within scope.",
      "Everything in Growth Ops Partner plus dedicated SLA windows, same-day response on critical issues, executive quarterly reviews, and location-aware rollouts for franchised or multi-site businesses.",
    ],
    inThePackage: [
      { bold: "Everything in Growth Ops Partner", detail: "All monthly operations, reporting, multi-workflow execution, and quarterly roadmaps included." },
      { bold: "SLA-Backed Support", detail: "Defined response windows for critical, major, and minor issues. Written into the engagement." },
      { bold: "Multi-Location Capacity", detail: "Automation deployment across multiple locations with location-specific logic and reporting." },
      { bold: "Unlimited Initiatives (Within Scope)", detail: "No per-month ticket cap. Initiatives are prioritized but not rationed." },
      { bold: "Executive Quarterly Review", detail: "Strategic session with your leadership team each quarter covering ROI, roadmap, and investment priorities." },
      { bold: "Direct Slack + Phone Support", detail: "Dedicated Slack channel plus phone support for critical escalations." },
    ],
    process: [
      { title: "Kickoff + Multi-Location Audit", description: "Full audit across every location/system. 90-day scaling roadmap set in week one." },
      { title: "Rolling Sprint Execution", description: "Continuous sprint model — initiatives flow based on priority, not monthly caps." },
      { title: "SLA Operations", description: "Critical issues responded to within the SLA window. All issues tracked in a shared dashboard." },
      { title: "Monthly + Quarterly Reviews", description: "Monthly performance report; quarterly executive review with leadership." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$3,497" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$3,497/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Apply — $3,497/mo",
    ctaHref: "/contact?package=scale-ops",
  },

  {
    slug: "priority-sla-support",
    name: "Priority SLA Support Add-on",
    tagline: "Same-business-day response on all support tickets. Stacks on any retainer.",
    category: "Automation Retainer",
    categoryColor: "#a1a1aa",
    priceDisplay: "$300",
    priceSub: "/month · stacks on any retainer",
    stripeMonthlyPriceId: "price_1TOS2cRVuKVVmtoDHxJjVSED",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/bJebJ341DcbCbQ7cOCbo40y",
    about: [
      "An add-on for clients who need tighter response SLAs than what's built into their base retainer. Same-business-day response on every ticket, Monday through Friday.",
      "Stacks on top of Automation Care Plan, Growth Ops Partner, or Scale Ops Partner. Does not shorten Scale Ops' built-in SLA further; use it to upgrade Care Plan or Growth Ops specifically.",
    ],
    inThePackage: [
      { bold: "Same-Business-Day Response", detail: "Every ticket gets a real human response within the same business day (M-F)." },
      { bold: "Priority Queue", detail: "Your tickets move ahead of non-SLA tickets in our queue." },
      { bold: "Dedicated Slack or Email", detail: "Direct line so tickets don't sit in a shared form inbox." },
    ],
    process: [
      { title: "Activation", description: "Added to your retainer on next billing cycle. No additional onboarding needed." },
      { title: "Ongoing", description: "Tickets route to priority queue automatically. Monthly report reflects SLA adherence." },
    ],
    milestones: [
      { label: "Monthly", dueAt: "Billed monthly", price: "$300/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Add SLA — $300/mo",
    ctaHref: "/contact?package=priority-sla",
  },

  // ─────────────────────────────────────────
  // SEO & MARKETING — Monthly
  // ─────────────────────────────────────────

  {
    slug: "local-seo-foundation",
    name: "Local SEO Foundation",
    tagline:
      "Monthly SEO for local businesses building their search presence from zero — 40 keywords, GBP management, citations, and blog content.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$699",
    priceSub: "/month · cancel anytime",
    stripeMonthlyPriceId: "price_1TOS2VRVuKVVmtoDSTUIWnt1",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/28EcN741D3F61bt3e2bo40r",
    about: [
      "If your business doesn't appear in local search results, you're invisible to the customers actively looking for what you do. Local SEO Foundation builds the technical and content foundation that local search rewards.",
      "We manage up to 40 target keywords, handle your Google Business Profile, build local citations, create two SEO-optimized blog posts per month, and implement schema markup — all with a monthly performance report.",
      "Best for local service businesses that currently have little to no search presence and want to build it systematically over 6-12 months.",
    ],
    inThePackage: [
      { bold: "Up to 40 Target Keywords", detail: "Research-backed keyword strategy focused on high-intent local search terms for your niche." },
      { bold: "On-Page Optimization", detail: "Title tags, meta descriptions, headers, and content structured for search engines and humans." },
      { bold: "Google Business Profile Management", detail: "Full GBP optimization, post cadence, Q&A monitoring, and review response strategy." },
      { bold: "Local Citations", detail: "Consistent NAP (name, address, phone) across key directories that local search engines trust." },
      { bold: "2 Blog Posts/Month", detail: "SEO-optimized content targeting your top local keywords and service pages." },
      { bold: "Schema Markup", detail: "Structured data implementation to help search engines understand your business type and offerings." },
    ],
    process: [
      { title: "Audit + Strategy", description: "We audit your current search presence, identify your strongest keyword opportunities, and set the 90-day SEO roadmap." },
      { title: "Technical Foundation", description: "On-page optimization, schema markup, and GBP setup completed in the first 30 days." },
      { title: "Ongoing Content + Citations", description: "Monthly blog content published, citations built, and GBP kept active with regular posts." },
      { title: "Monthly Report", description: "Keyword rankings, GBP impressions, organic traffic, and citation growth reported monthly." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$699" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$699/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start SEO — $699/mo",
    ctaHref: "/contact?package=local-seo",
  },

  {
    slug: "competitive-seo-reputation",
    name: "Competitive SEO + Reputation Management",
    tagline:
      "Full-scale SEO for competitive markets: 80 keywords, E-E-A-T authority, AI search optimization, link building, and reputation offset content.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$1,499",
    priceSub: "/month · cancel anytime",
    stripeMonthlyPriceId: "price_1TOS2WRVuKVVmtoDkw3vMhIE",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/aFa00l2Xz1wYbQ76qebo40s",
    about: [
      "You're in a competitive market, and ranking isn't enough — you need to own the conversation. Competitive SEO + Reputation Management is designed for businesses that need high-volume keyword coverage, authoritative content, and active reputation control.",
      "We target up to 80 keywords, run a full E-E-A-T audit, optimize for voice and AI search, publish four long-form blog posts per month, build authority links, and actively manage your branded search results.",
      "Includes a monthly performance report and strategy call so you always know exactly where you stand.",
    ],
    inThePackage: [
      { bold: "Up to 80 Target Keywords", detail: "Comprehensive keyword strategy covering head terms, long-tail, and local intent variations." },
      { bold: "E-E-A-T Audit + Implementation", detail: "Experience, Expertise, Authoritativeness, and Trustworthiness signals built into your content and technical structure." },
      { bold: "Voice + AI Search Optimization", detail: "Content structured for featured snippets, voice results, and AI-generated answer boxes." },
      { bold: "4 Authority Blog Posts/Month", detail: "Long-form, thoroughly researched content targeting your highest-value keyword clusters." },
      { bold: "Competitor Gap Analysis", detail: "Monthly review of where competitors are outranking you and a plan to close the gap." },
      { bold: "Link Building", detail: "Outreach-based link acquisition to build domain authority in your niche." },
      { bold: "Reputation Management", detail: "Branded search monitoring, review response strategy, and reputation offset content to push negative results down." },
    ],
    process: [
      { title: "Audit + Strategy", description: "Comprehensive SEO audit, reputation scan, competitor analysis, and 90-day roadmap built in the first two weeks." },
      { title: "Technical + Content Foundation", description: "E-E-A-T implementation, on-page optimization, and first batch of authority content published." },
      { title: "Ongoing Execution", description: "Monthly content cadence, link building, competitor gap work, and GBP management." },
      { title: "Monthly Report + Call", description: "Full performance review with rankings, traffic, reputation signals, and next month's priorities." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$1,499" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$1,499/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Competitive SEO — $1,499/mo",
    ctaHref: "/contact?package=competitive-seo",
  },

  {
    slug: "authority-seo-geo",
    name: "Authority SEO + GEO",
    tagline:
      "Top-tier SEO and Generative Engine Optimization — built for businesses that want to own their category in Google, ChatGPT, and Perplexity.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$2,499",
    priceSub: "/month · cancel anytime",
    stripeMonthlyPriceId: "price_1TOS2XRVuKVVmtoDFXw6iE12",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/bJefZj69L6Ri7zRbKybo40t",
    featured: true,
    about: [
      "Search is no longer just Google. AI answer engines — ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot — are increasingly where your customers get answers. If your business isn't optimized to appear in those results, you're invisible to a growing segment of high-intent searchers.",
      "Authority SEO + GEO is our top-tier monthly retainer for businesses that want to dominate both traditional search and the new generation of AI-powered answer engines. It includes everything in the Competitive SEO + Reputation package, plus GEO-specific optimization, six long-form authority posts per month, digital PR link building, and brand mention monitoring across AI platforms.",
      "This is the package for category leaders — businesses in competitive markets who want to be the definitive answer, not just one of the results.",
    ],
    inThePackage: [
      { bold: "Everything in Competitive SEO + Reputation", detail: "80 keywords, E-E-A-T, 4 blog posts, link building, reputation offset content, and monthly report/call." },
      { bold: "GEO — Generative Engine Optimization", detail: "Content and schema structured to appear in Google AI Overviews, ChatGPT citations, and Perplexity answers." },
      { bold: "6 Authority Posts/Month", detail: "Long-form pillar and cluster content targeting your highest-value keyword groups and AI citation opportunities." },
      { bold: "Digital PR Link Building", detail: "Outreach-based coverage in industry publications and local media to build domain authority at scale." },
      { bold: "Brand Mention Monitoring Across AI Platforms", detail: "We track where your brand is (and isn't) showing up in AI-generated answers — and fix the gaps." },
      { bold: "Pillar + Cluster Content Strategy", detail: "Full topical authority architecture — pillar pages supported by a network of cluster content that signals deep expertise." },
      { bold: "Structured Data for AI Crawlers", detail: "Advanced schema markup (FAQ, HowTo, Speakable, LocalBusiness) that makes your content machine-readable for AI engines." },
      { bold: "Dedicated Strategist", detail: "One strategist owns your account. Monthly strategy call included." },
    ],
    process: [
      { title: "Authority Audit", description: "Full audit of your current search presence, topical authority gaps, AI citation status, and reputation signals. 90-day roadmap built in week one." },
      { title: "Pillar + Cluster Architecture", description: "We design your full content architecture — pillar pages, cluster topics, and GEO-optimized FAQ structures." },
      { title: "Technical + GEO Foundation", description: "Advanced schema, E-E-A-T signals, and AI-readability improvements implemented in month one." },
      { title: "Ongoing Content + PR", description: "Six posts per month published, digital PR outreach running, AI platform monitoring active." },
      { title: "Monthly Report + Strategy Call", description: "Full performance review — traditional rankings, AI citation appearances, domain authority trends, and next-month priorities." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$2,499" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$2,499/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Authority SEO — $2,499/mo",
    ctaHref: "/contact?package=authority-seo-geo",
  },

  {
    slug: "reputation-management-lite",
    name: "Reputation Management Lite",
    tagline:
      "Per-location review request management and response template library. For businesses building their review base.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$299",
    priceSub: "/month · per location",
    stripeMonthlyPriceId: "price_1TOS2TRVuKVVmtoDqQjipzyS",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/4gMaEZ55H3F64nF3e2bo40p",
    about: [
      "Reviews are the second-most-read content on any local business's online footprint after your hours. If you don't have a system for requesting reviews, you're losing out to competitors who do.",
      "Reputation Management Lite gives you the foundation: automated review request cadence after every customer interaction, a library of response templates for your team, and light response coaching so your replies feel on-brand.",
    ],
    inThePackage: [
      { bold: "Automated Review Requests", detail: "Post-service review request sequence that nudges satisfied customers without pestering them." },
      { bold: "Response Template Library", detail: "Pre-written response templates for positive, neutral, and negative reviews. Your team fills in the name and hits send." },
      { bold: "Light Response Coaching", detail: "Monthly review of your team's actual responses with specific improvement notes." },
      { bold: "Multi-Platform Coverage", detail: "Requests routed to Google, Yelp, Facebook, or your preferred platform mix." },
    ],
    process: [
      { title: "Setup", description: "Review request automation wired to your CRM or POS. Templates customized for your brand voice." },
      { title: "Monthly Operations", description: "Requests go out automatically; your team handles responses using the templates." },
      { title: "Monthly Report", description: "Review count, star rating, and response quality summary each month." },
    ],
    milestones: [
      { label: "Monthly (per location)", dueAt: "Billed monthly", price: "$299/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Rep Lite — $299/mo",
    ctaHref: "/contact?package=reputation-lite",
  },

  {
    slug: "reputation-management-growth",
    name: "Reputation Management Growth",
    tagline:
      "Per-location active reputation management: escalation handling, negative review offset content, direct response drafting.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$599",
    priceSub: "/month · per location",
    stripeMonthlyPriceId: "price_1TOS2URVuKVVmtoDWmi8bkng",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/8x27sNaq1cbCg6n01Qbo40q",
    about: [
      "For businesses where reputation is a conversion lever — a bad review in the top results can cost deals. Reputation Management Growth is active management: we draft every response, escalate problems, and push offset content when your branded search is weighed down by negative results.",
      "Per-location pricing. Best for med spas, law firms, dental practices, and other high-ticket local services.",
    ],
    inThePackage: [
      { bold: "Active Response Management", detail: "We draft every review response for you within 24 hours. You approve, we publish." },
      { bold: "Escalation Handling", detail: "Negative reviews and complaints escalated to your team with a recommended resolution path." },
      { bold: "Reputation Offset Content", detail: "Branded content and press published to push negative results down in search." },
      { bold: "Branded Search Monitoring", detail: "Weekly scan of your branded search results with alerts on new negative content." },
      { bold: "Monthly Reputation Report", detail: "Review growth, response quality, branded search health, and offset content performance." },
    ],
    process: [
      { title: "Reputation Audit", description: "Full baseline audit of your current reviews, branded search results, and risk areas." },
      { title: "Monthly Operations", description: "Active response drafting, escalation routing, and offset content publishing." },
      { title: "Monthly Report", description: "Reputation health dashboard delivered monthly with specific next-month priorities." },
    ],
    milestones: [
      { label: "Monthly (per location)", dueAt: "Billed monthly", price: "$599/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Rep Growth — $599/mo",
    ctaHref: "/contact?package=reputation-growth",
  },
];

// All category groups for the services grid
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
  {
    label: "SEO & Marketing",
    tag: "Monthly",
    tagColor: "var(--accent)",
    tagBorder: "var(--accent)",
    filter: (s: Service) => s.category === "SEO & Marketing",
  },
];
