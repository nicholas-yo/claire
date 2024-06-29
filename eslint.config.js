import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import noSecrets from "eslint-plugin-no-secrets";
import imprt from "eslint-plugin-import";
import * as drizzle from "eslint-plugin-drizzle";
import editorconfig from "eslint-plugin-editorconfig";
import security from "eslint-plugin-security";
import perfectionist from "eslint-plugin-perfectionist";
import { defineFlatConfig } from "eslint-define-config";

export default defineFlatConfig([
  js.configs.recommended,
  security.configs.recommended,
  jsdoc.configs["flat/recommended"],
  editorconfig.configs.noconflict,
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**/*"],
    languageOptions: { globals: globals.node },
    plugins: {
      drizzle,
      import: imprt,
      jsdoc,
      "no-secrets": noSecrets,
      perfectionist,
      prettier
    },
    rules: {
      "drizzle/enforce-delete-with-where": "error",
      "drizzle/enforce-update-with-where": "error",
      "import/extensions": ["error", "always", { js: "always" }],
      "no-secrets/no-secrets": "error",
      "perfectionist/sort-objects": [
        "error",
        {
          order: "asc",
          type: "natural"
        }
      ],
      "prettier/prettier": "error"
    }
  }
]);
