// get-deal-fields.mjs
const apiUrl = process.env.ACTIVECAMPAIGN_URL;
const apiKey = process.env.ACTIVECAMPAIGN_KEY;

async function getFields() {
  const res = await fetch(`${apiUrl}/api/3/dealCustomFieldMeta`, {
    headers: { "Api-Token": apiKey }
  });
  const data = await res.json();
  const fields = data.dealCustomFieldMeta.map(f => ({ id: f.id, label: f.fieldLabel }));
  console.log(JSON.stringify(fields, null, 2));
}

getFields();
