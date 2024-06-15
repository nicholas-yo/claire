import * as Sentry from "@sentry/node";
import { commands, event$ } from "../lib/bootstrap.js";
import { EmbedBuilder, Events } from "discord.js";

event$(Events.InteractionCreate, async (interaction) => {
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
      ephemeral: true,
    });
  }
});
