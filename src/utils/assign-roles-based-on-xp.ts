import { db } from "../db/index";
import { env } from "../env";
import { formatXpRoles } from "./format-xp-roles";
import { giveXp } from "./give-xp";
import { updateUserLevel } from "./update-user-level";
import { EmbedBuilder, Guild, GuildMember, TextChannel } from "discord.js";

export const assignRolesBasedOnXp = async (
  userId: string,
  guild: Guild,
  member: GuildMember,
  value: number,
  multiplier: number
): Promise<void> => {
  await db.transaction(async tx => {
    const user = await giveXp(userId, value, multiplier, tx);

    const xpRoles = formatXpRoles();

    const xpRolesToAdd = xpRoles.filter(
      ({ requiredXp }) => user.experience >= requiredXp
    );

    const ids = xpRolesToAdd.map(({ id }) => id);

    if (!xpRolesToAdd.length) return;

    if (!guild.roles.cache.hasAll(...ids))
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

      const channel = await guild.channels.fetch(env.XP_CHANNEL_ID);

      if (channel instanceof TextChannel) {
        await channel.send({
          content: `${member}`,
          embeds: [embed]
        });
      }
    }
  });
};
