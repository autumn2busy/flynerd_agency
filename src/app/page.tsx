import type { Metadata } from "next";
import { cookies } from "next/headers";
import { HomeExperience } from "@/components/marketing/home/home-experience";
import { getSegmentFromParam } from "@/components/marketing/home/data/segment-content";
import { Segment } from "@/lib/design-tokens";
import { buildSegmentMetadata } from "@/lib/segment-metadata";

const DEFAULT_SEGMENT: Segment = "franchise";

type SearchParams = Promise<{ segment?: string }>;

const resolveSegment = async (searchParams: SearchParams): Promise<Segment> => {
  const params = await searchParams;
  const fromQuery = getSegmentFromParam(params.segment);
  if (fromQuery) return fromQuery;

  const fromCookie = getSegmentFromParam(cookies().get("flynerd_segment")?.value);
  return fromCookie ?? DEFAULT_SEGMENT;
};

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const segment = await resolveSegment(searchParams);
  return buildSegmentMetadata(segment);
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const segment = await resolveSegment(searchParams);

  return <HomeExperience initialSegment={segment} />;
}
