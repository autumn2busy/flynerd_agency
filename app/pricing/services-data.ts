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
  priceDisplay: string; // e.g. "From $1,250"
  priceSub: string;    // e.g. "+ $197/mo"
  about: string[];     // paragraphs
  inThePackage: { bold: string; detail: string }[];
  process: ProcessStep[];
  milestones: ServiceMilestone[];
  projectDuration: string;
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: "ai-website-quickstart",
    name: "AI Website — Quickstart Build",
    tagline: "A fully personalized AI-powered website built from your real business data. Live and converting leads fast.",
    category: "AI Website",
    categoryColor: "var(--accent)",
    priceDisplay: "From $1,250",
    priceSub: "+ $197/mo hosting",
    about: [
      "Your current website is a digital brochure. It sits there, looks okay, and does absolutely nothing after business hours. FlyNerd's Quickstart Build replaces it with a fully AI-powered site that books appointments, answers questions, and captures leads 24/7 — trained on your exact services.",
      "We don't use templates. Our pipeline reads your real Yelp reviews, Google Business profile, and social data to extract your brand voice, services, and strongest social proof. The result is a site that actually represents your business.",
      "Every Quickstart Build ships with a custom AI chatbot embedded on your site, local SEO architecture, and high-speed Vercel hosting. Setup is split 50/50 — half to start, half on delivery.",
    ],
    inThePackage: [
      { bold: "Custom AI Chatbot", detail: "Trained on your services, pricing, and availability. Books and qualifies leads around the clock." },
      { bold: "AI-Informed Design", detail: "Brand palette, copy, and layout sourced from your real reviews — not a template." },
      { bold: "Local SEO Architecture", detail: "Next.js headless with schema markup and sub-second load times. Built to rank in local search." },
      { bold: "High-Speed Vercel Hosting", detail: "Global edge network with SSL, security monitoring, and 99.99% uptime." },
      { bold: "Monthly Maintenance", detail: "Minor AI updates and ongoing optimizations to keep your site accurate as your business grows." },
    ],
    process: [
      { title: "Discovery", description: "Our AI pipeline scans your Yelp reviews, Google Business profile, and social pages. We extract brand context, service offerings, and your three strongest customer quotes. Zero intake forms required from you." },
      { title: "Design + Build", description: "Custom niche design generated from your reputation data. Your real services, your brand palette, your social proof — built into a production Next.js site." },
      { title: "AI Agent Training", description: "Your custom chatbot is trained on your specific services, pricing, and availability. It learns your business — not a generic script." },
      { title: "Client Review", description: "Full walkthrough video delivered. You review, request any adjustments. One revision round included." },
      { title: "Launch", description: "Domain connected, SSL live, AI agent active. Your digital employee starts its first shift." },
    ],
    milestones: [
      { label: "Kickoff Payment", dueAt: "Due at checkout", price: "$625" },
      { label: "Final Delivery", dueAt: "Due on launch", price: "$625" },
      { label: "Monthly Hosting", dueAt: "After launch, cancel anytime", price: "$197/mo" },
    ],
    projectDuration: "7–10 business days",
    ctaLabel: "Start — Pay $625 Deposit",
    ctaHref: "/contact?package=build",
  },

  {
    slug: "ai-concierge-bundle",
    name: "AI Concierge Bundle",
    tagline: "Advanced AI site + full CRM automation + lead qualification pipeline. For high-volume businesses that can't afford to miss a lead.",
    category: "AI Website + Automation",
    categoryColor: "var(--accent)",
    priceDisplay: "From $2,400",
    priceSub: "+ $750/mo",
    featured: true,
    about: [
      "The Quickstart Build gives you a great AI-powered website. The AI Concierge Bundle gives you a complete revenue system. Every inbound lead is captured, qualified, routed, and followed up — automatically.",
      "We wire your new site into ActiveCampaign, build advanced AI agents with a custom knowledge base, and configure smart lead routing so the right leads get to the right person at the right time. This is what enterprise ops teams pay consultants $20,000 to set up. We build it at a fraction of that.",
      "Ideal for HVAC companies, med spas, law firms, and any high-ticket local service business where a single missed lead is a lost job.",
    ],
    inThePackage: [
      { bold: "Everything in Quickstart Build", detail: "Custom AI site, chatbot, local SEO, and hosting included." },
      { bold: "Advanced AI Agents", detail: "Custom knowledge base with multi-intent routing. Handles complex questions, service comparisons, and objections." },
      { bold: "CRM Automation", detail: "ActiveCampaign wired to your lead flow. Automated follow-up sequences and pipeline stages." },
      { bold: "Lead Qualification + Routing", detail: "Leads scored and routed to the right team member or booking link based on service type and intent." },
      { bold: "Monthly Improvement Tickets", detail: "2 improvement tickets per month — new automations, agent updates, or CRM refinements." },
      { bold: "Quarterly Roadmap Review", detail: "Biannual strategy session to prioritize the next quarter's system improvements." },
    ],
    process: [
      { title: "Discovery & Strategy", description: "Deep-dive into your lead flow, CRM setup, and current conversion rate. We map the gaps and design the full system architecture before writing a single line of code." },
      { title: "Design + Build", description: "Full AI-powered website build using your real business data — same as the Quickstart process, with additional context gathered during discovery." },
      { title: "CRM Integration", description: "ActiveCampaign wired to your site forms, chatbot, and booking system. Automated sequences built and tested." },
      { title: "AI Agent Training", description: "Advanced knowledge base built from your services, FAQs, pricing, and team info. Custom routing logic configured." },
      { title: "Client Review + Testing", description: "Full system walkthrough — site, chatbot, CRM flows, email sequences. One revision round across all components." },
      { title: "Launch + Handoff", description: "Everything goes live. You receive a system map, agent documentation, and 30-day priority support." },
    ],
    milestones: [
      { label: "Kickoff Payment", dueAt: "Due at checkout", price: "$1,200" },
      { label: "Final Delivery", dueAt: "Due on launch", price: "$1,200" },
      { label: "Monthly Retainer", dueAt: "After launch, cancel anytime", price: "$750/mo" },
    ],
    projectDuration: "2–3 weeks",
    ctaLabel: "Launch — Pay $1,200 Deposit",
    ctaHref: "/contact?package=agent",
  },

  {
    slug: "automation-audit",
    name: "Automation Audit",
    tagline: "A focused systems audit and 30-day roadmap to surface your highest-ROI automation opportunities. No fluff.",
    category: "Automation",
    categoryColor: "#a1a1aa",
    priceDisplay: "$495",
    priceSub: "one-time · credited toward Build",
    about: [
      "Before building anything, you need to know what to build and in what order. The Automation Audit is a focused 60-minute strategy engagement followed by a full written analysis of your current tech stack, workflows, and automation gaps.",
      "Most businesses we audit are wasting hours per week on manual work that could be automated in days. We identify those wins, rank them by ROI, and hand you a 30-day implementation roadmap you can execute with or without us.",
      "The audit fee is credited toward any Build or Bundle package purchased within 30 days. This is how every engagement should start.",
    ],
    inThePackage: [
      { bold: "60-Minute Strategy Call", detail: "Deep dive into your current tools, workflows, and pain points." },
      { bold: "Tech Stack Audit", detail: "We map everything you're using and identify gaps, redundancies, and integration opportunities." },
      { bold: "Bottleneck Analysis", detail: "We identify where time is being wasted and what has the highest automation ROI." },
      { bold: "30-Day Implementation Roadmap", detail: "A prioritized, actionable plan you can begin executing immediately." },
      { bold: "Tool Recommendations", detail: "Best-fit AI and automation tools for your specific stack and budget." },
      { bold: "Async Q&A", detail: "7 days of follow-up questions answered asynchronously after the audit." },
    ],
    process: [
      { title: "Intake", description: "You complete a short pre-call form covering your current tools, team size, and biggest operational headaches. Takes 5 minutes." },
      { title: "Strategy Call", description: "60-minute video call. We go deep on your workflow, ask the questions your team never thought to ask, and map the automation landscape." },
      { title: "Audit + Analysis", description: "We document your full stack, identify gaps, and score each automation opportunity by impact and implementation effort." },
      { title: "Roadmap Delivery", description: "Written 30-day roadmap delivered within 48 hours of the call. Includes tool recs, priority order, and estimated time savings." },
    ],
    milestones: [
      { label: "Audit Fee", dueAt: "Due at checkout", price: "$495" },
      { label: "Build Credit", dueAt: "Applied if upgrading within 30 days", price: "-$495" },
    ],
    projectDuration: "1 week",
    ctaLabel: "Book Audit",
    ctaHref: "/contact?package=starter",
  },

  {
    slug: "quickstart-workflow-build",
    name: "Quickstart Workflow Build",
    tagline: "One high-impact automation built end-to-end. Scoped, built, documented, and handed off.",
    category: "Automation",
    categoryColor: "#a1a1aa",
    priceDisplay: "$1,250",
    priceSub: "one-time",
    about: [
      "You've identified the workflow you need to automate. Now you need someone to build it correctly — with real integrations, proper error handling, and documentation your team can actually use.",
      "The Quickstart Build takes one high-impact workflow and turns it into a production-ready automation. Everything from scoping and tool selection to QA, handoff, and a 14-day support window.",
      "Most common use cases: lead capture to CRM, appointment booking flows, review request sequences, and internal operations automations. If you're not sure which to build first, start with the Audit.",
    ],
    inThePackage: [
      { bold: "Audit Applied to Implementation", detail: "If you started with the Automation Audit, its findings directly shape the build scope." },
      { bold: "1 Production-Ready Workflow", detail: "One automation built end-to-end. Fixed scope, clean code, fully tested before handoff." },
      { bold: "Core Tool Integrations", detail: "Connects your CRM, email platform, forms, spreadsheets, or booking system as needed." },
      { bold: "QA + Launch Checklist", detail: "Full system test across edge cases before going live." },
      { bold: "Loom Walkthrough + SOP Doc", detail: "A video walkthrough and written SOP so your team understands and can manage the workflow." },
      { bold: "14-Day Post-Launch Support", detail: "Bugs, edge cases, or adjustments handled within 24 hours." },
    ],
    process: [
      { title: "Scoping", description: "We define the exact inputs, outputs, triggers, and edge cases for the workflow. Scope is locked before build begins — no surprises." },
      { title: "Build", description: "One production-ready automation built using your existing tools. We handle all the configuration, API connections, and logic." },
      { title: "QA", description: "Full test across live conditions — normal flow, edge cases, and failure handling. We don't hand off anything that hasn't been stress-tested." },
      { title: "Handoff", description: "Loom walkthrough video + written SOP delivered. 14-day support window begins. Option to add a Monthly Care Plan to keep it running smoothly." },
    ],
    milestones: [
      { label: "Kickoff Payment", dueAt: "Due at checkout", price: "$625" },
      { label: "Final Delivery", dueAt: "Due on completion", price: "$625" },
    ],
    projectDuration: "1–2 weeks",
    ctaLabel: "Start Build",
    ctaHref: "/contact?package=build-workflow",
  },

  {
    slug: "monthly-care-plan",
    name: "Monthly Care Plan",
    tagline: "Ongoing monitoring, maintenance, and iterative improvements to keep your automations running at peak performance.",
    category: "Retainer",
    categoryColor: "#71717a",
    priceDisplay: "$750",
    priceSub: "/month · cancel anytime",
    about: [
      "Automations break. APIs change. Business processes evolve. The Monthly Care Plan keeps your systems healthy and improving without you needing to manage it.",
      "Each month you get system health checks, two improvement tickets for enhancements or new micro-automations, rapid bug fixes, and a performance summary so you know exactly what your systems are doing.",
      "Best for businesses running 1–3 core automations who want consistent value without hiring a full ops person. Month-to-month, 30-day notice to cancel.",
    ],
    inThePackage: [
      { bold: "System Monitoring", detail: "Continuous health checks on all active automations. We catch failures before you notice them." },
      { bold: "2 Improvement Tickets", detail: "Two scoped requests per month — new automations, enhancements to existing flows, or integrations." },
      { bold: "Bug Fixes", detail: "Rapid response to any system failures or unexpected behavior. Resolved within 24 hours." },
      { bold: "Monthly Performance Summary", detail: "Plain-English report on what's running, what's improving, and what's next." },
      { bold: "Priority Async Support", detail: "Dedicated support channel with faster response times than project clients." },
      { bold: "Quarterly Roadmap Refresh", detail: "Every three months we review what's working and plan the next quarter's improvements." },
    ],
    process: [
      { title: "Onboarding", description: "We audit your current automation stack, document all active flows, and set up monitoring dashboards." },
      { title: "Monthly Operations", description: "Health checks run continuously. Improvement tickets are submitted by you, scoped by us, and completed within the month." },
      { title: "Monthly Reporting", description: "Performance summary delivered every month with usage data, uptime stats, and recommendations." },
      { title: "Quarterly Review", description: "Video call or async review to prioritize the next quarter — new automations, expansions, or deprecations." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$750" },
      { label: "Ongoing", dueAt: "Month-to-month billing", price: "$750/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Choose Care Plan",
    ctaHref: "/contact?package=optimize",
  },

  {
    slug: "growth-partner-retainer",
    name: "Growth Partner Retainer",
    tagline: "Multi-workflow execution, AI agent rollouts, and proactive growth operations for teams scaling fast.",
    category: "Retainer",
    categoryColor: "#71717a",
    priceDisplay: "$1,800",
    priceSub: "/month · cancel anytime",
    about: [
      "Your business is growing. Your automations need to grow with it. The Growth Partner Retainer is for teams that are ready to deploy multiple automation initiatives simultaneously — lead qualification, CRM lifecycle journeys, AI agent rollouts, and more.",
      "You get dedicated capacity every month, biweekly strategy calls, faster SLAs, and a proactive partner who's thinking about your operational growth full-time. Not just fixing things when they break.",
      "Ideal for businesses running active outbound campaigns, multi-location operations, or teams with a growing ops backlog.",
    ],
    inThePackage: [
      { bold: "Everything in Care Plan", detail: "All monthly monitoring, bug fixes, and reporting included." },
      { bold: "Up to 6 Active Initiatives", detail: "Six concurrent workflow projects per month — new builds, improvements, or agent rollouts." },
      { bold: "AI Lead Qualification Agent", detail: "Intelligent lead scoring and routing deployed to your CRM and intake flow." },
      { bold: "Advanced CRM Automation", detail: "Full lifecycle journeys — onboarding sequences, win-back flows, upsell triggers." },
      { bold: "Biweekly Strategy Calls", detail: "30-minute calls every two weeks to align on priorities, review performance, and plan ahead." },
      { bold: "Faster Turnaround SLAs", detail: "Priority execution across all tickets. Most items completed within 3–5 business days." },
    ],
    process: [
      { title: "Kickoff + Audit", description: "Full audit of your current automation stack, CRM, and growth bottlenecks. We set the 90-day roadmap in the first week." },
      { title: "Sprint Execution", description: "Monthly sprint model — initiatives are scoped, built, and shipped in focused two-week cycles." },
      { title: "Biweekly Review", description: "Strategy calls every two weeks to review what shipped, what's next, and where to focus capacity." },
      { title: "Monthly Reporting", description: "Full performance dashboard — automation ROI, lead flow metrics, and pipeline impact." },
      { title: "Quarterly Roadmap", description: "End of quarter planning session to set the next 90-day growth priorities." },
    ],
    milestones: [
      { label: "Month 1", dueAt: "Due at signup", price: "$1,800" },
      { label: "Ongoing", dueAt: "Month-to-month billing", price: "$1,800/mo" },
    ],
    projectDuration: "Ongoing · 30-day cancel",
    ctaLabel: "Apply for Growth Partner",
    ctaHref: "/contact?package=scale",
  },
];
