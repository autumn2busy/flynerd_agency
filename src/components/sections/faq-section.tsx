"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
    {
        q: "Do I need to know exactly what I want before we start?",
        a: "No. That is part of what FlyNerd helps uncover. We look at the gaps, the user journey, and the business goal, then shape the right build.",
    },
    {
        q: "Can you help if I do not have a website at all?",
        a: "Yes. That is one of the clearest use cases. We can build a clean, strategic online presence from scratch.",
    },
    {
        q: "Do you only work with real estate businesses?",
        a: "No. FlyNerd works across industries. The common thread is a weak digital presence and a need for stronger conversion.",
    },
    {
        q: "Is this just web design?",
        a: "No. The website is the entry point. We also focus on lead capture, follow-up, objection handling, and reporting.",
    },
    {
        q: "Do you offer custom solutions?",
        a: "Yes. Small business, mid-market, and select enterprise teams can engage FlyNerd for custom scopes.",
    },
    {
        q: "What if I want to start smaller?",
        a: "Start with a teardown or audit. That gives you a clear picture of the gap before committing to a full project.",
    },
]

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="section-padding bg-white">
            <div className="container max-w-3xl">
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/50 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-5 text-left"
                            >
                                <span className="font-medium text-foreground pr-4">{faq.q}</span>
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                                        openIndex === i && "rotate-180"
                                    )}
                                />
                            </button>
                            {openIndex === i && (
                                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDuration: "200ms" }}>
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
