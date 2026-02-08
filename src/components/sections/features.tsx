"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, MessageSquare, ShieldCheck, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
    {
        title: "Growth OS",
        description: "Never miss a lead. Respond in seconds, not hours. Automate follow-ups and attribution hygiene.",
        icon: BarChart3,
        href: "/solutions#growth",
        color: "text-blue-500",
    },
    {
        title: "Ops OS",
        description: "Standardize intake, dispatch, and QA. Enforce proof-of-work across every location.",
        icon: Users,
        href: "/solutions#ops",
        color: "text-teal-500",
    },
    {
        title: "Reputation OS",
        description: "Turn 5-star service into 5-star reviews automatically. AI-drafted responses and location scorecards.",
        icon: MessageSquare,
        href: "/solutions#reputation",
        color: "text-indigo-500",
    },
    {
        title: "Training OS",
        description: "Onboard staff faster. AI that knows your handbook and ensures compliance via checklists.",
        icon: ShieldCheck,
        href: "/solutions#training",
        color: "text-purple-500",
    },
]

export function Features() {
    return (
        <section className="container py-24 md:py-32">
            <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                    The Franchise Automation OS
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    A modular system designed for repeatability and governance. Build the infrastructure once, deploy it everywhere.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full flex flex-col bg-card/50 backdrop-blur border-muted/50 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription className="text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Link href={feature.href} className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                                    Learn more <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
