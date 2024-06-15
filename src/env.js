import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  TOKEN: z.string(),
  TURSO_DATABASE_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string(),
  BUMPER_ROLE_ID: z.string(),
  APPLICATION_ID: z.string(),
  GUILD_ID: z.string(),
  SENTRY_DSN: z.string().url(),
});

export const env = envSchema.parse(process.env);
