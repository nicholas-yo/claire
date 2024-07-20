import { Client, EmbedBuilder, Events, REST, Routes } from "discord.js";
import { env } from "../env.js";
import { getSlashCommands } from "./get-slash-commands.js";

/**
 * @description Registers Discord.js client events.
 * @param {Client} client - The Discord.js client instance.
 */
export const registerSlashCommands = async client => {
  const commands = await getSlashCommands();

  const rest = new REST().setToken(env.TOKEN);

  await rest.put(Routes.applicationCommands(env.APPLICATION_ID), {
    body: [...commands.values()].map(({ builder }) => builder.toJSON())
  });
};
