import { REST, Routes } from "discord.js";
import { env } from "../env";
import { getSlashCommands } from "./get-slash-commands";

export const registerSlashCommands = async () => {
  const commands = await getSlashCommands();

  const rest = new REST().setToken(env.TOKEN);

  await rest.put(Routes.applicationCommands(env.APPLICATION_ID), {
    body: [...commands.values()].map(({ builder }) => builder.toJSON())
  });
};
