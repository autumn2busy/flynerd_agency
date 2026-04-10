export interface ServiceMilestone {
  label: string;
  dueAt: string;
  price: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

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
  stripeDepositPriceId?: string;
  stripeFinalPriceId?: string;
  stripeMonthlyPriceId?: string;
  stripeDepositLink?: string;   // portal.flynerd.tech payment link
  stripeFinalLink?: string;
  stripeMonthlyLink?: string;
  featured?: boolean;
}

export const SERVICES: Service[] = [

  // ─────────────────────────────────────────
  // ONE-TIME PROJECT SERVICES
  // ─────────────────────────────────────────

  {
    slug: "automation-audit",
    name: "Automation Audit + Roadmap",
    tagline: "A 60-90 minute systems audit, 3 quick wins, and a 30-day implementation roadmap — before we build anything.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$495",
    priceSub: "one-time · credited toward any build",
    stripeDepositPriceId: "price_1TDr8NRVuKVVmtoDxjmFLW6M",
    stripeDepositLink: "https://portal.flynerd.tech/b/6oU4gBeGhcbCf2jbKybo400",
    about: [
      "Before building anything, you need to know what to build — and in what order. The Automation Audit is a focused 60-90 minute strategy session followed by a complete written analysis of your current tech stack, workflows, and automation gaps.",
      "We identify your three highest-impact quick wins, rank every opportunity by ROI, and hand you a 30-day implementation roadmap you can execute with or without us.",
      "The $495 fee is credited toward any Quickstart Workflow Build or AI Concierge package purchased within 30 days. Think of it as a paid scoping session that pays for itself.",
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
      { title: "Strategy Session", description: "60-90 minute video call. We go deep on your workflow, ask the questions your team never thought to ask, and map the full automation landscape." },
      { title: "Audit + Analysis", description: "We document your stack, score each automation opportunity, and build your prioritized roadmap within 48 hours of the call." },
      { title: "Roadmap Delivery", description: "Written 30-day roadmap delivered with tool recommendations, priority order, and estimated time savings per automation." },
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
    tagline: "One high-impact automation built end-to-end with up to 3 tool integrations, QA, documentation, and a 14-day support window.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$1,250",
    priceSub: "split 50/50 · deposit secures your start date",
    stripeDepositPriceId: "price_1TDrDPRVuKVVmtoDXipbO9KN",
    stripeFinalPriceId: "price_1TDrJsRVuKVVmtoD2f7QpFDP",
    stripeDepositLink: "https://portal.flynerd.tech/b/fZu6oJbu56RicUb4i6bo401",
    stripeFinalLink: "https://portal.flynerd.tech/b/4gMbJ3fKla3ug6n4i6bo402",
    about: [
      "You've identified the workflow that's costing you the most time or revenue. Now you need someone to build it correctly — with real integrations, proper error handling, and documentation your team can actually use.",
      "The Quickstart Workflow Build takes one fixed-scope automation and turns it into a production-ready system. From scoping and tool selection through QA, handoff, and 14-day post-launch support.",
      "Most common builds: lead capture to CRM, appointment booking flows, review request sequences, invoice follow-up automations, and internal operations triggers. If you're not sure which to build first, start with the Audit.",
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
      { title: "Scoping", description: "We define exact inputs, outputs, triggers, and edge cases. Scope is locked in writing before build begins — no scope creep, no surprises." },
      { title: "Build", description: "One production-ready automation built using your existing tools. We handle all configuration, API connections, and logic." },
      { title: "QA", description: "Full testing across live conditions — normal flow, edge cases, and failure handling confirmed before handoff." },
      { title: "Handoff", description: "Loom walkthrough + written SOP delivered. 14-day support window begins. Option to add the Automation Care Plan for ongoing maintenance." },
    ],
    milestones: [
      { label: "Project Deposit (50%)", dueAt: "Due at checkout · secures your start date", price: "$625" },
      { label: "Final Payment (50%)", dueAt: "Due on delivery", price: "$625" },
    ],
    projectDuration: "1–2 weeks",
    ctaLabel: "Start Build — Pay $625 Deposit",
    ctaHref: "/contact?package=workflow-build",
  },

  {
    slug: "ai-concierge-launch",
    name: "AI Concierge Launch",
    tagline: "A fully deployed AI lead or support agent — channel setup, knowledge base, qualification flow, CRM integration, and handoff training.",
    category: "Project",
    categoryColor: "var(--accent)",
    priceDisplay: "$2,400",
    priceSub: "split 50/50 · deposit secures your start date",
    stripeDepositPriceId: "price_1TDrLhRVuKVVmtoD0YfWNJ1D",
    stripeFinalPriceId: "price_1TDrRbRVuKVVmtoDAAlAFLAP",
    stripeDepositLink: "https://portal.flynerd.tech/b/dRm4gBeGh1wY1btaGubo403",
    stripeFinalLink: "https://portal.flynerd.tech/b/28E00lgOpa3u07p01Qbo404",
    featured: true,
    about: [
      "Your website should be answering questions, qualifying leads, and booking appointments around the clock. The AI Concierge Launch deploys a fully trained AI agent — customized to your exact services, pricing, and business logic — ready to handle real customer conversations.",
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
      { title: "Discovery", description: "We gather your service list, pricing, FAQs, team details, and service area. We also audit your current lead flow to identify where the agent should plug in." },
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

  // ─────────────────────────────────────────
  // AUTOMATION RETAINERS
  // ─────────────────────────────────────────

  {
    slug: "automation-care-plan",
    name: "Automation Care Plan",
    tagline: "Ongoing monitoring, issue triage, and iterative improvements for your active automations. No tickets go stale.",
    category: "Automation Retainer",
    categoryColor: "#a1a1aa",
    priceDisplay: "$750",
    priceSub: "/month · cancel anytime with 30 days notice",
    stripeMonthlyPriceId: "price_1TDrZGRVuKVVmtoDMa1UdeEg",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/6oU9AVdCd2B21bt3e2bo405",
    about: [
      "Automations break. APIs change. Business processes evolve. The Automation Care Plan keeps your systems healthy and improving without you needing to manage it yourself.",
      "Each month you get continuous health monitoring, two improvement tickets for enhancements or new micro-automations, rapid bug fixes, and a plain-English performance summary.",
      "Best for businesses running 1–3 core automations who want consistent improvement without hiring a full-time ops person. Month-to-month, 30-day notice to cancel.",
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
      { title: "Quarterly Review", description: "Every three months we review what's working, what's not, and plan the next quarter of improvements." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$750" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$750/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Automation Care — $750/mo",
    ctaHref: "/contact?package=automation-care",
  },

  {
    slug: "growth-ops-partner",
    name: "Growth Ops Partner",
    tagline: "Multi-workflow execution, advanced automation experiments, cross-channel reporting, and a dedicated ops partner — every month.",
    category: "Automation Retainer",
    categoryColor: "#a1a1aa",
    priceDisplay: "$1,800",
    priceSub: "/month · cancel anytime with 30 days notice",
    stripeMonthlyPriceId: "price_1TDrbDRVuKVVmtoDMtued2fJ",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/14A00lbu58Zq4nFdSGbo406",
    about: [
      "You're not missing automations — you're missing the capacity to build, manage, and improve them fast enough. The Growth Ops Partner gives you dedicated operations bandwidth every month: multi-workflow execution, advanced automation experiments, and a strategic partner who's thinking about your ops full-time.",
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
    ctaHref: "/contact?package=growth-ops",
  },

  // ─────────────────────────────────────────
  // SEO & MARKETING
  // ─────────────────────────────────────────

  {
    slug: "local-seo-foundation",
    name: "Local SEO Foundation",
    tagline: "Monthly SEO for local businesses building their search presence from zero — 40 keywords, GBP management, citations, and blog content.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$449",
    priceSub: "/month · cancel anytime",
    stripeMonthlyPriceId: "price_1THVEeRVuKVVmtoDzgXmycIa",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/14A4gBcy94Ja1bt4i6bo407",
    about: [
      "If your business doesn't appear in local search results, you're invisible to the customers actively looking for what you do. The Local SEO Foundation builds the technical and content foundation that local search rewards.",
      "We manage up to 40 target keywords, handle your Google Business Profile, build local citations, create two SEO-optimized blog posts per month, and implement schema markup — all with a monthly performance report so you see exactly what's improving.",
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
      { label: "Month 1", dueAt: "Due at signup", price: "$449" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$449/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start SEO — $449/mo",
    ctaHref: "/contact?package=local-seo",
  },

  {
    slug: "competitive-seo-reputation",
    name: "Competitive SEO + Reputation Management",
    tagline: "Full-scale SEO for competitive markets: 80 keywords, E-E-A-T authority, AI search optimization, link building, and reputation offset content.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$799",
    priceSub: "/month · cancel anytime",
    stripeMonthlyPriceId: "price_1THVEfRVuKVVmtoDjDrFJcfs",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/8x214peGha3ucUbcOCbo408",
    about: [
      "You're in a competitive market, and ranking isn't enough — you need to own the conversation. The Competitive SEO + Reputation Management retainer is designed for businesses that need high-volume keyword coverage, authoritative content, and active reputation control.",
      "We target up to 80 keywords, run a full E-E-A-T audit, optimize for voice and AI search, publish four long-form blog posts per month, build authority links, and actively manage your branded search results. If negative content, thin reviews, or competitor rankings are holding you back, this is the package that moves the needle.",
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
      { label: "Month 1", dueAt: "Due at signup", price: "$799" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$799/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Competitive SEO — $799/mo",
    ctaHref: "/contact?package=competitive-seo",
  },

  {
    slug: "authority-seo-aeo",
    name: "Authority SEO + AEO",
    tagline: "Top-tier SEO and Answer Engine Optimization — built for businesses that want to own their category in Google, ChatGPT, and Perplexity.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$1,299",
    priceSub: "/month · cancel anytime",
    stripeMonthlyPriceId: "price_1TKmKGRVuKVVmtoD4v40C0Xx",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/9B6dRb0Prb7yaM35mabo40c",
    about: [
      "Search is no longer just Google. AI answer engines — ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot — are increasingly where your customers get answers. If your business isn't optimized to appear in those results, you're invisible to a growing segment of high-intent searchers.",
      "Authority SEO + AEO is our top-tier monthly retainer for businesses that want to dominate both traditional search and the new generation of AI-powered answer engines. It includes everything in the Competitive SEO + Reputation package, plus AEO-specific optimization, six long-form authority posts per month, digital PR link building, and brand mention monitoring across AI platforms.",
      "This is the package for category leaders — businesses in competitive markets who want to be the definitive answer, not just one of the results.",
    ],
    inThePackage: [
      { bold: "Everything in Competitive SEO + Reputation", detail: "80 keywords, E-E-A-T, 4 blog posts, link building, reputation offset content, and monthly report/call." },
      { bold: "AEO — AI Overview Optimization", detail: "Content and schema structured to appear in Google AI Overviews, ChatGPT citations, and Perplexity answers." },
      { bold: "6 Authority Posts/Month", detail: "Long-form pillar and cluster content targeting your highest-value keyword groups and AI citation opportunities." },
      { bold: "Digital PR Link Building", detail: "Outreach-based coverage in industry publications and local media to build domain authority at scale." },
      { bold: "Brand Mention Monitoring Across AI Platforms", detail: "We track where your brand is (and isn't) showing up in AI-generated answers — and fix the gaps." },
      { bold: "Pillar + Cluster Content Strategy", detail: "Full topical authority architecture — pillar pages supported by a network of cluster content that signals deep expertise." },
      { bold: "Structured Data for AI Crawlers", detail: "Advanced schema markup (FAQ, HowTo, Speakable, LocalBusiness) that makes your content machine-readable for AI engines." },
      { bold: "Dedicated Strategist", detail: "One strategist owns your account. Monthly strategy call included." },
    ],
    process: [
      { title: "Authority Audit", description: "Full audit of your current search presence, topical authority gaps, AI citation status, and reputation signals. 90-day roadmap built in week one." },
      { title: "Pillar + Cluster Architecture", description: "We design your full content architecture — pillar pages, cluster topics, and AEO-optimized FAQ structures." },
      { title: "Technical + AEO Foundation", description: "Advanced schema, E-E-A-T signals, and AI-readability improvements implemented in month one." },
      { title: "Ongoing Content + PR", description: "Six posts per month published, digital PR outreach running, AI platform monitoring active." },
      { title: "Monthly Report + Strategy Call", description: "Full performance review — traditional rankings, AI citation appearances, domain authority trends, and next-month priorities." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$1,299" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$1,299/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Authority SEO — $1,299/mo",
    ctaHref: "/contact?package=authority-seo",
  },

  {
    slug: "b2b-email-marketing",
    name: "B2B Email Marketing",
    tagline: "Monthly email marketing for service businesses targeting commercial clients — 2 campaigns, brand-aligned design, copywriting, and reporting.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$399",
    priceSub: "/month · cancel anytime",
    stripeMonthlyPriceId: "price_1THVEiRVuKVVmtoDmjoTRrot",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/28EfZjgOpgrS1bt8ymbo40b",
    about: [
      "Your email list is an asset most service businesses completely underutilize. The B2B Email Marketing retainer turns it into a consistent revenue channel — with two campaigns per month, brand-aligned templates, and professional copywriting.",
      "We handle list segmentation and management, email design, copy, personalization, and reporting. If you're using ActiveCampaign, we integrate directly into your existing CRM and automation flows.",
      "Best for service businesses targeting commercial clients (facility managers, property managers, operations teams, procurement) where email is the primary business development channel.",
    ],
    inThePackage: [
      { bold: "2 Email Campaigns/Month", detail: "Two fully produced campaigns per month — from strategy and copy to design and send." },
      { bold: "List Segmentation + Management", detail: "Your list organized by segment, cleaned of inactive contacts, and managed for deliverability." },
      { bold: "Brand-Aligned Template Design", detail: "Email templates designed to match your brand identity — not generic." },
      { bold: "Copywriting + Personalization", detail: "Professional copy written for your audience with dynamic personalization where applicable." },
      { bold: "Open Rate + CTR Reporting", detail: "Monthly performance report with open rates, click-through rates, and campaign-level analysis." },
      { bold: "CRM Integration (ActiveCampaign-ready)", detail: "Campaigns wired into your ActiveCampaign account with proper tagging and automation triggers." },
    ],
    process: [
      { title: "Onboarding", description: "We audit your current email list, set up segmentation, and align on your campaign strategy and goals for the first 90 days." },
      { title: "Template + Brand Setup", description: "Email templates designed and approved in week one. All future campaigns use the approved design system." },
      { title: "Monthly Campaigns", description: "Two campaigns produced, approved, and sent each month — with at least 3 business days for your review before each send." },
      { title: "Monthly Reporting", description: "Performance summary with open rates, CTR, unsubscribes, and recommendations for the next month." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$399" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$399/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Email — $399/mo",
    ctaHref: "/contact?package=email-marketing",
  },

  {
    slug: "growth-retainer-bundle",
    name: "Growth Retainer Bundle",
    tagline: "All-in-one monthly growth package: Competitive SEO + Reputation Management + Site Care Plan — managed by one team.",
    category: "SEO & Marketing",
    categoryColor: "#00D4FF",
    priceDisplay: "$1,098",
    priceSub: "/month · save $49 vs individual pricing",
    stripeMonthlyPriceId: "price_1THVEhRVuKVVmtoD1ZftuZ6M",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/8x23cx41D0sUbQ7eWKbo40a",
    featured: true,
    about: [
      "The Growth Retainer Bundle is FlyNerd's recommended all-in-one monthly package for local service businesses ready to grow. It combines our Competitive SEO + Reputation Management retainer with the Site Care Plan — at a $49/month savings over individual pricing.",
      "Instead of juggling multiple vendors for SEO, reputation management, and website maintenance, you have one team handling everything. One report. One point of contact. One bill.",
      "Ideal for businesses with an established web presence that want to grow their search rankings, protect their brand reputation, and keep their site running at peak performance — without managing multiple contractors.",
    ],
    inThePackage: [
      { bold: "Full Competitive SEO + Reputation Package", detail: "80 keywords, E-E-A-T authority, AI search optimization, 4 blog posts/month, link building, and reputation management." },
      { bold: "Site Care Plan Included", detail: "Hosting management, uptime monitoring, 3 content updates/month, SSL + security checks, and priority async support." },
      { bold: "Unified Monthly Reporting", detail: "One consolidated report covering SEO performance, reputation signals, and site health." },
      { bold: "Single Point of Contact", detail: "One team handles everything — no juggling vendors or explaining your brand twice." },
      { bold: "Priority Support", detail: "Bundle clients get priority response across all services." },
    ],
    process: [
      { title: "Onboarding + Audit", description: "Simultaneous audit of your site health, search presence, and reputation signals. Unified 90-day roadmap built in week one." },
      { title: "Foundation Month", description: "Technical SEO, site optimization, and reputation baseline established in month one." },
      { title: "Ongoing Execution", description: "Monthly content, link building, GBP management, site updates, and reputation monitoring run in parallel." },
      { title: "Unified Monthly Report", description: "One consolidated performance report covering all three services with clear metrics and next-month priorities." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$1,098" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$1,098/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Bundle — $1,098/mo",
    ctaHref: "/contact?package=growth-bundle",
  },

  // ─────────────────────────────────────────
  // WEBSITE MAINTENANCE
  // ─────────────────────────────────────────

  {
    slug: "site-care-plan",
    name: "Site Care Plan",
    tagline: "Monthly website maintenance for Vercel-hosted sites — hosting management, uptime monitoring, content updates, and security.",
    category: "Website Maintenance",
    categoryColor: "#71717a",
    priceDisplay: "$299",
    priceSub: "/month · cancel anytime",
    stripeMonthlyPriceId: "price_1THVEgRVuKVVmtoDZmyOohTE",
    stripeMonthlyLink: "https://portal.flynerd.tech/b/28E6oJdCd0sUbQ7g0Obo409",
    about: [
      "Your website is a revenue-generating asset. It should stay fast, secure, and up-to-date without you thinking about it. The Site Care Plan keeps your Vercel-hosted site running at peak performance month after month.",
      "We handle hosting and deployment management, uptime monitoring, up to three content updates per month, SSL and security checks, analytics review, and priority support with a 48-hour response SLA.",
      "Best for businesses with an active FlyNerd-built site that want everything managed so they can focus on running their business.",
    ],
    inThePackage: [
      { bold: "Hosting + Deployment Management", detail: "Your Vercel deployment managed, monitored, and updated as needed." },
      { bold: "Uptime + Form Monitoring", detail: "We know before you do if something goes down or stops working." },
      { bold: "Up to 3 Content Updates/Month", detail: "Service page copy, pricing changes, team updates, new photos — submitted by you, handled by us." },
      { bold: "SSL + Security Checks", detail: "Monthly security review and SSL certificate management." },
      { bold: "Analytics Review", detail: "Monthly review of your site's traffic, form conversions, and top-performing pages." },
      { bold: "Priority Async Support", detail: "48-hour response SLA. Urgent issues handled same business day." },
    ],
    process: [
      { title: "Onboarding", description: "We document your site architecture, connect monitoring tools, and establish your content update workflow." },
      { title: "Monthly Operations", description: "Content updates submitted via a simple request form — handled within 3 business days." },
      { title: "Security + Performance Checks", description: "Monthly review of SSL, security headers, load times, and Core Web Vitals." },
      { title: "Monthly Analytics Summary", description: "Short report on site traffic, form submissions, and any performance changes worth flagging." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$299" },
      { label: "Ongoing", dueAt: "Billed monthly", price: "$299/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Start Care Plan — $299/mo",
    ctaHref: "/contact?package=site-care",
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
  {
    label: "Website Maintenance",
    tag: "Monthly",
    tagColor: "#71717a",
    tagBorder: "#444",
    filter: (s: Service) => s.category === "Website Maintenance",
  },
];
