import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Suspense } from "react";
import { SERVICES } from "@/app/pricing/services-data";
import DemoExperience, { DemoService } from "@/components/demo/DemoExperience";
import MedspaExperience from "@/components/demo/MedspaExperience";
import { getNicheBullets, getNicheType } from "@/components/demo/nicheConfig";
import {
  normalizeBookingPlatform,
  type Treatment,
} from "@/components/demo/medspaDefaults";

export default async function LeadDemoPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await params;

  const lead = await prisma.agencyLead.findUnique({ where: { id: leadId } });
  if (!lead) notFound();

  const businessName = lead.businessName;
  const niche = lead.niche;
  const intelData = (lead.intelData as Record<string, unknown> | null) || {};

  const painPoints: string[] =
    Array.isArray(intelData.painPoints) && intelData.painPoints.length > 0
      ? (intelData.painPoints as string[])
      : ["low search visibility", "no after-hours booking flow"];

  const reputationSummary: string | null =
    typeof intelData.reputationSummary === "string" ? intelData.reputationSummary : null;
  const rating: number = typeof intelData.rating === "number" ? intelData.rating : 0;
  const reviewCount: number =
    typeof intelData.reviewCount === "number" ? intelData.reviewCount : 0;

  const brandColors = (intelData.brandColors as Record<string, string>) || {};
  const rawPrimary: string = brandColors.primary || "D4AF37";
  const rawAccent: string = brandColors.accent || "1B365D";
  const colorPrimary = `#${rawPrimary.replace(/^#/, "")}`;
  const colorAccent = `#${rawAccent.replace(/^#/, "")}`;

  const isExpired = lead.validUntil != null && new Date() > new Date(lead.validUntil);

  if (isExpired) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white text-center px-6 gap-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
          <Lock size={28} />
        </div>
        <h1 className="text-3xl font-black tracking-tight">This preview has expired.</h1>
        <p className="text-neutral-400 max-w-md">
          The 7-day demo for{" "}
          <span className="font-bold text-white">{businessName}</span> is no longer active.
        </p>
        <Link
          href={`mailto:hello@flynerd.tech?subject=New access for ${businessName}`}
          className="font-bold px-8 py-3 rounded-full bg-white text-black"
        >
          Request new access
        </Link>
      </div>
    );
  }

  let expiresLabelP1: string | null = null; // Profile 1: "Expires in 48h"
  let expiresLabelP2: string | null = null; // Profile 2: "48h remaining"
  if (lead.validUntil) {
    const hoursLeft = Math.max(
      0,
      Math.ceil((new Date(lead.validUntil).getTime() - Date.now()) / (1000 * 60 * 60))
    );
    expiresLabelP1 = hoursLeft > 0 ? `Expires in ${hoursLeft}h` : "Expiring soon";
    expiresLabelP2 = hoursLeft > 0 ? `${hoursLeft}h remaining` : "Expiring soon";
  }

  // -------- Profile routing --------
  // Default = underserved_local. Route to Profile 2 medspa template when:
  //  - niche matches medspa vocabulary, OR
  //  - intelData.qualificationProfile is explicitly "tech_enabled_premium"
  const nicheType = getNicheType(niche);
  const explicitProfile =
    typeof intelData.qualificationProfile === "string"
      ? (intelData.qualificationProfile as string)
      : null;
  const isProfile2 =
    nicheType === "medspa" || explicitProfile === "tech_enabled_premium";

  if (isProfile2) {
    // Profile 2: pull new optional intel fields, fall back gracefully.
    const heroHook =
      typeof intelData.heroHook === "string" ? (intelData.heroHook as string) : null;

    const rawTreatments = Array.isArray(intelData.treatments)
      ? (intelData.treatments as unknown[])
      : null;
    const treatments: Treatment[] | null = rawTreatments
      ? rawTreatments
          .filter((t): t is Record<string, unknown> => typeof t === "object" && t !== null)
          .map((t) => ({
            name: typeof t.name === "string" ? t.name : "Treatment",
            description:
              typeof t.description === "string" ? t.description : "Consult-based service.",
            imageSlug: typeof t.imageSlug === "string" ? t.imageSlug : "generic",
          }))
      : null;

    const bookingPlatform = normalizeBookingPlatform(intelData.bookingPlatform);

    const stripeDepositLink = process.env.STRIPE_PROFILE2_DEPOSIT_LINK ?? null;
    const calKickoffLink = process.env.CAL_COM_KICKOFF_LINK ?? null;

    return (
      <Suspense fallback={null}>
        <MedspaExperience
          leadId={leadId}
          businessName={businessName}
          niche={niche}
          intelScore={lead.intelScore}
          painPoints={painPoints}
          reputationSummary={reputationSummary}
          rating={rating}
          reviewCount={reviewCount}
          walkthroughVideoUrl={lead.walkthroughVideoUrl}
          expiresLabel={expiresLabelP2}
          heroHook={heroHook}
          treatments={treatments}
          bookingPlatform={bookingPlatform}
          rawPrimary={brandColors.primary}
          rawAccent={brandColors.accent}
          stripeDepositLink={stripeDepositLink}
          calKickoffLink={calKickoffLink}
        />
      </Suspense>
    );
  }

  // -------- Profile 1: existing template, unchanged --------
  function pickService(slug: string): DemoService {
    const s = SERVICES.find((svc) => svc.slug === slug);
    if (!s) throw new Error(`services-data missing slug: ${slug}`);
    return {
      slug: s.slug,
      name: s.name,
      tagline: s.tagline,
      priceDisplay: s.priceDisplay,
      priceSub: s.priceSub,
      ctaLabel: s.ctaLabel,
      stripeDepositLink: s.stripeDepositLink,
      featured: s.featured,
    };
  }

  const services = {
    audit: pickService("automation-audit"),
    quickstart: pickService("quickstart-workflow-build"),
    concierge: pickService("ai-concierge-launch"),
  };

  const nicheBullets = getNicheBullets(niche);

  return (
    <>
      <style>{`
        :root {
          --color-primary: ${colorPrimary};
          --color-accent: ${colorAccent};
        }
      `}</style>
      <DemoExperience
        leadId={leadId}
        businessName={businessName}
        niche={niche}
        intelScore={lead.intelScore}
        painPoints={painPoints}
        reputationSummary={reputationSummary}
        rating={rating}
        reviewCount={reviewCount}
        walkthroughVideoUrl={lead.walkthroughVideoUrl}
        nicheBullets={nicheBullets}
        expiresLabel={expiresLabelP1}
        services={services}
      />
    </>
  );
}
