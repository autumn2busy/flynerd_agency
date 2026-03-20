import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FounderSection() {
    return (
        <section className="section-padding bg-slate-50/50">
            <div className="container max-w-3xl text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    FlyNerd Tech is where sharp strategy meets modern systems.
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    We believe too many businesses are leaving money on the table because their website is unclear, outdated, or disconnected from how people actually buy. FlyNerd exists to change that. We build with intelligence, taste, and conversion in mind.
                </p>
                <div className="mt-8">
                    <Button size="lg" asChild className="font-semibold px-8">
                        <Link href="/contact">Work With FlyNerd</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
