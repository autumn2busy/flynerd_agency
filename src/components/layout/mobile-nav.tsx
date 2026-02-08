"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Network } from "lucide-react"

export function MobileNav() {
    const [open, setOpen] = useState(false)

    const routes = [
        { href: "/", label: "Home" },
        { href: "/solutions", label: "Solutions" },
        { href: "/services", label: "Services" },
        { href: "/industries", label: "Industries" },
        { href: "/case-studies", label: "Case Studies" },
        { href: "/trust", label: "Trust Center" },
        { href: "/blog", label: "Blog" },
    ]

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 mb-8">
                    <Network className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">FlyNerd Tech</span>
                </Link>
                <div className="flex flex-col gap-4">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            onClick={() => setOpen(false)}
                            className="text-muted-foreground hover:text-foreground transition-colors font-medium text-lg"
                        >
                            {route.label}
                        </Link>
                    ))}
                    <div className="mt-8 flex flex-col gap-4">
                        <Button asChild onClick={() => setOpen(false)} className="w-full">
                            <Link href="/contact">Book a Blueprint</Link>
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
