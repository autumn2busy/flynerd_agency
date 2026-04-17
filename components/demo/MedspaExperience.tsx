"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { capture, identifyLead } from "@/lib/posthog";
import MedspaHero from "./MedspaHero";
import MedspaServices from "./MedspaServices";
import MedspaAIEmployee from "./MedspaAIEmployee";
import MedspaCredibility from "./MedspaCredibility";
import MedspaResults from "./MedspaResults";
import MedspaAboutBuild from "./MedspaAboutBuild";
import MedspaCTA from "./MedspaCTA";
import FlyNerdChatBubble from "./FlyNerdChatBubble";
import {
  DEFAULT_TREATMENTS,
  STARTER_PROMPTS,
  pickHeroHookFallback,
  pickMedspaPrimary,
  pickMedspaAccent,
  type BookingPlatform,
  type Treatment,
} from "./medspaDefaults";

interface Props {
  leadId: string;
  businessName: string;
  niche: string;
  intelScore: number | null;
  painPoints: string[];
  reputationSummary: string | null;
  rating: number;
  reviewCount: number;
  walkthroughVideoUrl: string | null;
  expiresLabel: string | null;
  heroHook: string | null;
  treatments: Treatment[] | null;
  bookingPlatform: BookingPlatform;
  rawPrimary: string | undefined;
  rawAccent: string | undefined;
  stripeDepositLink: string | null;
  calKickoffLink: string | null;
}

/**
 * Top-level Profile 2 (tech_enabled_premium) medspa demo orchestrator.
 * Renders an ELLEMES-caliber light-themed layout with an embedded AI booking
 * employee and a floating FlyNerd chat bubble.
 * See docs/medspa-demo-template-spec.md.
 */
