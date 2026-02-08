import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ServicesPage() {
    const offers = [
        {
            title: "Automation Blueprint",
            description: "Map your chaos and design your cure.",
            price: "Fixed Price",
            duration: "7-10 Days",
            features: [
                "Full workflow audit & mapping",
                "Data model design",
                "ROI forecast & feasibility analysis",
                "Phased implementation roadmap",
                "Tech stack selection"
            ],
            cta: "Book a Blueprint",
            href: "/contact",
            highlight: true
        },
        {
            title: "Implementation Sprint",
            description: "We build it. We break it. We fix it.",
            price: "Project Based",
            duration: "2-6 Weeks",
            features: [
                "Custom automation build",
                "Dashboard & reporting setup",
                "Integration configuration",
                "Team training & SOPs",
                "Go-live support"
            ],
            cta: "Discuss Your Project",
            href: "/contact",
            highlight: false
        },
        {
            title: "Managed Optimization",
            description: "Your always-on automation engineer.",
            price: "Monthly Retainer",
            duration: "Ongoing",
            features: [
                "24/7 monitoring & error handling",
                "Continuous optimization cycles",
                "New feature additions",
                "Regular strategy reviews",
                "Priority support"
            ],
            cta: "View Plans",
            href: "/contact",
            highlight: false
        },
        {
            title: "Enterprise Governance",
            description: "Scale with control and compliance.",
            price: "Custom",
            duration: "Annual",
            features: [
                "Multi-location governance",
                "Role-based access control",
                "Audit logging & compliance",
                "Dedicated environments",
                "SLA guarantees"
            ],
            cta: "Contact Sales",
            href: "/contact",
            highlight: false
        }
    ]

    return (
        <div className="py-20 lg:py-32">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Engagement Models
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        We sell outcomes, not hours. Choose the model that fits your growth stage.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {offers.map((offer, i) => (
                        <Card key={i} className={`flex flex-col ${offer.highlight ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
                            <CardHeader>
                                {offer.highlight && <Badge className="w-fit mb-2">Most Popular</Badge>}
                                <CardTitle className="text-2xl">{offer.title}</CardTitle>
                                <CardDescription className="text-base">{offer.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-3xl font-bold">{offer.price}</span>
                                    <span className="text-muted-foreground block text-sm mt-1">{offer.duration}</span>
                                </div>
                                <ul className="space-y-3">
                                    {offer.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={offer.highlight ? "default" : "outline"} asChild>
                                    <Link href={offer.href}>
                                        {offer.cta} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 lg:mt-32 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">How We Work</h2>
                    <div className="relative border-l-2 border-muted/50 ml-4 md:ml-0 md:pl-0 md:border-l-0 md:border-t-2 md:grid md:grid-cols-6 md:gap-4 md:pt-8">
                        {["Discover", "Design", "Build", "Harden", "Launch", "Operate"].map((step, i) => (
                            <div key={i} className="mb-8 ml-6 md:mb-0 md:ml-0 md:text-center relative">
                                <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-background bg-primary md:-top-[39px] md:left-1/2 md:-translate-x-1/2" />
                                <h3 className="font-bold text-lg">{step}</h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {step === "Harden" ? "Testing & QA" :
                                        step === "Operate" ? "Optimization" :
                                            `Phase ${i + 1}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
