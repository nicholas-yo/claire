import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";
// eslint-disable-next-line import/extensions
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";

// eslint-disable-next-line no-secrets/no-secrets
/**
 * @async
 * @param {string} userId - The ID of the user to reset the bump count for
 * @param {SQLiteTransaction<"async", import("@libsql/client").ResultSet, Record<string, never>, import("drizzle-orm").ExtractTablesWithRelations<Record<string, never>>>} [tx] - Optional transaction context.
 * @returns {Promise<void>}
 * @description Reset the bump count for a user.
 */
export const resetUserBumpCount = async (userId, tx) => {
  await (db || tx)
    .update(usersTable)
    .set({
      bumpCount: 0
    })
    .where(sql`${usersTable.id} = ${userId}`);
};
