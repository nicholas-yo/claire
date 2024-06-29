import { createClient } from "@libsql/client";
// eslint-disable-next-line import/extensions
import { drizzle } from "drizzle-orm/libsql";
import { env } from "../env.js";

const client = createClient({
  authToken: env.TURSO_AUTH_TOKEN,
  url: env.TURSO_DATABASE_URL
});

export const db = drizzle(client);
