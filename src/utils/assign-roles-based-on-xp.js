import { db } from "../db/index.js";
import { env } from "../env.js";
import { formatXpRoles } from "./format-xp-roles.js";
import { giveXp } from "./give-xp.js";
import { updateUserLevel } from "./update-user-level.js";
import { EmbedBuilder, Guild, GuildMember, TextChannel } from "discord.js";

/**
 * @description Assigns roles to a Discord guild member based on their XP.
 * @param {string} userId - The ID of the user.
 * @param {Guild} guild - The Discord guild.
 * @param {GuildMember} member - The guild member to assign roles to.
 * @param {number} value - The XP value to add.
 * @param {number} multiplier - The XP multiplier.
 * @returns {Promise<void>} - A promise that resolves when roles are assigned.
 */
export const assignRolesBasedOnXp = async (
  userId,
  guild,
  member,
  value,
  multiplier
) => {
  await db.transaction(async tx => {
    const user = await giveXp(userId, value, multiplier, tx);

    const xpRoles = formatXpRoles();

    const xpRolesToAdd = xpRoles.filter(
      ({ requiredXp }) => user.experience >= requiredXp
    );

    const ids = xpRolesToAdd.map(({ id }) => id);

    if (!xpRolesToAdd.length) return;

    if (!guild.roles.cache.hasAny(...ids))
      throw new Error("The roles were not found on the server");

    await member.roles.add(ids);

    const { level } = xpRolesToAdd[xpRolesToAdd.length - 1];

    if (level > user.level) {
      await updateUserLevel(level, userId, tx);

      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(
          /* md */ `🌟 <@${user.id}> pegou o ***Level ${level}!***`
        );

      const channel = /** @type {TextChannel | undefined} */ (
        await guild.channels.fetch(env.XP_CHANNEL_ID)
      );

      if (!channel) return;

      await channel.send({
        content: `${member}`,
        embeds: [embed]
      });
    }
  });
};
