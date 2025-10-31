import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

// .env.localを明示的に読み込む
config({ path: ".env.local" });

async function main() {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    console.error("ERROR: DATABASE_URL is not set in .env.local");
    process.exit(1);
  }

  console.log("Dropping all auth tables...");

  const sql = neon(DATABASE_URL);

  try {
    await sql`DROP TABLE IF EXISTS "verification_token" CASCADE`;
    await sql`DROP TABLE IF EXISTS "verificationToken" CASCADE`;
    await sql`DROP TABLE IF EXISTS "verification" CASCADE`;
    await sql`DROP TABLE IF EXISTS "session" CASCADE`;
    await sql`DROP TABLE IF EXISTS "account" CASCADE`;
    await sql`DROP TABLE IF EXISTS "user" CASCADE`;
    console.log("✓ Successfully dropped all auth tables");
  } catch (error) {
    console.error("Error dropping tables:", error);
    process.exit(1);
  }

  process.exit(0);
}

main();
