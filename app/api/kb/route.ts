import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function normalizeCategory(cat: string | null | undefined): string {
  if (!cat) return "other";
  return cat.toLowerCase().replace(/[\s-]+/g, "_");
}

/**
 * GET /api/kb?niche=[niche_key]
 * Centralized KB Loader for n8n workflows.
 * Production text KB currently lives in Supabase 'kb_source'.
 * Do not switch this to 'kb_items' until the vector table is populated and
 * its Prisma model is reconciled with the live pgvector schema.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nicheKey = searchParams.get("niche")?.toLowerCase().trim();

  if (!nicheKey) {
    return NextResponse.json(
      { error: "Niche query parameter is required" },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch the niche config to verify it exists and get its category
    const nicheConfig = await prisma.niche_config.findUnique({
      where: { niche_key: nicheKey },
      select: { category: true, display_name: true }
    });

    // 2. Fetch all active KB items for this niche
    const kbItems = await prisma.kb_source.findMany({
      where: {
        niche: nicheKey,
        is_active: true
      },
      select: {
        question: true,
        answer: true,
        topic: true,
        tags: true,
        business_key: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json({
      niche: nicheKey,
      category: normalizeCategory(nicheConfig?.category),
      category_display: nicheConfig?.category ?? null,
      display_name: nicheConfig?.display_name || nicheKey,
      count: kbItems.length,
      items: kbItems
    });
    
  } catch (err) {
    console.error("[api/kb] Error fetching knowledge base:", err);
    return NextResponse.json(
      { error: "Failed to fetch knowledge base content" },
      { status: 500 }
    );
  }
}
