import { glob } from "glob";
import { globOptions } from "../options/glob.js";
import { join } from "node:path/posix";
import memoizee from "memoizee";

/**
 * @typedef Event
 * @property {keyof import("discord.js").ClientEvents} name - The name of the event.
 * @property {(...args: unknown[]) => void} listener - The listener function for the event.
 */

export const getEvents = memoizee(async () => {
  /** @type {Set<Event>} */
  const events = new Set();

  for (const path of await glob("events/**/*", globOptions)) {
    /** @type {{default: Event}} */
    const { default: event } = await import(join("../", path));

    events.add(event);
  }

  return events;
});
