import type { CommandHandler } from "./command-handler";
import type { Builder } from "./builder";

export type Commands = Map<
  string,
  {
    handler: CommandHandler;
    builder: Builder;
  }
>;
