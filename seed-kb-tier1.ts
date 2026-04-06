import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const kbData = [
  // MEDICAL: Orthodontics & Invisalign
  { niche: 'orthodontics', question: 'Am I a candidate for clear aligners like Invisalign?', answer: 'Most patients with mild to moderate crowding or spacing are excellent candidates. A digital scan during your consultation will confirm if your specific dental alignment can be corrected with aligners versus traditional braces.' },
  { niche: 'orthodontics', question: 'How long does Invisalign treatment usually take?', answer: 'Typical cases take between 12 to 18 months, though some minor corrections can be completed in as little as 6 months. Consistency in wearing your aligners (22 hours/day) is the biggest factor in speed.' },
  { niche: 'orthodontics', question: 'Do clear aligners hurt more than metal braces?', answer: 'No, aligners are generally more comfortable. You may feel "pressure" for the first 24-48 hours after switching to a new tray, which indicates your teeth are moving as planned.' },

  // MEDICAL: Hormone Therapy & TRT
  { niche: 'hormone_therapy_trt', question: 'What are the most common signs of low testosterone?', answer: 'Common symptoms include persistent fatigue, decreased libido, loss of muscle mass, increased body fat, and "brain fog" or difficulty concentrating.' },
  { niche: 'hormone_therapy_trt', question: 'How is TRT administered?', answer: 'We offer several methods including weekly injections, topical gels, and subcutaneous pellets. The choice depends on your lifestyle and how your body metabolizes the hormones.' },
  { niche: 'hormone_therapy_trt', question: 'Is TRT safe for long-term use?', answer: 'Under clinical supervision with regular blood work to monitor red blood cell count and PSA levels, TRT is a safe and effective treatment for diagnosed hypogonadism.' },

  // MEDICAL: Fertility Clinics
  { niche: 'fertility_clinics', question: 'What is the first step in a fertility evaluation?', answer: 'The first step is a comprehensive fertility assessment for both partners, including hormone blood tests, an ultrasound for the female, and a semen analysis for the male.' },
  { niche: 'fertility_clinics', question: 'What are your success rates for IVF?', answer: 'Success rates vary significantly by age and diagnosis. Our clinic maintains rates above the national average; we provide specific success data based on your age group during your initial consult.' },

  // MEDICAL: Plastic Surgery
  { niche: 'plastic_surgery', question: 'How long is the recovery period for major cosmetic surgery?', answer: 'Recovery varies by procedure. Typically, you can return to work in 1-2 weeks for most surgeries, but complete healing and final results can take 3-6 months.' },

  // LEGAL: Workers Comp Lawyers
  { niche: 'workers_comp', question: 'What should I do immediately after a work injury?', answer: '1. Report the injury to your supervisor immediately. 2. Seek medical attention. 3. Document everything. 4. Consult an attorney before signing any insurance company statements.' },
  { niche: 'workers_comp', question: 'Can I choose my own doctor for a work injury?', answer: 'This depends on state law. In many cases, your employer has a designated "Panel of Physicians." We can help you navigate the process of getting a second opinion if you are unhappy with your care.' },

  // LEGAL: Divorce & Family Law
  { niche: 'divorce_law', question: 'How long does a typical divorce take to finalize?', answer: 'An uncontested divorce can take 60-90 days. Contested divorces involving complex assets or custody disputes can take 6-18 months depending on court schedules.' },
  { niche: 'divorce_law', question: 'How is child custody determined?', answer: 'Courts always prioritize the "Best Interests of the Child." They consider stability, parental involvement, and the child\'s needs rather than just splitting time 50/50 automatically.' },

  // HOME HIGH-TICKET: Pool Builders
  { niche: 'pool_builders', question: 'How long does it take from excavation to swimming?', answer: 'A standard gunite pool typically takes 8-12 weeks. Factors like weather, permitting, and the complexity of your landscaping/masonry can extend this timeline.' },
  { niche: 'pool_builders', question: 'What kind of warranty comes with a new pool?', answer: 'We typically provide a lifetime structural warranty on the shell, 3 years on equipment (pumps/filters), and 1-2 years on the interior finish (plaster/pebble).' },

  // HOME HIGH-TICKET: Solar Panel Installers
  { niche: 'solar_panel_installers', question: 'What happens to my solar power during a grid outage?', answer: 'Standard grid-tied systems shut off during an outage for safety. If you want power during a blackout, we can add a battery backup system like a Tesla Powerwall.' },
  { niche: 'solar_panel_installers', question: 'Does solar still work on cloudy days?', answer: 'Yes! While production is lower than on a bright sunny day, modern high-efficiency panels still capture indirect sunlight to generate power.' },

  // OTHERS (Oral Surgery, Weight Loss, Dental Implants, Bankruptcy, Personal Injury)
  { niche: 'dental_implants', question: 'Are dental implants permanent?', answer: 'With proper care and maintenance, dental implants can last a lifetime. They are the most durable and natural-looking tooth replacement option available.' },
  { niche: 'weight_loss', question: 'Is medical weight loss covered by insurance?', answer: 'Coverage varies significantly. Many plans cover consultations and medically necessary weight loss surgery, while medications like GLP-1s often require specific prior authorization.' },
  { niche: 'personal_injury', question: 'How much does it cost to hire a personal injury lawyer?', answer: 'Most personal injury lawyers work on a contingency fee basis, meaning you pay nothing upfront and they only get paid a percentage of your final settlement.' },
];

async function main() {
  console.log("Seeding Knowledge Base (Tier 1 Global) using createMany...");

  // We use createMany for bulk seeding as it is faster and cleaner for initial data.
  // business_key is null for all global data.
  const result = await prisma.kb_source.createMany({
    data: kbData.map(item => ({
      niche: item.niche,
      question: item.question,
      answer: item.answer,
      business_key: null,
      topic: 'General FAQ',
      is_active: true
    })),
    skipDuplicates: true
  });

  console.log(`Successfully seeded ${result.count} global niche FAQs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
