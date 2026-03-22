import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Search, Workflow, Bot, Mail, ShieldCheck, TrendingUp, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Services",
    description: "FlyNerd Tech services: automation audits, workflow builds, AI concierge launches, email revenue sprints, and ongoing optimization retainers.",
};

const services = [
    {
        slug: "automation-audit",
        icon: Search,
        title: "Automation Audit + Roadmap",
        tagline: "Find your fastest ROI",
        description: "A structured discovery and systems audit that identifies your top opportunities and maps a 30-day implementation plan.",
        features: [
            "60-90 minute discovery",
            "Stack + process audit",
            "Quick-win matrix",
            "30-day roadmap",
            "Implementation priorities",
        ],
        startingAt: "$495",
        popular: true,
    },
    {
        slug: "quickstart-build",
        icon: Workflow,
        title: "Quickstart Workflow Build",
        tagline: "One workflow, fully shipped",
        description: "Fixed-scope implementation of a high-impact workflow, from trigger to handoff. Ideal for lead response and ops handoffs.",
        features: [
            "1 workflow end-to-end",
            "Up to 3 integrations",
            "Logic + failover handling",
            "QA + testing",
            "Team handoff docs",
        ],
        startingAt: "$1,250",
        featured: true,
    },
    {
        slug: "ai-concierge",
        icon: Bot,
        title: "AI Concierge Agent Launch",
        tagline: "Qualify leads 24/7",
        description: "Deploy a chat/lead qualification agent with knowledge base, routing logic, and human handoff so leads never go cold.",
        features: [
            "Chat/channel deployment",
            "Knowledge base setup",
            "Qualification flows",
            "CRM + notifications sync",
            "Human escalation path",
        ],
        startingAt: "$2,400",
    },
    {
        slug: "email-revenue-sprint",
        icon: Mail,
        title: "Email Revenue Sprint",
        tagline: "Campaigns that close",
        description: "Audience segmentation and a 3-5 email sequence with triggers, A/B testing, and reporting to generate pipeline quickly.",
        features: [
            "Segmentation strategy",
            "3-5 email sequence",
            "Trigger automation",
            "A/B test setup",
            "Performance summary",
        ],
        startingAt: "$900",
    },
    {
        slug: "care-plan",
        icon: ShieldCheck,
        title: "Monthly Care Plan",
        tagline: "Keep systems healthy",
        description: "Monitoring, maintenance, and 2 monthly improvement tickets to protect uptime and continuously optimize results.",
        features: [
            "Monitoring + issue triage",
            "2 improvement tickets / month",
            "Monthly system checkup",
            "Performance summary",
            "Priority async support",
        ],
        startingAt: "$750/mo",
    },
    {
        slug: "growth-partner",
        icon: TrendingUp,
        title: "Growth Ops Partner",
        tagline: "For multi-system teams",
        description: "Strategic and technical partner for clients with multiple workflows and agents that need ongoing iteration and expansion.",
        features: [
            "Everything in Care Plan",
            "Multi-system optimization",
            "Quarterly roadmap",
            "Advanced experiments",
            "Cross-channel reporting",
        ],
        startingAt: "$1,800/mo",
    },
];

export default function ServicesPage() {
    return (
        <>
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="section-label">Our Services</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold mt-4 mb-6">
                            Productized AI <span className="gradient-text">Offers</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            Built for solo-operator speed and business-owner clarity. Fixed scopes, clear outcomes,
                            and implementation paths that grow with your company.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-24 lg:pb-32">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/contact?package=${service.slug}`}
                                className={`glass-card rounded-2xl p-8 lg:p-10 group relative overflow-hidden ${service.featured ? "lg:col-span-2 lg:flex lg:gap-12" : ""}`}
                            >
                                {service.popular && (
                                    <span className="absolute top-4 right-4 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-3 py-1 rounded-full">
                                        Most Booked
                                    </span>
                                )}
                                {service.featured && (
                                    <span className="absolute top-4 right-4 text-xs font-semibold text-[var(--gold-400)] bg-[var(--gold-500)]/10 px-3 py-1 rounded-full">
                                        Core Offer
                                    </span>
                                )}

                                <div className={service.featured ? "lg:w-1/2" : ""}>
                                    <div className="w-14 h-14 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] mb-6 group-hover:scale-110 transition-transform">
                                        <service.icon size={28} />
                                    </div>
                                    <p className="text-sm text-[var(--gold-400)] font-medium mb-2">{service.tagline}</p>
                                    <h2 className="text-2xl font-semibold mb-4 group-hover:text-[var(--gold-400)] transition-colors">
                                        {service.title}
                                    </h2>
                                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{service.description}</p>
                                </div>

                                <div className={service.featured ? "lg:w-1/2" : ""}>
                                    <ul className="space-y-3 mb-6">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                                <CheckCircle size={16} className="text-[var(--gold-400)] flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Starting at <span className="text-white font-semibold">{service.startingAt}</span>
                                        </span>
                                        <span className="flex items-center gap-2 text-sm text-[var(--gold-400)] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Book this offer <ArrowUpRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">Start with the Audit</h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Not sure where to begin? We&apos;ll identify the highest-leverage system to build first and give you a practical execution plan.
                        </p>
                        <Link href="/contact?package=automation-audit" className="btn btn-primary text-lg px-10 py-4">
                            Book Automation Audit
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
