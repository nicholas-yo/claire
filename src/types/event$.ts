import type { ClientEvents } from "discord.js";

export type Event$ = <Event extends keyof ClientEvents>(
  event: Event,
  listener: (...args: ClientEvents[Event]) => void
) => void;
