import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { command$ } from "../lib/bootstrap.js";

command$(
  async interaction => {
    const member = interaction.options.get("user", false) || interaction.member;

    if (!member?.user) return;

    // @ts-expect-error
    const avatarURL = member.user.displayAvatarURL({ size: 1024 });

    if (!avatarURL) return;

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
