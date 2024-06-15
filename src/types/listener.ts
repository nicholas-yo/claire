import type { ClientEvents } from "discord.js";

export type Listener = <Event extends keyof ClientEvents>(
  ...args: ClientEvents[Event]
) => void;
