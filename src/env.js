import { z } from "zod";
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "development" ? ".development.env" : ".env"
});

const envSchema = z.object({
  APPLICATION_ID: z.string(),
  BUMPER_ROLE_ID: z.string(),
  EXPERIENCE_ROLES: z.string().transform(arg => arg.split(",")),
  GUILD_ID: z.string(),
  NODE_ENV: z.literal("production").or(z.literal("development")),
  SENTRY_DSN: z.string().url(),
  TOKEN: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  TURSO_DATABASE_URL: z.string().url(),
  XP_CHANNEL_ID: z.string()
});

export const env = envSchema.parse(process.env);
