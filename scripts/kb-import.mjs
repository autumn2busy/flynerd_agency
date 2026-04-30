#!/usr/bin/env node
import "dotenv/config";

const SUPABASE_URL = requiredEnv("SUPABASE_URL", "SUPABASE_PROJECT_URL").replace(/\/$/, "");
const SUPABASE_SERVICE_ROLE_KEY = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

function requiredEnv(...names) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`Missing ${names.join(" or ")}`);
}

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    ...extra,
  };
}

function asTags(value) {
  return Array.isArray(value) ? value.filter((tag) => typeof tag === "string") : [];
}

function buildContent(row) {
  const lines = [
    `[${row.niche}] Q: ${row.question}`,
    `A: ${row.answer}`,
  ];
  if (row.topic) lines.push(`Topic: ${row.topic}`);

  const tags = asTags(row.tags);
  if (tags.length > 0) lines.push(`Tags: ${tags.join(", ")}`);

  return lines.join("\n");
}

async function request(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: supabaseHeaders(options.headers),
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`${options.method || "GET"} ${path} failed (${response.status}): ${text}`);
  }

  return body;
}

async function readActiveKbSourceRows() {
  const params = new URLSearchParams({
    select: "niche,question,answer,topic,tags,business_key",
    is_active: "eq.true",
    order: "niche.asc,question.asc",
  });
  return await request(`/rest/v1/kb_source?${params}`);
}

async function upsertKbItems(rows) {
  if (rows.length === 0) return 0;

  await request("/rest/v1/kb_items?on_conflict=niche,question,business_key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });

  return rows.length;
}

async function main() {
  const sourceRows = await readActiveKbSourceRows();
  const now = new Date().toISOString();
  const rows = sourceRows.map((row) => ({
    niche: row.niche,
    question: row.question,
    answer: row.answer,
    topic: row.topic,
    tags: asTags(row.tags),
    business_key: row.business_key,
    content: buildContent(row),
    is_active: true,
    updated_at: now,
  }));

  const upserted = await upsertKbItems(rows);
  console.log(`kb-import: rows read=${sourceRows.length}, rows upserted=${upserted}, errors=0`);
}

main().catch((err) => {
  console.error("kb-import failed:", err.message);
  process.exit(1);
});
