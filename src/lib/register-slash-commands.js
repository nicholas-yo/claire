import { Client, EmbedBuilder, Events, REST, Routes } from "discord.js";
import { env } from "../env.js";
import { glob } from "glob";
import { globOptions } from "../options/glob.js";
import * as Sentry from "@sentry/node";
import { join } from "path/posix";

/**
 * @typedef Command
 * @property {import("./create-slash-command.js").CommandHandler} handler The handler that executes the command action
 * @property {import("./create-slash-command.js").Builder} builder The builder that defines the command structure
 */

/**
 * @description Registers Discord.js client events.
 * @param {Client} client - The Discord.js client instance.
 */
export const registerSlashCommands = async client => {
  /** @type {Map<string, Command>} */
  const commands = new Map();

  for (const path of await glob("commands/**/*", globOptions)) {
    /** @type {{default: Command}} */
    const { default: command } = await import(join("../", path));

    commands.set(command.builder.name, command);
  }

  const rest = new REST().setToken(env.TOKEN);

  await rest.put(Routes.applicationCommands(env.APPLICATION_ID), {
    body: [...commands.values()].map(({ builder }) => builder.toJSON())
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand() || !interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.handler(interaction);
    } catch (e) {
      console.log(e);

      Sentry.captureException(e);

      const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `😿 Oh não, ocorreu um erro que a gente não esperava. Mas não se preocupe, nós vamos resolver isso! 💖`
        )
        .setTimestamp();

      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });
    }
  });
};
