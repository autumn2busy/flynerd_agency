"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type Message = {
    from: "customer" | "ai";
    text: string;
    delay: number;
};

const scenarios = [
    {
        niche: "HVAC",
        time: "2:14 AM",
        icon: "🔧",
        accentColor: "#dc2626",
        messages: [
            { from: "customer", text: "My AC just stopped working. Do you do emergency service?", delay: 0 },
            { from: "ai", text: "Yes! We handle 24/7 emergency HVAC calls. Is this residential or commercial?", delay: 1200 },
            { from: "customer", text: "Residential. Is there an emergency surcharge?", delay: 2400 },
            { from: "ai", text: "Emergency calls before 6 AM are $75 extra. I can book you for 8:00 AM — want me to confirm?", delay: 3600 },
            { from: "customer", text: "Yes please!", delay: 4400 },
            { from: "ai", text: "✓ Booked for 8:00 AM. You'll get a confirmation text. See you soon!", delay: 5400 },
        ] as Message[],
    },
    {
        niche: "Med Spa",
        time: "11:47 PM",
        icon: "💆",
        accentColor: "#10b981",
        messages: [
            { from: "customer", text: "Do you have availability for a HydraFacial this Saturday?", delay: 0 },
            { from: "ai", text: "We have Saturday at 10 AM or 2 PM available. Which works better for you?", delay: 1200 },
            { from: "customer", text: "10 AM! How long does it take?", delay: 2200 },
            { from: "ai", text: "About 60 minutes. I've reserved 10 AM for you — can I get your name to confirm?", delay: 3400 },
            { from: "customer", text: "Maya Johnson", delay: 4200 },
            { from: "ai", text: "✓ Confirmed for Maya — Saturday 10 AM HydraFacial. See you then! 🌿", delay: 5200 },
        ] as Message[],
    },
    {
        niche: "Law Firm",
        time: "9:52 PM",
        icon: "⚖️",
        accentColor: "#E8B923",
        messages: [
            { from: "customer", text: "I was in a car accident today. Do you handle personal injury cases?", delay: 0 },
            { from: "ai", text: "Yes, personal injury is our specialty. Was anyone injured and was a police report filed?", delay: 1200 },
            { from: "customer", text: "I was injured and yes, police came. I'm not sure what to do next.", delay: 2400 },
            { from: "ai", text: "Don't worry — we'll walk you through everything. I can book a free consultation tomorrow morning. Would 9 or 11 AM work?", delay: 3800 },
            { from: "customer", text: "9 AM please", delay: 4800 },
            { from: "ai", text: "✓ Free consultation booked for 9 AM. Keep all documentation — we'll handle the rest.", delay: 5800 },
        ] as Message[],
    },
];

export default function ChatScenario() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-80px" });
    const [activeScenario, setActiveScenario] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState<number>(-1);
    const [isTyping, setIsTyping] = useState(false);
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const scenario = scenarios[activeScenario];

    const runScenario = (messages: Message[]) => {
        setVisibleMessages(-1);
        setIsTyping(false);
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];

        messages.forEach((msg, i) => {
            // Show typing indicator before AI messages
            if (msg.from === "ai") {
                timersRef.current.push(setTimeout(() => setIsTyping(true), msg.delay - 400));
            }
            timersRef.current.push(setTimeout(() => {
                setIsTyping(false);
                setVisibleMessages(i);
            }, msg.delay));
        });
    };

    useEffect(() => {
        if (inView) runScenario(scenario.messages);
        return () => timersRef.current.forEach(clearTimeout);
    }, [inView, activeScenario]);

    return (
        <section ref={ref} className="py-24 lg:py-32 bg-[#0d0d10] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* Atlanta red glow bottom left */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="section-container">
                <div className="text-center mb-16">
                    <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#dc2626] mb-4">2 AM. No Staff. No Problem.</span>
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
                        Watch your{" "}
                        <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                            digital employee
                        </span>{" "}
                        work.
                    </h2>
                    <p className="text-white/40 mt-4 max-w-lg mx-auto text-sm">
                        Real conversations. Real bookings. No humans required.
                    </p>
                </div>

                {/* Scenario tabs */}
                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                    {scenarios.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveScenario(i)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                            style={{
                                background: activeScenario === i ? `${s.accentColor}18` : "rgba(255,255,255,0.04)",
                                border: `1px solid ${activeScenario === i ? s.accentColor : "rgba(255,255,255,0.08)"}`,
                                color: activeScenario === i ? s.accentColor : "rgba(255,255,255,0.4)",
                            }}
                        >
                            <span>{s.icon}</span>
                            {s.niche}
                        </button>
                    ))}
                </div>

                {/* Phone mockup */}
                <div className="max-w-sm mx-auto">
                    <motion.div
                        key={activeScenario}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative rounded-[2.5rem] overflow-hidden"
                        style={{
                            background: "#0a0a0c",
                            border: "1.5px solid rgba(255,255,255,0.12)",
                            boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${scenario.accentColor}15`,
                        }}
                    >
                        {/* Phone status bar */}
                        <div className="flex items-center justify-between px-6 pt-5 pb-3">
                            <span className="text-xs text-white/40 font-medium">{scenario.time}</span>
                            <div className="w-24 h-5 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                            <div className="flex items-center gap-1">
                                <div className="w-3.5 h-3 border border-white/30 rounded-sm">
                                    <div className="h-full bg-white/60 rounded-sm" style={{ width: "75%" }} />
                                </div>
                            </div>
                        </div>

                        {/* Chat header */}
                        <div
                            className="px-5 py-3 flex items-center gap-3"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                                style={{ background: `${scenario.accentColor}20`, color: scenario.accentColor, border: `1px solid ${scenario.accentColor}40` }}
                            >
                                FN
                            </div>
                            <div>
                                <p className="text-white text-sm font-semibold">FlyNerd AI Agent</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                                    <span className="text-xs text-[#10b981]">Online · {scenario.niche}</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="px-4 py-5 space-y-3 min-h-[320px]">
                            <AnimatePresence>
                                {scenario.messages.map((msg, i) => (
                                    visibleMessages >= i && (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                                                style={
                                                    msg.from === "customer"
                                                        ? { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", borderBottomRightRadius: "4px" }
                                                        : {
                                                            background: `${scenario.accentColor}18`,
                                                            color: "rgba(255,255,255,0.85)",
                                                            border: `1px solid ${scenario.accentColor}25`,
                                                            borderBottomLeftRadius: "4px",
                                                        }
                                                }
                                            >
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>

                            {/* Typing indicator */}
                            <AnimatePresence>
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div
                                            className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
                                            style={{ background: `${scenario.accentColor}12`, border: `1px solid ${scenario.accentColor}20` }}
                                        >
                                            {[0, 1, 2].map((dot) => (
                                                <motion.div
                                                    key={dot}
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{ background: scenario.accentColor }}
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input bar */}
                        <div
                            className="px-4 py-4 flex items-center gap-3"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            <div className="flex-1 bg-white/5 rounded-full px-4 py-2.5 text-xs text-white/20">
                                Message...
                            </div>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: scenario.accentColor }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 2L11 13" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Replay hint */}
                    <p className="text-center text-xs text-white/20 mt-4">
                        Tap a scenario above to replay ↑
                    </p>
                </div>
            </div>
        </section>
    );
}