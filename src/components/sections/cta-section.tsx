"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
    return (
        <section className="container py-24 md:py-32">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl bg-primary px-6 py-24 text-center text-primary-foreground md:px-12 lg:px-24"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

                <div className="relative z-10 mx-auto max-w-3xl space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                        Stop guessing. Start governing.
                    </h2>
                    <p className="text-lg md:text-xl opacity-90">
                        Get your Automation Blueprint in 7-10 days. We map your workflows, designing the data model, and building the roadmap before writing a single line of code.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold text-primary" asChild>
                            <Link href="/contact">
                                Book an Automation Blueprint
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                            <Link href="/services">
                                View All Services
                            </Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
