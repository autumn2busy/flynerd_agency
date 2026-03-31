const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

async function getPipelines() {
    try {
        const response = await fetch(`${AC_URL}/api/3/dealGroups`, {
            headers: {
                'Api-Token': AC_KEY
            }
        });
        const data = await response.json();
        console.log('All Pipelines:', JSON.stringify(data.dealGroups, null, 2));
    } catch (e) {
        console.error('Error fetching pipelines:', e);
    }
}

async function main() {
    await getPipelines();
}

main();
