import type { ClientEvents } from "discord.js";
import type { Listener } from "./listener";

export type Events = Map<keyof ClientEvents, Listener>;
