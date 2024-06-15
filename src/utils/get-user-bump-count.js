import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @async
 * @param {string} userId
 * @returns {Promise<number | null>}
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
