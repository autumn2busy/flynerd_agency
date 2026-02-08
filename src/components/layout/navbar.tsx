"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Network } from "lucide-react"

export function Navbar() {
    const pathname = usePathname()

    const routes = [
        { href: "/solutions", label: "Solutions" },
        { href: "/services", label: "Services" },
        { href: "/industries", label: "Industries" },
        { href: "/case-studies", label: "Case Studies" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Network className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        FlyNerd<span className="text-primary">Tech</span>
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === route.href ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            {route.label}
                        </Link>
                    ))}
                    <Link href="/trust" className="text-muted-foreground hover:text-primary transition-colors">
                        Trust
                    </Link>
                </nav>
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/contact">Contact</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/contact">Book a Blueprint</Link>
                    </Button>
                </div>
                <div className="md:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}
