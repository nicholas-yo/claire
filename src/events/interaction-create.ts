import { EmbedBuilder, Events } from "discord.js";
import { createEvent } from "../lib/create-event";
import { getSlashCommands } from "../lib/get-slash-commands";
import * as Sentry from "@sentry/node";

export default createEvent(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand() || !interaction.isCommand()) return;

  const commands = await getSlashCommands();

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
