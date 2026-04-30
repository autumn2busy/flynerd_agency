import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Website for Premium Services | FlyNerd Tech",
    description: "The tech-enabled premium core offer. Richer integrations, concierge-tier management, premium UX. For med spas, solar, and high-ticket services.",
};

export default function PremiumServicesWebsitePage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)]">
                                <Sparkles size={28} />
                            </div>
                            <span className="text-sm text-[var(--gold-400)] font-medium">For Premium Services</span>
                        </div>
                        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mb-6">
                            AI Website for Premium Services
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                            For businesses where every lead is worth hundreds or thousands and the website needs to behave like a premium brand asset, not a billboard. The Premium tier is the Quickstart foundation plus advanced personalization, richer integrations, and concierge project management.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/pricing" className="btn btn-primary">
                                See Packages
                                <ArrowUpRight size={18} />
                            </Link>
                            <Link href="/contact" className="btn btn-ghost">
                                Book Strategy Call
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <h2 className="text-2xl font-semibold mb-12">What's Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Everything in Local Trades", description: "AI booking agent, AI-informed design, CRM routing, local SEO, Vercel hosting." },
                            { title: "Treatment / Service Detail Pages", description: "Each offering gets its own page with pricing, provider info, and conversion-optimized copy." },
                            { title: "Advanced Booking Integration", description: "Direct integration with Zenoti, Vagaro, Boulevard, Calendly, Cal.com, or your existing tool." },
                            { title: "Premium Visual Treatment", description: "Hero photography, video backgrounds, and brand-tier design systems. Not a stock template." },
                            { title: "CRM Deep Wire", description: "Lead scoring, pipeline stages, and post-booking automations wired into your CRM or we set one up." },
                            { title: "Concierge Project Management", description: "Dedicated PM through launch. Weekly check-ins, Slack or email, not a ticket queue." },
                        ].map((feature, i) => (
                            <div key={i} className="glass-card rounded-xl p-6">
                                <div className="w-8 h-8 rounded-lg bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] mb-4">
                                    <CheckCircle size={18} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24">
                <div className="section-container">
                    <h2 className="text-2xl font-semibold mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {[
                            "Concierge Intake: Scoped 60-minute call covering services, integrations, content, and brand direction. No forms to fill.",
                            "Design + Build: Custom premium design system built around your real brand and services. Integrated with your booking tool.",
                            "AI Agent + Automation Training: Booking agent trained on full service catalog; CRM automations built to match your pipeline.",
                            "Client Review + QA: Full walkthrough. You test every page, every flow. Two revision rounds included.",
                            "Launch + 14-Day Concierge Support: Domain live, agent active, 14 days of concierge post-launch support."
                        ].map((step, i) => (
                            <div key={i} className="relative">
                                <div className="text-4xl font-bold text-[var(--gold-500)]/20 mb-2">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <p className="text-sm text-[var(--text-secondary)]">{step}</p>
                                {i < 4 && (
                                    <div className="hidden md:block absolute top-4 right-0 translate-x-1/2 w-8 h-px bg-[var(--glass-border)]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Ready for Premium Growth?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            See our canonical packages and pricing to get started.
                        </p>
                        <Link href="/pricing" className="btn btn-primary text-lg px-10 py-4">
                            See Packages
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
