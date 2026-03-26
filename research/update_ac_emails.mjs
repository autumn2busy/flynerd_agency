const AC_URL = "https://awilliams.api-us1.com";
const AC_KEY = "0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1";

/**
 * Updates an automation block (specifically outboundemail / 1:1 blocks)
 * @param {string} blockId The ID of the block in the automation
 * @param {object} updates The params to update (subject, message, emailName)
 */
async function updateAutomationBlock(blockId, updates) {
    console.log(`[AC] Updating Automation Block ${blockId}...`);

    // 1. Get current block to preserve existing params
    const getRes = await fetch(`${AC_URL}/api/3/automationBlocks/${blockId}`, {
        headers: { "Api-Token": AC_KEY }
    });
    const current = await getRes.json();

    if (!current.automationBlock) {
        console.error(`[Error] Block ${blockId} not found.`);
        return;
    }

    // 2. Merge updates into params
    const updatedParams = {
        ...current.automationBlock.params,
        ...updates
    };

    // 3. PUT update
    const putRes = await fetch(`${AC_URL}/api/3/automationBlocks/${blockId}`, {
        method: "PUT",
        headers: {
            "Api-Token": AC_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            automationBlock: {
                params: updatedParams
            }
        })
    });

    const result = await putRes.json();
    console.log(`[AC] Update result for ${blockId}:`, result.automationBlock ? "Success" : "Failed");
    return result;
}

// Example usage for Water Damage Restoration
async function updateToWaterDamage() {
    // 1. Initial Pitch (Block 3174)
    await updateAutomationBlock("3174", {
        subject: "I built an Emergency Intake demo for %DEAL_ORGANIZATION_NAME%",
        message: `
            <p>Hi %FIRSTNAME%,</p>
            <p>I came across %DEAL_ORGANIZATION_NAME% while researching %DEAL_LEADNICHE% firms in your area, and I noticed something — in your industry, the first person to answer the phone wins the $5k+ job.</p>
            <p><strong>I built you a custom demo website</strong> that shows how automated intake can capture and qualify emergency leads 24/7:</p>
            <p>👉 <a href="%DEAL_DEMOSITEURL%">Test the demo here</a></p>
            <p>I also recorded a quick <strong>AI video walkthrough</strong> explaining how this addresses <strong>%DEAL_PAINPOINT%</strong>: <a href="%DEAL_VIDEOURL%">Watch Video</a></p>
            <p>Just take 2 minutes to look. If you like it, reply and we'll talk.</p>
            <p>Best regards,<br>Fly Nerd Tech Team</p>
        `
    });

    // 2. Hot Follow-Up (Block 3178)
    await updateAutomationBlock("3178", {
        subject: "Quick question regarding the %DEAL_ORGANIZATION_NAME% demo",
        message: `
            <p>Hi %FIRSTNAME%,</p>
            <p>I noticed you took a look at the custom restoration demo I built — awesome!</p>
            <p>The site I built addresses real gaps I found in your current online presence, specifically around <strong>%DEAL_PAINPOINT%</strong>.</p>
            <p>Here's your demo again: <a href="%DEAL_DEMOSITEURL%">%DEAL_DEMOSITEURL%</a></p>
            <p>Do you have 10 minutes this week to walk through how we'd launch this? Reply if you're open to it.</p>
            <p>Best regards,<br>Fly Nerd Tech Team</p>
        `
    });
}

updateToWaterDamage();
