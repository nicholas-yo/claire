import { Client } from "discord.js";
import { getEvents } from "./get-events.js";

/**
 * @typedef Event
 * @property {keyof import("discord.js").ClientEvents} name - The name of the event.
 * @property {(...args: unknown[]) => void} listener - The listener function for the event.
 */

/**
 * @description Registers Discord.js client events.
 * @param {Client} client - The Discord.js client instance.
 */
export const registerEvents = async client => {
  const events = await getEvents();

  for (const event of events) client.on(event.name, event.listener);
};
