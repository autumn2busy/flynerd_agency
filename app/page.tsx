import { Metadata } from "next";
import KineticHero from "@/components/home/KineticHero";
import GapComparison from "@/components/home/GapComparison";
import PipelinePulse from "@/components/home/PipelinePulse";
import ChatScenario from "@/components/home/ChatScenario";
import CoreFiveCards from "@/components/home/CoreFiveCards";
import PricingPreview from "@/components/home/PricingPreview";
import GrowthCTA from "@/components/home/GrowthCTA";
import FlyNerdAcronym from "@/components/home/FlyNerdAcronym";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
  description: "FlyNerd Tech builds AI-powered websites for local businesses that book appointments, answer questions, and qualify leads 24/7. Atlanta-based. Live in 7 days.",
};

export default function HomePage() {
  return (
    <>
      <KineticHero />
      <GapComparison />
      <PipelinePulse />
      <ChatScenario />
      <CoreFiveCards />
      <PricingPreview />
      <GrowthCTA />
      <FlyNerdAcronym />
      <FinalCTA />
    </>
  );
}