import type { Builder } from "./builder";
import type { CommandHandler } from "./command-handler";

export type Command$ = (handler: CommandHandler, builder: Builder) => void;
