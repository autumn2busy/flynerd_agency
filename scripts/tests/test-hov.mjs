// test-hov.mjs
// Targeted test: creates a UNIQUE synthetic HVAC lead and fires it through
// the Outreach Agent to verify fresh AC contact + deal creation end-to-end.
// Uses a timestamped email to NEVER collide with existing AC contacts.

import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();
const BASE_URL = "http://localhost:3010";

// Unique email per run — never mutates an existing contact
const TIMESTAMP = Date.now();
const TEST_EMAIL = `test+hvac-${TIMESTAMP}@flynerd.tech`;

const TEST_LEAD = {
  businessName: `Peak Comfort HVAC (TEST-${TIMESTAMP})`,
  contactEmail: TEST_EMAIL,
  niche: "hvac",
  location: "Atlanta, GA",
  demoSiteUrl: `https://flynerd.tech/demo/hvac-test-${TIMESTAMP}`,
  walkthroughVideoUrl: null,
};

async function run() {
  console.log("========================================");
  console.log("🔥 HOV AGENT — TARGETED OUTREACH TEST 🔥");
  console.log("========================================\n");

  // Step 1: Create a synthetic lead in the DB
  console.log(`📌 Creating test lead: ${TEST_LEAD.businessName}...`);
  const lead = await prisma.agencyLead.create({
    data: {
      id: randomUUID(),
      businessName: TEST_LEAD.businessName,
      contactEmail: TEST_LEAD.contactEmail,
      niche: TEST_LEAD.niche,
      location: TEST_LEAD.location,
      status: "PROSPECT",
      stage: "DISCOVERY",
      updatedAt: new Date(),
    },
  });
  console.log(`✅ Lead created in DB: ID = ${lead.id}\n`);

  // Step 2: Fire the Outreach Agent (Hov equivalent)
  console.log("📨 Calling /api/agents/outreach...\n");
  const res = await fetch(`${BASE_URL}/api/agents/outreach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      leadId: lead.id,
      businessName: TEST_LEAD.businessName,
      contactEmail: TEST_LEAD.contactEmail,
      niche: TEST_LEAD.niche,
      demoSiteUrl: TEST_LEAD.demoSiteUrl,
      walkthroughVideoUrl: TEST_LEAD.walkthroughVideoUrl,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("❌ Outreach Agent Failed:", result);
    process.exit(1);
  }

  console.log("✅ Outreach Agent Response:");
  console.log(JSON.stringify(result, null, 2));
  console.log("\n========================================");
  console.log("🏁 RESULT SUMMARY");
  console.log("========================================");
  console.log(`AC Contact ID : ${result.contactId}`);
  console.log(`Lead Status   : ${result.lead?.status}`);
  console.log(`Tag Applied   : FLYNERD_OUTREACH_PENDING`);
  console.log(`Pipeline      : Auto-Pilot (ID: 1), Stage: Negotiating (ID: 12)`);
  console.log(`\n👉 Check ActiveCampaign → Deals for: "AI Web Demo - ${TEST_LEAD.businessName}"`);
  console.log("👉 n8n should fire if the 'AC Deal Trigger' webhook is active.\n");
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
