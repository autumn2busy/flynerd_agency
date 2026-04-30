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

function readArg(name, fallback) {
  const prefix = `${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);

  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];

  return fallback;
}

function headers() {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  };
}

async function request(path) {
  const response = await fetch(`${SUPABASE_URL}${path}`, { headers: headers() });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`GET ${path} failed (${response.status}): ${text}`);
  }

  return body;
}

async function readRows(table, niche) {
  const params = new URLSearchParams({
    select: "question,answer",
    niche: `eq.${niche}`,
    is_active: "eq.true",
    order: "question.asc",
  });
  return await request(`/rest/v1/${table}?${params}`);
}

function key(row) {
  return `${row.question}\n${row.answer}`;
}

async function main() {
  const niche = readArg("--niche", "hvac");
  const [sourceRows, itemRows] = await Promise.all([
    readRows("kb_source", niche),
    readRows("kb_items", niche),
  ]);

  const itemKeys = new Set(itemRows.map(key));
  const missing = sourceRows.filter((row) => !itemKeys.has(key(row)));
  const countsMatch = sourceRows.length === itemRows.length;
  const pass = countsMatch && missing.length === 0;

  console.log(`kb-parity-check: niche=${niche}`);
  console.log(`source rows=${sourceRows.length}, kb_items rows=${itemRows.length}`);
  console.log(`matched=${sourceRows.length - missing.length}/${sourceRows.length}`);

  if (!countsMatch) {
    console.error("row count mismatch");
  }
  if (missing.length > 0) {
    console.error("missing rows:");
    for (const row of missing) {
      console.error(`- ${row.question}`);
    }
  }

  if (!pass) process.exit(1);
  console.log("PASS");
}

main().catch((err) => {
  console.error("kb-parity-check failed:", err.message);
  process.exit(1);
});
