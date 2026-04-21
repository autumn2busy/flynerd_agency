import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Clock, Cpu, Globe, Zap, BarChart3, Shield } from "lucide-react";
import { SERVICES } from "@/app/pricing/services-data";

// Pull both core-build tiers from the canonical catalog so this page never
// drifts from app/pricing. Starting price in <meta description> comes from
// the UL tier (the lower of the two).
const ulCore = SERVICES.find((s) => s.slug === "ai-website-quickstart-ul")!;
const tpCore = SERVICES.find((s) => s.slug === "ai-website-concierge-tp")!;

// Derive deposit dollar display from milestones so it stays in sync with
// any future split changes (50/50, 40/60, etc.).
function depositDisplay(slug: string): string {
  const s = SERVICES.find((svc) => svc.slug === slug);
  return s?.milestones.find((m) => /deposit/i.test(m.label))?.price ?? "";
}

export const metadata: Metadata = {
    title: "AI-Powered Websites | FlyNerd Tech",
    description: `FlyNerd Tech builds AI-powered websites for local service businesses. 24/7 AI booking agent, local SEO, and 7-day launch guarantee. Starting at ${ulCore.priceDisplay}.`,
};

const timeline = [
    { day: "Day 1", title: "AI-powered discovery", description: "Our Intel Agent reads your Yelp reviews, rating, and business category to extract brand colors, service context, and the 3 most compelling customer quotes. No intake forms." },
    { day: "Day 2–3", title: "Design + build", description: "Custom niche design generated from your actual reputation. Your brand palette, your services, your social proof — built into a production Next.js site." },
    { day: "Day 4–5", title: "AI agent training", description: "Your AI booking agent is trained on your specific services, pricing, and availability. It learns your business, not a generic script." },
    { day: "Day 6", title: "QA + your review", description: "Full walkthrough video delivered. You review, request adjustments. One revision round included." },
    { day: "Day 7", title: "Live", description: "Domain connected, SSL live, AI agent active. Your digital employee starts its first shift." },
];

// Two core-build tiers sourced from the canonical catalog. Copy (bullets,
// "best for", CTA label) is page-specific and lives here, but every price
// and payment link is sourced from SERVICES.
const packages = [
    {
        name: "Quickstart Build",
        setup: ulCore.priceDisplay,
        monthly: "$997/mo (optional Care Plan)",
        best: "Underserved local service businesses: HVAC, plumbing, salons, home care",
        includes: [
            "Custom AI-informed design from your reputation data",
            "24/7 AI booking agent trained on your services",
            "Lead capture + CRM routing (ActiveCampaign/HubSpot)",
            "Local SEO foundation + schema markup",
            "High-speed Vercel hosting + SSL",
            "7-day launch guarantee",
        ],
        stripe: ulCore.stripeDepositLink ?? "/contact?package=ai-website-quickstart-ul",
        cta: `Start — Pay ${depositDisplay("ai-website-quickstart-ul")} Deposit`,
        detailHref: "/pricing/ai-website-quickstart-ul",
    },
    {
        name: "AI Concierge Bundle",
        setup: tpCore.priceDisplay,
        monthly: "$1,997/mo (optional Growth Ops)",
        best: "Tech-enabled premium: med spas, aesthetics, solar, legal, high-ticket services",
        includes: [
            "Everything in Quickstart Build",
            "Treatment/service detail pages with brand-tier design",
            "Advanced booking integration (Zenoti, Vagaro, Cal.com)",
            "CRM deep wire: lead scoring + pipeline stages",
            "Concierge project management through launch",
            "14-day concierge support post-launch",
        ],
        stripe: tpCore.stripeDepositLink ?? "/contact?package=ai-website-concierge-tp",
        cta: `Launch — Pay ${depositDisplay("ai-website-concierge-tp")} Deposit`,
        detailHref: "/pricing/ai-website-concierge-tp",
        featured: true,
    },
];

const faqs = [
    {
        q: "Do I need to provide copy, images, or content?",
        a: "No. Our Intel Agent sources your business context directly from your Yelp reviews, category, and reputation data. You review and approve, but we do the heavy lifting.",
    },
    {
        q: "What if I already have a website?",
        a: "We replace it with something that actually works. Most of our clients have an outdated Wix or Squarespace site that doesn't convert. We build on Next.js — faster, smarter, and built to rank.",
    },
    {
        q: "How does the AI booking agent work?",
        a: "It's a trained conversational agent embedded in your site. It knows your services, pricing, and can direct customers to your booking system or calendar. It's not a chatbot script — it reasons about questions it hasn't seen before.",
    },
    {
        q: "What's included in the monthly fee?",
        a: "Hosting on Vercel's global edge network, SSL, security monitoring, and ongoing minor AI updates to keep your agent accurate as your business evolves.",
    },
    {
        q: "Is there a contract?",
        a: "Setup is a one-time payment. The monthly subscription is month-to-month — cancel anytime from your customer portal at portal.flynerd.tech.",
    },
    {
        q: "What niches do you work with?",
        a: "Any local service business with a Yelp presence. We've built for HVAC, salons, law firms, med spas, contractors, real estate agents, and restaurants. If local customers search for you, we can build for you.",
    },
];

