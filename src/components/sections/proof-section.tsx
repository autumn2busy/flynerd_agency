import { Eye, ArrowUpRight, BarChart3 } from "lucide-react"

const miniCases = [
    {
        icon: Eye,
        title: "More Clarity",
        body: "Visitors know what you do, who you serve, and what to do next.",
    },
    {
        icon: ArrowUpRight,
        title: "Better Lead Flow",
        body: "Forms, booking links, and follow-up systems stop letting interested people disappear.",
    },
    {
        icon: BarChart3,
        title: "Smarter Visibility",
        body: "You can see interest patterns, objections, and opportunities instead of relying on guesswork.",
    },
]

export function ProofSection() {
    return (
        <section className="section-padding bg-slate-50/50">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        What better systems actually change
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3 mb-12">
                    {miniCases.map((c) => (
                        <div key={c.title} className="rounded-xl border border-slate-100 bg-white p-6 card-lift text-center">
                            <c.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                            <h3 className="font-heading font-semibold text-lg mb-2">{c.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                        </div>
                    ))}
                </div>
                <div className="max-w-2xl mx-auto text-center">
                    <blockquote className="rounded-xl border border-primary/10 bg-primary/[0.02] p-8">
                        <p className="text-base italic text-foreground leading-relaxed">
                            &ldquo;FlyNerd did not just make the brand look better. They made the path to conversion make sense.&rdquo;
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground font-medium">— Future Client Testimonial</p>
                    </blockquote>
                </div>
            </div>
        </section>
    )
}
