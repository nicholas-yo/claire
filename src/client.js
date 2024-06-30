import { Client } from "discord.js";
import { GatewayIntentBits, Partials } from "discord.js";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Reaction, Partials.GuildMember],
  presence: {
    activities: [
      {
        name: "Bitbunker"
      }
    ],
    status: "online"
  }
});
