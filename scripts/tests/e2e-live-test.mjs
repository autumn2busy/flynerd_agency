// e2e-live-test.mjs — 6-criterion E2E verification for the outreach pipeline.
// Usage: E2E_LEAD_ID=<uuid> node scripts/tests/e2e-live-test.mjs
//    or: node scripts/tests/e2e-live-test.mjs --leadId=<uuid>

import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
// Env vars loaded via: node --env-file=.env scripts/tests/e2e-live-test.mjs

const prisma = new PrismaClient();
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const AC_URL = process.env.ACTIVECAMPAIGN_URL;
const AC_KEY = process.env.ACTIVECAMPAIGN_KEY;
const N8N_API_URL = process.env.N8N_API_URL || "https://nestedobjectsai.app.n8n.cloud";
const N8N_API_KEY = process.env.N8N_API_KEY;
const N8N_WORKFLOW_ID = "d42cyp27QDIqZczu";

// ── Helpers ─────────────────────────────────────────────────────────────────

function ts() {
  return `[${new Date().toISOString()}]`;
}

function elapsed(startMs) {
  return ((Date.now() - startMs) / 1000).toFixed(1);
}

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getLeadId() {
  const cliArg = process.argv.find((a) => a.startsWith("--leadId="));
  return cliArg ? cliArg.split("=")[1] : process.env.E2E_LEAD_ID;
}

async function acGet(path) {
  const res = await fetch(`${AC_URL}/api/3/${path}`, {
    headers: { "Api-Token": AC_KEY },
  });
  return res.json();
}

async function poll(label, fn, timeoutMs, intervalMs) {
  const start = Date.now();
  const deadline = start + timeoutMs;

  while (Date.now() < deadline) {
    const result = await fn();
    if (result.pass) {
      console.log(`${ts()} CRITERION ${label}: PASS — ${result.detail} (took ${elapsed(start)}s)`);
      return { pass: true, detail: result.detail, data: result.data };
    }
    await delay(intervalMs);
  }

  console.log(`${ts()} CRITERION ${label}: FAIL — ${result?.detail || "timeout"} (took ${elapsed(start)}s)`);
  return { pass: false, detail: "timeout" };

  // Fix: capture last result for the fail message
}

// Safer poll that captures last result
async function pollCriterion(label, fn, timeoutMs, intervalMs) {
  const start = Date.now();
  const deadline = start + timeoutMs;
  let lastResult = { pass: false, detail: "no attempt" };

  while (Date.now() < deadline) {
    try {
      lastResult = await fn();
      if (lastResult.pass) {
        console.log(`${ts()} CRITERION ${label}: PASS — ${lastResult.detail} (took ${elapsed(start)}s)`);
        return { pass: true, detail: lastResult.detail, data: lastResult.data };
      }
    } catch (err) {
      lastResult = { pass: false, detail: err.message };
    }
    await delay(intervalMs);
  }

  console.log(`${ts()} CRITERION ${label}: FAIL — ${lastResult.detail} (took ${elapsed(start)}s)`);
  return { pass: false, detail: lastResult.detail };
}

// ── Criterion checks ────────────────────────────────────────────────────────

function checkCriterion1(leadId) {
  return async () => {
    const lead = await prisma.agencyLead.findUnique({ where: { id: leadId } });
    if (lead?.status === "OUTREACH_SENT") {
      return { pass: true, detail: "AgencyLead status = OUTREACH_SENT" };
    }
    return { pass: false, detail: `status = ${lead?.status || "NOT_FOUND"}` };
  };
}

function checkCriterion2(email) {
  return async () => {
    const data = await acGet(`contacts?email=${encodeURIComponent(email)}`);
    const contact = data.contacts?.[0];
    if (contact?.id) {
      return { pass: true, detail: `AC contact ID ${contact.id} found`, data: contact };
    }
    return { pass: false, detail: "AC contact not found" };
  };
}

function checkCriterion3(contactId) {
  return async () => {
    const data = await acGet(`contacts/${contactId}/deals`);
    const deal = data.deals?.find((d) => d.group === "3");
    if (deal?.id) {
      return { pass: true, detail: `AC deal ID ${deal.id} in pipeline 3`, data: deal };
    }
    return { pass: false, detail: `no deal in pipeline 3 (found ${data.deals?.length || 0} deals)` };
  };
}

function checkCriterion4(contactId) {
  return async () => {
    const data = await acGet(`contacts/${contactId}/contactTags`);
    const contactTags = data.contactTags || [];

    for (const ct of contactTags) {
      const tagData = await acGet(`tags/${ct.tag}`);
      if (tagData.tag?.tag === "FLYNERD_OUTREACH_PENDING") {
        return { pass: true, detail: "Tag FLYNERD_OUTREACH_PENDING applied" };
      }
    }

    return { pass: false, detail: `${contactTags.length} tags found, none match` };
  };
}

