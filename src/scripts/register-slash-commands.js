import { REST, Routes } from "discord.js";
import { env } from "../env.js";
import { $import } from "../lib/$import.js";

import { commands } from "../lib/bootstrap.js";

await $import("src/commands/**/*");

const rest = new REST().setToken(env.TOKEN);

await rest.put(Routes.applicationCommands(env.APPLICATION_ID), {
  body: [...commands.values()].map(({ builder }) => builder.toJSON())
});
