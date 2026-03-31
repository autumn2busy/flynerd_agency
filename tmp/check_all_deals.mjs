const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd22697d1"; // Wait, I copied the key from .env earlier, let me double check it.

async function checkAllDeals() {
    const AC_KEY_ACTUAL = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";
    try {
        const response = await fetch(`${AC_URL}/api/3/deals?limit=100`, {
            headers: { 'Api-Token': AC_KEY_ACTUAL }
        });
        const data = await response.json();
        const dealSummary = data.deals.map(d => ({
            id: d.id,
            title: d.title,
            group: d.group,
            owner: d.owner
        }));
        console.log('Deal Summary (Top 100):', JSON.stringify(dealSummary, null, 2));
    } catch (e) {
        console.error('Error fetching deals:', e);
    }
}

checkAllDeals();