export default function MedspaExperience(p: Props) {
  const primary = pickMedspaPrimary(p.rawPrimary);
  const accent = pickMedspaAccent(p.rawAccent);
  const heroHook = p.heroHook?.trim() || pickHeroHookFallback(p.leadId);
  const treatments =
    p.treatments && p.treatments.length > 0 ? p.treatments : DEFAULT_TREATMENTS;

  const baseProps = {
    leadId: p.leadId,
    businessName: p.businessName,
    niche: p.niche,
    bookingPlatform: p.bookingPlatform,
  };

  const mountTimeRef = useRef(Date.now());
  const ctaClickedRef = useRef(false);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>();

  useEffect(() => {
    identifyLead(p.leadId, {
      niche: p.niche,
      businessName: p.businessName,
      qualificationProfile: "tech_enabled_premium",
    });
    capture("demo_medspa_loaded", baseProps);
    capture("demo_page_view", {
      ...baseProps,
      intelScore: p.intelScore,
      hasVideo: Boolean(p.walkthroughVideoUrl),
      variant: "medspa",
    });

    const onBeforeUnload = () => {
      const elapsed = (Date.now() - mountTimeRef.current) / 1000;
      if (elapsed < 10 && !ctaClickedRef.current) {
        capture("demo_bounced", { ...baseProps, time_on_page: elapsed });
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleServiceCardClick = useCallback(
    (treatmentName: string, position: number) => {
      capture("demo_service_card_clicked", {
        ...baseProps,
        treatmentName,
        position,
      });
      setInitialPrompt(`Tell me about ${treatmentName} pricing and availability.`);
      scrollTo("ai-employee");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollTo]
  );

  const handleStarterClick = useCallback(
    (prompt: string) => {
      capture("demo_ai_starter_prompt_clicked", { ...baseProps, promptText: prompt });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleMessageSent = useCallback(
    (count: number) => {
      capture("demo_chat_message_sent", { ...baseProps, messageCount: count });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleCredibilityViewed = useCallback((platform: BookingPlatform) => {
    capture("demo_credibility_block_viewed", { ...baseProps, bookingPlatform: platform });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommitmentClick = useCallback(
    (state: "pre" | "post") => {
      ctaClickedRef.current = true;
      const ctaLabel = state === "pre" ? "deposit" : "kickoff";
      capture("demo_commitment_cta_clicked", { ...baseProps, ctaLabel });
      if (state === "post") {
        capture("demo_kickoff_cta_clicked", baseProps);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleDepositSuccessViewed = useCallback(() => {
    capture("demo_deposit_success_viewed", baseProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBubbleOpen = useCallback(() => {
    capture("demo_flynerd_bubble_opened", baseProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#FAF9F6",
        color: "#1A1A1A",
        fontFamily: "var(--font-montserrat), -apple-system, BlinkMacSystemFont, sans-serif",
        // Expose accent for any child that wants it
        ["--medspa-primary" as string]: primary,
        ["--medspa-accent" as string]: accent,
      }}
    >
      {/* Top strip */}
      <div
        className="fixed top-0 left-0 right-0 z-40 border-b px-6 md:px-10 py-3 flex items-center justify-between"
        style={{
          borderColor: "#E8E5DF",
          backgroundColor: "rgba(250,249,246,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-sm tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
          >
            {p.businessName}
          </span>
        </div>
        {p.expiresLabel && (
          <span
            className="text-[10px] uppercase tracking-[0.18em] font-semibold px-3 py-1 rounded-full border"
            style={{ borderColor: "#E8E5DF", color: "#555555" }}
          >
            Preview live: {p.expiresLabel}
          </span>
        )}
      </div>

      {/* Fixed-top success banner (renders only on ?deposit=success) */}
      <MedspaCTA
        part="banner"
        businessName={p.businessName}
        primaryColor={primary}
        stripeDepositLink={p.stripeDepositLink}
        calKickoffLink={p.calKickoffLink}
        onPrimaryClick={handleCommitmentClick}
        onDepositSuccessViewed={handleDepositSuccessViewed}
      />

      <MedspaHero
        businessName={p.businessName}
        heroHook={heroHook}
        primaryColor={primary}
        walkthroughVideoUrl={p.walkthroughVideoUrl}
        heroImageUrl={
          process.env.NEXT_PUBLIC_MEDSPA_HERO_URL || undefined
        }
        onPrimaryClick={() => scrollTo("ai-employee")}
        onSecondaryClick={() => scrollTo("treatments")}
      />

      <MedspaServices
        businessName={p.businessName}
        treatments={treatments}
        primaryColor={primary}
        onCardClick={handleServiceCardClick}
      />

      <MedspaAIEmployee
        businessName={p.businessName}
        niche={p.niche}
        primaryColor={primary}
        starterPrompts={STARTER_PROMPTS}
        initialPrompt={initialPrompt}
        onMessageSent={handleMessageSent}
        onStarterClicked={handleStarterClick}
      />

      <MedspaCredibility
        platform={p.bookingPlatform}
        primaryColor={primary}
        onViewed={handleCredibilityViewed}
      />

      <MedspaResults
        businessName={p.businessName}
        primaryColor={primary}
        rating={p.rating}
        reviewCount={p.reviewCount}
        reputationSummary={p.reputationSummary}
      />

      <MedspaAboutBuild
        businessName={p.businessName}
        painPoints={p.painPoints}
        primaryColor={primary}
      />

      {/* Bottom commitment CTA section */}
      <MedspaCTA
        part="section"
        businessName={p.businessName}
        primaryColor={primary}
        stripeDepositLink={p.stripeDepositLink}
        calKickoffLink={p.calKickoffLink}
        onPrimaryClick={handleCommitmentClick}
        onDepositSuccessViewed={handleDepositSuccessViewed}
      />

      {/* Footer */}
      <footer
        className="border-t py-10 px-6 md:px-10 text-center space-y-2"
        style={{ borderColor: "#E8E5DF", backgroundColor: "#FFFFFF" }}
      >
        <p
          className="text-lg tracking-tight"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
        >
          {p.businessName}
        </p>
        <p className="text-xs" style={{ color: "#555555" }}>
          Preview built for {p.businessName} by{" "}
          <Link href="/" className="underline underline-offset-4 hover:text-black">
            FlyNerd Tech
          </Link>
          .
        </p>
        {p.expiresLabel && (
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "#999" }}>
            Preview live: {p.expiresLabel}
          </p>
        )}
      </footer>

      <FlyNerdChatBubble
        leadId={p.leadId}
        businessName={p.businessName}
        onOpen={handleBubbleOpen}
      />
    </div>
  );
}
