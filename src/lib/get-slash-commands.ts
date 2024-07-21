import { glob } from "glob";
import { globOptions } from "../options/glob";
import { join } from "node:path/posix";
import memoizee from "memoizee";
import type { Builder, CommandHandler } from "./create-slash-command";

type Command = {
  handler: CommandHandler;
  builder: Builder;
};

export const getSlashCommands = memoizee(async () => {
  const commands = new Map<string, Command>();

  for (const path of await glob("commands/**/*", globOptions)) {
    const { default: command }: { default: Command } = await import(
      join("../", path)
    );

    commands.set(command.builder.name, command);
  }

  return commands;
});
