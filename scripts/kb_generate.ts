import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SEED_DIR = path.join(ROOT, 'kb', 'seeds');
const OUT_DIR = path.join(ROOT, 'kb', 'generated');

type KBItem = {
  niche: string;
  topic: string;
  title?: string;
  question: string;
  answer: string;
  tags: string[];
};

type Seed = {
  niche: string;
  company_name: string;
  phone: string;
  email: string;
  service_areas: string[];
  hours: string;
  after_hours_policy: string;
  emergency_policy: string;
  financing_payment_notes: string;
  warranties_guarantees: string;
  appointment_process: string;
  compliance_guardrails: string[];
  brand_voice: string;
  topics: string[];
};

const GUARDRAIL_BY_NICHE: Record<string, string> = {
  water_damage_restoration:
    'We do not provide insurance or legal advice and cannot guarantee claim coverage. If electrical hazards, contaminated water, or mold concerns are present, request a licensed onsite assessment.',
  senior_home_care:
    'We provide non-medical support information only and cannot promise outcomes. For urgent medical concerns, contact emergency services or a licensed clinician immediately.',
  personal_injury_law:
    'This content is general information, not legal advice. We do not estimate case value or promise outcomes; legal guidance requires attorney consultation in your jurisdiction.',
  hvac:
    'If you notice gas smell, carbon monoxide alarm, or burning odor, leave the area and contact your utility provider or emergency services immediately.',
  plumbing:
    'For sewage backup, flooding, or suspected gas water-heater hazards, prioritize safety and contact licensed professionals. Pricing and root cause require inspection.',
};

function makeItem(seed: Seed, topic: string, idx: number, type: 'faq' | 'process' | 'guardrail'): KBItem {
  const area = seed.service_areas.join(', ');

  if (type === 'faq') {
    return {
      niche: seed.niche,
      topic,
      title: `${topic.replaceAll('_', ' ')} FAQ ${idx}`,
      question: `How does ${seed.company_name} handle ${topic.replaceAll('_', ' ')} requests?`,
      answer: `${seed.company_name} starts with an intake call, confirms location in ${area}, and explains next steps based on your needs. Hours: ${seed.hours}. ${seed.appointment_process}`,
      tags: [seed.niche, topic, 'faq'],
    };
  }

  if (type === 'process') {
    return {
      niche: seed.niche,
      topic,
      title: `${topic.replaceAll('_', ' ')} Process ${idx}`,
      question: `What should I expect during the ${topic.replaceAll('_', ' ')} process?`,
      answer: `Typical flow: intake, scope review, scheduling, service execution, and follow-up. ${seed.after_hours_policy} Payment/financing note: ${seed.financing_payment_notes}.`,
      tags: [seed.niche, topic, 'process'],
    };
  }

  return {
    niche: seed.niche,
    topic,
    title: `${topic.replaceAll('_', ' ')} Safety & Guardrails ${idx}`,
    question: `Are there important safety limits or policy guardrails for ${topic.replaceAll('_', ' ')}?`,
    answer: `${GUARDRAIL_BY_NICHE[seed.niche]} Compliance notes: ${seed.compliance_guardrails.join(' | ')}`,
    tags: [seed.niche, topic, 'guardrail', 'safety'],
  };
}

async function generateForSeed(seedPath: string): Promise<{ niche: string; count: number }> {
  const raw = await fs.readFile(seedPath, 'utf8');
  const seed = JSON.parse(raw) as Seed;

  const items: KBItem[] = [];
  for (const topic of seed.topics) {
    items.push(makeItem(seed, topic, 1, 'faq'));
    items.push(makeItem(seed, topic, 2, 'faq'));
    items.push(makeItem(seed, topic, 3, 'process'));
    items.push(makeItem(seed, topic, 4, 'process'));
    items.push(makeItem(seed, topic, 5, 'guardrail'));
  }

  const uniqueByQuestion = new Map(items.map((item) => [item.question, item]));
  const finalItems = [...uniqueByQuestion.values()];

  await fs.mkdir(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${seed.niche}_kb_items.json`);
  await fs.writeFile(outPath, JSON.stringify(finalItems, null, 2));

  return { niche: seed.niche, count: finalItems.length };
}

async function main() {
  const files = (await fs.readdir(SEED_DIR)).filter((f) => f.endsWith('.json'));
  const summaries = await Promise.all(files.map((f) => generateForSeed(path.join(SEED_DIR, f))));

  for (const s of summaries) {
    console.log(`${s.niche}: generated ${s.count} KB items`);
  }
}

main().catch((err) => {
  console.error('kb_generate failed', err);
  process.exit(1);
});
