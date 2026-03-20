import type { Metadata } from "next"
import { PricingSection } from "@/components/sections/pricing-section"

export const metadata: Metadata = {
    title: "Pricing",
    description: "Packages built for growth. Whether you need a smarter site, better lead flow, or a full system behind the sale.",
}

export default function PricingPage() {
    return (
        <div className="pt-8">
            <PricingSection />
        </div>
    )
}
