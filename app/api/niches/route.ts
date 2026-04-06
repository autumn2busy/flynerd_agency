import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase().trim() || "";

  try {
    const niches = await prisma.niche_config.findMany({
      where: {
        is_active: true,
        ...(q
          ? {
              OR: [
                { display_name: { contains: q, mode: "insensitive" } },
                { niche_key: { contains: q, mode: "insensitive" } },
                { category: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      select: {
        niche_key: true,
        display_name: true,
        category: true,
        tier: true,
        interest_score: true,
      },
      orderBy: [{ interest_score: "desc" }, { display_name: "asc" }],
      take: 10,
    });

    return NextResponse.json({ niches });
  } catch (err) {
    console.error("[api/niches] Error:", err);
    return NextResponse.json({ niches: [], error: "Failed to fetch niches" }, { status: 500 });
  }
}
