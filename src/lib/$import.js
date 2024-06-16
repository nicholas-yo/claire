import { relative } from "path";
import { glob } from "glob";

/**
 * @description Dynamically imports files based on a given glob pattern.
 * @async
 * @param {string} pattern - The glob pattern used to find files to import.
 * @returns {Promise<void>} - A promise that resolves when all files have been imported.
 */
export const $import = async pattern => {
  for (const commandPath of await glob(pattern)) {
    await import(`../${relative("src/", commandPath)}`);
  }
};
