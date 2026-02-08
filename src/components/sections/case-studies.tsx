"use client"

import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"

const caseStudies = [
    {
        category: "Hospitality Services",
        title: "National Hospitality Services Network",
        metric: "18% Lift in Conversions",
        stats: [
            { label: "Response Time", value: "< 2 mins" },
            { label: "Missed Leads", value: "0" },
            { label: "Locations", value: "80-150" },
        ],
        description: "Automating speed-to-lead across 120 locations resulted in a dramatic drop in lead leakage and instant engagement for booking requests.",
        href: "/case-studies/hospitality",
    },
    {
        category: "Field Services",
        title: "Regional Property Maintenance Group",
        metric: "30% Reduction in SLA Breaches",
        stats: [
            { label: "Proof Capture", value: "100%" },
            { label: "Billing Disputes", value: "-60%" },
            { label: "Throughput", value: "+22%" },
        ],
        description: "Implemented Ops OS to standardize dispatch and require photo-proof of work before job closure, eliminating &apos;he said, she said&apos; disputes.",
        href: "/case-studies/property-maintenance",
    },
    {
        category: "Franchise Marketing",
        title: "Fast-Casual Dining Franchise",
        metric: "4.8 Star Average Rating",
        stats: [
            { label: "Review Vol", value: "+200%" },
            { label: "Prev Rating", value: "3.9" },
            { label: "Response Rate", value: "100%" },
        ],
        description: "Deployed Reputation OS to auto-solicit reviews post-transaction and draft on-brand responses for local manager approval.",
        href: "/case-studies/dining",
    },
]

export function CaseStudies() {
    return (
        <section className="bg-muted/10 py-24 md:py-32">
            <div className="container">
                <div className="flex flex-col items-center justify-between gap-4 mb-16 text-center md:flex-row md:text-left">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                            Proof, not promises.
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            See how we&apos;ve helped operators scale with control.
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/case-studies">
                            View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {caseStudies.map((study) => (
                            <CarouselItem key={study.title} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card className="h-full">
                                        <CardHeader>
                                            <div className="mb-2 flex items-center justify-between">
                                                <Badge variant="secondary">{study.category}</Badge>
                                                <div className="flex text-amber-500">
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <Star className="h-4 w-4 fill-current" />
                                                </div>
                                            </div>
                                            <CardTitle className="line-clamp-1">{study.title}</CardTitle>
                                            <CardDescription className="font-bold text-primary text-lg mt-2">
                                                {study.metric}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                                                {study.stats.map((stat) => (
                                                    <div key={stat.label} className="bg-muted p-2 rounded-lg">
                                                        <div className="font-bold text-foreground">{stat.value}</div>
                                                        <div className="text-[10px] text-muted-foreground uppercase">{stat.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {study.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            <Link href={study.href} className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                                                Read Case Study <ArrowRight className="ml-1 h-3 w-3" />
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-end mt-8 gap-2">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                    </div>
                </Carousel>
            </div>
        </section>
    )
}
