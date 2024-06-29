import { z } from "zod";
import "dotenv/config.js";

const envSchema = z.object({
  APPLICATION_ID: z.string(),
  BUMPER_ROLE_ID: z.string(),
  GUILD_ID: z.string(),
  SENTRY_DSN: z.string().url(),
  TOKEN: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  TURSO_DATABASE_URL: z.string().url()
});

export const env = envSchema.parse(process.env);
