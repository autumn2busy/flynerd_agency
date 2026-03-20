import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/30 section-padding">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#0d948815,transparent_50%)]" />
            <div className="container relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Left — Copy */}
                    <div>
                        <p className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
                            AI-Powered Website Growth Systems
                        </p>

                        <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-[3.25rem] lg:leading-[1.15] text-balance text-foreground">
                            Your website should be closing deals,{" "}
                            <span className="text-primary">not just sitting there looking confused.</span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            FlyNerd Tech helps businesses with weak, outdated, or missing websites turn their online presence into a lead-generating sales system. We identify the pain point, build a custom demo, create a personalized pitch video, and help convert interest into actual revenue.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button size="lg" className="h-12 px-7 text-sm font-semibold" asChild>
                                <Link href="/contact">
                                    Get My Free Website Teardown
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-7 text-sm font-semibold border-slate-200" asChild>
                                <Link href="#product-preview">See a Sample Demo</Link>
                            </Button>
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            Built for small business, mid-market teams, and growth-ready brands that are tired of losing leads online.
                        </p>

                        <div className="mt-8 flex items-center gap-6 border-t pt-6">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Used for service businesses, consultants, agencies, local brands, and growing teams.
                            </p>
                        </div>
                    </div>

                    {/* Right — Dashboard mockup */}
                    <div className="relative">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
                            <div className="flex items-center gap-1.5 mb-5">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                                <span className="ml-3 text-[10px] font-mono text-muted-foreground">flynerd.tech/dashboard</span>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-4 text-center">
                                        <p className="text-2xl font-heading font-bold text-primary">100+</p>
                                        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">Lead leaks found</p>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-4 text-center">
                                        <p className="text-2xl font-heading font-bold text-foreground">Custom</p>
                                        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">Demo Concepts</p>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-4 text-center">
                                        <p className="text-2xl font-heading font-bold text-foreground">Fast</p>
                                        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">First Concept</p>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-gradient-to-r from-primary/5 to-teal-50 border border-primary/10 p-5">
                                    <p className="text-xs font-semibold text-primary mb-2">Lead Journey Preview</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="rounded bg-primary/10 text-primary font-medium px-2 py-0.5">Visit</span>
                                        <span className="text-slate-300">→</span>
                                        <span className="rounded bg-primary/10 text-primary font-medium px-2 py-0.5">Engage</span>
                                        <span className="text-slate-300">→</span>
                                        <span className="rounded bg-primary/10 text-primary font-medium px-2 py-0.5">Capture</span>
                                        <span className="text-slate-300">→</span>
                                        <span className="rounded bg-primary text-white font-medium px-2 py-0.5">Convert</span>
                                    </div>
                                </div>
                                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-xs text-muted-foreground space-y-2">
                                    <div className="flex justify-between"><span>Homepage clarity</span><span className="font-semibold text-red-500">Weak</span></div>
                                    <div className="flex justify-between"><span>Lead capture</span><span className="font-semibold text-amber-500">Needs work</span></div>
                                    <div className="flex justify-between"><span>Follow-up system</span><span className="font-semibold text-red-500">Missing</span></div>
                                    <div className="flex justify-between"><span>Buyer visibility</span><span className="font-semibold text-red-500">None</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
