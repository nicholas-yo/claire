import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @async
 * @param {string} userId - The ID of the user to reset the bump count for
 * @returns {Promise<void>}
 * @description Reset the bump count for a user.
 */
export const resetUserBumpCount = async userId => {
  await db
    .update(usersTable)
    .set({
      bumpCount: 0
    })
    .where(sql`${usersTable.id} = ${userId}`);
};
