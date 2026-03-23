"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";

type Message = {
    from: "customer" | "ai";
    text: string;
    delay?: number;
};

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
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

function generateSessionId() {
    return `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ChatScenario() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-80px" });
    const [mode, setMode] = useState<"live" | "demo">("live");
    const [activeScenario, setActiveScenario] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState<number>(-1);
    const [isTyping, setIsTyping] = useState(false);
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    // Live chat state
    const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(generateSessionId);
    const [messageCount, setMessageCount] = useState(0);
    const [limitReached, setLimitReached] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const MAX_MESSAGES = 5;
    const scenario = scenarios[activeScenario];
    const accentColor = mode === "live" ? "#E8B923" : scenario.accentColor;

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [liveMessages, visibleMessages]);

    // Demo scenario replay
    const runScenario = useCallback((messages: Message[]) => {
        setVisibleMessages(-1);
        setIsTyping(false);
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];

        messages.forEach((msg, i) => {
            if (msg.from === "ai") {
                timersRef.current.push(setTimeout(() => setIsTyping(true), (msg.delay || 0) - 400));
            }
            timersRef.current.push(setTimeout(() => {
                setIsTyping(false);
                setVisibleMessages(i);
            }, msg.delay || 0));
        });
    }, []);

    useEffect(() => {
        if (inView && mode === "demo") runScenario(scenario.messages);
        return () => timersRef.current.forEach(clearTimeout);
    }, [inView, activeScenario, mode, runScenario, scenario.messages]);

    // Live chat send
    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading || limitReached) return;

        const userMsg: ChatMessage = { role: "user", content: inputValue.trim() };
        const newMessages = [...liveMessages, userMsg];
        setLiveMessages(newMessages);
        setInputValue("");
        setIsLoading(true);
        setMessageCount((c) => c + 1);

        try {
            const res = await fetch("/api/chat-demo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages, sessionId }),
            });

            if (res.status === 429) {
                setLimitReached(true);
                setIsLoading(false);
                return;
            }

            const data = await res.json();
            if (data.reply) {
                setLiveMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
            }

            if (messageCount + 1 >= MAX_MESSAGES) {
                setLimitReached(true);
            }
        } catch {
            setLiveMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Connection hiccup. Try again?" },
            ]);
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    return (
        <section ref={ref} className="py-24 lg:py-32 bg-[#0d0d10] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="section-container">
                <div className="text-center mb-16">
                    <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#dc2626] mb-4">
                        {mode === "live" ? "Try It Now" : "2 AM. No Staff. No Problem."}
                    </span>
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
                        {mode === "live" ? (
                            <>
                                Talk to our{" "}
                                <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                                    AI right now.
                                </span>
                            </>
                        ) : (
                            <>
                                Watch your{" "}
                                <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                                    digital employee
                                </span>{" "}
                                work.
                            </>
                        )}
                    </h2>
                    <p className="text-white/40 mt-4 max-w-lg mx-auto text-sm">
                        {mode === "live"
                            ? "This is a live AI — type a real question and see what your site could do."
                            : "Real conversations. Real bookings. No humans required."}
                    </p>
                </div>

                {/* Mode toggle + scenario tabs */}
                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                    <button
                        onClick={() => setMode("live")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                        style={{
                            background: mode === "live" ? "rgba(232,185,35,0.15)" : "rgba(255,255,255,0.04)",
                            border: `1px solid ${mode === "live" ? "#E8B923" : "rgba(255,255,255,0.08)"}`,
                            color: mode === "live" ? "#E8B923" : "rgba(255,255,255,0.4)",
                        }}
                    >
                        <span className="relative flex h-2 w-2">
                            {mode === "live" && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8B923] opacity-75" />
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${mode === "live" ? "bg-[#E8B923]" : "bg-white/30"}`} />
                        </span>
                        Try it live
                    </button>

                    {scenarios.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setMode("demo");
                                setActiveScenario(i);
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                            style={{
                                background: mode === "demo" && activeScenario === i ? `${s.accentColor}18` : "rgba(255,255,255,0.04)",
                                border: `1px solid ${mode === "demo" && activeScenario === i ? s.accentColor : "rgba(255,255,255,0.08)"}`,
                                color: mode === "demo" && activeScenario === i ? s.accentColor : "rgba(255,255,255,0.4)",
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
                        key={mode === "live" ? "live" : `demo-${activeScenario}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative rounded-[2.5rem] overflow-hidden"
                        style={{
                            background: "#0a0a0c",
                            border: "1.5px solid rgba(255,255,255,0.12)",
                            boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${accentColor}15`,
                        }}
                    >
                        {/* Phone status bar */}
                        <div className="flex items-center justify-between px-6 pt-5 pb-3">
                            <span className="text-xs text-white/40 font-medium">
                                {mode === "live" ? "Now" : scenario.time}
                            </span>
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
                                style={{
                                    background: `${accentColor}20`,
                                    color: accentColor,
                                    border: `1px solid ${accentColor}40`,
                                }}
                            >
                                FN
                            </div>
                            <div>
                                <p className="text-white text-sm font-semibold">FlyNerd AI Agent</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                                    <span className="text-xs text-[#10b981]">
                                        {mode === "live" ? "Online · Live Demo" : `Online · ${scenario.niche}`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Messages area */}
                        <div className="px-4 py-5 space-y-3 min-h-[320px] max-h-[360px] overflow-y-auto">
                            {mode === "live" ? (
                                <>
                                    {/* Welcome message */}
                                    {liveMessages.length === 0 && !isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex justify-start"
                                        >
                                            <div
                                                className="max-w-[82%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
                                                style={{
                                                    background: `${accentColor}18`,
                                                    color: "rgba(255,255,255,0.85)",
                                                    border: `1px solid ${accentColor}25`,
                                                }}
                                            >
                                                Hey! 👋 I&apos;m the FlyNerd AI. Ask me anything — how we build sites, pricing, or pretend you&apos;re a customer at 2 AM needing a plumber.
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Live messages */}
                                    <AnimatePresence>
                                        {liveMessages.map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                                                    style={
                                                        msg.role === "user"
                                                            ? {
                                                                background: "rgba(255,255,255,0.1)",
                                                                color: "rgba(255,255,255,0.85)",
                                                                borderBottomRightRadius: "4px",
                                                            }
                                                            : {
                                                                background: `${accentColor}18`,
                                                                color: "rgba(255,255,255,0.85)",
                                                                border: `1px solid ${accentColor}25`,
                                                                borderBottomLeftRadius: "4px",
                                                            }
                                                    }
                                                >
                                                    {msg.content}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Limit reached CTA */}
                                    {limitReached && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex justify-start"
                                        >
                                            <div className="max-w-[90%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed space-y-3"
                                                style={{
                                                    background: `${accentColor}18`,
                                                    border: `1px solid ${accentColor}30`,
                                                }}
                                            >
                                                <p className="text-white/85">Impressed? That was just the demo. Imagine this working 24/7 for <em>your</em> business.</p>
                                                <Link
                                                    href="/contact"
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all hover:brightness-110"
                                                    style={{ background: accentColor, color: "#000" }}
                                                >
                                                    Book a Strategy Call <ArrowUpRight size={12} />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {/* Scripted demo messages */}
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
                                </>
                            )}

                            {/* Typing indicator */}
                            <AnimatePresence>
                                {(isTyping || isLoading) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div
                                            className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
                                            style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}20` }}
                                        >
                                            {[0, 1, 2].map((dot) => (
                                                <motion.div
                                                    key={dot}
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{ background: accentColor }}
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input bar */}
                        <div
                            className="px-4 py-4 flex items-center gap-3"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            {mode === "live" && !limitReached ? (
                                <>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        placeholder="Ask me anything..."
                                        disabled={isLoading}
                                        className="flex-1 bg-white/5 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-[#E8B923]/30 transition-all disabled:opacity-50"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={isLoading || !inputValue.trim()}
                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90 disabled:opacity-30"
                                        style={{ background: accentColor }}
                                    >
                                        <Send size={14} color="#000" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="flex-1 bg-white/5 rounded-full px-4 py-2.5 text-xs text-white/20">
                                        {limitReached ? "Demo complete" : "Message..."}
                                    </div>
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 opacity-40"
                                        style={{ background: accentColor }}
                                    >
                                        <Send size={14} color="#000" />
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Helper text */}
                    <p className="text-center text-xs text-white/20 mt-4">
                        {mode === "live"
                            ? `${MAX_MESSAGES - messageCount} messages remaining · Powered by Groq`
                            : "Tap a scenario above to replay ↑"}
                    </p>
                </div>
            </div>
        </section>
    );
}