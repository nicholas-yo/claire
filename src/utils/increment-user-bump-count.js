import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @description Increments the bump count for a user by one.
 * @async
 * @param {string} userId - The ID of the user whose bump count is to be incremented.
 * @returns {Promise<number | null>} The new bump count after incrementing, or null if the operation failed.
 */
export const incrementUserBumpCount = async userId => {
  const lastBumpAt = new Date().toTimeString();

  const [{ bumpCount }] = await db
    .insert(usersTable)
    .values({ bumpCount: 1, id: userId, lastBumpAt })
    .onConflictDoUpdate({
      set: {
        bumpCount: sql`${usersTable.bumpCount} + 1`,
        lastBumpAt
      },
      target: usersTable.id
    })
    .returning();

  return bumpCount;
};
