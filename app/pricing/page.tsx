import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
<<<<<<< HEAD
    title: "Pricing | FlyNerd Tech",
    description: "AI-powered website pricing from $1,250. Quickstart Build, AI Concierge Bundle, and Growth Ops retainers. 7-day launch guarantee.",
=======
    title: "Pricing",
    description: "Productized AI automation pricing for solo-operator friendly implementation: audit, workflow builds, AI concierge launch, and monthly optimization retainers.",
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
};

const websitePackages = [
    {
<<<<<<< HEAD
        name: "Quickstart Build",
        tag: "Local service businesses",
        setup: "$1,250",
        monthly: "$197/mo",
        description: "A high-conversion AI-powered site built from your real reputation. Live in 7 days.",
        features: [
            "Custom niche design (AI-informed)",
            "AI booking & support agent",
            "Local SEO architecture",
            "Vercel high-speed hosting",
            "7-day launch guarantee",
            "Monthly maintenance included",
        ],
        cta: "Start — Pay $625 Deposit",
        href: process.env.STRIPE_LINK_BUILD_DEPOSIT || "/contact?package=build",
        note: "Final $625 due on delivery",
    },
    {
        name: "AI Concierge Bundle",
        tag: "High lead volume + operations",
        setup: "$2,400",
        monthly: "$750/mo",
        description: "The full system — website plus advanced AI agents, CRM automation, and monthly optimization.",
        features: [
            "Everything in Quickstart Build",
            "Advanced AI agents (custom knowledge base)",
            "CRM automation (ActiveCampaign)",
            "Lead qualification + smart routing",
            "2 improvement tickets/month",
            "Quarterly roadmap review",
        ],
        cta: "Launch — Pay $1,200 Deposit",
        href: process.env.STRIPE_LINK_AGENT_DEPOSIT || "/contact?package=agent",
        note: "Final $1,200 due on launch",
        featured: true,
    },
=======
        name: "Starter",
        subtitle: "Automation Audit + Roadmap",
        price: "$495",
        period: "one-time",
        description: "A 60-90 minute discovery and systems audit with a 30-day implementation roadmap. Perfect first step before any build.",
        features: [
            "60-90 minute strategy session",
            "Systems + tools audit",
            "3 quick-win opportunities",
            "30-day implementation roadmap",
            "Priority score by impact/effort",
            "Proposal credit option",
        ],
        cta: "Book Audit",
        href: "/contact?package=automation-audit",
        popular: true,
    },
    {
        name: "Build",
        subtitle: "Quickstart Workflow Build",
        price: "$1,250",
        period: "one-time",
        description: "One fixed-scope workflow implementation to remove repetitive work and improve speed-to-lead, handoffs, or reporting.",
        features: [
            "1 workflow (trigger + actions)",
            "Up to 3 tool integrations",
            "Business logic + routing rules",
            "QA + test scenarios",
            "Loom walkthrough + docs",
            "1 revision round",
        ],
        cta: "Start Build",
        href: "/contact?package=quickstart-build",
        featured: true,
    },
    {
        name: "Agent",
        subtitle: "AI Concierge Launch",
        price: "$2,400",
        period: "one-time",
        description: "Launch a qualified lead or support AI concierge with human handoff, conversion flow, and CRM sync.",
        features: [
            "Website/chat channel setup",
            "Knowledge base bootstrapping",
            "Qualification flow + lead capture",
            "Human handoff logic",
            "CRM + notifications integration",
            "Launch checklist + training",
        ],
        cta: "Launch Agent",
        href: "/contact?package=agent-launch",
    },
    {
        name: "Optimize",
        subtitle: "Monthly Care Plan",
        price: "$750",
        period: "/month",
        description: "Monitoring + iterative improvements to keep your systems healthy, accurate, and compounding results each month.",
        features: [
            "Monitoring + issue triage",
            "Up to 2 improvement tickets / month",
            "Performance summary report",
            "Monthly optimization review",
            "Priority async support",
            "SLA response windows",
        ],
        cta: "Join Care Plan",
        href: "/contact?package=care-plan",
    },
    {
        name: "Growth Partner",
        subtitle: "Multi-System Ops Retainer",
        price: "$1,800",
        period: "/month",
        description: "For teams running multiple workflows/agents that need a strategic operator and execution partner every month.",
        features: [
            "Everything in Care Plan",
            "Multi-workflow optimization",
            "Quarterly roadmap planning",
            "Advanced automation experiments",
            "Cross-channel reporting",
            "Slack/priority support",
        ],
        cta: "Apply Now",
        href: "/contact?package=growth-partner",
    },
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
];

