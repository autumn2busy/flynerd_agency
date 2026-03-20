const differentiators = [
    { title: "Strategy First", body: "We start with the business problem, not the software." },
    { title: "Built to Sell", body: "Every page, workflow, and CTA is designed to drive action." },
    { title: "AI With a Point", body: "We use AI where it creates speed, insight, and leverage — not just buzzwords." },
    { title: "Productized and Premium", body: "You get a clear process, high-touch thinking, and a modern client experience." },
]

export function WhyFlynerdSection() {
    return (
        <section className="section-padding bg-slate-50/50">
            <div className="container">
                <div className="grid items-start gap-12 lg:grid-cols-2">
                    <div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Why FlyNerd
                        </h2>
                        <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-lg">
                            We are not here to hand you another pretty website and wish you luck. We care about conversion, clarity, follow-up, and actual movement. If your digital presence is weak, we fix the front end and the logic behind it.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {differentiators.map((d) => (
                            <div key={d.title} className="rounded-xl border border-slate-100 bg-white p-5 card-lift">
                                <h3 className="font-heading font-semibold text-base mb-2">{d.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
