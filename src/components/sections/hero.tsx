"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40">
            <div className="container relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-2 rounded-full border bg-background/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary" />
                    Governance-First Automation
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                >
                    Scale Your Franchise <br className="hidden md:block" />
                    <span className="text-primary">Without the Chaos.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
                >
                    The operating system for multi-location operators. We build the infrastructure that helps you run 50 locations as easily as 5.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-10 flex flex-col gap-4 sm:flex-row"
                >
                    <Button size="lg" className="h-12 px-8 text-base" asChild>
                        <Link href="/contact">
                            Book an Automation Blueprint
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                        <Link href="/solutions">
                            Explore the OS
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>

                {/* Abstract Background Elements */}
                <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] bg-primary/20 pointer-events-none" />
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        </section>
    )
}
