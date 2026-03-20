import { HeroSection } from "@/components/sections/hero-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { WhatWeDoSection } from "@/components/sections/what-we-do-section"
import { ProcessSection } from "@/components/sections/process-section"
import { ProductPreviewSection } from "@/components/sections/product-preview-section"
import { AudienceSection } from "@/components/sections/audience-section"
import { WhyFlynerdSection } from "@/components/sections/why-flynerd-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { ProofSection } from "@/components/sections/proof-section"
import { FaqSection } from "@/components/sections/faq-section"
import { FounderSection } from "@/components/sections/founder-section"
import { FinalCtaSection } from "@/components/sections/final-cta-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <WhatWeDoSection />
      <ProcessSection />
      <ProductPreviewSection />
      <AudienceSection />
      <WhyFlynerdSection />
      <PricingSection />
      <ProofSection />
      <FaqSection />
      <FounderSection />
      <FinalCtaSection />
    </>
  )
}
