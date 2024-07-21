import { type ExtractTablesWithRelations, sql } from "drizzle-orm";
import { db } from "../db/index";
import { usersTable } from "../db/schema/users-table";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import type { ResultSet } from "@libsql/client";

export const resetUserBumpCount = async (
  userId: string,
  tx: SQLiteTransaction<
    "async",
    ResultSet,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
): Promise<void> => {
  await (db || tx)
    .update(usersTable)
    .set({
      bumpCount: 0
    })
    .where(sql`${usersTable.id} = ${userId}`);
};
