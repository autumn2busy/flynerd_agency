import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BarChart3, Clock, ShieldCheck, TerminalSquare } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | FlyNerd Tech",
    description: "Meet the team behind FlyNerd Tech. 15+ years of enterprise solutions architecture brought to local businesses.",
};

const principles = [
    {
        icon: TerminalSquare,
        title: "Systems Over Services",
        description: "We don't just 'do marketing.' We build autonomous systems that work for you 24/7, so your business scales without burning you out.",
    },
    {
        icon: BarChart3,
        title: "Obsessed With ROI",
        description: "A beautiful website is useless if it doesn't ring the register. Every AI agent, workflow, and design choice we make is engineered to convert traffic into revenue.",
    },
    {
        icon: Clock,
        title: "Painless Execution",
        description: "Local business owners don't have time to manage tech projects. We use AI intelligence to gather your data and build your systems in days, not months.",
    },
    {
        icon: ShieldCheck,
        title: "Enterprise Grade. Local Focus.",
        description: "We're bringing tools traditionally reserved for Fortune 500 companies straight to local roofers, salons, and law firms.",
    },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
                <div className="section-container relative">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,185,35,0.08)_0%,transparent_70%)] -z-10" />
                    
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="section-label">Our Philosophy</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mt-4 mb-6 leading-[1.1]">
                            We don't build websites.<br />
                            <span className="gradient-text">We build digital employees.</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto mb-10">
                            Based strictly on revenue and efficiency. We take the friction out of local business operations by deploying AI systems that answer calls, book appointments, and capture leads while you sleep.
                        </p>
                    </div>
                </div>
            </section>

            {/* Founder Story */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)] border-y border-[var(--glass-border)]">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        
                        {/* Founder photo */}
                        <div className="lg:col-span-4 relative">
                            <div className="aspect-[4/5] relative overflow-hidden border border-[var(--text-primary)]">
                                <Image
                                    src="/founder.jpg"
                                    alt="Autumn — Founder, FlyNerd Tech"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    className="object-cover object-top"
                                    priority
                                />
                                <div
                                    className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-[var(--bg-dark)]"
                                >
                                    <p className="text-sm font-bold text-[var(--text-inverse)]">Autumn</p>
                                    <p className="text-xs text-[var(--accent)]" style={{ fontFamily: "var(--font-mono)" }}>
                                        Founder · Lead Solutions Architect
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-8">
                            <span className="text-[var(--gold-400)] font-semibold tracking-wider uppercase text-sm mb-4 block">
                                15+ Years of Engineering Excellence
                            </span>
                            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-8 leading-tight">
                                Bringing Fortune 500 automation directly to local business owners.
                            </h2>

                            <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed">
                                <p>
                                    Our founder didn't start by making pretty website templates. They spent <strong className="text-white">over 15 years as a Solutions Architect</strong>—designing complex technology, marketing operations, and business systems for massive enterprises.
                                </p>
                                
                                <p>
                                    But a frustrating pattern emerged: The most powerful AI and automation tools were being gatekept by million-dollar enterprise budgets, while local businesses—the backbone of the economy—were stuck overpaying for static, dead-end websites that didn't drive actual revenue.
                                </p>

                                <p>
                                    <strong className="text-white">FlyNerd Tech was born to bridge that gap.</strong> We exist to democratize AI. We take the same elite, conversion-focused architecture used by tech giants, and deploy it for local roofers, legal firms, and salons at a fraction of the cost.
                                </p>

                                <div className="p-6 mt-8 rounded-2xl bg-[var(--gold-500)]/5 border border-[var(--gold-500)]/20 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[var(--gold-400)]" />
                                    <p className="text-white italic text-base">
                                        "A website should not be a digital brochure. It should be your highest-performing employee. It should answer questions instantly, qualify leads perfectly, and book calendar appointments tirelessly. If it's not doing that, it's just a digital paperweight."
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="section-label">Our Guiding Principles</span>
                        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold mt-4">
                            How We <span className="gradient-text">Execute</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] mt-4">
                            We don't guess. We architect. Here is the operational DNA behind every FlyNerd Tech deployment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {principles.map((value, i) => (
                            <div key={i} className="glass-card rounded-2xl p-8 flex gap-6 items-start group hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-14 h-14 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <value.icon size={26} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--gold-400)] transition-colors">{value.title}</h3>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FlyNerd Ethos & Roots */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto text-center grid gap-8">
                        <div>
                            <span className="section-label">The Roots</span>
                            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold mt-4 mb-6">
                                Atlanta Based. Unapologetically Melanin.
                            </h2>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
                                FlyNerd Tech serves clients globally, but our roots are proudly in Atlanta, GA. Beyond building revenue-generating systems for our clients, our deeper mission is <strong className="text-white">empowering diverse minds in tech and STEM.</strong>
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-[var(--bg-base)] border border-[var(--glass-border)] mt-4">
                            <h3 className="text-xl font-light leading-tight mb-4 opacity-80">
                                <span className="text-[var(--gold-400)] font-semibold">F</span>reethinking{" "}
                                <span className="text-[var(--gold-400)] font-semibold">L</span>ifestyle{" "}
                                <span className="text-[var(--gold-400)] font-semibold">Y</span>earners{" "}
                                <span className="text-[var(--gold-400)] font-semibold">N</span>avigating{" "}
                                <span className="text-[var(--gold-400)] font-semibold">E</span>very{" "}
                                <span className="text-[var(--gold-400)] font-semibold">R</span>elevant{" "}
                                <span className="text-[var(--gold-400)] font-semibold">D</span>omain
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm">
                                The FlyNerd brand—from apparel to agency—celebrates intellectual style and proves that brilliance comes in all forms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="glass-card max-w-4xl mx-auto rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden border border-[var(--gold-500)]/20">
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gold-500)]/5 to-transparent" />
                        
                        <div className="relative z-10">
                            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                                Start working <span className="italic font-light">on</span> your business, <br className="hidden md:block"/> not <span className="italic font-light">in</span> it.
                            </h2>
                            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
                                Let's build your first digital employee. Book a free strategy call directly with our Solutions Architecture team.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/apply?package=build" className="btn btn-primary text-lg px-8 py-4 bg-[var(--gold-500)] text-black hover:bg-[var(--gold-400)]">
                                    Start AI Website Build
                                    <ArrowUpRight size={20} />
                                </Link>
                                <Link href="/contact" className="btn btn-ghost text-lg px-8 py-4">
                                    Book Strategy Call
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
