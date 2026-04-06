import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Dropping old unique constraints to unblock niche scaling...");
  
  try {
    // Drop constraints if they exist
    await prisma.$executeRawUnsafe(`ALTER TABLE "kb_source" DROP CONSTRAINT IF EXISTS "kb_source_niche_question_key" CASCADE;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "kb_items" DROP CONSTRAINT IF EXISTS "kb_items_niche_question_key" CASCADE;`);
    console.log("Successfully dropped old constraints.");
  } catch (e) {
    console.error("Error dropping constraints (they may not exist):", e);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