const retainers = [
    {
        name: "Monthly Care Plan",
        price: "$750",
        period: "/month",
        description: "Keep your systems healthy, accurate, and improving every month.",
        features: [
            "System monitoring + issue triage",
            "Up to 2 improvement tickets/month",
            "Monthly performance report",
            "Monthly optimization review",
            "Priority async support",
            "SLA response windows",
        ],
        cta: "Join Care Plan",
        href: process.env.STRIPE_LINK_CARE_PLAN || "/contact?package=care-plan",
    },
    {
        name: "Growth Ops Partner",
        price: "$1,800",
        period: "/month",
        description: "A strategic operations partner for teams running multiple workflows and agents.",
        features: [
            "Everything in Care Plan",
            "Multi-workflow optimization",
            "Quarterly roadmap planning",
            "Advanced automation experiments",
            "Cross-channel reporting",
            "Slack + priority support",
        ],
        cta: "Apply Now",
        href: process.env.STRIPE_LINK_GROWTH_PARTNER || "/contact?package=growth-partner",
        featured: true,
    },
];

const audit = {
    name: "Automation Audit + Roadmap",
    price: "$495",
    description: "Not sure where to start? This is the right first step. A 60-90 minute discovery session with a full 30-day implementation roadmap.",
    features: [
        "60-90 minute strategy session",
        "Systems + tools audit",
        "3 quick-win opportunities identified",
        "30-day implementation roadmap",
        "Priority score by impact/effort",
        "Credit toward any build package",
    ],
    cta: "Book Audit",
    href: process.env.STRIPE_LINK_AUDIT || "/contact?package=audit",
};

const faqs = [
    {
<<<<<<< HEAD
        q: "How does the deposit structure work?",
        a: "Website packages are split 50/50. You pay half to secure your project start date. The remainder is due on delivery — when you've seen the site and approved it.",
    },
    {
        q: "What's the difference between the website monthly and the Care Plan?",
        a: "The $197/mo (Quickstart) and $750/mo (Concierge) are hosting + maintenance for your AI website. The Care Plan and Growth Partner are separate operational retainers for businesses that want ongoing system improvements beyond the site.",
    },
    {
        q: "Do I need the Automation Audit first?",
        a: "Not required for AI website builds — we gather everything we need from your Yelp data. The Audit is ideal if you want a broader automation roadmap for your business operations.",
    },
    {
        q: "Can I start with one workflow or one agent?",
        a: "Yes. Most clients start with the Quickstart Build, see results, then expand into the AI Concierge Bundle or Care Plan.",
    },
    {
        q: "Are retainers month-to-month?",
        a: "Yes. Monthly plans cancel anytime from your portal at portal.flynerd.tech. We earn your business every month.",
    },
    {
        q: "Do you build custom automation systems?",
        a: "Yes — the AI Concierge Bundle and Growth Partner both include custom automation work. If you want your own scouting, outreach, or AI pipeline, book a strategy call and we'll scope it.",
=======
        question: "Do I need to start with an audit?",
        answer: "For custom or multi-system work, yes. The audit ensures we build the highest-ROI workflow first and avoid scope creep.",
    },
    {
        question: "How long do projects take?",
        answer: "Audit delivery is typically 2-3 business days. Quickstart builds usually ship in 1-2 weeks. Agent launches typically run 2-4 weeks.",
    },
    {
        question: "What are your payment terms?",
        answer: "Projects under $2,000 are typically paid upfront. Larger scopes use milestone billing. Retainers are monthly with a 3-month minimum.",
    },
    {
        question: "Can we expand after launch?",
        answer: "Yes. Most clients start with one workflow or one agent, then expand into additional systems through Care Plan or Growth Partner.",
    },
    {
        question: "What if we need a custom package?",
        answer: "If your requirements are outside fixed scope, we create a custom SOW after the audit with clear deliverables and timelines.",
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
    },
];

