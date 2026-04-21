// Scoped landing-v2 styles — only loaded on this route so the rest
// of the site keeps using globals.css tokens.
import "./landing-v2.css";

import type { Metadata } from "next";
import HeroSection from "@/components/home/landing-v2/HeroSection";
import NichesStrip from "@/components/home/landing-v2/NichesStrip";
import AgentPreview from "@/components/home/landing-v2/AgentPreview";
import ProblemStats from "@/components/home/landing-v2/ProblemStats";
import HowItWorks from "@/components/home/landing-v2/HowItWorks";
import LifecycleTable from "@/components/home/landing-v2/LifecycleTable";
import Results from "@/components/home/landing-v2/Results";
import FinalCTA from "@/components/home/landing-v2/FinalCTA";

export const metadata: Metadata = {
  title: "FlyNerd Tech | AI-Powered Websites for Local Service Businesses",
  description:
    "FlyNerd Tech builds AI-powered websites for local service businesses — HVAC, plumbing, roofing, med spas, and more. Custom AI chatbot included. 24/7 lead capture.",
};

export default function HomePage() {
  return (
    <div className="landing-v2">
      {/* Background layers sit behind all content */}
      <div className="lv2-bg-layer" aria-hidden="true">
        <div className="lv2-bg-bloom" />
        <div className="lv2-bg-scan" />
        <div className="lv2-bg-vignette" />
      </div>

      <div className="lv2-main">
        <HeroSection />
        <NichesStrip />
        <AgentPreview />
        <ProblemStats />
        <HowItWorks />
        <LifecycleTable />
        <Results />
        <FinalCTA />
      </div>
    </div>
  );
}
