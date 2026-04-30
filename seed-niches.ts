import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tier1Niches = [
  // Medical
  { niche_key: 'orthodontics', display_name: 'Orthodontics & Invisalign', category: 'medical', interest_score: 91, trend_pct: -1, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'trt-clinic', display_name: 'Hormone Therapy & TRT Clinics', category: 'medical', interest_score: 90, trend_pct: 36, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'plastic-surgery', display_name: 'Plastic Surgery', category: 'medical', interest_score: 89, trend_pct: -3, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'fertility', display_name: 'Fertility Clinics', category: 'medical', interest_score: 88, trend_pct: 14, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'weight-loss', display_name: 'Weight Loss Clinics', category: 'medical', interest_score: 84, trend_pct: 13, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'addiction-treatment', display_name: 'Addiction Treatment Centers', category: 'medical', interest_score: 83, trend_pct: -2, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'oral-surgery', display_name: 'Oral Surgery Practices', category: 'medical', interest_score: 82, trend_pct: 1, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'dental-implants', display_name: 'Dental Implants', category: 'medical', interest_score: 81, trend_pct: 5, tier: 'tier_1', pricing_tier: 'premium' },
  
  // Legal
  { niche_key: 'workers-comp', display_name: 'Workers Comp Lawyers', category: 'legal', interest_score: 89, trend_pct: 3, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'family-law', display_name: 'Divorce & Family Law', category: 'legal', interest_score: 84, trend_pct: 3, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'personal-injury', display_name: 'Personal Injury Lawyers', category: 'legal', interest_score: 81, trend_pct: 6, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'bankruptcy', display_name: 'Bankruptcy Lawyers', category: 'legal', interest_score: 80, trend_pct: 2, tier: 'tier_1', pricing_tier: 'standard' },
  
  // Home High-Ticket
  { niche_key: 'pool-builders', display_name: 'Pool Builders', category: 'home_high_ticket', interest_score: 86, trend_pct: 6, tier: 'tier_1', pricing_tier: 'premium' },
  { niche_key: 'solar', display_name: 'Solar Panel Installers', category: 'home_high_ticket', interest_score: 82, trend_pct: 10, tier: 'tier_1', pricing_tier: 'premium' }
];

const hvacKbItems = [
  { question: "Do you offer emergency no-cooling service?", answer: "Yes. If your system is completely down, we can prioritize same-day or after-hours service when available. Call our emergency line for fastest dispatch.", topic: "Emergency Service", tags: ["emergency", "no_cooling", "dispatch"] },
  { question: "How do I know if I should repair or replace my HVAC system?", answer: "If your system is 10-15+ years old, needs frequent repairs, or has major component failure, replacement may be more cost-effective. We can diagnose and give options during a service visit.", topic: "Repair vs Replacement", tags: ["repair", "replacement", "pricing"] },
  { question: "What SEER rating should I look for in a new AC unit?", answer: "We recommend a minimum 15 SEER2 for energy efficiency. Higher SEER ratings (18-20) save more on energy bills over time and may qualify for federal tax credits under the Inflation Reduction Act.", topic: "Equipment Selection", tags: ["seer", "efficiency", "new_unit", "tax_credit"] },
  { question: "How often should I have my HVAC system serviced?", answer: "We recommend a bi-annual tune-up — once in spring before cooling season, and once in fall before heating season. This extends equipment life, maintains efficiency, and catches issues early.", topic: "Maintenance", tags: ["maintenance", "tune_up", "seasonal"] },
  { question: "Do you offer financing for new HVAC installations?", answer: "Yes. We offer 0% financing for 12 months and low-APR plans up to 60 months through our lending partners. Subject to credit approval. Ask about current promotions.", topic: "Financing", tags: ["financing", "payment", "installation"] },
  { question: "What areas do you serve?", answer: "We serve the greater metro area including all surrounding counties. Enter your ZIP code to confirm we cover your location, or call us directly.", topic: "Service Area", tags: ["service_area", "coverage", "zip"] },
  { question: "What is included in a tune-up?", answer: "Our seasonal tune-up includes: filter inspection/replacement, coil cleaning, refrigerant level check, electrical connection inspection, thermostat calibration, drain line flush, and a full system performance report.", topic: "Maintenance", tags: ["tune_up", "maintenance", "what_included"] },
  { question: "What warranty do you offer on new equipment?", answer: "New equipment comes with the manufacturer warranty (typically 10 years parts) plus our 1-year labor warranty. Extended service agreements are available.", topic: "Warranty", tags: ["warranty", "new_equipment", "guarantee"] },
  { question: "Can I get a rough estimate before scheduling a visit?", answer: "Yes — provide your home size, current system age, and issue type and our assistant can give you a ballpark range. For an accurate quote, we recommend a free on-site assessment.", topic: "Pricing", tags: ["estimate", "pricing", "quote"] },
  { question: "What should I do if I smell gas near my HVAC unit?", answer: "Leave your home immediately. Do not use any electrical switches. Call your gas utility company from outside, then call 911 if needed. Do not re-enter until cleared by professionals. This is a safety emergency.", topic: "Emergency Safety", tags: ["emergency", "gas", "safety", "co"] }
];

async function main() {
  console.log('Seeding Tier 1 Niches into niche_config...');
  for (const niche of tier1Niches) {
    const existing = await prisma.niche_config.findUnique({ where: { niche_key: niche.niche_key } });
    if (!existing) {
      const defaultSystemPrompt = `You are an AI assistant for a ${niche.display_name} company. Answer questions accurately based on your knowledge base.`;
      await prisma.niche_config.create({
        data: {
          ...niche,
          system_prompt: defaultSystemPrompt
        }
      });
      console.log(`Created: ${niche.display_name}`);
    } else {
      console.log(`Skipped existing: ${niche.display_name}`);
    }
  }

  // Ensure HVAC is in niche_config so we can attach KB items to the niche
  const hvac = await prisma.niche_config.findUnique({ where: { niche_key: 'hvac' } });
  if (!hvac) {
    await prisma.niche_config.create({
      data: {
        niche_key: 'hvac',
        display_name: 'HVAC Companies',
        category: 'home_high_ticket',
        interest_score: 77,
        trend_pct: -2,
        tier: 'tier_2',
        pricing_tier: 'standard',
        system_prompt: 'You are an AI assistant for an HVAC company. Be helpful and optimize for booking appointments.'
      }
    });
    console.log(`Created: HVAC Companies`);
  }

  console.log('\nSeeding HVAC knowledge base into kb_source...');
  for (const item of hvacKbItems) {
    try {
      const updated = await prisma.kb_source.updateMany({
        where: {
          niche: 'hvac',
          question: item.question,
          business_key: null
        },
        data: {
          answer: item.answer,
          topic: item.topic,
          tags: item.tags,
          is_active: true,
          updated_at: new Date()
        }
      });

      if (updated.count === 0) {
        await prisma.kb_source.create({
          data: {
            niche: 'hvac',
            question: item.question,
            answer: item.answer,
            topic: item.topic,
            tags: item.tags,
            business_key: null,
            is_active: true
          }
        });
      }
      console.log(`Upserted KB Q: ${item.question.substring(0, 30)}...`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      console.error(`Error inserting KB item: ${message}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seed complete.');
  });
