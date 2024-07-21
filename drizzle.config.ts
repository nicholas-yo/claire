import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
  dbCredentials: {
    authToken: env.TURSO_AUTH_TOKEN,
    url: env.TURSO_DATABASE_URL
  },
  dialect: "sqlite",
  driver: "turso",
  schema: "./src/db/schema/*",
  strict: true,
  verbose: true
});
