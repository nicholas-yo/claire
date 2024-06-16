import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";

/**
 * @description Retrieves all users from the database.
 * @async
 * @returns {Promise<typeof usersTable.$inferSelect[]>} A promise that resolves to an array of user records.
 */
export const getUsers = async () => await db.select().from(usersTable);
