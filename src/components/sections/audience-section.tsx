import { Building2, Briefcase, Home, Rocket, Factory } from "lucide-react"

const audiences = [
    {
        icon: Building2,
        title: "Local Service Businesses",
        body: "Contractors, med spas, cleaning companies, clinics, and professional services.",
    },
    {
        icon: Briefcase,
        title: "Consultants and Agencies",
        body: "Experts with strong skills and weak digital packaging.",
    },
    {
        icon: Home,
        title: "Real Estate and Property Brands",
        body: "Agents, teams, brokerages, and service partners who need authority and follow-up.",
    },
    {
        icon: Rocket,
        title: "Growth-Ready Small to Mid-Market Teams",
        body: "Businesses ready to stop patching things together and build a proper customer journey.",
    },
    {
        icon: Factory,
        title: "Enterprise Pilot Projects",
        body: "Teams testing targeted automation, outreach, or website conversion initiatives.",
    },
]

export function AudienceSection() {
    return (
        <section className="section-padding bg-white">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Built for businesses that know their online presence needs work.
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        FlyNerd Tech works best for businesses that need stronger positioning, cleaner lead flow, and a better website-to-sale experience.
                    </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {audiences.map((a) => (
                        <div key={a.title} className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 card-lift">
                            <a.icon className="h-7 w-7 text-primary mb-3" />
                            <h3 className="font-heading font-semibold text-base mb-2">{a.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
