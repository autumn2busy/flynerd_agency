import { Search, PenTool, Cpu, Video, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const steps = [
    {
        num: "01",
        title: "Find the Opportunity",
        body: "We identify businesses with weak, outdated, or missing websites and look for clear gaps in their customer journey.",
        icon: Search,
    },
    {
        num: "02",
        title: "Discover the Pain Point",
        body: "We assess what is likely costing them attention, trust, and conversions — from weak messaging to poor lead flow.",
        icon: PenTool,
    },
    {
        num: "03",
        title: "Build the Demo",
        body: "We create a tailored concept that shows what their improved website and workflow could look like.",
        icon: Cpu,
    },
    {
        num: "04",
        title: "Create the Pitch Video",
        body: "We package the value in a clear, personalized video so the prospect understands the fix without needing a long explanation.",
        icon: Video,
    },
    {
        num: "05",
        title: "Track, Follow Up, and Optimize",
        body: "We monitor engagement, respond to objections, and build smarter systems for retention and growth.",
        icon: BarChart3,
    },
]

export function ProcessSection() {
    return (
        <section id="how-it-works" className="section-padding bg-white">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        How FlyNerd Works
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We keep it simple. Diagnose the problem. Build the solution. Prove the value. Help close the loop.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {steps.map((step) => (
                        <div key={step.num} className="relative rounded-xl border border-slate-100 bg-slate-50/50 p-6 card-lift">
                            <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">{step.num}</span>
                            <step.icon className="h-7 w-7 text-primary mt-3 mb-3" />
                            <h3 className="font-heading font-semibold text-base mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild className="font-semibold">
                        <Link href="/contact">
                            Book a Strategy Call
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
