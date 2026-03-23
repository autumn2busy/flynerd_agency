"use client";

import { useEffect, useRef, useState } from "react";
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
            timers.push(setTimeout(() => setVisibleWords(i), 300 + i * 140));
        });
        timers.push(setTimeout(() => setSubVisible(true), 300 + words.length * 140 + 200));
        timers.push(setTimeout(() => setCtaVisible(true), 300 + words.length * 140 + 600));
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Hero video background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.55) saturate(1.2)" }}
            >
                <source src="/hero-video.mp4" type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero-lightbulb.jpg')" }} />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/60 via-transparent to-[#0a0a0c]" />

            {/* Atlanta red ambient */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.08)_0%,transparent_70%)] pointer-events-none" />
            {/* Teal ambient right */}
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.07)_0%,transparent_70%)] pointer-events-none" />

            <div className="absolute inset-0 opacity-20">
                <div className="grid-lines" />
            </div>

            {/* Floating stat badges */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="absolute left-6 top-1/3 hidden lg:flex flex-col items-start gap-1 border border-[#E8B923]/20 bg-black/40 backdrop-blur-md px-4 py-3 rounded-xl"
            >
                <span className="text-2xl font-bold text-[#E8B923]">7</span>
                <span className="text-xs text-white/50 uppercase tracking-wider">Days to live</span>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="absolute right-6 top-1/3 hidden lg:flex flex-col items-end gap-1 border border-[#10b981]/20 bg-black/40 backdrop-blur-md px-4 py-3 rounded-xl"
            >
                <span className="text-2xl font-bold text-[#10b981]">24/7</span>
                <span className="text-xs text-white/50 uppercase tracking-wider">AI Active</span>
            </motion.div>

            <div className="relative z-10 max-w-5xl px-6 pt-24">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center justify-center gap-3"
                >
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E8B923]" />
                    <span className="text-xs font-bold tracking-[0.35em] uppercase text-[#E8B923]">
                        AI-Powered Websites · Atlanta
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#E8B923]" />
                </motion.div>

                {/* Kinetic headline */}
                <h1 className="text-[clamp(3rem,9vw,6.5rem)] font-black leading-[0.95] tracking-tight mb-8 flex flex-wrap justify-center gap-x-[0.22em] gap-y-2">
                    {words.map((word, i) => (
                        <AnimatePresence key={i}>
                            {visibleWords >= i && (
                                <motion.span
                                    initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className={
                                        highlightWords.includes(word)
                                            ? "bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent"
                                            : "text-white"
                                    }
                                >
                                    {word}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    ))}
                </h1>

                {/* Subheadline */}
                <AnimatePresence>
                    {subVisible && (
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-[clamp(1rem,2.2vw,1.3rem)] text-white/60 leading-relaxed mb-4 max-w-2xl mx-auto"
                        >
                            We build AI-powered websites for local businesses that book appointments,
                            answer questions, and qualify leads — 24 hours a day.
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {subVisible && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-sm text-white/35 mb-10 tracking-widest uppercase"
                        >
                            Live in <span className="text-[#E8B923] font-bold">7 days</span>
                            <span className="mx-3 text-white/20">·</span>
                            From <span className="text-[#E8B923] font-bold">$1,250</span>
                            <span className="mx-3 text-white/20">·</span>
                            Managed monthly
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* CTAs */}
                <AnimatePresence>
                    {ctaVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/ai-website"
                                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-black overflow-hidden"
                                style={{ background: "linear-gradient(135deg, #B8860B 0%, #E8B923 50%, #FFD93D 100%)" }}
                            >
                                <span className="relative z-10">See How It Works</span>
                                <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white border border-white/15 bg-white/5 backdrop-blur-sm hover:border-white/30 hover:bg-white/10 transition-all"
                            >
                                View Pricing
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10"
            >
                <div className="w-5 h-8 border border-[#E8B923]/30 flex items-start justify-center p-1">
                    <div className="w-0.5 h-2 bg-[#E8B923]/60 animate-bounce" />
                </div>
                <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
            </motion.div>
        </section>
    );
}