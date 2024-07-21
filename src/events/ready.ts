import { Events } from "discord.js";
import { magenta } from "colorette";
import { createEvent } from "../lib/create-event";

export default createEvent(Events.ClientReady, client =>
  console.log(`${magenta("start")} ~ Oi, oi! Eu sou a ${client.user.username}!`)
);
