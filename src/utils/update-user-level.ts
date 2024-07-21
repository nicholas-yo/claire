import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import { usersTable } from "../db/schema/users-table";
import { db } from "../db/index";
import type { ResultSet } from "@libsql/client";
import type { ExtractTablesWithRelations } from "drizzle-orm";

export const updateUserLevel = async (
  level: number,
  userId: string,
  tx: SQLiteTransaction<
    "async",
    ResultSet,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
): Promise<void> => {
  await (tx || db)
    .insert(usersTable)
    .values({ id: userId, level })
    .onConflictDoUpdate({
      set: { level },
      target: usersTable.id
    })
    .returning();
};