function checkCriterion5(triggerTime) {
  return async () => {
    if (!N8N_API_KEY) {
      return { pass: false, detail: "N8N_API_KEY not set — skipping" };
    }

    const res = await fetch(
      `${N8N_API_URL}/api/v1/executions?workflowId=${N8N_WORKFLOW_ID}&limit=5&status=success`,
      { headers: { "X-N8N-API-KEY": N8N_API_KEY } }
    );

    if (!res.ok) {
      return { pass: false, detail: `n8n API ${res.status}` };
    }

    const data = await res.json();
    const executions = data.data || [];

    const recent = executions.find((ex) => {
      const startedAt = new Date(ex.startedAt).getTime();
      return startedAt >= triggerTime.getTime();
    });

    if (recent) {
      return { pass: true, detail: `n8n execution ${recent.id} started ${recent.startedAt}` };
    }

    return { pass: false, detail: `${executions.length} executions found, none after trigger` };
  };
}

function checkCriterion6(testEmail, expectedDemoUrl, expectedVideoUrl) {
  return async () => {
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      // Fallback: just validate URLs return 200
      console.log(`${ts()} CRITERION 6: Gmail API not configured — validating URLs only`);
      const results = await validateUrls(expectedDemoUrl, expectedVideoUrl);
      if (results.allOk) {
        return { pass: true, detail: `URLs reachable (demo: ${results.demoStatus}, video: ${results.videoStatus}). Manual email check needed.` };
      }
      return { pass: false, detail: `URL validation failed — demo: ${results.demoStatus}, video: ${results.videoStatus}` };
    }

    // Gmail API poll
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const listRes = await gmail.users.messages.list({
      userId: "me",
      q: `to:${testEmail} newer_than:30m`,
      maxResults: 5,
    });

    const messages = listRes.data.messages || [];
    if (messages.length === 0) {
      return { pass: false, detail: "no email found yet" };
    }

    // Read the first matching message
    const msg = await gmail.users.messages.get({
      userId: "me",
      id: messages[0].id,
      format: "full",
    });

    // Extract body text (check both plain and html parts)
    const body = extractEmailBody(msg.data);

    const hasDemoUrl = body.includes(expectedDemoUrl);
    const hasVideoUrl = expectedVideoUrl && body.includes(expectedVideoUrl);

    if (!hasDemoUrl) {
      return { pass: false, detail: "email found but demo URL not in body" };
    }

    // HEAD-check both URLs
    const urlResults = await validateUrls(expectedDemoUrl, expectedVideoUrl);

    if (urlResults.allOk) {
      return {
        pass: true,
        detail: `Email received, demo URL ${urlResults.demoStatus}, video URL ${urlResults.videoStatus}`,
      };
    }

    return {
      pass: false,
      detail: `Email found but URL check failed — demo: ${urlResults.demoStatus}, video: ${urlResults.videoStatus}`,
    };
  };
}

function extractEmailBody(message) {
  const parts = message.payload?.parts || [];
  let body = "";

  // Try multipart
  for (const part of parts) {
    if (part.mimeType === "text/html" || part.mimeType === "text/plain") {
      const data = part.body?.data;
      if (data) {
        body += Buffer.from(data, "base64url").toString("utf-8");
      }
    }
    // Nested parts (multipart/alternative inside multipart/mixed)
    if (part.parts) {
      for (const sub of part.parts) {
        const data = sub.body?.data;
        if (data) {
          body += Buffer.from(data, "base64url").toString("utf-8");
        }
      }
    }
  }

  // Single-part message
  if (!body && message.payload?.body?.data) {
    body = Buffer.from(message.payload.body.data, "base64url").toString("utf-8");
  }

  return body;
}

async function validateUrls(demoUrl, videoUrl) {
  let demoStatus = "skipped";
  let videoStatus = "skipped";

  try {
    const demoRes = await fetch(demoUrl, { method: "HEAD", redirect: "follow" });
    demoStatus = demoRes.status;
  } catch (err) {
    demoStatus = `error: ${err.message}`;
  }

  if (videoUrl) {
    try {
      const videoRes = await fetch(videoUrl, { method: "HEAD", redirect: "follow" });
      videoStatus = videoRes.status;
    } catch (err) {
      videoStatus = `error: ${err.message}`;
    }
  }

  const allOk =
    (demoStatus === 200 || demoStatus === "200") &&
    (!videoUrl || videoStatus === 200 || videoStatus === "200");

  return { demoStatus, videoStatus, allOk };
}

// ── Main ────────────────────────────────────────────────────────────────────

