import cuid2 from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
// eslint-disable-next-line import/extensions
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  bumpCount: int("bump_count").default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_DATE)`),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => cuid2.createId()),
  lastBumpAt: text("last_bump_at"),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_DATE)`)
    .$onUpdateFn(() => sql`(CURRENT_DATE)`)
});
