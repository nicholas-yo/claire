import { app } from "@azure/functions";
import { client } from "../client.js";
import { env } from "../env.js";
import { resetUserBumpCount } from "../utils/reset-user-bump-count.js";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/users-table.js";
import * as Sentry from "@sentry/node";
// eslint-disable-next-line import/extensions
import { and, lte, gt } from "drizzle-orm/expressions";
import { sql } from "drizzle-orm";

app.timer("RemoveInactiveBumpers", {
  handler: removeInactiveBumpers,
  schedule: "0 0 * * *"
});

/**
 * @type {import("@azure/functions").TimerHandler}
 * @returns {Promise<void>}
 */
export async function removeInactiveBumpers() {
  try {
    const now = new Date();

    const limit = new Date(now.getTime() - 1000 * 60 * 60 * 24);

    await db.transaction(async tx => {
      const users = await tx
        .delete(usersTable)
        .where(
          and(
            lte(
              sql`strftime('%s', ${usersTable.lastBumpAt}) * 1000`,
              limit.getTime()
            ),
            gt(usersTable.bumpCount, 0)
          )
        )
        .returning();

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
}
