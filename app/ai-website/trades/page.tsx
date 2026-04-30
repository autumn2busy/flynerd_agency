import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Website for Local Trades | FlyNerd Tech",
    description: "The underserved-local core offer. A conversion-first AI website built from your actual reputation data, live in 7 days.",
};

export default function TradesWebsitePage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)]">
                                <Globe size={28} />
                            </div>
                            <span className="text-sm text-[var(--gold-400)] font-medium">For Local Trades</span>
                        </div>
                        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mb-6">
                            AI Website for Local Trades
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                            If your phone stops ringing, so does your revenue. The AI Website replaces a dead Wix, Squarespace, or GoDaddy brochure with a Next.js site that actually answers questions, qualifies leads, and books appointments around the clock. Built from your real reputation data, live in 7 days.
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
                            { title: "Custom AI-Informed Design", description: "Brand palette, copy, and layout pulled from your Yelp reviews and reputation signals. Not a template." },
                            { title: "24/7 AI Booking Agent", description: "Answers pricing, scheduling, and service-area questions. Books appointments while you're on a job." },
                            { title: "Lead Capture + CRM Routing", description: "Every inquiry tagged and routed into your CRM (ActiveCampaign, HubSpot, or equivalent) automatically." },
                            { title: "Local SEO Foundation", description: "Schema markup, sub-second load times, and site structure built for local search ranking." },
                            { title: "High-Speed Vercel Hosting", description: "Global edge network, SSL, and uptime monitoring included." },
                            { title: "7-Day Launch Guarantee", description: "From deposit to live site in 7 calendar days, or we extend support at no charge." },
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
                            "AI Discovery: Our Intel Agent reads your reviews, category, and reputation signals. No intake forms, no 20-page discovery docs.",
                            "Design + Build: Custom niche design generated from your actual reputation. Built on Next.js for speed and SEO.",
                            "AI Agent Training: Booking agent trained on your services, pricing, and availability. Specific to your business, not a generic script.",
                            "QA + Your Review: Full walkthrough video delivered. You review, request adjustments. One revision round included.",
                            "Launch: Domain connected, SSL live, AI agent active. Your digital employee starts its first shift."
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
                            Ready to Upgrade?
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
