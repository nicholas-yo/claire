import { db } from "../db/index";
import { usersTable } from "../db/schema/users-table";

export const getUsers = async (): Promise<(typeof usersTable.$inferSelect)[]> =>
  await db.select().from(usersTable);
