import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @async
 * @param {string} userId
 * @returns {Promise<void>}
 */
export const resetUserBumpCount = async (userId) => {
  await db
    .update(usersTable)
    .set({
      bumpCount: 0,
    })
    .where(sql`${usersTable.id} = ${userId}`);
};
