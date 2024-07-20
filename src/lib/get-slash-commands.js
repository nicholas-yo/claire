import { glob } from "glob";
import { globOptions } from "../options/glob.js";
import { join } from "node:path/posix";
import memoizee from "memoizee";

/**
 * @typedef Command
 * @property {import("./create-slash-command.js").CommandHandler} handler The handler that executes the command action
 * @property {import("./create-slash-command.js").Builder} builder The builder that defines the command structure
 */

export const getSlashCommands = memoizee(async () => {
  /** @type {Map<string, Command>} */
  const commands = new Map();

  for (const path of await glob("commands/**/*", globOptions)) {
    /** @type {{default: Command}} */
    const { default: command } = await import(join("../", path));

    commands.set(command.builder.name, command);
  }

  return commands;
});
