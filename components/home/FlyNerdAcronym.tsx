"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const letters = [
    { letter: "F", word: "Freethinking", color: "#E8B923" },
    { letter: "L", word: "Lifestyle", color: "#10b981" },
    { letter: "Y", word: "Yearners", color: "#E8B923" },
    { letter: "N", word: "Navigating", color: "#10b981" },
    { letter: "E", word: "Every", color: "#E8B923" },
    { letter: "R", word: "Relevant", color: "#dc2626" },
    { letter: "D", word: "Domain", color: "#E8B923" },
];

export default function FlyNerdAcronym() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="min-h-screen flex flex-col justify-center relative overflow-hidden"
            style={{ background: "#070709" }}
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/30 to-transparent" />

            {/* Ambient pools */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,185,35,0.05)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(220,38,38,0.04)_0%,transparent_70%)] pointer-events-none" />

            <div className="section-container relative z-10 py-20 lg:py-0">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#dc2626]">
                        Who We Are
                    </span>
                </motion.div>

                {/* Giant acronym — each letter takes up major space */}
                <div className="max-w-6xl mx-auto">
                    {letters.map(({ letter, word, color }, i) => (
                        <motion.div
                            key={letter + i}
                            initial={{ opacity: 0, clipPath: i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
                            animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0%)" } : {}}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex items-baseline gap-3 lg:gap-6 group cursor-default overflow-hidden"
                            style={{ marginBottom: i < letters.length - 1 ? "-0.15em" : "0" }}
                        >
                            {/* Massive letter */}
                            <span
                                className="font-[800] leading-[0.85] tracking-[-0.06em] transition-all duration-500 select-none"
                                style={{
                                    fontSize: "clamp(4rem, 14vw, 12rem)",
                                    color: color,
                                    textShadow: `0 0 80px ${color}30`,
                                    fontFamily: "var(--font-display)",
                                }}
                            >
                                {letter}
                            </span>

                            {/* Word — ghost that reveals on hover */}
                            <span
                                className="text-[clamp(1.2rem,4vw,3.5rem)] font-[800] tracking-[-0.04em] leading-none transition-all duration-500 select-none"
                                style={{
                                    color: "rgba(255,255,255,0.06)",
                                    fontFamily: "var(--font-display)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                                    (e.target as HTMLElement).style.textShadow = `0 0 40px ${color}20`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.color = "rgba(255,255,255,0.06)";
                                    (e.target as HTMLElement).style.textShadow = "none";
                                }}
                            >
                                {word}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Manifesto — bold statement, not a footnote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: letters.length * 0.08 + 0.3 }}
                    className="text-center mt-16 lg:mt-20 space-y-6"
                >
                    <p
                        className="text-[clamp(1.25rem,3vw,2rem)] font-[700] text-white/90 max-w-3xl mx-auto leading-snug tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Where intelligence meets influence.{" "}
                        <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                            Brilliance deserves style.
                        </span>{" "}
                        <br className="hidden md:block" />
                        Unapologetically melanin.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <span
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full"
                            style={{
                                background: "rgba(220,38,38,0.1)",
                                border: "1px solid rgba(220,38,38,0.2)",
                                color: "#dc2626",
                            }}
                        >
                            Atlanta-based
                        </span>
                        <span
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full"
                            style={{
                                background: "rgba(232,185,35,0.08)",
                                border: "1px solid rgba(232,185,35,0.2)",
                                color: "#E8B923",
                            }}
                        >
                            Global energy
                        </span>
                    </div>

                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8B923]/70 hover:text-[#E8B923] transition-colors"
                    >
                        Our story <ArrowUpRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}