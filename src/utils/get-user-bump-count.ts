import { sql } from "drizzle-orm";
import { db } from "../db/index";
import { usersTable } from "../db/schema/users-table";

export const getUserBumpCount = async (
  userId: string
): Promise<number | null> => {
  const users = await db
    .select({
      bumpCount: usersTable.bumpCount
    })
    .from(usersTable)
    .where(sql`${usersTable.id} = ${userId}`);

  const user = users?.[0];

  return user?.bumpCount;
};
