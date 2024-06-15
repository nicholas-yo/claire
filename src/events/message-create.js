import { Events } from "discord.js";
import { event$ } from "../lib/bootstrap.js";
import { incrementUserBumpCount } from "../utils/increment-user-bump-count.js";
import { env } from "../env.js";
import * as Sentry from "@sentry/node";

event$(Events.MessageCreate, async (message) => {
  try {
    if (message.interaction?.commandName !== "bump") return;

    if (!message.member || !message.guild) return;

    await message.react("💝");

    const bumpCount = await incrementUserBumpCount(message.interaction.user.id);

    const hasBumperRole = message.member.roles.cache.has(env.BUMPER_ROLE_ID);

    if (bumpCount && bumpCount === 3 && !hasBumperRole) {
      const bumperRole = message.guild.roles.cache.get(env.BUMPER_ROLE_ID);

      if (!bumperRole) return;

      await message.member.roles.add(bumperRole);
    }
  } catch (e) {
    console.log(e);

    Sentry.captureException(e);
  }
});
