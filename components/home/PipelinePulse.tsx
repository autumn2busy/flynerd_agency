"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const stages = [
    {
        id: "scout",
        label: "Scout",
        sub: "Finds leads",
        color: "#10b981",
        glow: "rgba(16,185,129,0.4)",
        detail: "AI scans Yelp for local businesses with no website",
    },
    {
        id: "intel",
        label: "Intel",
        sub: "Reads reputation",
        color: "#E8B923",
        glow: "rgba(232,185,35,0.4)",
        detail: "Reviews, rating, brand palette — extracted automatically",
    },
    {
        id: "builder",
        label: "Builder",
        sub: "Deploys site",
        color: "#10b981",
        glow: "rgba(16,185,129,0.4)",
        detail: "Custom site live on Vercel in under 7 days",
    },
    {
        id: "closer",
        label: "Closer",
        sub: "Converts leads",
        color: "#E8B923",
        glow: "rgba(232,185,35,0.4)",
        detail: "AI replies to prospect emails, moves deal to Negotiating",
    },
];

export default function PipelinePulse() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [activeStage, setActiveStage] = useState(-1);
    const [pulseIndex, setPulseIndex] = useState(-1);
    const [dataFlowing, setDataFlowing] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!inView) return;
        // Stagger each node lighting up
        stages.forEach((_, i) => {
            setTimeout(() => setActiveStage(i), 400 + i * 350);
        });
        setTimeout(() => {
            setDataFlowing(true);
            // Pulse loop
            let idx = 0;
            intervalRef.current = setInterval(() => {
                setPulseIndex(idx % stages.length);
                idx++;
            }, 800);
        }, 400 + stages.length * 350 + 300);

        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [inView]);

    return (
        <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: "linear-gradient(rgba(232,185,35,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,185,35,1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
            }} />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#10b981] mb-4"
                    >
                        The Machine
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white"
                    >
                        Your pipeline.{" "}
                        <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                            Fully automated.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/50 mt-4 max-w-xl mx-auto"
                    >
                        Four AI agents working in sequence — from finding a lead to closing the deal.
                        Zero manual steps.
                    </motion.p>
                </div>

                {/* Pipeline nodes */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Connector line */}
                    <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-white/8 hidden lg:block" />

                    {/* Animated data flow line */}
                    {dataFlowing && (
                        <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-px hidden lg:block overflow-hidden">
                            <motion.div
                                className="h-full w-16 bg-gradient-to-r from-transparent via-[#E8B923] to-transparent"
                                animate={{ x: ["-100%", "600%"] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                        {stages.map((stage, i) => (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={activeStage >= i ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center gap-4 relative"
                            >
                                {/* Node circle */}
                                <div className="relative">
                                    <motion.div
                                        animate={pulseIndex === i ? {
                                            boxShadow: [`0 0 0px ${stage.glow}`, `0 0 32px ${stage.glow}`, `0 0 0px ${stage.glow}`],
                                        } : {}}
                                        transition={{ duration: 0.6 }}
                                        className="w-[104px] h-[104px] rounded-full border flex items-center justify-center relative"
                                        style={{
                                            borderColor: activeStage >= i ? stage.color : "rgba(255,255,255,0.08)",
                                            background: activeStage >= i
                                                ? `radial-gradient(circle, ${stage.color}18 0%, transparent 70%)`
                                                : "transparent",
                                        }}
                                    >
                                        {/* Inner circle */}
                                        <div
                                            className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-black tracking-wider"
                                            style={{
                                                background: activeStage >= i
                                                    ? `radial-gradient(circle, ${stage.color}30 0%, ${stage.color}10 100%)`
                                                    : "rgba(255,255,255,0.03)",
                                                border: `1.5px solid ${activeStage >= i ? stage.color : "rgba(255,255,255,0.06)"}`,
                                                color: activeStage >= i ? stage.color : "rgba(255,255,255,0.2)",
                                            }}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </div>

                                        {/* Active pulse ring */}
                                        {activeStage >= i && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ border: `1px solid ${stage.color}` }}
                                                animate={{ scale: [1, 1.35], opacity: [0.4, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                            />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Label */}
                                <div className="text-center">
                                    <p className="font-bold text-white text-sm tracking-wide">{stage.label}</p>
                                    <p className="text-xs mt-1" style={{ color: activeStage >= i ? stage.color : "rgba(255,255,255,0.3)" }}>
                                        {stage.sub}
                                    </p>
                                </div>

                                {/* Detail card on hover/active */}
                                {activeStage >= i && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-center px-3 py-2 rounded-lg text-xs text-white/40 leading-relaxed"
                                        style={{ border: `1px solid ${stage.color}18`, background: `${stage.color}06` }}
                                    >
                                        {stage.detail}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Live indicator */}
                    {dataFlowing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-center gap-2 mt-10"
                        >
                            <motion.div
                                className="w-2 h-2 rounded-full bg-[#10b981]"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                            />
                            <span className="text-xs text-[#10b981] font-bold tracking-widest uppercase">
                                Pipeline active
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}