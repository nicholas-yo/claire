import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @async
 * @param {string} userId
 * @returns {Promise<number | null>}
 */
export const incrementUserBumpCount = async (userId) => {
  const lastBumpAt = new Date().toTimeString();

  const [{ bumpCount }] = await db
    .insert(usersTable)
    .values({ id: userId, bumpCount: 1, lastBumpAt })
    .onConflictDoUpdate({
      target: usersTable.id,
      set: {
        bumpCount: sql`${usersTable.bumpCount} + 1`,
        lastBumpAt,
      },
    })
    .returning();

  return bumpCount;
};
