// eslint-disable-next-line import/extensions
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import { usersTable } from "../db/schema/users-table.js";
import { db } from "../db/index.js";

// eslint-disable-next-line no-secrets/no-secrets
/**
 * @description Updates the user's level in the database.
 * @param {number} level - The new level for the user.
 * @param {string} userId - The unique identifier of the user.
 * @param {SQLiteTransaction<"async", import("@libsql/client").ResultSet, Record<string, never>, import("drizzle-orm").ExtractTablesWithRelations<Record<string, never>>>} [tx] - Optional transaction context.
 * @returns {Promise<void>}
 */
export const updateUserLevel = async (level, userId, tx) => {
  await (tx || db)
    .insert(usersTable)
    .values({ id: userId, level })
    .onConflictDoUpdate({
      set: { level },
      target: usersTable.id
    })
    .returning();
};
