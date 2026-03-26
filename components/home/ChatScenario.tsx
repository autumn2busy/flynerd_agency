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
        label: "HVAC",
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
        niche: "Plumbing",
        label: "Plumbing",
        time: "11:32 PM",
        icon: "🪠",
        accentColor: "#3b82f6",
        messages: [
            { from: "customer", text: "My kitchen sink is backed up and water is pooling. Can someone come tonight?", delay: 0 },
            { from: "ai", text: "We can get a technician out first thing tomorrow at 7 AM. Is the water contained or spreading?", delay: 1200 },
            { from: "customer", text: "It's contained in the sink for now. 7 AM works.", delay: 2400 },
            { from: "ai", text: "Got it. Is this a single drain backup or are other drains slow too?", delay: 3600 },
            { from: "customer", text: "Just the kitchen sink.", delay: 4400 },
            { from: "ai", text: "✓ Booked for 7:00 AM — kitchen drain service. We'll text you a 30-minute arrival window.", delay: 5400 },
        ] as Message[],
    },
    {
        niche: "Water Damage Restoration",
        label: "Water Damage",
        time: "3:47 AM",
        icon: "💧",
        accentColor: "#06b6d4",
        messages: [
            { from: "customer", text: "A pipe burst in our basement. There's standing water everywhere.", delay: 0 },
            { from: "ai", text: "I'm sorry to hear that. Is the water still actively flowing or has it been shut off?", delay: 1200 },
            { from: "customer", text: "We shut off the main valve. But there's at least 2 inches of water down there.", delay: 2400 },
            { from: "ai", text: "Good call shutting the valve. We can have an extraction crew there by 6 AM. How large is the affected area?", delay: 3600 },
            { from: "customer", text: "Maybe 400 square feet — the whole finished basement.", delay: 4800 },
            { from: "ai", text: "✓ Emergency crew booked for 6:00 AM — full extraction + moisture assessment. Don't move anything yet, we'll document for insurance.", delay: 5800 },
        ] as Message[],
    },
    {
        niche: "Personal Injury Law",
        label: "Personal Injury",
        time: "9:52 PM",
        icon: "⚖️",
        accentColor: "#E8B923",
        messages: [
            { from: "customer", text: "I was rear-ended on the highway today. Do you handle auto accident cases?", delay: 0 },
            { from: "ai", text: "Yes, auto accidents are our focus. Were you injured, and did you get a police report?", delay: 1200 },
            { from: "customer", text: "My neck and back are hurting. Yes, police filed a report.", delay: 2400 },
            { from: "ai", text: "Important — see a doctor within 48 hours if you haven't already. I can book you a free case evaluation tomorrow. Would 9 AM or 2 PM work?", delay: 3800 },
            { from: "customer", text: "9 AM please.", delay: 4800 },
            { from: "ai", text: "✓ Free consultation booked for 9 AM. Bring the police report and any medical records. We'll handle the rest.", delay: 5800 },
        ] as Message[],
    },
    {
        niche: "Senior Home Care",
        label: "Senior Care",
        time: "8:15 PM",
        icon: "🏠",
        accentColor: "#10b981",
        messages: [
            { from: "customer", text: "My mother just came home from hip surgery. She needs help around the house — do you offer in-home care?", delay: 0 },
            { from: "ai", text: "Absolutely. We provide post-surgical in-home support. Does she need help with mobility, meals, or medication reminders?", delay: 1200 },
            { from: "customer", text: "All three honestly. She lives alone and can't get around on her own yet.", delay: 2400 },
            { from: "ai", text: "We can match her with a caregiver for daily visits or live-in support. Would you like to start with a free care assessment this week?", delay: 3800 },
            { from: "customer", text: "Yes, as soon as possible.", delay: 4800 },
            { from: "ai", text: "✓ Care assessment booked for tomorrow at 10 AM at her home. Our coordinator will call you beforehand to confirm details.", delay: 5800 },
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
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [captureForm, setCaptureForm] = useState({ firstName: "", businessName: "", websiteUrl: "", email: "", niche: "" });
    const [captureSubmitting, setCaptureSubmitting] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const MAX_MESSAGES = 5;
    const scenario = scenarios[activeScenario];
    const accentColor = mode === "live" ? "#E8B923" : scenario.accentColor;

    useEffect(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [liveMessages, visibleMessages]);

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
            setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
        }
    };

    const renderMessages = () => {
        if (mode === "live") {
            return (
                <>
                    {liveMessages.length === 0 && !isLoading && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                            <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-sm text-[15px] leading-relaxed"
                                style={{ background: `${accentColor}18`, color: "rgba(255,255,255,0.85)", border: `1px solid ${accentColor}25` }}>
                                Hey! 👋 I&apos;m the FlyNerd AI. Ask me anything — how we build sites, pricing, or pretend you&apos;re a customer at 2 AM needing a plumber.
                            </div>
                        </motion.div>
                    )}
                    <AnimatePresence>
                        {liveMessages.map((msg, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className="max-w-[80%]">
                                    <div className="px-4 py-3 rounded-2xl text-[15px] leading-relaxed"
                                        style={msg.role === "user"
                                            ? { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", borderBottomRightRadius: "4px" }
                                            : { background: `${accentColor}18`, color: "rgba(255,255,255,0.85)", border: `1px solid ${accentColor}25`, borderBottomLeftRadius: "4px" }
                                        }>
                                        {msg.role === "assistant" && msg.content.includes("Book a Strategy Call")
                                            ? msg.content.replace(/\*{0,2}Book a Strategy Call\*{0,2}/g, "").trim()
                                            : msg.content}
                                    </div>
                                    {msg.role === "assistant" && msg.content.includes("Book a Strategy Call") && (
                                        <Link href="/contact"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-full transition-all hover:brightness-110 active:scale-[0.97] mt-2"
                                            style={{ background: accentColor, color: "#000" }}>
                                            Book a Strategy Call <ArrowUpRight size={12} />
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {limitReached && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                            <div className="w-full px-5 py-4 rounded-2xl rounded-bl-sm text-[15px] leading-relaxed space-y-3"
                                style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}>
                                {!leadCaptured ? (
                                    <>
                                        <p className="text-white/85 font-semibold">Want to see this for your business?</p>
                                        <p className="text-white/50 text-xs">We&apos;ll build you a free personalized demo.</p>
                                        <form onSubmit={async (e) => {
                                            e.preventDefault();
                                            if (captureSubmitting) return;
                                            setCaptureSubmitting(true);
                                            try {
                                                await fetch("/api/demo-lead", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        firstName: captureForm.firstName.trim(),
                                                        businessName: captureForm.businessName.trim(),
                                                        websiteUrl: captureForm.websiteUrl.trim(),
                                                        email: captureForm.email.trim(),
                                                        niche: captureForm.niche,
                                                        sessionId,
                                                    }),
                                                });
                                            } catch { /* never block UI */ }
                                            setLeadCaptured(true);
                                            setCaptureSubmitting(false);
                                        }} className="space-y-2">
                                            <input type="text" required value={captureForm.firstName}
                                                onChange={(e) => setCaptureForm((f) => ({ ...f, firstName: e.target.value }))}
                                                placeholder="First name"
                                                className="w-full bg-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-[#E8B923]/30" />
                                            <input type="text" required value={captureForm.businessName}
                                                onChange={(e) => setCaptureForm((f) => ({ ...f, businessName: e.target.value }))}
                                                placeholder="Business name"
                                                className="w-full bg-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-[#E8B923]/30" />
                                            <input type="url" required value={captureForm.websiteUrl}
                                                onChange={(e) => setCaptureForm((f) => ({ ...f, websiteUrl: e.target.value }))}
                                                placeholder="https://yourbusiness.com"
                                                className="w-full bg-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-[#E8B923]/30" />
                                            <input type="email" required value={captureForm.email}
                                                onChange={(e) => setCaptureForm((f) => ({ ...f, email: e.target.value }))}
                                                placeholder="you@company.com"
                                                className="w-full bg-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:ring-1 focus:ring-[#E8B923]/30" />
                                            <select required value={captureForm.niche}
                                                onChange={(e) => setCaptureForm((f) => ({ ...f, niche: e.target.value }))}
                                                className="w-full bg-white/5 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#E8B923]/30 appearance-none"
                                                style={{ colorScheme: "dark" }}>
                                                <option value="" disabled>Select your industry</option>
                                                <option value="HVAC">HVAC</option>
                                                <option value="Plumbing">Plumbing</option>
                                                <option value="Water Damage Restoration">Water Damage Restoration</option>
                                                <option value="Personal Injury Law">Personal Injury Law</option>
                                                <option value="Senior Home Care">Senior Home Care</option>
                                            </select>
                                            <button type="submit" disabled={captureSubmitting}
                                                className="w-full text-xs font-bold px-5 py-2.5 rounded-full transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-50"
                                                style={{ background: accentColor, color: "#000" }}>
                                                {captureSubmitting ? "Submitting..." : "Get My Free Demo"}
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-white/85">Your demo request is in. We&apos;ll be in touch within 24 hours — or book a call now to skip the wait.</p>
                                        <Link href="/contact"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-full transition-all hover:brightness-110 active:scale-[0.97]"
                                            style={{ background: accentColor, color: "#000" }}>
                                            Book a Strategy Call <ArrowUpRight size={12} />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </>
            );
        }

        return (
            <AnimatePresence>
                {scenario.messages.map((msg, i) => (
                    visibleMessages >= i && (
                        <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
                            <div className="max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed"
                                style={msg.from === "customer"
                                    ? { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", borderBottomRightRadius: "4px" }
                                    : { background: `${scenario.accentColor}18`, color: "rgba(255,255,255,0.85)", border: `1px solid ${scenario.accentColor}25`, borderBottomLeftRadius: "4px" }
                                }>
                                {msg.text}
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>
        );
    };

    return (
        <section ref={ref} className="py-28 lg:py-36 bg-[#0d0d10] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="section-container">
                {/* Two-column layout: copy left, device right */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

                    {/* Left — Copy + tabs */}
                    <div className="text-center lg:text-left">
                        <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#dc2626] mb-4">
                            {mode === "live" ? "Try It Now — Live AI" : "24/7 Lead Capture. After-Hours Booking."}
                        </span>
                        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-[800] tracking-tight text-white leading-[1.05] mb-4">
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
                                        missed-call replacement
                                    </span>{" "}
                                    work.
                                </>
                            )}
                        </h2>
                        <p className="text-white/40 mb-8 text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                            {mode === "live"
                                ? "This isn't a recording. Type a real question and see what your site's AI agent could do — live."
                                : "Turn visitors into appointments automatically. No humans required."}
                        </p>

                        {/* Mode tabs */}
                        <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-8">
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
                                    onClick={() => { setMode("demo"); setActiveScenario(i); }}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                                    style={{
                                        background: mode === "demo" && activeScenario === i ? `${s.accentColor}18` : "rgba(255,255,255,0.04)",
                                        border: `1px solid ${mode === "demo" && activeScenario === i ? s.accentColor : "rgba(255,255,255,0.08)"}`,
                                        color: mode === "demo" && activeScenario === i ? s.accentColor : "rgba(255,255,255,0.4)",
                                    }}
                                >
                                    <span>{s.icon}</span> {s.label}
                                </button>
                            ))}
                        </div>

                        {/* Social proof */}
                        <div className="hidden lg:flex items-center gap-4 text-xs text-white/50">
                            <div className="flex -space-x-2">
                                {["#E8B923", "#10b981", "#dc2626"].map((c, i) => (
                                    <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0d0d10] flex items-center justify-center text-[9px] font-bold"
                                        style={{ background: `${c}20`, color: c }}>
                                        {["FN", "AI", "24"][i]}
                                    </div>
                                ))}
                            </div>
                            <span>No other AAA has this. It&apos;s your product — in the window.</span>
                        </div>
                    </div>

                    {/* Right — Large device mockup */}
                    <div className="relative">
                        {/* Glow behind device */}
                        <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(232,185,35,0.08)_0%,transparent_60%)] pointer-events-none" />

                        <motion.div
                            key={mode === "live" ? "live" : `demo-${activeScenario}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative rounded-[2rem] overflow-hidden mx-auto"
                            style={{
                                maxWidth: "480px",
                                background: "#0a0a0c",
                                border: "2px solid rgba(255,255,255,0.1)",
                                boxShadow: `
                                    0 60px 120px rgba(0,0,0,0.7),
                                    0 0 80px ${accentColor}10,
                                    inset 0 1px 0 rgba(255,255,255,0.06)
                                `,
                            }}
                        >
                            {/* LIVE badge */}
                            {mode === "live" && (
                                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                    style={{ background: "rgba(232,185,35,0.15)", border: "1px solid rgba(232,185,35,0.3)", color: "#E8B923" }}>
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8B923] opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E8B923]" />
                                    </span>
                                    LIVE
                                </div>
                            )}

                            {/* Status bar */}
                            <div className="flex items-center justify-between px-7 pt-5 pb-3">
                                <span className="text-xs text-white/40 font-medium">
                                    {mode === "live" ? "Now" : scenario.time}
                                </span>
                                <div className="w-28 h-6 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                                <div className="flex items-center gap-1">
                                    <div className="w-4 h-3 border border-white/30 rounded-sm">
                                        <div className="h-full bg-white/60 rounded-sm" style={{ width: "75%" }} />
                                    </div>
                                </div>
                            </div>

                            {/* Chat header */}
                            <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                                    style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}>
                                    FN
                                </div>
                                <div>
                                    <p className="text-white text-[15px] font-semibold">FlyNerd AI Agent</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                                        <span className="text-xs text-[#10b981]">
                                            {mode === "live" ? "Online · Live Demo" : `Online · ${scenario.label}`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div ref={chatContainerRef} className="px-5 py-6 space-y-3.5 min-h-[380px] max-h-[420px] overflow-y-auto">
                                {renderMessages()}

                                {/* Typing indicator */}
                                <AnimatePresence>
                                    {(isTyping || isLoading) && (
                                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="flex justify-start">
                                            <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
                                                style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}20` }}>
                                                {[0, 1, 2].map((dot) => (
                                                    <motion.div key={dot} className="w-2 h-2 rounded-full"
                                                        style={{ background: accentColor }}
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.2 }} />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="px-5 py-5 flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                {mode === "live" && !limitReached ? (
                                    <>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                            onFocus={() => {
                                                const y = window.scrollY;
                                                requestAnimationFrame(() => window.scrollTo({ top: y }));
                                            }}
                                            placeholder="Ask me anything..."
                                            disabled={isLoading}
                                            className="flex-1 bg-white/5 rounded-full px-5 py-3 text-[15px] text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-[#E8B923]/30 transition-all disabled:opacity-50"
                                        />
                                        <button onClick={sendMessage} disabled={isLoading || !inputValue.trim()}
                                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90 disabled:opacity-30"
                                            style={{ background: accentColor }}>
                                            <Send size={16} color="#000" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex-1 bg-white/5 rounded-full px-5 py-3 text-sm text-white/20">
                                            {limitReached ? "Demo complete" : "Message..."}
                                        </div>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 opacity-30"
                                            style={{ background: accentColor }}>
                                            <Send size={16} color="#000" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* Message counter */}
                        <div className="text-center mt-5">
                            <p className="text-xs text-white/70">
                                {mode === "live"
                                    ? `${MAX_MESSAGES - messageCount} of ${MAX_MESSAGES} messages remaining · Powered by Claude`
                                    : "Tap a scenario to replay ↑"}
                            </p>
                            {mode === "live" && (
                                <p className="text-[10px] text-white/50 mt-1">
                                    Demo capped at {MAX_MESSAGES} messages per visitor to block bots and keep costs fair.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}