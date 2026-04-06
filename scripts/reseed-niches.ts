import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tier1Niches = [
  // Home High-Ticket
  {
    niche_key: "hvac",
    display_name: "HVAC Companies",
    category: "home_high_ticket",
    interest_score: 77,
    tier: "tier_1",
    pricing_tier: "premium",
    system_prompt: "You are an AI assistant for an HVAC company. Be helpful and optimize for booking appointments.",
  },
  {
    niche_key: "solar",
    display_name: "Solar Panel Installers",
    category: "home_high_ticket",
    interest_score: 82,
    tier: "tier_1",
    pricing_tier: "premium",
    system_prompt: "You are an AI assistant for a Solar company. Answer questions accurately based on your knowledge base.",
  },
  // Medical
  {
    niche_key: "orthodontics",
    display_name: "Orthodontics & Invisalign",
    category: "medical",
    interest_score: 91,
    tier: "tier_1",
    pricing_tier: "premium",
    system_prompt: "You are an AI assistant for an Orthodontics practice. Answer questions accurately based on your knowledge base.",
  },
];

const hvacKbItems = [
  {
    question: "Do you offer emergency no-cooling service?",
    answer: "Yes. If your system is completely down, we can prioritize same-day or after-hours service when available. Call our emergency line for fastest dispatch.",
    topic: "Emergency Service",
    tags: ["emergency", "no_cooling", "dispatch"],
  },
  {
    question: "How do I know if I should repair or replace my HVAC system?",
    answer: "If your system is 10-15+ years old, needs frequent repairs, or has major component failure, replacement may be more cost-effective. We can diagnose and give options during a service visit.",
    topic: "Repair vs Replacement",
    tags: ["repair", "replacement", "pricing"],
  },
  {
    question: "What SEER rating should I look for in a new AC unit?",
    answer: "We recommend a minimum 15 SEER2 for energy efficiency. Higher SEER ratings (18-20) save more on energy bills over time and may qualify for federal tax credits.",
    topic: "Equipment Selection",
    tags: ["seer", "efficiency", "new_unit", "tax_credit"],
  },
  {
    question: "How often should I have my HVAC system serviced?",
    answer: "We recommend a bi-annual tune-up — once in spring before cooling season, and once in fall before heating season.",
    topic: "Maintenance",
    tags: ["maintenance", "tune_up", "seasonal"],
  },
  {
    question: "Do you offer financing for new HVAC installations?",
    answer: "Yes. We offer 0% financing for 12 months and low-APR plans up to 60 months through our lending partners.",
    topic: "Financing",
    tags: ["financing", "payment", "installation"],
  },
];

async function main() {
  console.log("--- Starting Niche Re-Seeding ---");

  // 1. Sync Niches
  for (const niche of tier1Niches) {
    await prisma.niche_config.upsert({
      where: { niche_key: niche.niche_key },
      update: {
        category: niche.category,
        display_name: niche.display_name,
        system_prompt: niche.system_prompt,
      },
      create: niche,
    });
    console.log(`Synced Niche: ${niche.display_name} (${niche.category})`);
  }

  // 2. Sync HVAC KB Items
  console.log("\n--- Syncing HVAC Knowledge Base ---");
  for (const item of hvacKbItems) {
    await prisma.kb_source.upsert({
      where: {
        niche_question_business_key: {
          niche: "hvac",
          question: item.question,
          business_key: null as any, // Null for generic niche KB
        },
      },
      update: {
        answer: item.answer,
        topic: item.topic,
        tags: item.tags,
        is_active: true,
      },
      create: {
        niche: "hvac",
        question: item.question,
        answer: item.answer,
        topic: item.topic,
        tags: item.tags,
        business_key: null as any,
      },
    });
    console.log(`Upserted KB: ${item.question.substring(0, 30)}...`);
  }

  console.log("\n--- Re-Seeding Complete ---");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
