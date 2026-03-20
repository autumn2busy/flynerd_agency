import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCtaSection() {
    return (
        <section className="section-padding bg-foreground text-white">
            <div className="container max-w-3xl text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                    Your website should be helping you sell. Period.
                </h2>
                <p className="mt-4 text-lg text-white/70">
                    If your online presence is weak, unclear, or doing nothing for your business, let&apos;s fix that.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8" asChild>
                        <Link href="/contact">
                            Get My Free Website Teardown
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-semibold px-8" asChild>
                        <Link href="/contact">Book a Strategy Call</Link>
                    </Button>
                </div>
                <p className="mt-6 text-sm text-white/50">
                    No fluff. No generic fixes. Just smarter systems and stronger conversion.
                </p>
            </div>
        </section>
    )
}
