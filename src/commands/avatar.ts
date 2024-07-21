import { EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { createSlashCommand } from "../lib/create-slash-command";

export default createSlashCommand(
  async interaction => {
    const member = interaction.options.get("user", false) || interaction.member;

    if (!member?.user || !(member.user instanceof User)) return;

    const avatarURL = member.user.displayAvatarURL({ size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle(member.user.username)
      .setColor("Fuchsia")
      .setImage(avatarURL)
      .setTimestamp();

    await interaction.reply({
      content: `<@${member.user.id}>`,
      embeds: [embed]
    });
  },
  new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("✨ Mostra o avatar do usuário.")
    .addUserOption(option =>
      option.setName("user").setDescription("🍥 usuário").setRequired(false)
    )
);
