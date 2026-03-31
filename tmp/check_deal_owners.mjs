const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

async function getDeals(pipelineId) {
    try {
        const response = await fetch(`${AC_URL}/api/3/deals?filters[group]=${pipelineId}&limit=5`, {
            headers: {
                'Api-Token': AC_KEY
            }
        });
        const data = await response.json();
        console.log(`Deals in Pipeline ${pipelineId}:`, JSON.stringify(data.deals.map(d => ({ id: d.id, owner: d.owner, title: d.title })), null, 2));
    } catch (e) {
        console.error('Error fetching deals:', e);
    }
}

async function main() {
    await getDeals(3);
}

main();
