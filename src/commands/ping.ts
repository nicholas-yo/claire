import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { createSlashCommand } from "../lib/create-slash-command";

export default createSlashCommand(async interaction => {
  const ping = Math.round(interaction.client.ws.ping);

  const embed = new EmbedBuilder()
    .setTitle("🏓 Pong!")
    .setColor("Fuchsia")
    .setTimestamp()
    .setDescription(`💓 **${ping}ms**!`);

  const avatarURL = interaction.client.user.avatarURL();

  if (avatarURL) {
    embed.setAuthor({
      iconURL: avatarURL,
      name: interaction.client.user.username
    });
  }

  await interaction.reply({ embeds: [embed] });
}, new SlashCommandBuilder().setName("ping").setDescription("🏓 Mostra a minha latência."));
