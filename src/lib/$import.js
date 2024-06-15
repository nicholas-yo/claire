import { relative } from "path";
import { glob } from "glob";

/**
 * @async
 * @param {string} pattern
 * @returns {Promise<void>}
 */
export const $import = async pattern => {
  for (const commandPath of await glob(pattern)) {
    await import(`../${relative("src/", commandPath)}`);
  }
};
