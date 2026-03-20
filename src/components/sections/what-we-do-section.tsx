import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const features = [
    "Find high-fit leads in your market",
    "Identify likely pain points before outreach",
    "Build a custom demo around the opportunity",
    "Create a personalized video pitch",
    "Handle early objections with smart follow-up",
    "Track lead behavior and surface real buying signals",
    "Support retention with better client visibility and reporting",
]

export function WhatWeDoSection() {
    return (
        <section className="section-padding bg-slate-50/50">
            <div className="container">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            We do more than build websites. We build the system behind the sale.
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                            FlyNerd Tech combines strategy, AI automation, sharp messaging, and conversion-focused design to turn weak digital presence into something that actually performs.
                        </p>
                        <div className="mt-8">
                            <Button asChild className="font-semibold">
                                <Link href="#product-preview">See What This Looks Like</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-4">
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <Check className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-sm font-medium text-foreground">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
