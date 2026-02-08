import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CaseStudiesPage() {
    const cases = [
        {
            title: "Hospitality Services Pivot",
            subtitle: "Multi-Location Operator (80-150 Locations)",
            challenge: "Manual lead response took 4+ hours. Missed opportunities were estimated at $2M/year.",
            solution: "Implemented Growth OS with Speed-to-Lead automation and AI qualification.",
            results: [
                { label: "Response Time", value: "< 2 mins", icon: Clock },
                { label: "Conversion Lift", value: "+35%", icon: TrendingUp },
                { label: "Missed Leads", value: "~0%", icon: BarChart },
            ],
            tags: ["Hospitality", "Growth OS", "Speed-to-Lead"]
        },
        {
            title: "Field Ops Stabilization",
            subtitle: "Property Services Group",
            challenge: "Chaos in dispatch. 500+ weekly work orders managed via spreadsheets. 15% error rate.",
            solution: "Deployed Ops OS with auto-dispatch, mobile proof-of-work, and SLA monitoring.",
            results: [
                { label: "Throughput", value: "+2X", icon: TrendingUp },
                { label: "Admin Hours Saved", value: "20 hrs/wk", icon: Clock },
                { label: "Error Rate", value: "< 1%", icon: BarChart },
            ],
            tags: ["Field Services", "Ops OS", "Dispatch"]
        },
        {
            title: "Franchise Marketing Reset",
            subtitle: "National Franchise Brand",
            challenge: "Low review volume and disjointed local marketing across 300 locations.",
            solution: "Rolled out Reputation OS and localized campaign automation.",
            results: [
                { label: "Review Volume", value: "+150%", icon: TrendingUp },
                { label: "Reactivation", value: "+22%", icon: TrendingUp },
                { label: "Sentiment", value: "4.8/5", icon: BarChart },
            ],
            tags: ["Franchise", "Reputation OS", "Marketing"]
        }
    ]

    return (
        <div className="py-20 lg:py-32">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Proven Outcomes.
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Real results from operators who traded chaos for control.
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-3">
                    {cases.map((study, i) => (
                        <Card key={i} className="flex flex-col">
                            <CardHeader>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {study.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                                <CardTitle className="text-2xl">{study.title}</CardTitle>
                                <CardDescription className="text-base font-medium text-foreground/80 mt-2">
                                    {study.subtitle}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-6">
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">The Challenge</h4>
                                    <p className="text-sm">{study.challenge}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">The Solution</h4>
                                    <p className="text-sm">{study.solution}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 py-4 border-t border-b bg-muted/20 rounded-lg p-2">
                                    {study.results.map((res, j) => (
                                        <div key={j} className="text-center">
                                            <res.icon className="h-4 w-4 mx-auto mb-1 text-primary" />
                                            <div className="font-bold text-lg text-primary">{res.value}</div>
                                            <div className="text-[10px] text-muted-foreground leading-tight">{res.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" className="w-full" asChild>
                                    <Link href="/contact">
                                        See How Lookalikes Scale <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
