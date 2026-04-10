import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import MedSpaTemplate from "@/components/demo/MedSpaTemplate";
import HomeServicesTemplate from "@/components/demo/HomeServicesTemplate";
import GeneralTemplate from "@/components/demo/GeneralTemplate";

const BOOKING_LINK =
  process.env.GOOGLE_MEET_BOOKING_LINK || "https://calendar.app.google/LJAyZTGZShyjP8QB6";

const MEDSPA_KEYWORDS = [
  "medspa", "med spa", "medispa", "aesthetics", "botox", "laser",
  "dermatology", "skincare", "beauty", "cosmetic", "facial",
];
const HOME_SERVICES_KEYWORDS = [
  "hvac", "plumbing", "water damage", "roofing", "landscaping", "pest",
  "cleaning", "painting", "flooring", "contractor", "handyman",
  "senior home care", "home care", "electrical", "heating", "cooling",
  "restoration", "air condition",
];

function getNicheType(niche: string): "medspa" | "home-services" | "general" {
  const lower = niche.toLowerCase();
  if (MEDSPA_KEYWORDS.some((k) => lower.includes(k))) return "medspa";
  if (HOME_SERVICES_KEYWORDS.some((k) => lower.includes(k))) return "home-services";
  return "general";
}

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
  const intelData = lead.intelData as any;

  const painPoints: string[] =
    intelData?.painPoints?.length > 0
      ? intelData.painPoints
      : ["low search visibility", "manual booking process"];

  const socialProofPoints: string[] = intelData?.socialProofPoints ?? [];
  const rating: number = intelData?.rating ?? 0;
  const reviewCount: number = intelData?.reviewCount ?? 0;

  // Brand colors stored without '#' by Yoncé
  const rawPrimary: string = intelData?.brandColors?.primary || "D4AF37";
  const rawAccent: string = intelData?.brandColors?.accent || "1B365D";
  const colorPrimary = `#${rawPrimary.replace(/^#/, "")}`;
  const colorAccent = `#${rawAccent.replace(/^#/, "")}`;

  const nicheType = getNicheType(niche);

  const sharedProps = {
    businessName,
    niche,
    painPoints,
    socialProofPoints,
    rating,
    reviewCount,
    bookingLink: BOOKING_LINK,
  };

  return (
    <>
      {/* Inject CSS custom properties so all templates can use var(--color-primary/accent) */}
      <style>{`
        :root {
          --color-primary: ${colorPrimary};
          --color-accent: ${colorAccent};
        }
      `}</style>

      {nicheType === "medspa" && <MedSpaTemplate {...sharedProps} />}

      {nicheType === "home-services" && <HomeServicesTemplate {...sharedProps} />}

      {nicheType === "general" && (
        <GeneralTemplate
          businessName={businessName}
          niche={niche}
          painPoints={painPoints}
          walkthroughVideoUrl={lead.walkthroughVideoUrl}
          bookingLink={BOOKING_LINK}
        />
      )}
    </>
  );
}
