import fs from 'fs';
import path from 'path';

const vaultPath = 'C:/Users/Mother/Vault/command-center';
const date = new Date().toISOString().split('T')[0];

const changelogEntry = `
## ${date} - FlyNerd Tech Site Reconciliation
- **Phase 3:** Built new vertical pages \`/ai-website/trades\` and \`/ai-website/premium-services\` from deprecated legacy tiers. Updated \`/ai-website\` hub to link to them without explicit pricing.
- **Phase 4:** Archived 19 deprecated Stripe products via API, keeping only the 5 canonical offers.
- **Phase 5:** Added 301 redirects in \`next.config.ts\` for deprecated pricing pages. Removed deprecated links from \`Footer.tsx\` and \`Header.tsx\`.
`;

const inboxEntry = `---
project: flynerd-agency
type: infrastructure
source: Antigravity
created: ${new Date().toISOString()}
---
# Site Reconciliation & Stripe Cleanup
- Archived 19 deprecated Stripe products.
- Added 301 redirects for deprecated Next.js routes.
- Updated FlyNerd Tech navigation to align with 5 canonical offers.
`;

async function updateObsidian() {
    try {
        // Try REST API first (append not easily supported via simple POST without fetching first, so we use local file system directly since we have the path)
        // Since we are running locally and have direct access, and the instruction says "If the Obsidian API is unreachable (Obsidian not running), read the local files directly from the filesystem instead", writing to filesystem directly is reliable for appending.
        
        // Append to changelog
        const changelogPath = path.join(vaultPath, 'Sonata', 'changelog.md');
        if (fs.existsSync(changelogPath)) {
            fs.appendFileSync(changelogPath, changelogEntry);
            console.log('Appended to changelog.md');
        } else {
            fs.writeFileSync(changelogPath, '# Changelog\n' + changelogEntry);
            console.log('Created changelog.md');
        }

        // Write to 00-Inbox
        const inboxDir = path.join(vaultPath, '00-Inbox');
        if (!fs.existsSync(inboxDir)) {
            fs.mkdirSync(inboxDir, { recursive: true });
        }
        const inboxFile = path.join(inboxDir, `site-reconciliation-${Date.now()}.md`);
        fs.writeFileSync(inboxFile, inboxEntry);
        console.log(`Created inbox note: ${inboxFile}`);
        
    } catch (err) {
        console.error("Error updating Obsidian:", err);
    }
}

updateObsidian();
