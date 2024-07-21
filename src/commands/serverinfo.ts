import { ChannelType, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { createSlashCommand } from "../lib/create-slash-command";

export default createSlashCommand(async interaction => {
  const userAvatarURL = interaction.client.user.avatarURL() || undefined;

  const title = interaction.guild?.name || null;

  const guildIconURL = interaction.guild?.iconURL() || null;

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setThumbnail(guildIconURL)
    .setColor("Blurple")
    .setFields(
      {
        inline: true,
        name: "👑 Dono",
        value: `<@${interaction.guild?.ownerId}>`
      },
      {
        inline: true,
        name: "💡 Id",
        value: `\`${interaction.guild?.id}\``
      },
      {
        inline: true,
        name: "✨ Membros",
        value: `\`${interaction.guild?.members.cache.size}\``
      },
      {
        inline: true,
        name: "🎈 Cargos",
        value: `\`${interaction.guild?.roles.cache.size}\``
      },
      {
        inline: true,
        name: "📅 Criado em",
        value: `\`${interaction.guild?.createdAt.toLocaleDateString("pt-br", {
          dateStyle: "full"
        })}\``
      },
      {
        inline: true,
        name: "📚 Canais de Texto",
        value: `\`${
          interaction.guild?.channels.cache.filter(
            channel => channel.type === ChannelType.GuildText
          ).size
        }\``
      },
      {
        inline: true,
        name: "🔊 Canais de Voz",
        value: `\`${
          interaction.guild?.channels.cache.filter(
            channel => channel.type === ChannelType.GuildVoice
          ).size
        }\``
      }
    )
    .setFooter({
      iconURL: userAvatarURL,
      text: interaction.client.user.username
    })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}, new SlashCommandBuilder().setName("serverinfo").setDescription("🍒 Mostra informações do servidor.").setDMPermission(false));