export default function PricingPage() {
    return (
        <>
<<<<<<< HEAD
            {/* ── Hero ──────────────────────────────────────────────────────────── */}
=======
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="section-label">Pricing</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold mt-4 mb-6">
<<<<<<< HEAD
                            Clear scope. <span className="gradient-text">Clear outcomes.</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            AI-powered websites built in 7 days, plus automation retainers for businesses ready to scale their operations.
=======
                            Productized <span className="gradient-text">Growth Systems</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            Clear scopes. Clear outcomes. Built for service businesses that want better lead follow-up,
                            faster operations, and less manual work.
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
                        </p>
                    </div>
                </div>
            </section>

<<<<<<< HEAD
            {/* ── Website Packages ──────────────────────────────────────────────── */}
            <section className="pb-24 lg:pb-16">
                <div className="section-container">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">AI-Powered Website Packages</h2>
                        <p className="text-[var(--text-secondary)]">One-time setup + monthly hosting & maintenance.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
                        {websitePackages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`glass-card rounded-2xl p-8 flex flex-col relative ${pkg.featured ? "ring-2 ring-[var(--gold-500)]" : ""}`}
                            >
                                {pkg.featured && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-4 py-1 rounded-full whitespace-nowrap">
                                        Most Popular
                                    </span>
                                )}
                                <div className="mb-2">
                                    <p className="text-xs text-[var(--amber-400)] font-medium uppercase tracking-wider">{pkg.tag}</p>
                                    <h3 className="text-xl font-semibold mt-1">{pkg.name}</h3>
=======
            <section className="pb-24 lg:pb-32">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {pricingTiers.map((tier) => (
                            <div
                                key={tier.name}
                                className={`glass-card rounded-2xl p-8 relative ${tier.featured ? "ring-2 ring-[var(--gold-500)]" : ""}`}
                            >
                                {tier.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-4 py-1 rounded-full">
                                        Best first step
                                    </span>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold">{tier.name}</h3>
                                    <p className="text-sm text-[var(--gold-400)]">{tier.subtitle}</p>
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
                                </div>
                                <div className="mb-4 flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">{pkg.setup}</span>
                                    <span className="text-[var(--text-muted)] text-sm">setup + {pkg.monthly}</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-6">{pkg.description}</p>
                                <ul className="space-y-3 mb-6 flex-1">
                                    {pkg.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                            <Check size={15} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={pkg.href} className={`btn w-full mb-3 ${pkg.featured ? "btn-primary" : "btn-ghost"}`}>
                                    {pkg.cta} <ArrowUpRight size={16} />
                                </Link>
                                <p className="text-xs text-[var(--text-muted)] text-center">{pkg.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

<<<<<<< HEAD
            {/* ── Retainers ─────────────────────────────────────────────────────── */}
            <section className="py-16 lg:py-24 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">Automation Retainers</h2>
                        <p className="text-[var(--text-secondary)]">Month-to-month. Cancel anytime from portal.flynerd.tech.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
                        {retainers.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`glass-card rounded-2xl p-8 flex flex-col relative ${pkg.featured ? "ring-2 ring-[var(--gold-500)]" : ""}`}
                            >
                                {pkg.featured && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-4 py-1 rounded-full whitespace-nowrap">
                                        Best Value
                                    </span>
                                )}
                                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{pkg.price}</span>
                                    <span className="text-[var(--text-muted)] ml-1">{pkg.period}</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-6">{pkg.description}</p>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {pkg.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                            <Check size={15} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={pkg.href} className={`btn w-full ${pkg.featured ? "btn-primary" : "btn-ghost"}`}>
                                    {pkg.cta} <ArrowUpRight size={16} />
=======
                                <Link href={tier.href} className={`btn w-full ${tier.featured ? "btn-primary" : "btn-ghost"}`}>
                                    {tier.cta}
                                    <ArrowUpRight size={16} />
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

<<<<<<< HEAD
            {/* ── Audit ─────────────────────────────────────────────────────────── */}
            <section className="py-16 lg:py-24">
                <div className="section-container">
                    <div className="max-w-4xl">
                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold mb-2">Not Sure Where to Start?</h2>
                            <p className="text-[var(--text-secondary)]">The Automation Audit is the lowest-risk way to get a clear picture.</p>
                        </div>
                        <div className="glass-card rounded-2xl p-8 lg:flex lg:gap-12 items-start max-w-3xl">
                            <div className="lg:flex-1 mb-6 lg:mb-0">
                                <h3 className="text-xl font-semibold mb-2">{audit.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{audit.price}</span>
                                    <span className="text-[var(--text-muted)] ml-2 text-sm">one-time</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-6">{audit.description}</p>
                                <Link href={audit.href} className="btn btn-primary">
                                    {audit.cta} <ArrowUpRight size={16} />
                                </Link>
                            </div>
                            <ul className="lg:flex-1 space-y-3">
                                {audit.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                        <Check size={15} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────────────────── */}
=======
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="section-label">FAQ</span>
                        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold mt-4">Common Questions</h2>
                    </div>
                    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass-card rounded-xl p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <HelpCircle size={18} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                                    <h3 className="font-semibold text-sm">{faq.q}</h3>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] pl-7 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

<<<<<<< HEAD
            {/* ── CTA ───────────────────────────────────────────────────────────── */}
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Still have questions?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Book a free 20-minute strategy call. Honest advice about what would actually move the needle for your business.
                        </p>
                        <Link href="/contact" className="btn btn-primary text-lg px-10 py-4">
                            Book a Free Call <ArrowUpRight size={20} />
=======
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">Need Help Choosing?</h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Start with the Automation Audit. We&apos;ll map your fastest wins and recommend the right implementation path.
                        </p>
                        <Link href="/contact?package=automation-audit" className="btn btn-primary text-lg px-10 py-4">
                            Book Your Audit
                            <ArrowUpRight size={20} />
>>>>>>> c309ff18481a6cdf3c9f8c087901480827326fe2
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}