import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hvacKbItems = [
  {
    niche: "hvac",
    question: "Do you offer emergency no-cooling service?",
    answer: "Yes. If your system is completely down, we can prioritize same-day or after-hours service when available. Call our emergency line for fastest dispatch.",
    topic: "Emergency Service",
    tags: ["emergency", "no_cooling", "dispatch"],
  },
  {
    niche: "hvac",
    question: "How do I know if I should repair or replace my HVAC system?",
    answer: "If your system is 10-15+ years old, needs frequent repairs, or has major component failure, replacement may be more cost-effective.",
    topic: "Repair vs Replacement",
    tags: ["repair", "replacement", "pricing"],
  },
  {
    niche: "hvac",
    question: "What SEER rating should I look for in a new AC unit?",
    answer: "We recommend a minimum 15 SEER2 for energy efficiency. Higher SEER ratings (18-20) save more on energy bills over time.",
    topic: "Equipment Selection",
    tags: ["seer", "efficiency", "new_unit", "tax_credit"],
  },
  {
    niche: "hvac",
    question: "How often should I have my HVAC system serviced?",
    answer: "We recommend a bi-annual tune-up — once in spring before cooling season, and once in fall before heating season.",
    topic: "Maintenance",
    tags: ["maintenance", "tune_up", "seasonal"],
  },
  {
    niche: "hvac",
    question: "Do you offer financing for new HVAC installations?",
    answer: "Yes. We offer 0% financing for 12 months and low-APR plans up to 60 months through our lending partners.",
    topic: "Financing",
    tags: ["financing", "payment", "installation"],
  },
  {
    niche: "hvac",
    question: "What areas do you serve?",
    answer: "We serve the greater metro area including all surrounding counties. Enter your ZIP code to confirm we cover your location.",
    topic: "Service Area",
    tags: ["service_area", "coverage", "zip"],
  },
  {
    niche: "hvac",
    question: "What is included in a tune-up?",
    answer: "Our seasonal tune-up includes: filter inspection, coil cleaning, refrigerant check, electrical inspection, and a system performance report.",
    topic: "Maintenance",
    tags: ["tune_up", "maintenance"],
  },
];

async function main() {
  console.log("--- Clearing existing HVAC KB ---");
  await prisma.kb_source.deleteMany({
    where: { niche: "hvac" }
  });

  console.log("--- Seeding HVAC KB ---");
  await prisma.kb_source.createMany({
    data: hvacKbItems.map(item => ({
      ...item,
      is_active: true
    }))
  });

  const count = await prisma.kb_source.count({ where: { niche: "hvac" } });
  console.log(`Success! Total HVAC items: ${count}`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
