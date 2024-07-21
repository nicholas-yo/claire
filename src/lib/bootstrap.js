import { env } from "../env.js";
import { registerEvents } from "./register-events.js";
import * as Sentry from "@sentry/node";
import { registerSlashCommands } from "./register-slash-commands.js";
import { schedule } from "node-cron";
import { removeInactiveBumpers } from "../utils/remove-inactive-bumpers.js";

/**
 * @description Initializes the Discord bot by registering events, importing commands, logging in, and scheduling tasks.
 * @async
 * @param {import('discord.js').Client} client - The Discord client instance to be initialized.
 * @returns {Promise<void>} - A promise that resolves when the initialization process is complete.
 */
export const bootstrap = async client => {
  try {
    await registerEvents(client);

    await registerSlashCommands(client);

    await client.login(env.TOKEN);

    schedule("0 0 * * *", now => removeInactiveBumpers(now, client));
  } catch (e) {
    console.log(e);

    Sentry.captureException(e);
  }
};
