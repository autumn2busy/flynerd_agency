"use client"

import { motion } from "framer-motion"

const steps = [
    {
        title: "Discover",
        description: "We audit your current stack, workflows, and pain points to identify the highest-ROI automation opportunities.",
    },
    {
        title: "Design",
        description: "We map the future state, design the data schema, and create the Automation Blueprint for your approval.",
    },
    {
        title: "Build",
        description: "Our engineers build the automations, integrations, and dashboards in a dedicated environment.",
    },
    {
        title: "Harden",
        description: "Rigorous testing, error handling, and edge-case validation to ensure enterprise-grade stability.",
    },
    {
        title: "Launch",
        description: "We deploy to production, train your team, and provide go-live support to ensure smooth adoption.",
    },
    {
        title: "Operate",
        description: "Ongoing monitoring, optimization, and support to keep your automation infrastructure healthy.",
    },
]

export function Timeline() {
    return (
        <section className="container py-24 md:py-32" id="how-we-work">
            <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                    How We Work
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    A repeatable, transparent process from audit to optimization.
                </p>
            </div>
            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-9 top-4 bottom-4 w-px bg-border md:left-1/2 md:-ml-px" />
                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative flex items-center md:justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-background border-4 border-muted z-10 md:order-1 md:mx-auto">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                    {index + 1}
                                </div>
                            </div>
                            <div className="ml-8 flex-1 md:ml-0 md:w-5/12">
                                <div className={`p-6 rounded-2xl border bg-card/50 backdrop-blur ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                    }`}>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                            <div className="hidden md:block md:w-5/12" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
