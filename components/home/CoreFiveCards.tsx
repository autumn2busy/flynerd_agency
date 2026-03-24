"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const coreFive = [
    { title: "AI Booking Agent", body: "24/7 lead capture and qualification. A missed-call replacement for your website that books, qualifies, follows up, and helps convert more leads.", accent: "#E8B923" },
    { title: "AI Personalization", body: "Your brand palette, copy, and layout come from your real reputation and reviews — not a template. Every site is unique to the business.", accent: "#10b981" },
    { title: "7-Day Launch", body: "Automated pipelines mean we don't wait weeks for approvals or content. We build from data we already have and deliver fast.", accent: "#E8B923" },
    { title: "Local SEO Stack", body: "Next.js headless with schema markup and sub-second load times — the technical foundation local search rewards.", accent: "#10b981" },
    { title: "Managed Monthly", body: "Hosting, SSL, security, and minor AI updates included. Your site stays fast, secure, and current.", accent: "#dc2626" },
];

export default function CoreFiveCards() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} className="py-24 lg:py-32 bg-[#0a0a0c] relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#10b981]/15 to-transparent" />
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#10b981] mb-4">What's Included</span>
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
                        Every FlyNerd site includes{" "}
                        <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                            the Core Five.
                        </span>
                    </h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {coreFive.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden interactive-glow"
                            style={{
                                background: "rgba(255,255,255,0.025)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = `${item.accent}35`;
                                el.style.background = `${item.accent}06`;
                                el.style.backdropFilter = "blur(12px)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = "rgba(255,255,255,0.06)";
                                el.style.background = "rgba(255,255,255,0.025)";
                                el.style.backdropFilter = "none";
                            }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
                            }}
                        >
                            <div className="relative z-10">
                                <div className="w-2 h-2 rounded-full mb-5" style={{ background: item.accent }} />
                                <h3 className="text-base font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-sm text-white/45 leading-relaxed">{item.body}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/ai-website"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-[#E8B923] transition-colors"
                    >
                        Full product details <ChevronRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}