import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden border-b bg-background py-20 md:py-32 lg:py-40">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="container relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
                    <Terminal className="mr-2 h-4 w-4" />
                    <span className="font-mono">SYS.STATUS: ONLINE // v4.0.0</span>
                </div>

                <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight lg:text-6xl text-balance">
                    Stop Managing Chaos. <br className="hidden md:block" />
                    <span className="text-primary">Start Scaling Control.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
                    The <span className="font-mono font-medium text-foreground">Franchise Automation OS</span> that replaces manual work with scalable governance.
                    Built for multi-location operators who demand speed, consistency, and auditable outcomes.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20" asChild>
                        <Link href="/contact">
                            Book an Automation Blueprint
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                        <Link href="/resources">
                            Rate Your Operations
                        </Link>
                    </Button>
                </div>

                <div className="mt-20 grid grid-cols-2 gap-8 text-center md:grid-cols-4 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl font-bold text-foreground font-mono">100+</span>
                        <span className="text-sm uppercase tracking-wider">Locations Governed</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl font-bold text-foreground font-mono">24/7</span>
                        <span className="text-sm uppercase tracking-wider">Automated Dispatch</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl font-bold text-foreground font-mono">&lt;2min</span>
                        <span className="text-sm uppercase tracking-wider">Speed-to-Lead</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl font-bold text-foreground font-mono">0%</span>
                        <span className="text-sm uppercase tracking-wider">Missed Escalations</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
