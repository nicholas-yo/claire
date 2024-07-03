import { Events } from "discord.js";
import * as Sentry from "@sentry/node";
import { assignRolesBasedOnXp } from "../utils/assign-roles-based-on-xp.js";
import { millisecondsToMinutes } from "../lib/milliseconds-to-minutes.js";
import { minutesToMilliseconds } from "../lib/minutes-to-milliseconds.js";
import { createEvent } from "../lib/create-event.js";

/** @type {Map<string, ReturnType<typeof setInterval>>} */
const intervals = new Map();

const ms = /** @type {const} */ minutesToMilliseconds(10);

export default createEvent(
  Events.VoiceStateUpdate,
  async (oldState, newState) => {
    try {
      const newMember = newState.member;
      const oldMember = oldState.member;

      if (!newMember || !oldMember || newMember.user.bot) return;

      if (!oldMember.voice.channelId) {
        clearInterval(intervals.get(oldMember.user.id));

        // eslint-disable-next-line drizzle/enforce-delete-with-where
        return intervals.delete(oldMember.user.id);
      }

      const interval = setInterval(
        async () =>
          await assignRolesBasedOnXp(
            newMember.user.id,
            newState.guild,
            newMember,
            millisecondsToMinutes(ms),
            20.0
          ),
        ms
      );

      intervals.set(newMember.user.id, interval);
    } catch (e) {
      console.log(e);

      Sentry.captureException(e);
    }
  }
);
