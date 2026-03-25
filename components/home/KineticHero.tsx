"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const words = ["Your", "Website", "Should", "Be", "A", "Digital", "Employee."];
const highlightWords = ["Digital", "Employee."];

export default function KineticHero() {
    const [visibleWords, setVisibleWords] = useState<number>(-1);
    const [subVisible, setSubVisible] = useState(false);
    const [ctaVisible, setCtaVisible] = useState(false);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        words.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleWords(i), 240 + i * 110));
        });

        timers.push(setTimeout(() => setSubVisible(true), 240 + words.length * 110 + 120));
        timers.push(setTimeout(() => setCtaVisible(true), 240 + words.length * 110 + 360));

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#0a0a0c]">
            {/* Fallback image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero-lightbulb.jpg')" }}
            />

            {/* Video layer */}
            <video
                autoPlay
                loop
                muted
                playsInline
                poster="/hero-lightbulb.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.42) saturate(1.08)" }}
            >
                <source src="/Animated_hero_video_202603231332.mp4" type="video/mp4" />
            </video>

            {/* Overlays */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,12,0.92)_0%,rgba(10,10,12,0.58)_45%,rgba(10,10,12,0.28)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,12,0.78)_0%,transparent_35%,rgba(10,10,12,0.82)_100%)]" />

            {/* Ambient tone. Kept intentional, not noisy */}
            <div className="absolute inset-x-0 bottom-0 h-[260px] bg-[radial-gradient(ellipse_at_bottom,rgba(232,185,35,0.10)_0%,transparent_72%)] pointer-events-none" />
            <div className="absolute top-1/4 right-0 w-[360px] h-[360px] bg-[radial-gradient(circle,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.08]">
                <div className="grid-lines" />
            </div>

            <div className="relative z-10 max-w-5xl px-6 pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mb-8 flex items-center justify-center gap-3"
                >
                    <div className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--amber-500)]" />
                    <span className="section-label !mb-0 !text-[var(--amber-400)]">
                        AI-Powered Websites · Atlanta
                    </span>
                    <div className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--amber-500)]" />
                </motion.div>

                <h1 className="text-[clamp(3.2rem,9vw,6.8rem)] font-[800] leading-[0.92] tracking-[-0.04em] mb-8 flex flex-wrap justify-center gap-x-[0.2em] gap-y-2">
                    {words.map((word, i) => (
                        <AnimatePresence key={i}>
                            {visibleWords >= i && (
                                <motion.span
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                    className={
                                        highlightWords.includes(word)
                                            ? "gradient-text"
                                            : "text-[var(--text-primary)]"
                                    }
                                >
                                    {word}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    ))}
                </h1>

                <AnimatePresence>
                    {subVisible && (
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-[clamp(1.02rem,2.1vw,1.22rem)] text-[rgba(245,245,247,0.78)] leading-relaxed mb-5 max-w-3xl mx-auto"
                        >
                            A site that turns visitors into appointments with after-hours booking,
                            follow-up, and 24/7 lead capture built in.
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {subVisible && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.12, duration: 0.45 }}
                            className="text-sm text-[rgba(245,245,247,0.58)] mb-10 tracking-[0.18em] uppercase"
                        >
                            Live in <span className="text-[var(--amber-400)] font-semibold">7 days</span>
                            <span className="mx-3 text-[rgba(245,245,247,0.22)]">·</span>
                            From <span className="text-[var(--amber-400)] font-semibold">$1,250</span>
                            <span className="mx-3 text-[rgba(245,245,247,0.22)]">·</span>
                            Managed monthly
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {ctaVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link href="/ai-website" className="btn btn-primary px-8 py-4 text-base">
                                See How It Works
                                <ArrowUpRight size={18} />
                            </Link>

                            <Link href="/pricing" className="btn btn-ghost px-8 py-4 text-base">
                                View Pricing
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {ctaVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12, duration: 0.45 }}
                            className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[rgba(245,245,247,0.52)]"
                        >
                            <span>24/7 lead capture</span>
                            <span className="text-[rgba(245,245,247,0.18)]">•</span>
                            <span>After-hours booking</span>
                            <span className="text-[rgba(245,245,247,0.18)]">•</span>
                            <span>CRM-ready leads</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.7 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgba(245,245,247,0.34)] z-10"
            >
                <div className="w-5 h-8 border border-[rgba(232,185,35,0.24)] flex items-start justify-center p-1 rounded-full">
                    <div className="w-0.5 h-2 bg-[rgba(232,185,35,0.7)] animate-bounce" />
                </div>
                <span className="text-[9px] tracking-[0.22em] uppercase">Scroll</span>
            </motion.div>
        </section>
    );
}