#!/usr/bin/env node
import "dotenv/config";

const SUPABASE_URL = requiredEnv("SUPABASE_URL", "SUPABASE_PROJECT_URL").replace(/\/$/, "");
const SUPABASE_SERVICE_ROLE_KEY = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
const VOYAGE_API_KEY = requiredEnv("VOYAGE_API_KEY");
const BATCH_SIZE = 64;

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

async function supabaseRequest(path, options = {}) {
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

async function fetchRowsToEmbed() {
  const params = new URLSearchParams({
    select: "id,content",
    embedding: "is.null",
    is_active: "eq.true",
    order: "id.asc",
  });
  const rows = await supabaseRequest(`/rest/v1/kb_items?${params}`);
  return rows.filter((row) => typeof row.content === "string" && row.content.trim() !== "");
}

async function embedBatch(inputs) {
  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${VOYAGE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "voyage-3",
      input: inputs,
    }),
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`Voyage embeddings failed (${response.status}): ${text}`);
  }

  if (!Array.isArray(body?.data)) {
    throw new Error(`Voyage embeddings response missing data array: ${text}`);
  }

  return body.data.map((item) => item.embedding);
}

async function updateEmbedding(rowId, embedding) {
  if (!Array.isArray(embedding) || embedding.length === 0) {
    throw new Error(`Invalid embedding for row ${rowId}`);
  }

  const params = new URLSearchParams({ id: `eq.${rowId}` });
  await supabaseRequest(`/rest/v1/kb_items?${params}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      embedding,
      updated_at: new Date().toISOString(),
    }),
  });
}

async function main() {
  const rows = await fetchRowsToEmbed();
  if (rows.length === 0) {
    console.log("kb-embed: nothing to embed");
    return;
  }

  let embedded = 0;
  const failures = [];

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    try {
      const embeddings = await embedBatch(batch.map((row) => row.content));
      for (let j = 0; j < batch.length; j += 1) {
        const row = batch[j];
        try {
          await updateEmbedding(row.id, embeddings[j]);
          embedded += 1;
        } catch (err) {
          failures.push({ id: row.id, error: err.message });
          console.error(`kb-embed row failed id=${row.id}: ${err.message}`);
        }
      }
    } catch (err) {
      for (const row of batch) failures.push({ id: row.id, error: err.message });
      console.error(`kb-embed batch failed offset=${i}: ${err.message}`);
    }
  }

  console.log(`kb-embed: rows fetched=${rows.length}, rows embedded=${embedded}, failures=${failures.length}`);
  if (failures.length > 0) {
    console.log(JSON.stringify({ failures }, null, 2));
  }
}

main().catch((err) => {
  console.error("kb-embed failed:", err.message);
  process.exit(1);
});