export default function AIWebsitePage() {
    return (
        <>
            {/* ── Hero ──────────────────────────────────────────────────────────── */}
            <section className="pt-32 pb-16 lg:pt-44 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="section-label">The Product</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mt-4 mb-6 leading-[1.1]">
                            Your website is your<br />
                            <span className="gradient-text">best employee.</span><br />
                            It just hasn't been hired yet.
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto mb-10">
                            FlyNerd Tech builds AI-powered websites that answer questions, book appointments, and qualify leads — around the clock, without you being involved. Live in 7 days, built from your real reputation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/pricing/ai-website-quickstart-ul" className="btn btn-primary text-lg px-10 py-4">
                                See Pricing <ArrowUpRight size={20} />
                            </Link>
                            <Link href="/contact" className="btn btn-ghost text-lg px-8 py-4">
                                Book a Free Call
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7-Day Timeline ────────────────────────────────────────────────── */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="section-label">The Process</span>
                        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mt-4">
                            Zero to live in <span className="gradient-text">7 days</span>
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                            AI-accelerated delivery means we don't wait on you for copy, content, or decisions. We build, you approve, we launch.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {timeline.map((step, i) => (
                            <div key={i} className="glass-card rounded-2xl p-6 flex gap-6 items-start">
                                <div className="flex-shrink-0 w-20 text-right">
                                    <span className="text-xs font-bold text-[var(--amber-400)] uppercase tracking-wider">{step.day}</span>
                                </div>
                                <div className="w-px bg-[var(--glass-border)] self-stretch flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Core Five ─────────────────────────────────────────────────────── */}
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="section-label">What's Included</span>
                        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mt-4">
                            The <span className="gradient-text">Core Five</span> — in every build
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: Cpu, title: "AI Booking Agent", body: "24/7 lead capture and qualification. A missed-call replacement for your website that books, qualifies, follows up, and helps convert more leads." },
                            { icon: Globe, title: "AI Personalization", body: "Your brand palette, copy, and layout come from your real reputation and reviews — not a template. Every site is unique to the business." },
                            { icon: Clock, title: "7-Day Launch", body: "Automated pipelines mean we don't wait weeks for approvals or content. We build from data we already have and deliver fast." },
                            { icon: BarChart3, title: "Local SEO Stack", body: "Next.js headless with schema markup and sub-second load times — the technical foundation local search rewards." },
                            { icon: Shield, title: "Managed Monthly", body: "Hosting, SSL, security, and minor AI updates are included in your monthly plan. Your site stays fast, secure, and current." },
                        ].map((item, i) => (
                            <div key={i} className="glass-card rounded-2xl p-8 group">
                                <div className="w-12 h-12 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] mb-5 group-hover:scale-110 transition-transform">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-3 group-hover:text-[var(--gold-400)] transition-colors">{item.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Pricing ───────────────────────────────────────────────────────── */}
            <section id="pricing" className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="section-label">Pricing</span>
                        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mt-4">
                            Two tiers. One outcome: <span className="gradient-text">more customers.</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
                            Setup is split 50/50 — half to start, half on delivery. Monthly is billed after launch, cancel anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`glass-card rounded-2xl p-8 flex flex-col relative ${pkg.featured ? "ring-2 ring-[var(--gold-500)]" : ""}`}
                            >
                                {pkg.featured && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-4 py-1 rounded-full whitespace-nowrap">
                                        Most Popular
                                    </span>
                                )}
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold">{pkg.name}</h3>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">{pkg.best}</p>
                                </div>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{pkg.setup}</span>
                                    <span className="text-[var(--text-muted)] ml-2 text-sm">setup + {pkg.monthly}</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {pkg.includes.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                            <CheckCircle size={15} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={pkg.detailHref}
                                    className={`btn w-full ${pkg.featured ? "btn-primary" : "btn-ghost"}`}
                                >
                                    View Full Details <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────────────────── */}
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="section-label">FAQ</span>
                        <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mt-4">Common questions</h2>
                    </div>
                    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass-card rounded-xl p-6">
                                <h3 className="font-semibold text-white mb-3 text-sm">{faq.q}</h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────────────────── */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold">
                            Your competitors are still using Wix.<br />
                            <span className="gradient-text">Move first.</span>
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)]">
                            Book a free 20-minute call. We'll show you exactly what your AI-powered site would look like — no templates, no pressure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="btn btn-primary text-lg px-10 py-4">
                                Book a Free Call <ArrowUpRight size={20} />
                            </Link>
                            <Link href="/pricing" className="btn btn-ghost text-lg px-8 py-4">
                                View All Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}