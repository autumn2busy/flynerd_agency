const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

async function run() {
    const res = await fetch(`${AC_URL}/api/3/automations/489/blocks`, {
        headers: { "Api-Token": AC_KEY }
    });
    const data = await res.json();
    const blocks = data.automationBlocks;
    
    const emailRelated = blocks.filter(b => b.type === "one_to_one" || b.type.includes("email"));
    
    console.log("Automation 489 - Email Blocks:");
    const result = emailRelated.map(b => ({
        block_id: b.id,
        email_name: b.params?.emailName || b.params?.subject || "Unknown",
        subject: b.params?.subject,
        type: b.type
    }));
    
    console.log(JSON.stringify(result, null, 2));
}

run();
