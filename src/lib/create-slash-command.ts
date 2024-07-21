import {
  CommandInteraction,
  SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder
} from "discord.js";

export type Builder = SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

export type CommandHandler = (
  interaction: CommandInteraction
) => unknown | Promise<unknown>;

export const createSlashCommand = (
  handler: CommandHandler,
  builder: Builder
): { builder: Builder; handler: CommandHandler } => ({
  builder,
  handler
});
