import { Globe, Sparkles, PhoneOff, EyeOff } from "lucide-react"

const painPoints = [
    {
        icon: Globe,
        title: "No Website, No Trust",
        body: "If your business barely exists online, people move on fast. A missing website makes even a great business look unfinished.",
    },
    {
        icon: Sparkles,
        title: "Pretty Site, Weak Results",
        body: "A site can look decent and still fail. If it does not guide visitors toward action, it is decoration.",
    },
    {
        icon: PhoneOff,
        title: "Leads Fall Through the Cracks",
        body: "No follow-up system means missed calls, missed forms, missed revenue, and missed opportunities.",
    },
    {
        icon: EyeOff,
        title: "No Visibility Into Buyer Behavior",
        body: "If you cannot see what people clicked, ignored, watched, or abandoned, you are guessing instead of growing.",
    },
]

export function ProblemSection() {
    return (
        <section className="section-padding bg-white">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Most businesses do not have a traffic problem. They have a conversion problem.
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        A weak website quietly kills momentum. It confuses visitors, misses leads, and leaves money sitting on the table.
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {painPoints.map((point) => (
                        <div key={point.title} className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 card-lift">
                            <point.icon className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-heading font-semibold text-lg mb-2">{point.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{point.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
