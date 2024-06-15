import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.js";

export default defineConfig({
  schema: "./src/db/schema/*",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
});
