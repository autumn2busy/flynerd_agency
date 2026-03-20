import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const packages = [
    {
        name: "Launch",
        price: "$2,500",
        monthly: "$497/month",
        bestFor: "Businesses with no real website or a weak online presence.",
        features: [
            "3 to 5 page website build or refresh",
            "Core messaging cleanup",
            "Mobile optimization",
            "Contact or booking funnel",
            "Basic lead capture automation",
            "Light monthly reporting",
            "Ongoing support for edits",
        ],
        cta: "Start With Launch",
        highlight: false,
    },
    {
        name: "Lift",
        price: "$5,000",
        monthly: "$1,250/month",
        bestFor: "Businesses with a site that exists, but does not convert.",
        features: [
            "Conversion-focused redesign",
            "Improved page structure and CTA flow",
            "CRM integration",
            "AI-assisted lead qualification setup",
            "Personalized video outreach framework",
            "Objection-handling sequence",
            "Monthly optimization review",
        ],
        cta: "Choose Lift",
        highlight: true,
        badge: "Most Popular",
    },
    {
        name: "Fly",
        price: "$8,500",
        monthly: "$2,500/month",
        bestFor: "Businesses ready for full website, follow-up, and growth system support.",
        features: [
            "Full rebuild or major website optimization",
            "Multi-step lead nurture flow",
            "Custom demo creation system",
            "Personalized video pitch workflow",
            "Lead behavior tracking",
            "Retention and reporting dashboard",
            "Monthly strategy support",
        ],
        cta: "Go Fly",
        highlight: false,
    },
]

export function PricingSection() {
    return (
        <section id="pricing" className="section-padding bg-white">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Packages Built for Growth
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Whether you need a smarter site, better lead flow, or a full system behind the sale, FlyNerd has a lane for that.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.name}
                            className={`relative rounded-2xl border p-7 flex flex-col ${
                                pkg.highlight
                                    ? "border-primary bg-primary/[0.02] shadow-lg shadow-primary/5 ring-1 ring-primary/20"
                                    : "border-slate-100 bg-white"
                            }`}
                        >
                            {pkg.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                    {pkg.badge}
                                </span>
                            )}
                            <h3 className="font-heading text-xl font-bold">{pkg.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-4">{pkg.bestFor}</p>
                            <div className="mb-6">
                                <p className="text-3xl font-heading font-bold">
                                    {pkg.price}
                                    <span className="text-sm font-normal text-muted-foreground ml-1">setup</span>
                                </p>
                                <p className="text-sm text-muted-foreground">{pkg.monthly} ongoing</p>
                            </div>
                            <ul className="space-y-3 flex-1 mb-8">
                                {pkg.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-sm">
                                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                asChild
                                className={`w-full font-semibold ${pkg.highlight ? "" : "bg-foreground hover:bg-foreground/90"}`}
                                variant={pkg.highlight ? "default" : "default"}
                            >
                                <Link href="/contact">
                                    {pkg.cta}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Enterprise block */}
                <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 md:p-10 text-center">
                    <h3 className="font-heading text-xl font-bold">Custom Systems for Teams With Bigger Workflows</h3>
                    <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                        Need advanced integrations, internal automation, sales workflow mapping, or multi-team reporting? We handle custom builds for the right fit.
                    </p>
                    <div className="mt-6">
                        <Button variant="outline" asChild className="border-slate-200 font-semibold">
                            <Link href="/contact">Talk About Enterprise</Link>
                        </Button>
                    </div>
                </div>

                <p className="text-center mt-6 text-sm text-muted-foreground">
                    Need a lower-risk entry point first?{" "}
                    <Link href="/contact" className="text-primary font-medium hover:underline">
                        Ask About the FlyNerd Audit
                    </Link>
                </p>
            </div>
        </section>
    )
}
