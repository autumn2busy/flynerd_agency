import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Synthesis Seed: Niche Engine + Global Brain...");

  // 1. Niche Configurations (Engine)
  const nicheConfigs = [
    { niche_key: "hvac", display_name: "HVAC & Cooling", category: "Home High-Ticket", interest_score: 95, system_prompt: "Professional HVAC assistant. Focus on repair, maintenance, and estimates." },
    { niche_key: "orthodontics", display_name: "Orthodontics", category: "Medical", interest_score: 90, system_prompt: "Dental intake coordinator. Focus on Invisalign and braces." },
    { niche_key: "personal-injury", display_name: "Personal Injury", category: "Legal", interest_score: 88, system_prompt: "Legal intake specialist. Collect incident and injury details." },
    { niche_key: "trt-clinic", display_name: "TRT & Men's Health", category: "Medical", interest_score: 85, system_prompt: "Men's Health specialist. Focus on TRT and hormone optimization." },
    { niche_key: "solar", display_name: "Solar Energy", category: "Home High-Ticket", interest_score: 82, system_prompt: "Solar consultant. Focus on energy savings and battery backup." },
    { niche_key: "roofing", display_name: "Roofing", category: "Home High-Ticket", interest_score: 80, system_prompt: "Roofing specialist. Focus on repairs, replacements, and storm damage." },
    { niche_key: "immigration-law", display_name: "Immigration Law", category: "Legal", interest_score: 78, system_prompt: "Immigration intake specialist. Focus on visas and residency." },
    { niche_key: "med-spa", display_name: "Med Spa", category: "Medical", interest_score: 75, system_prompt: "Aesthetic specialist. Focus on skin treatments and injectables." },
    { niche_key: "fertility", display_name: "Fertility Clinic", category: "Medical", interest_score: 74, system_prompt: "Fertility coordinator. Focus on IVF and evaluations." },
    { niche_key: "family-law", display_name: "Family Law", category: "Legal", interest_score: 72, system_prompt: "Family law specialist. Focus on divorce and custody." },
    { niche_key: "estate-planning", display_name: "Estate Planning", category: "Legal", interest_score: 70, system_prompt: "Legacy planner. Focus on wills, trusts, and estates." },
    { niche_key: "dentistry", display_name: "General Dentistry", category: "Medical", interest_score: 68, system_prompt: "Dental assistant. Focus on cleanings, fillings, and emergencies." },
    { niche_key: "real-estate-law", display_name: "Real Estate Law", category: "Legal", interest_score: 65, system_prompt: "Real estate legal assistant. Focus on closings and contracts." },
    { niche_key: "bankruptcy-law", display_name: "Bankruptcy Law", category: "Legal", interest_score: 62, system_prompt: "Financial relief specialist. Focus on Chapter 7 and 13." }
  ];

  console.log(`Upserting ${nicheConfigs.length} niche configurations...`);
  for (const config of nicheConfigs) {
    await prisma.niche_config.upsert({
      where: { niche_key: config.niche_key },
      update: {
        category: config.category,
        system_prompt: config.system_prompt,
        interest_score: config.interest_score,
        is_active: true
      },
      create: {
        ...config,
        is_active: true
      }
    });
  }

  // 2. Global Knowledge Base (Brain)
  const kbData = [
    { niche: "hvac", question: "How often should I change my AC filter?", answer: "Every 1-3 months depending on usage and pets." },
    { niche: "orthodontics", question: "How much does Invisalign cost?", answer: "Typically $3,000 - $7,000 depending on complexity." },
    { niche: "personal-injury", question: "How much does it cost to hire you?", answer: "We work on a contingency fee; you pay nothing unless we win." },
    { niche: "trt-clinic", question: "Is TRT safe?", answer: "Under clinical supervision with regular blood work, it is safe and effective." },
    { niche: "solar", question: "Do solar panels work when it's cloudy?", answer: "Yes, they still produce power from indirect sunlight, though at lower levels." },
    { niche: "roofing", question: "How do I know if I need a new roof?", answer: "Look for missing shingles, water stains on ceilings, or grit in gutters." },
    { niche: "fertility", question: "What's the success rate for IVF?", answer: "Success rates vary by age but our clinic stays above national averages." }
  ];

  console.log(`Adding ${kbData.length} global brain entries...`);
  const result = await prisma.kb_source.createMany({
    data: kbData.map(d => ({
      ...d,
      business_key: null,
      is_active: true,
      tags: [],
      topic: "General FAQ"
    })),
    skipDuplicates: true
  });

  console.log(`✅ Synthesis Seed Complete! Seeded ${nicheConfigs.length} niches and ${result.count} KB entries.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
