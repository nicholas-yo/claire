import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @async
 * @returns {Promise<typeof usersTable.$inferSelect[]>}
 */
export const getUsers = async () => await db.select().from(usersTable);
