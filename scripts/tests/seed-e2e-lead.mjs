// seed-e2e-lead.mjs — Seeds a single DEMO_BUILT lead for E2E outreach testing.
// Simulates a lead that has already passed through Simon -> Yoncé -> Dre.
// Demo URL: constructed via Vercel formula (dynamic route, no deploy needed).
// Video URL: uses E2E_VIDEO_URL env var, or generates via HeyGen API.
//
// Usage:
//   node scripts/tests/seed-e2e-lead.mjs
//   E2E_VIDEO_URL=https://example.com/vid.mp4 node scripts/tests/seed-e2e-lead.mjs

import { PrismaClient } from "@prisma/client";
import crypto from "node:crypto";
// Env vars loaded via: node --env-file=.env scripts/tests/seed-e2e-lead.mjs

const prisma = new PrismaClient();
const TIMESTAMP = Date.now();
const TEST_EMAIL =
  process.env.E2E_TEST_EMAIL || `autumn.s.williams+flynerd-e2e-${TIMESTAMP}@gmail.com`;

const DEMO_BASE_URL = "https://flynerd-demo-lead.vercel.app";

// ── HeyGen video generation (mirrors sonata-stack/src/lib/heygen.ts) ────────

async function generateHeyGenVideo(businessName, scriptText) {
  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey)
    throw new Error(
      "HEYGEN_API_KEY is required (or set E2E_VIDEO_URL to skip)"
    );

  const avatarId =
    process.env.HEYGEN_AVATAR_ID || "Abigail_expressive_2024112501";
  const voiceId =
    process.env.HEYGEN_VOICE_ID || "f38a635bee7a4d1f9b0a654a31d050d2";

  console.log(`[HeyGen] Submitting video for ${businessName}...`);

  const submitRes = await fetch("https://api.heygen.com/v2/video/generate", {
    method: "POST",
    headers: { "X-Api-Key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      video_inputs: [
        {
          character: {
            type: "avatar",
            avatar_id: avatarId,
            avatar_style: "normal",
          },
          voice: {
            type: "text",
            input_text: scriptText,
            voice_id: voiceId,
          },
        },
      ],
      aspect_ratio: "16:9",
      title: `FlyNerd Demo — ${businessName}`,
    }),
  });

  const submitData = await submitRes.json();
  if (!submitRes.ok) {
    console.error("[HeyGen] Submit failed:", submitData);
    throw new Error(`HeyGen submit failed: ${submitRes.status}`);
  }

  const videoId = submitData.data?.video_id;
  if (!videoId) throw new Error("No video_id in HeyGen response");

  console.log(`[HeyGen] Video queued: ${videoId}. Polling (up to 10 min)...`);

  let status = "processing";
  let attempts = 0;
  let videoUrl = "";
  const maxAttempts = 20;

  while (
    ["processing", "waiting", "pending"].includes(status) &&
    attempts < maxAttempts
  ) {
    await new Promise((r) => setTimeout(r, 30_000));
    attempts++;

    try {
      const statusRes = await fetch(
        `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`,
        { headers: { "X-Api-Key": apiKey } }
      );

      const ct = statusRes.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        console.warn(`[HeyGen] Non-JSON response (${statusRes.status})`);
        continue;
      }

      const statusData = await statusRes.json();
      if (!statusRes.ok) {
        console.warn("[HeyGen] Poll failed:", statusData);
        continue;
      }

      status = String(statusData?.data?.status || "processing").toLowerCase();
      videoUrl =
        statusData?.data?.video_url ||
        statusData?.data?.url ||
        statusData?.data?.share_url ||
        videoUrl;

      console.log(`[HeyGen] Poll ${attempts}/${maxAttempts}: ${status}`);
    } catch (err) {
      console.warn("[HeyGen] Poll error:", err);
    }
  }

  if (status === "completed" && videoUrl) {
    console.log("[HeyGen] Video completed!");
    return videoUrl;
  }

  return videoUrl || `https://app.heygen.com/share/${videoId}`;
}