async function run() {
  const leadId = getLeadId();
  if (!leadId) {
    console.error("Usage: E2E_LEAD_ID=<uuid> node scripts/tests/e2e-live-test.mjs");
    console.error("   or: node scripts/tests/e2e-live-test.mjs --leadId=<uuid>");
    process.exit(1);
  }

  if (!AC_URL || !AC_KEY) {
    console.error("ACTIVECAMPAIGN_URL and ACTIVECAMPAIGN_KEY are required in .env");
    process.exit(1);
  }

  console.log("==========================================");
  console.log("  E2E LIVE TEST — 6-CRITERION VERIFICATION");
  console.log("==========================================\n");

  // Load the seeded lead
  const lead = await prisma.agencyLead.findUnique({ where: { id: leadId } });
  if (!lead) {
    console.error(`Lead ${leadId} not found in DB`);
    process.exit(1);
  }
  if (lead.status !== "DEMO_BUILT") {
    console.error(`Lead status is ${lead.status}, expected DEMO_BUILT`);
    process.exit(1);
  }

  console.log(`${ts()} Lead loaded: ${lead.businessName}`);
  console.log(`${ts()} Email: ${lead.contactEmail}`);
  console.log(`${ts()} Demo:  ${lead.demoSiteUrl}`);
  console.log(`${ts()} Video: ${lead.walkthroughVideoUrl}`);
  console.log("");

  // Fire the outreach agent
  console.log(`${ts()} Firing POST /api/agents/outreach...`);
  const triggerTime = new Date();

  const outreachRes = await fetch(`${BASE_URL}/api/agents/outreach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      leadId: lead.id,
      businessName: lead.businessName,
      contactEmail: lead.contactEmail,
      niche: lead.niche,
      demoSiteUrl: lead.demoSiteUrl,
      walkthroughVideoUrl: lead.walkthroughVideoUrl,
    }),
  });

  const outreachData = await outreachRes.json();
  if (!outreachRes.ok) {
    console.error(`${ts()} Outreach agent FAILED:`, outreachData);
    process.exit(1);
  }

  console.log(`${ts()} Outreach agent returned: contactId=${outreachData.contactId}, dealId=${outreachData.dealId}\n`);

  const contactId = outreachData.contactId;
  const results = [];

  // ── Criterion 1: AgencyLead status = OUTREACH_SENT (60s) ─────────────
  console.log(`${ts()} Checking criterion 1: AgencyLead status...`);
  results.push(await pollCriterion("1", checkCriterion1(leadId), 60_000, 5_000));

  // ── Criterion 2: AC contact exists (60s) ─────────────────────────────
  console.log(`${ts()} Checking criterion 2: AC contact...`);
  const c2 = await pollCriterion("2", checkCriterion2(lead.contactEmail), 60_000, 5_000);
  results.push(c2);

  // Use the contact ID from criterion 2 if outreach didn't return one
  const confirmedContactId = c2.data?.id || contactId;

  // ── Criterion 3: AC deal in pipeline 3 (60s) ────────────────────────
  console.log(`${ts()} Checking criterion 3: AC deal in pipeline 3...`);
  results.push(await pollCriterion("3", checkCriterion3(confirmedContactId), 60_000, 5_000));

  // ── Criterion 4: Tag FLYNERD_OUTREACH_PENDING (60s) ─────────────────
  console.log(`${ts()} Checking criterion 4: Tag FLYNERD_OUTREACH_PENDING...`);
  results.push(await pollCriterion("4", checkCriterion4(confirmedContactId), 60_000, 5_000));

  // ── Criterion 5: n8n execution log (120s) ───────────────────────────
  console.log(`${ts()} Checking criterion 5: n8n execution log...`);
  if (!N8N_API_KEY) {
    console.log(`${ts()} CRITERION 5: SKIP — N8N_API_KEY not set`);
    results.push({ pass: false, detail: "N8N_API_KEY not set — skipped" });
  } else {
    results.push(await pollCriterion("5", checkCriterion5(triggerTime), 120_000, 10_000));
  }

  // ── Criterion 6: Email arrival + working URLs (30 min) ──────────────
  console.log(`${ts()} Checking criterion 6: Email arrival + URL validation...`);
  results.push(
    await pollCriterion(
      "6",
      checkCriterion6(lead.contactEmail, lead.demoSiteUrl, lead.walkthroughVideoUrl),
      1_800_000,
      30_000
    )
  );

  // ── Summary ─────────────────────────────────────────────────────────
  console.log("\n==========================================");
  console.log("  SUMMARY");
  console.log("==========================================");

  const passed = results.filter((r) => r.pass).length;
  const total = results.length;

  results.forEach((r, i) => {
    const icon = r.pass ? "PASS" : "FAIL";
    console.log(`  Criterion ${i + 1}: ${icon} — ${r.detail}`);
  });

  console.log(`\n  Result: ${passed}/${total} PASSED`);
  console.log("==========================================\n");

  await prisma.$disconnect();
  process.exit(passed === total ? 0 : 1);
}

run().catch((err) => {
  console.error("E2E test fatal error:", err);
  prisma.$disconnect();
  process.exit(1);
});
