/**
 * @typedef {import("discord.js").SlashCommandBuilder | import("discord.js").SlashCommandOptionsOnlyBuilder} Builder
 */

/**
 * @callback CommandHandler
 * @param {import("discord.js").CommandInteraction} interaction
 * @returns {unknown | Promise<unknown>}
 */

/**
 * @description Creates a slash command.
 * @param {CommandHandler} handler - The handler that executes the command action.
 * @param {Builder} builder - The builder that defines the command structure.
 * @returns {{ builder: Builder; handler: CommandHandler; }} - An object containing the command's builder and handler.
 */
export const createSlashCommand = (handler, builder) => ({
  builder,
  handler
});
