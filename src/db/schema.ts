import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// サンプルテーブル: 実際のスキーマは後で定義
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
