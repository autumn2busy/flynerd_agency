import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-amber-50 via-white to-orange-50 py-20 md:py-28 lg:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f59e0b15,transparent_55%)]"></div>
            <div className="container relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100/70 px-3 py-1 text-sm font-medium text-amber-900 mb-6">
                            Human Systems for Franchise Growth
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-balance text-slate-900">
                            Authenticity is the new Authority.
                            <span className="block text-amber-700">We build automation that feels human.</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg text-slate-600 text-balance">
                            Fly Nerd Tech replaces chaotic handoffs with a process-first system. We document the real work, then
                            automate what slows teams down — without losing the human touch.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" className="h-12 px-8 text-base bg-amber-700 text-white hover:bg-amber-800" asChild>
                                <Link href="/contact">
                                    Book an Automation Blueprint
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-amber-200 text-amber-900" asChild>
                                <Link href="/resources">
                                    See How We Work
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-6 text-left text-slate-600 md:grid-cols-4">
                            {[
                                "Discovery-first sprints",
                                "Proof before promises",
                                "Local personalization",
                                "Enterprise governance"
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-1 h-4 w-4 text-amber-700" />
                                    <span className="text-sm font-medium text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-3xl border border-amber-100 bg-white/80 p-8 shadow-xl shadow-amber-200/40 backdrop-blur">
                            <p className="text-sm font-semibold uppercase tracking-wider text-amber-700 mb-6">
                                Behind the Scenes
                            </p>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Observe",
                                        description: "We shadow your teams to capture the real workflow."
                                    },
                                    {
                                        title: "Blueprint",
                                        description: "A 10-day roadmap that maps every handoff and metric."
                                    },
                                    {
                                        title: "Build",
                                        description: "Automations that protect brand standards and local nuance."
                                    },
                                    {
                                        title: "Scale",
                                        description: "Governance, reporting, and continuous optimization."
                                    }
                                ].map((step, index) => (
                                    <div key={step.title} className="flex gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-semibold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{step.title}</p>
                                            <p className="text-sm text-slate-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                                <span className="font-semibold">Process-first storytelling:</span> every automation starts with a human map.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
