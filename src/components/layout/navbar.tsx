"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"

export function Navbar() {
    const pathname = usePathname()

    const routes = [
        { href: "/", label: "Home" },
        { href: "/solutions", label: "Solutions" },
        { href: "/industries", label: "Industries" },
        { href: "/pricing", label: "Pricing" },
        { href: "/case-studies", label: "Case Studies" },
        { href: "/trust", label: "About" },
        { href: "/contact", label: "Contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-heading font-bold tracking-tight text-foreground">
                        FlyNerd<span className="text-primary">Tech</span>
                    </span>
                </Link>
                <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === route.href ? "text-foreground font-semibold" : "text-muted-foreground"
                            )}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>
                <div className="hidden lg:flex items-center gap-3">
                    <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                        See How It Works
                    </Link>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold px-5">
                        <Link href="/contact">Get My Free Teardown</Link>
                    </Button>
                </div>
                <div className="lg:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}
