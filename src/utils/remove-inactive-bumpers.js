import { env } from "../env.js";
import { getUsers } from "./get-users.js";
import { resetUserBumpCount } from "./reset-user-bump-count.js";

/**
 * @description Remove inactive users with the bumper role based on their last bump activity.
 * @async
 * @param {import('discord.js').Client} client - The Discord client instance.
 * @param {Date | "manual" | "init"} now - The current time or trigger type.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const removeInactiveBumpers = async (client, now) => {
  if (!(now instanceof Date)) return;

  const limit = new Date(now.getTime() - 1000 * 60 * 60 * 24);

  const users = await getUsers();

  for (const user of users) {
    if (!user.lastBumpAt) continue;
    if (new Date(user.lastBumpAt).getTime() >= limit.getTime()) continue;

    const guild = client.guilds.cache.get(env.GUILD_ID);

    if (!guild) continue;

    const member = guild.members.cache.get(user.id);
    const bumperRole = guild.roles.cache.get(env.BUMPER_ROLE_ID);

    if (!member || !bumperRole) continue;

    await member.roles.remove(bumperRole, "inatividade");

    await resetUserBumpCount(member.user.id);
  }
};
