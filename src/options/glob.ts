import type { GlobOptionsWithFileTypesUnset } from "glob";

export const globOptions = {
  cwd: "./src",
  dotRelative: true,
  ignore: "node_modules/**/*",
  posix: true
} as const satisfies GlobOptionsWithFileTypesUnset;
