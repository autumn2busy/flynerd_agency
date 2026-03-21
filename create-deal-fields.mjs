// create-deal-fields.mjs
// This script creates Custom Deal Fields in ActiveCampaign matching the flynerd-agency contact form.

const apiUrl = process.env.ACTIVECAMPAIGN_URL;
const apiKey = process.env.ACTIVECAMPAIGN_KEY;

if (!apiUrl || !apiKey) {
  console.error("Missing ACTIVECAMPAIGN_URL or ACTIVECAMPAIGN_KEY in environment variables.");
  process.exit(1);
}

const headers = {
  "Api-Token": apiKey,
  "Content-Type": "application/json"
};

const fieldsToCreate = [
  {
    fieldLabel: "Business Name",
    fieldType: "text"
  },
  {
    fieldLabel: "Industry",
    fieldType: "text"
  },
  {
    fieldLabel: "Revenue Range",
    fieldType: "dropdown",
    fieldOptions: [
      "Under $100K",
      "$100K - $500K",
      "$500K - $1M",
      "$1M - $5M",
      "$5M+",
      "Prefer not to say"
    ]
  },
  {
    fieldLabel: "Biggest Challenge",
    fieldType: "textarea"
  },
  {
    fieldLabel: "Current Tools",
    fieldType: "text"
  },
  {
    fieldLabel: "AI Experience Level",
    fieldType: "dropdown",
    fieldOptions: [
      "Complete beginner - new to AI tools",
      "Some experience - used ChatGPT or similar",
      "Intermediate - implemented some automations",
      "Advanced - have AI systems in place"
    ]
  },
  {
    fieldLabel: "Timeline",
    fieldType: "dropdown",
    fieldOptions: [
      "Immediately - ready to go",
      "Within 30 days",
      "1-3 months",
      "Just exploring options"
    ]
  },
  {
    fieldLabel: "Budget Range",
    fieldType: "dropdown",
    fieldOptions: [
      "Under $1,000",
      "$1,000 - $2,500",
      "$2,500 - $5,000",
      "$5,000 - $10,000",
      "$10,000+",
      "Need to discuss"
    ]
  }
];

async function createDealFields() {
  console.log("Starting creation of Deal Custom Fields in ActiveCampaign...\n");

  for (const field of fieldsToCreate) {
    console.log(`Creating field: ${field.fieldLabel} (${field.fieldType})...`);
    
    try {
      const res = await fetch(`${apiUrl}/api/3/dealCustomFieldMeta`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          dealCustomFieldMetum: field
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        const id = data.dealCustomFieldMeta ? data.dealCustomFieldMeta.id : JSON.stringify(data);
        console.log(`✅ Success! Field ID: ${id}`);
      } else {
        console.error(`❌ Failed to create '${field.fieldLabel}':`, data.message || JSON.stringify(data));
      }
    } catch (err) {
      console.error(`❌ Error creating '${field.fieldLabel}':`, err.message);
    }
  }
  
  console.log("\nFinished processing fields.");
}

createDealFields();
