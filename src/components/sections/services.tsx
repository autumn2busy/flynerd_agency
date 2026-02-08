"use client"

import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
    {
        title: "Automation Blueprint",
        price: "Fixed Price",
        description: "The Master Plan. We map workflows, design the data model, and build the roadmap.",
        features: [
            "Current State Analysis",
            "Future State Workflow Map",
            "Data Schema & ERD",
            "ROI Projection Model",
            "Phased & Costed Roadmap",
        ],
        cta: "Request Blueprint",
        href: "/contact",
        popular: true,
    },
    {
        title: "Implementation Sprint",
        price: "Custom",
        description: "The Build. We deploy the systems defined in the Blueprint in 2-6 weeks.",
        features: [
            "Custom Automation Build",
            "Integration Setup (CRM, FSM)",
            "Dashboard Creation",
            "Staff Training Sessions",
            "30 Days Post-Launch Support",
        ],
        cta: "Book Discovery",
        href: "/contact",
        popular: false,
    },
    {
        title: "Managed Optimization",
        price: "Monthly Retainer",
        description: "The Sustaining Force. Ongoing monitoring, improvement, and new workflows.",
        features: [
            "24/7 Error Monitoring",
            "Quarterly Strategy Reviews",
            "Monthly Optimization Hours",
            "New Workflow builds",
            "Priority Support SLA",
        ],
        cta: "Contact Sales",
        href: "/contact",
        popular: false,
    },
    {
        title: "Enterprise Package",
        price: "Custom",
        description: "For orgs with 50+ locations requiring governance and dedicated environments.",
        features: [
            "Role-Based Access Control",
            "Audit Logging & Compliance",
            "Dedicated Private Tenants",
            "Vendor/Franchisee Onboarding",
            "Custom SLA & MSA",
        ],
        cta: "Contact Sales",
        href: "/contact",
        popular: false,
    },
]

export function Services() {
    return (
        <section className="container py-24 md:py-32" id="services">
            <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                    Clear, outcome-based pricing.
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We don&apos;t sell hours. We sell deployed, working systems.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                    <Card key={service.title} className={`flex flex-col ${service.popular ? 'border-primary/50 shadow-lg shadow-primary/10' : ''}`}>
                        <CardHeader>
                            {service.popular && <Badge className="w-fit mb-2">Most Popular</Badge>}
                            <CardTitle className="text-xl">{service.title}</CardTitle>
                            <CardDescription>{service.price}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground mb-6">
                                {service.description}
                            </p>
                            <ul className="space-y-2 text-sm">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="mr-2 h-4 w-4 text-primary shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant={service.popular ? "default" : "outline"} asChild>
                                <Link href={service.href}>
                                    {service.cta} <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    )
}
