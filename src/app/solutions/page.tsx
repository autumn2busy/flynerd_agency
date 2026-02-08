import { ArrowRight, BarChart3, MessageSquare, Briefcase, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SolutionsPage() {
    const modules = [
        {
            id: "growth",
            title: "Growth OS",
            icon: Zap,
            description: "Convert leads while you sleep.",
            features: [
                "Unified Lead Capture: Centralize leads from all sources.",
                "Speed-to-Lead Automation: Instant SMS/Email response sequences.",
                "Lifecycle Marketing: Nurture prospects automatically.",
                "Attribution Hygiene: Know exactly where your best leads come from."
            ]
        },
        {
            id: "ops",
            title: "Ops OS",
            icon: Briefcase,
            description: "Dispatch, triage, and QA on autopilot.",
            features: [
                "Smart Intake: Automated work order creation and routing.",
                "Ticket Triaging: AI-driven prioritization based on urgency.",
                "Proof-of-Work: Mobile upload workflows for field staff.",
                "SLA Monitoring: Alerts when tickets are at risk of breach."
            ]
        },
        {
            id: "reputation",
            title: "Reputation OS",
            icon: MessageSquare,
            description: "Turn 5-star service into 5-star reviews.",
            features: [
                "Review Generation: Automated requests post-service.",
                "Issue Capture: Intercept negative feedback before it goes public.",
                "Response Drafts: AI-generated response suggestions.",
                "Location Scorecards: Rank locations by sentiment and responsiveness."
            ]
        },
        {
            id: "training",
            title: "Training OS",
            icon: BarChart3,
            description: "SOPs that people actually read.",
            features: [
                "Interactive SOPs: Role-based access to procedures.",
                "Compliance Checklists: Mandatory steps for quality assurance.",
                "Knowledge Base: Searchable documentation for field teams.",
                "Onboarding Flows: Automated sequences for new hires."
            ]
        }
    ]

    return (
        <div className="py-20 lg:py-32">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        The Franchise Automation OS
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        A modular system. Adopt one module to solve a specific pain, or deploy the full OS for total governance.
                    </p>
                </div>

                <div className="space-y-24">
                    {modules.map((module, i) => (
                        <div key={module.id} id={module.id} className={`flex flex-col gap-12 lg:items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                            <div className="flex-1">
                                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                                    <module.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">{module.title}</h2>
                                <p className="text-xl text-muted-foreground mb-8">
                                    {module.description}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {module.features.map((feature, j) => (
                                        <li key={j} className="flex gap-3 text-base">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild>
                                    <Link href="/contact">
                                        Get Demo <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="flex-1">
                                <div className="aspect-video rounded-2xl bg-muted/50 border flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-muted-foreground font-mono text-sm">
                                        [ UI Interface Mockup: {module.title} ]
                                    </span>
                                    {/* Placeholder for actual screenshot/UI graphic */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
