import { desc } from "drizzle-orm/expressions";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @async
 * @returns {Promise<Pick<typeof usersTable.$inferSelect, "id" | "bumpCount">[]>}
 */
export const getTopBumpers = async () =>
  await db
    .select({
      id: usersTable.id,
      bumpCount: usersTable.bumpCount,
    })
    .from(usersTable)
    .orderBy(desc(usersTable.bumpCount));
