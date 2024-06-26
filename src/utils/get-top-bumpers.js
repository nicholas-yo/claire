// eslint-disable-next-line import/extensions
import { desc } from "drizzle-orm/expressions";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";
import { sql } from "drizzle-orm";

/**
 * @description Retrieves the top users based on their bump count.
 * @async
 * @returns {Promise<Pick<typeof usersTable.$inferSelect, "id" | "bumpCount">[]>} A promise that resolves to an array of the top users, including their ID and bump count.
 */
export const getTopBumpers = async () =>
  await db
    .select({
      bumpCount: usersTable.bumpCount,
      id: usersTable.id
    })
    .from(usersTable)
    .where(sql`${usersTable.bumpCount} > 0`)
    .orderBy(desc(usersTable.bumpCount));
