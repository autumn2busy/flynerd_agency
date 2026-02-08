import { FileText, Download, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ResourcesPage() {
    const resources = [
        {
            title: "Franchise Automation Scorecard",
            description: "Rate your operations across 20 data points. Identify your biggest leaks in speed-to-lead and dispatch.",
            type: "Interactive Tool",
            icon: BarChart,
            cta: "Start Assessment",
            href: "/contact"
        },
        {
            title: "The Multi-Location Playbook",
            description: "A 15-page guide on standardizing SOPs and compliance checks across distributed networks.",
            type: "PDF Guide",
            icon: FileText,
            cta: "Download PDF",
            href: "/contact"
        },
        {
            title: "Speed-to-Lead Calculator",
            description: "Input your lead volume and current response times to see how much revenue you are bleeding.",
            type: "Excel Template",
            icon: Download,
            cta: "Get Template",
            href: "/contact"
        }
    ]

    return (
        <div className="py-20 lg:py-32">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Operator Resources
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Tools, templates, and guides to help you govern your growth.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {resources.map((resource, i) => (
                        <Card key={i} className="flex flex-col">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <resource.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-sm font-medium text-primary mb-2">{resource.type}</div>
                                <CardTitle className="text-xl">{resource.title}</CardTitle>
                                <CardDescription className="text-base mt-2">{resource.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                {/* Spacer */}
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={resource.href}>
                                        {resource.cta}
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
