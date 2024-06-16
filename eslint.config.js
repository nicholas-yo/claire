import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";

export default [
  prettier,
  js.configs.recommended,
  jsdoc.configs["flat/recommended"],
  {
    ignores: ["node_modules/**/*"],
    files: ["**/*.js"],
    plugins: {
      jsdoc
    },
    languageOptions: { globals: globals.node }
  }
];