function buildVideoScript(params) {
  const { businessName, niche, rating, painPoints } = params;
  const ratingLine =
    rating >= 4.5
      ? `your ${rating}-star rating is impressive`
      : rating >= 4.0
        ? `your ${rating}-star rating shows solid customer satisfaction`
        : `your reviews show real potential`;

  const painLine =
    painPoints.length > 0
      ? `We noticed a few gaps — like ${painPoints[0].toLowerCase()} — that a professional website would solve immediately.`
      : "We noticed some opportunities where a professional website could make a real difference.";

  return [
    `Hey ${businessName}, I wanted to reach out because ${ratingLine} — but right now, customers searching for ${niche} services in your area can't find your website.`,
    painLine,
    `So I put together this demo using your actual brand colors and real customer reviews. Take a scroll through the page below.`,
  ].join(" ");
}

// ── Main ────────────────────────────────────────────────────────────────────

async function seed() {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const intelData = {
    painPoints: [
      "no online booking system",
      "losing jobs to competitors with websites",
    ],
    reputationSummary: "Strong word-of-mouth but zero digital presence",
    operatingContext:
      "Family-owned, 15 years in business, 4.6 Google rating",
    opportunityScore: 85,
    socialProofPoints: ["142 Google reviews", "BBB accredited"],
    brandPalettes: [
      {
        name: "Professional Trust",
        primary: "1B365D",
        accent: "D4AF37",
        rationale: "Navy + gold conveys reliability",
      },
    ],
    selectedPalette: {
      name: "Professional Trust",
      primary: "1B365D",
      accent: "D4AF37",
    },
    rating: 4.6,
    reviewCount: 142,
  };

  // Demo URL — dynamic route, always resolves if template is deployed
  const demoSiteUrl = `${DEMO_BASE_URL}/demo/${id}`;

  // Video URL — real HeyGen generation or env var shortcut
  let walkthroughVideoUrl = process.env.E2E_VIDEO_URL;
  if (!walkthroughVideoUrl) {
    const script = buildVideoScript({
      businessName: "E2E Test Plumbing Co",
      niche: "plumber",
      rating: 4.6,
      painPoints: intelData.painPoints,
    });
    walkthroughVideoUrl = await generateHeyGenVideo(
      "E2E Test Plumbing Co",
      script
    );
  } else {
    console.log(
      `[Seed] Using E2E_VIDEO_URL shortcut: ${walkthroughVideoUrl}`
    );
  }

  const lead = await prisma.agencyLead.create({
    data: {
      id,
      businessName: `E2E Test Plumbing Co (${TIMESTAMP})`,
      niche: "plumber",
      location: "Atlanta, GA",
      contactEmail: TEST_EMAIL,
      contactPhone: "+15551234567",
      placeId: `e2e_place_${TIMESTAMP}`,
      status: "DEMO_BUILT",
      leadSource: "simon_cowell",
      intelScore: 85,
      intelData,
      scoutData: {
        webPresence: { classification: "DEAD_SITE", detail: "Domain parked" },
        source: "e2e-seed",
        discoveredAt: new Date().toISOString(),
      },
      demoSiteUrl,
      walkthroughVideoUrl,
      validUntil: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: now,
    },
  });

  console.log("\n========================================");
  console.log("  E2E LEAD SEEDED");
  console.log("========================================");
  console.log(`  E2E_LEAD_ID=${lead.id}`);
  console.log(`  Email:  ${TEST_EMAIL}`);
  console.log(`  Status: DEMO_BUILT`);
  console.log(`  Demo:   ${lead.demoSiteUrl}`);
  console.log(`  Video:  ${lead.walkthroughVideoUrl}`);
  console.log("========================================\n");

  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  prisma.$disconnect();
  process.exit(1);
});
