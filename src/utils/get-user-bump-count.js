import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @description Retrieves the bump count for a specific user.
 * @async
 * @param {string} userId - The ID of the user whose bump count is to be retrieved.
 * @returns {Promise<number | null>} The bump count of the user, or null if the user does not exist.
 */
export const getUserBumpCount = async userId => {
  const users = await db
    .select({
      bumpCount: usersTable.bumpCount
    })
    .from(usersTable)
    .where(sql`${usersTable.id} = ${userId}`);

  const user = users?.[0];

  return user?.bumpCount;
};
