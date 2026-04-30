import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2023-10-16',
});

// We only want to KEEP these 5 canonical offers active
const canonicalSlugs = [
    'automation-audit',
    'quickstart-workflow-build',
    'ai-concierge-launch',
    'monthly-care-plan',
    'multi-system-ops-retainer'
];

// Names or keywords indicating they are canonical
const canonicalKeywords = [
    'Automation Audit',
    'Quickstart Workflow Build',
    'AI Concierge Launch',
    'Monthly Care Plan',
    'Multi-System Ops Retainer',
    'Automation Sprint Build' // keep this since we renamed it
];

async function run() {
    try {
        console.log("Fetching active products from Stripe...");
        const products = await stripe.products.list({ limit: 100, active: true });
        
        console.log(`Found ${products.data.length} active products.`);

        let archivedCount = 0;
        let keepCount = 0;

        for (const product of products.data) {
            // Check if product is canonical
            const isCanonical = canonicalKeywords.some(keyword => 
                product.name.toLowerCase().includes(keyword.toLowerCase())
            );

            if (isCanonical) {
                console.log(`✅ Keeping: ${product.name} (ID: ${product.id})`);
                keepCount++;
            } else {
                console.log(`❌ Archiving: ${product.name} (ID: ${product.id})`);
                await stripe.products.update(product.id, { active: false });
                archivedCount++;
            }
        }

        console.log(`\nDone. Kept ${keepCount} products. Archived ${archivedCount} deprecated products.`);
    } catch (err) {
        console.error("Error archiving products:", err);
    }
}

run();
