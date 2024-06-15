import { env } from "../env.js";
import { registerEvents } from "./register-events.js";
import { getUsers } from "../utils/get-users.js";
import { resetUserBumpCount } from "../utils/reset-user-bump-count.js";
import cron from "node-cron";
import * as Sentry from "@sentry/node";
import { $import } from "./$import.js";

/** @type {import('../types/commands').Commands} */
export const commands = new Map();

/** @type {import('../types/events').Events} */
export const events = new Map();

/**
 * @async
 * @param {import('discord.js').Client} client
 * @returns {Promise<void>}
 */
export const bootstrap = async (client) => {
  try {
    await registerEvents(client, events);

    await $import("src/commands/**/*");

    await client.login(env.TOKEN);

    const checkInId = Sentry.captureCheckIn({
      monitorSlug: "remove-role-from-inactive-users",
      status: "in_progress",
    });

    cron.schedule(
      "0 0 * * *",
      async (now) => {
        try {
          if (!(now instanceof Date)) return;

          const limit = new Date(now.getTime() - 1000 * 60 * 60 * 24);

          const users = await getUsers();

          for (const user of users) {
            if (!user.lastBumpAt) continue;
            if (new Date(user.lastBumpAt).getTime() >= limit.getTime())
              continue;

            const guild = client.guilds.cache.get(env.GUILD_ID);

            if (!guild) continue;

            const member = guild.members.cache.get(user.id);
            const bumperRole = guild.roles.cache.get(env.BUMPER_ROLE_ID);

            if (!member || !bumperRole) continue;

            await member.roles.remove(bumperRole, "inatividade");

            await resetUserBumpCount(member.user.id);
          }

          Sentry.captureCheckIn({
            checkInId,
            monitorSlug: "remove-role-from-inactive-users",
            status: "ok",
          });
        } catch (e) {
          Sentry.captureException(e);

          Sentry.captureCheckIn({
            checkInId,
            monitorSlug: "remove-role-from-inactive-users",
            status: "error",
          });
        }
      },
      {
        name: "remove-role-from-inactive-users",
        timezone: "America/Sao_Paulo",
        recoverMissedExecutions: true,
      }
    );
  } catch (e) {
    Sentry.captureException(e);
  }
};

/** @type {import('../types/command$').Command$} */
export const command$ = (handler, builder) => {
  commands.set(builder.name, { handler, builder });
};

/** @type {import('../types/event$').Event$} */
export const event$ = (event, listener) => {
  events.set(
    event,
    // @ts-expect-error
    listener
  );
};
