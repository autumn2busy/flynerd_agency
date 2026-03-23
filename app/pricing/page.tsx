import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Productized AI automation pricing for solo-operator friendly implementation: audit, workflow builds, AI concierge launch, and monthly optimization retainers.",
};

const pricingTiers = [
    {
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
];

const faqs = [
    {
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
    },
];

export default function PricingPage() {
    return (
        <>
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="section-label">Pricing</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold mt-4 mb-6">
                            Productized <span className="gradient-text">Growth Systems</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            Clear scopes. Clear outcomes. Built for service businesses that want better lead follow-up,
                            faster operations, and less manual work.
                        </p>
                    </div>
                </div>
            </section>

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
                                </div>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    <span className="text-[var(--text-muted)] ml-1">{tier.period}</span>
                                </div>

                                <p className="text-sm text-[var(--text-secondary)] mb-6">{tier.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                            <Check size={16} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link href={tier.href} className={`btn w-full ${tier.featured ? "btn-primary" : "btn-ghost"}`}>
                                    {tier.cta}
                                    <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                                    <h3 className="font-semibold">{faq.question}</h3>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] pl-7">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
