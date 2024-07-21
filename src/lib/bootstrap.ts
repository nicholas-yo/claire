import { env } from "../env";
import { registerEvents } from "./register-events";
import * as Sentry from "@sentry/node";
import { registerSlashCommands } from "./register-slash-commands";
import { schedule } from "node-cron";
import { removeInactiveBumpers } from "../utils/remove-inactive-bumpers";
import { Client } from "discord.js";

export const bootstrap = async (client: Client): Promise<void> => {
  try {
    await registerEvents(client);

    await registerSlashCommands();

    await client.login(env.TOKEN);

    schedule("0 0 * * *", now => removeInactiveBumpers(now, client));
  } catch (e) {
    console.log(e);

    Sentry.captureException(e);
  }
};
