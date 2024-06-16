import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { command$ } from "../lib/bootstrap.js";
import { getTopBumpers } from "../utils/get-top-bumpers.js";

command$(async interaction => {
  const topBumpers = await getTopBumpers();

  if (!topBumpers.length) {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(
        "Ainda ninguém deu bump no servidor. Que tal ser o primeiro? 🌼"
      )
      .setTimestamp();

    const avatarURL = interaction.user.avatarURL();

    if (avatarURL) {
      embed.setAuthor({
        iconURL: avatarURL,
        name: interaction.user.username
      });
    }

    return await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }

  const formattedTopBumpers = topBumpers
    .map(
      (user, idx) =>
        /* md */ `**${idx + 1}º** <@${user.id}> deu bump no servidor ${
          user.bumpCount
        } ${idx === 1 ? "vezes" : "vez"}!`
    )
    .join("\n");

  const embed = new EmbedBuilder()
    .setDescription(formattedTopBumpers)
    .setTitle("🏆 Top Bumpers 🏆")
    .setColor("Blurple")
    .setTimestamp();

  await interaction.reply({
    embeds: [embed]
  });
}, new SlashCommandBuilder().setName("topbumpers").setDescription("🏆 Mostra os top bumpers do servidor."));
