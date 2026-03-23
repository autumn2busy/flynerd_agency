"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section
            ref={ref}
            className="py-32 lg:py-44 relative overflow-hidden"
            style={{ background: "#070709" }}
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/30 to-transparent" />

            {/* Large background text */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                aria-hidden
            >
                <span
                    className="text-[22vw] font-black tracking-tighter leading-none"
                    style={{ color: "rgba(255,255,255,0.015)", letterSpacing: "-0.05em" }}
                >
                    FLYNERD
                </span>
            </div>

            {/* Ambient color pools */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(232,185,35,0.04)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(220,38,38,0.04)_0%,transparent_70%)] pointer-events-none" />

            <div className="section-container relative z-10">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#dc2626]">
                        Who We Are
                    </span>
                </motion.div>

                {/* Acronym stack */}
                <div className="max-w-4xl mx-auto space-y-4 lg:space-y-5">
                    {letters.map(({ letter, word, color }, i) => (
                        <motion.div
                            key={letter}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-6 lg:gap-10 group cursor-default"
                        >
                            {/* Large letter */}
                            <div
                                className="flex-shrink-0 w-14 h-14 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl flex items-center justify-center font-black text-2xl lg:text-4xl transition-all duration-300 group-hover:scale-110"
                                style={{
                                    background: `${color}12`,
                                    border: `1.5px solid ${color}30`,
                                    color: color,
                                    boxShadow: `inset 0 1px 0 ${color}20`,
                                }}
                            >
                                {letter}
                            </div>

                            {/* Word */}
                            <span
                                className="text-[clamp(1.8rem,5vw,4rem)] font-black tracking-tight leading-none transition-colors duration-300"
                                style={{ color: "rgba(255,255,255,0.08)" }}
                                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
                                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.08)"; }}
                            >
                                {word}
                            </span>

                            {/* Divider line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : {}}
                                transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                                className="flex-1 h-px origin-left hidden lg:block"
                                style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Manifesto line */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: letters.length * 0.1 + 0.2 }}
                    className="text-center mt-20 space-y-6"
                >
                    <p className="text-white/35 text-lg italic max-w-2xl mx-auto leading-relaxed">
                        "Where intelligence meets influence.{" "}
                        <span className="text-[#E8B923]/70">Brilliance deserves style.</span>{" "}
                        Unapologetically melanin."
                    </p>
                    <p className="text-white/20 text-sm tracking-widest uppercase">
                        Atlanta-based · Global energy
                    </p>
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