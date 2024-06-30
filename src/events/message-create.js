import { Events } from "discord.js";
import { event$ } from "../lib/bootstrap.js";
import { incrementUserBumpCount } from "../utils/increment-user-bump-count.js";
import { env } from "../env.js";
import * as Sentry from "@sentry/node";
import { assignRolesBasedOnXp } from "../utils/assign-roles-based-on-xp.js";

event$(Events.MessageCreate, async message => {
  try {
    const member = message.member;

    const guild = message.guild;

    if (!member || !guild) return;

    await assignRolesBasedOnXp(
      member.user.id,
      guild,
      member,
      message.content.length,
      0.2
    );

    if (message.interaction?.commandName === "bump") {
      await message.react("💝");

      const bumpCount = await incrementUserBumpCount(
        message.interaction.user.id
      );

      const hasBumperRole = member.roles.cache.has(env.BUMPER_ROLE_ID);

      if (bumpCount && bumpCount === 3 && !hasBumperRole) {
        const bumperRole = message.guild.roles.cache.get(env.BUMPER_ROLE_ID);

        if (!bumperRole) return;

        await member.roles.add(bumperRole);
      }
    }
  } catch (e) {
    console.log(e);

    Sentry.captureException(e);
  }
});
