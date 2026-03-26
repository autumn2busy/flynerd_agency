const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

async function fetchAll(endpoint, key) {
    const res = await fetch(`${AC_URL}/api/3/${endpoint}?limit=100`, {
        headers: { "Api-Token": AC_KEY }
    });
    const data = await res.json();
    return data[key] || [];
}

async function runAudit() {
    console.log("--- ActiveCampaign Asset Audit ---\n");

    // 1. Custom Deal Fields
    const fields = await fetchAll("dealCustomFieldMeta", "dealCustomFieldMeta");
    console.log("Deal Custom Fields:");
    console.log(JSON.stringify(fields.map(f => ({ id: f.id, label: f.fieldLabel, tag: f.personalizationTag })), null, 2));

    // 2. Tags
    const tags = await fetchAll("tags", "tags");
    console.log("\nTags:");
    console.log(JSON.stringify(tags.map(t => ({ id: t.id, tag: t.tag })), null, 2));

    // 3. Lists
    const lists = await fetchAll("lists", "lists");
    console.log("\nLists:");
    console.log(JSON.stringify(lists.map(l => ({ id: l.id, name: l.name })), null, 2));

    // 4. Pipelines (Deal Groups)
    const pipelines = await fetchAll("dealGroups", "dealGroups");
    console.log("\nPipelines:");
    console.log(JSON.stringify(pipelines.map(p => ({ id: p.id, title: p.title })), null, 2));

    // 5. Automations
    const automations = await fetchAll("automations", "automations");
    console.log("\nAutomations:");
    console.log(JSON.stringify(automations.map(a => ({ id: a.id, name: a.name, status: a.status })), null, 2));
}

runAudit();
