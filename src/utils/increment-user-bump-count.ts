import { sql } from "drizzle-orm";
import { db } from "../db/index";
import { usersTable } from "../db/schema/users-table";

export const incrementUserBumpCount = async (
  userId: string
): Promise<number | null> => {
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
