import type { CommandInteraction } from "discord.js";

export type CommandHandler = (
  interaction: CommandInteraction
) => unknown | Promise<unknown>;
