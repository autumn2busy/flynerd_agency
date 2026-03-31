const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

async function getPipeline(id) {
    try {
        const response = await fetch(`${AC_URL}/api/3/dealGroups/${id}`, {
            headers: {
                'Api-Token': AC_KEY
            }
        });
        const data = await response.json();
        console.log('Pipeline Data:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error fetching pipeline:', e);
    }
}

async function getUsers() {
    try {
        const response = await fetch(`${AC_URL}/api/3/users`, {
            headers: {
                'Api-Token': AC_KEY
            }
        });
        const data = await response.json();
        console.log('Users Data:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error fetching users:', e);
    }
}

async function getDeals(pipelineId) {
    try {
        const response = await fetch(`${AC_URL}/api/3/deals?filters[group]=${pipelineId}`, {
            headers: {
                'Api-Token': AC_KEY
            }
        });
        const data = await response.json();
        console.log('Deals in Pipeline 4:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error fetching deals:', e);
    }
}

async function main() {
    console.log("Fetching pipeline 4...");
    await getPipeline(4);
    console.log("\nFetching users...");
    await getUsers();
    console.log("\nFetching deals in pipeline 4...");
    await getDeals(4);
}

main();
