import { desc } from "drizzle-orm/expressions";
import { db } from "../db/index";
import { usersTable } from "../db/schema/users-table";
import { sql } from "drizzle-orm";

export const getTopBumpers = async (): Promise<
  Pick<typeof usersTable.$inferSelect, "id" | "bumpCount">[]
> =>
  await db
    .select({
      bumpCount: usersTable.bumpCount,
      id: usersTable.id
    })
    .from(usersTable)
    .where(sql`${usersTable.bumpCount} > 0`)
    .orderBy(desc(usersTable.bumpCount));
