import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";
// eslint-disable-next-line import/extensions
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";

// eslint-disable-next-line no-secrets/no-secrets
/**
 * @description Updates the user's experience points (XP) in the database.
 * @param {string} userId - The unique identifier of the user.
 * @param {number} value - The XP value to be added.
 * @param {number} multiplier - A multiplier applied to the XP value.
 * @param {SQLiteTransaction<"async", import("@libsql/client").ResultSet, Record<string, never>, import("drizzle-orm").ExtractTablesWithRelations<Record<string, never>>>} [tx] - Optional transaction context.
 * @returns {Promise<{experience:number, level:number, id: string}>} -  Object containing updated experience, level, and user ID.
 */
export const giveXp = async (userId, value, multiplier, tx) => {
  const [{ experience, id, level }] = await (tx || db)
    .insert(usersTable)
    .values({
      experience: value * multiplier,
      id: userId
    })
    .onConflictDoUpdate({
      set: {
        experience: sql`${usersTable.experience} + ${value * multiplier}`
      },
      target: usersTable.id
    })
    .returning();

  return {
    experience: /** @type {number} */ (experience),
    id,
    level: /** @type {number} */ (level)
  };
};
