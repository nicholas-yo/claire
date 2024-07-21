import { glob } from "glob";
import { globOptions } from "../options/glob";
import { join } from "node:path/posix";
import memoizee from "memoizee";
import type { Event } from "./create-event";

export const getEvents = memoizee(async () => {
  const events = new Set<Event>();

  for (const path of await glob("events/**/*", globOptions)) {
    const { default: event }: { default: Event } = await import(
      join("../", path)
    );

    events.add(event);
  }

  return events;
});
