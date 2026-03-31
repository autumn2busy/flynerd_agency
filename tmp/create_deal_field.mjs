const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

async function createDealField() {
    try {
        const response = await fetch(`${AC_URL}/api/3/dealCustomFieldMeta`, {
            method: "POST",
            headers: {
                "Api-Token": AC_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dealCustomFieldMetum: {
                    fieldLabel: "BUSINESS WEBSITE",
                    fieldType: "text",
                    displayOrder: 1
                }
            })
        });

        const data = await response.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error creating deal field:", e);
    }
}

createDealField();
