import { env } from "../env.js";
import { registerEvents } from "./register-events.js";
import cron from "node-cron";
import * as Sentry from "@sentry/node";
import { $import } from "./$import.js";
import { removeInactiveBumpers } from "../utils/remove-inactive-bumpers.js";

/** @type {import('../types/commands').Commands} */
export const commands = new Map();

/** @type {import('../types/events').Events} */
export const events = new Map();

/**
 * @description Initializes the Discord bot by registering events, importing commands, logging in, and scheduling tasks.
 * @async
 * @param {import('discord.js').Client} client - The Discord client instance to be initialized.
 * @returns {Promise<void>} - A promise that resolves when the initialization process is complete.
 */
export const bootstrap = async client => {
  try {
    await registerEvents(client, events);

    await $import("src/commands/**/*");

    await client.login(env.TOKEN);

    cron.schedule("0 0 * * *", now => removeInactiveBumpers(client, now), {
      name: "remove-role-from-inactive-users",
      timezone: "America/Sao_Paulo",
      recoverMissedExecutions: true
    });
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
