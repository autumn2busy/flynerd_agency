import { promises as fs } from 'node:fs';
import path from 'node:path';

function getEnv(name: 'SUPABASE_URL' | 'SUPABASE_SERVICE_ROLE_KEY'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

const SUPABASE_URL = getEnv('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = getEnv('SUPABASE_SERVICE_ROLE_KEY');

type InputItem = {
  niche: string;
  topic?: string;
  title?: string;
  question: string;
  answer: string;
  tags?: string[];
};

const GENERATED_DIR = path.join(process.cwd(), 'kb', 'generated');
const BATCH_SIZE = 25;
const MAX_RETRIES = 3;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function embedText(text: string): Promise<number[]> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/embed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`embed failed: ${response.status} ${await response.text()}`);
  }

  const body = (await response.json()) as { embedding: number[] };
  if (!Array.isArray(body.embedding) || body.embedding.length !== 384) {
    throw new Error('invalid embedding vector from edge function');
  }

  return body.embedding;
}

async function upsertBatch(rows: unknown[]) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('apikey', SUPABASE_SERVICE_ROLE_KEY);
  headers.set('Authorization', `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`);
  headers.set('Prefer', 'resolution=merge-duplicates,return=minimal');

  const response = await fetch(`${SUPABASE_URL}/rest/v1/kb_items?on_conflict=niche,question`, {
    method: 'POST',
    headers,
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    throw new Error(`upsert failed: ${response.status} ${await response.text()}`);
  }
}

async function withRetry<T>(work: () => Promise<T>, label: string): Promise<T> {
  let attempt = 0;
  let lastErr: unknown;
  while (attempt < MAX_RETRIES) {
    try {
      return await work();
    } catch (err) {
      lastErr = err;
      attempt += 1;
      if (attempt >= MAX_RETRIES) break;
      console.warn(`${label} retry ${attempt}/${MAX_RETRIES - 1}`);
      await sleep(300 * attempt);
    }
  }
  throw lastErr;
}

function asContent(item: InputItem): string {
  return [item.title ?? '', item.question, item.answer].join('\n').trim();
}

async function loadFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf8');
  const items = JSON.parse(raw) as InputItem[];

  const rows = [] as Record<string, unknown>[];
  for (const item of items) {
    const embedding = await withRetry(() => embedText(asContent(item)), `embed:${item.niche}`);
    rows.push({
      niche: item.niche,
      topic: item.topic ?? null,
      title: item.title ?? null,
      question: item.question,
      answer: item.answer,
      embedding,
      tags: item.tags ?? [],
      source: 'kb_generator',
      is_active: true,
      version: 1,
    });
  }

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    await withRetry(() => upsertBatch(batch), `upsert:${path.basename(filePath)}:${i / BATCH_SIZE + 1}`);
  }

  return { niche: items[0]?.niche ?? path.basename(filePath), count: rows.length };
}

async function main() {
  const files = (await fs.readdir(GENERATED_DIR))
    .filter((file) => file.endsWith('_kb_items.json'))
    .map((file) => path.join(GENERATED_DIR, file));

  const summaries = [] as { niche: string; count: number }[];
  for (const file of files) {
    summaries.push(await loadFile(file));
  }

  console.log('Load summary:');
  for (const s of summaries) {
    console.log(`- ${s.niche}: ${s.count} items`);
  }
}

main().catch((err) => {
  console.error('kb_load failed', err);
  process.exit(1);
});
