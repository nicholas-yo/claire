import * as Sentry from "@sentry/node";
import { Client } from "discord.js";
import { db } from "../db";
import { usersTable } from "../db/schema/users-table";
import { resetUserBumpCount } from "./reset-user-bump-count";
import { and, lte, gt } from "drizzle-orm/expressions";
import { sql } from "drizzle-orm";
import { env } from "../env";

export const removeInactiveBumpers = async (
  now: Date | "manual" | "init",
  client: Client
) => {
  try {
    if (!(now instanceof Date)) return;

    const limit = new Date(now.getTime() - 1000 * 60 * 60 * 24);

    await db.transaction(async tx => {
      const users = await tx
        .select()
        .from(usersTable)
        .where(
          and(
            lte(
              sql`strftime('%Y-%m', ${usersTable.lastBumpAt} / 1000, 'unixepoch')`,
              limit.getTime()
            ),
            gt(usersTable.bumpCount, 0)
          )
        );

      const guild = client.guilds.cache.get(env.GUILD_ID);

      if (!guild) throw new Error("No guild found");

      const bumperRole = guild.roles.cache.get(env.BUMPER_ROLE_ID);

      if (!bumperRole) throw new Error("No bumper role found");

      for (const user of users) {
        const member = guild.members.cache.get(user.id);

        if (!member) throw new Error("No member found");

        await member.roles.remove(bumperRole, "inatividade");

        await resetUserBumpCount(member.user.id, tx);
      }
    });
  } catch (e) {
    Sentry.captureException(e);
  }
};
