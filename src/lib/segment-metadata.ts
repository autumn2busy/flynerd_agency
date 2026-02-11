import type { Metadata } from "next";
import { segmentContent } from "@/components/marketing/home/data/segment-content";
import { Segment } from "@/lib/design-tokens";

export const buildSegmentMetadata = (segment: Segment): Metadata => {
  const label = segmentContent[segment].label;
  const description = `${segmentContent[segment].heroSubline} Fly Nerd Tech builds enterprise-grade marketing automations for ${label.toLowerCase()} teams.`;

  return {
    title: `Fly Nerd Tech | ${label} Automation Systems`,
    description,
    openGraph: {
      title: `Fly Nerd Tech | ${label} Automation Systems`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Fly Nerd Tech | ${label} Automation Systems`,
      description,
    },
  };
};
