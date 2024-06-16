import { $import } from "./$import.js";

/**
 * @description Imports event handlers and registers them to the Discord client.
 * @param {import('discord.js').Client} client - The Discord client instance where events will be registered.
 * @param {import('../types/events').Events} events - An array of event handlers to be registered.
 * @returns {Promise<void>} - A promise that resolves when all events have been registered.
 */
export const registerEvents = async (client, events) => {
  await $import("src/events/**/*");

  for (const event of events) client.on(...event);
};
