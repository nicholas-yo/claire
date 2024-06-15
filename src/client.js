import { Client } from "discord.js";
import { GatewayIntentBits, Partials } from "discord.js";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [Partials.Reaction, Partials.GuildMember],
  presence: {
    status: "online",
  },
});
