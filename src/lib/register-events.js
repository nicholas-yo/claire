import { $import } from "./$import.js";

/**
 * @param {import('discord.js').Client} client
 * @param {import('../types/events').Events} events
 * @returns {Promise<void>}
 */
export const registerEvents = async (client, events) => {
  await $import("src/events/**/*");

  for (const event of events) client.on(...event);
};
