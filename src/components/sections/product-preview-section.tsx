"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const tabs = [
    {
        id: "before",
        label: "Before",
        content: "Cluttered message. Weak offer. No urgency. No system. Visitors land, get confused, and leave.",
    },
    {
        id: "after",
        label: "After",
        content: "Clear positioning. Better trust signals. Strong CTA. Structured follow-up that catches the leads you used to lose.",
    },
    {
        id: "lead-flow",
        label: "Lead Flow",
        content: "Forms, booking, routing, and response flow built to reduce drop-off. Every lead gets a fast, on-brand experience.",
    },
    {
        id: "follow-up",
        label: "Follow-Up",
        content: "Video outreach, objection handling, and behavior-based messaging. Not just emails — conversations that convert.",
    },
    {
        id: "reporting",
        label: "Reporting",
        content: "Know who engaged, what they cared about, and where deals stalled. Stop guessing and start growing.",
    },
]

export function ProductPreviewSection() {
    const [activeTab, setActiveTab] = useState("before")
    const active = tabs.find((t) => t.id === activeTab)!

    return (
        <section id="product-preview" className="section-padding bg-slate-50/50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        What we improve is not just the homepage. It is the entire lead journey.
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        A stronger website is the front door. The real win is what happens after someone clicks.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-100/50 overflow-hidden">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-1.5 border-b px-5 py-3 bg-slate-50">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                            <span className="ml-3 text-[10px] font-mono text-muted-foreground">flynerd.tech/preview</span>
                        </div>
                        {/* Tabs */}
                        <div className="flex border-b overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "text-primary border-b-2 border-primary bg-primary/5"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        {/* Content */}
                        <div className="p-8 min-h-[180px] flex items-center">
                            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                                {active.content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
