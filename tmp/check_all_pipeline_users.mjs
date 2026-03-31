const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

async function checkAllPipelines() {
    const pipelines = [1, 2, 3, 4];
    for (const id of pipelines) {
        try {
            const response = await fetch(`${AC_URL}/api/3/dealGroups/${id}/dealGroupUsers`, {
                headers: { 'Api-Token': AC_KEY }
            });
            const data = await response.json();
            console.log(`Pipeline ${id} Users:`, JSON.stringify(data.dealGroupUsers, null, 2));
        } catch (e) {
            console.error(`Error fetching users for pipeline ${id}:`, e);
        }
    }
}

checkAllPipelines();
