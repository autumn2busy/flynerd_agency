const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Dropping constraint agency_lead_stage_check...");
        await prisma.$executeRawUnsafe(`ALTER TABLE "AgencyLead" DROP CONSTRAINT IF EXISTS "agency_lead_stage_check";`);

        console.log("Dropping column created_at...");
        await prisma.$executeRawUnsafe(`ALTER TABLE "AgencyLead" DROP COLUMN IF EXISTS "created_at";`);

        console.log("Dropping column updated_at...");
        // Wait, dropping updated_at might fail if the function still uses it.
        // Let's replace the function first.
        
        console.log("Replacing trigger function trg_set_updated_at_on_agency_lead...");
        await prisma.$executeRawUnsafe(`
            CREATE OR REPLACE FUNCTION trg_set_updated_at_on_agency_lead()
            RETURNS trigger AS $$
            BEGIN
                NEW."updatedAt" = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        console.log("Dropping column updated_at now...");
        await prisma.$executeRawUnsafe(`ALTER TABLE "AgencyLead" DROP COLUMN IF EXISTS "updated_at";`);

        console.log("Done.");
    } catch (e) {
        console.error("Error executing DB actions: ", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
