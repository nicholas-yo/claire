import { Events } from "discord.js";
import { event$ } from "../lib/bootstrap.js";
import { magenta } from "colorette";

event$(Events.ClientReady, client =>
  console.log(`${magenta("start")} ~ Oi, oi! Eu sou a ${client.user.username}!`)
);
