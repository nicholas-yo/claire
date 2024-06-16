import cuid2 from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => cuid2.createId()),
  bumpCount: int("bump_count").default(0),
  lastBumpAt: text("last_bump_at"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_DATE)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_DATE)`)
    .$onUpdateFn(() => sql`(CURRENT_DATE)`)
});
