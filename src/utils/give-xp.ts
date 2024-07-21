import { sql, type ExtractTablesWithRelations } from "drizzle-orm";
import { db } from "../db/index";
import { usersTable } from "../db/schema/users-table";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import type { ResultSet } from "@libsql/client";

export const giveXp = async (
  userId: string,
  value: number,
  multiplier: number,
  tx: SQLiteTransaction<
    "async",
    ResultSet,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
): Promise<{ experience: number; level: number; id: string }> => {
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
    experience: experience || 0,
    id,
    level: level || 0
  };
};
