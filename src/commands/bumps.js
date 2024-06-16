import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { command$ } from "../lib/bootstrap.js";
import { getUserBumpCount } from "../utils/get-user-bump-count.js";
import { createBumpMessage } from "../utils/create-bump-message.js";

command$(
  async interaction => {
    const member = interaction.options.get("user", false);
    const user = member?.user || interaction.user;
    const bumpCount = await getUserBumpCount(user.id);

    const message = createBumpMessage(user.id, bumpCount, !!member);

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setDescription(message)
      .setTimestamp();

    const avatarURL = user.avatarURL();

    if (avatarURL) {
      embed.setAuthor({
        iconURL: avatarURL,
        name: user.username
      });
    }

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  },
  new SlashCommandBuilder()
    .setName("bumps")
    .setDescription("🎯 Mostra o contagem de bumps do usuário.")
    .addUserOption(option =>
      option.setName("user").setDescription("🍥 usuário").setRequired(false)
    )
);
