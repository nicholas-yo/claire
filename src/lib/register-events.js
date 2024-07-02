import { glob } from "glob";
import { globOptions } from "../options/glob.js";
import { Client } from "discord.js";
import { join } from "path/posix";

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
  /** @type {Set<Event>} */
  const events = new Set();

  for (const path of await glob("events/**/*", globOptions)) {
    /** @type {{default: Event}} */
    const { default: event } = await import(join("../", path));

    events.add(event);
  }

  for (const event of events) {
    client.on(event.name, event.listener);
  }
};
