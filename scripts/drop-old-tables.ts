import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function dropOldTables() {
  console.log("Dropping old tables...");

  try {
    // 既存のusersテーブルを削除
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    console.log("✓ Dropped 'users' table");

    console.log("\nOld tables dropped successfully!");
    console.log("Now run: npm run db:push");
  } catch (error) {
    console.error("Error dropping tables:", error);
    process.exit(1);
  }
}

dropOldTables();
