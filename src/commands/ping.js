import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { command$ } from "../lib/bootstrap.js";

command$(async interaction => {
  const ping = Math.round(interaction.client.ws.ping);

  const embed = new EmbedBuilder()
    .setTitle("🏓 Pong!")
    .setColor("Fuchsia")
    .setTimestamp()
    .setDescription(`💓 **${ping}ms**!`);

  const avatarURL = interaction.client.user.avatarURL();

  if (avatarURL) {
    embed.setAuthor({
      name: interaction.client.user.username,
      iconURL: avatarURL
    });
  }

  await interaction.reply({ embeds: [embed] });
}, new SlashCommandBuilder().setName("ping").setDescription("🏓 Mostra a minha latência."));
