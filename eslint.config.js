import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier/recommended";
import noSecrets from "eslint-plugin-no-secrets";
import imprt from "eslint-plugin-import";
import * as drizzle from "eslint-plugin-drizzle";
import editorconfig from "eslint-plugin-editorconfig";
import security from "eslint-plugin-security";
import perfectionist from "eslint-plugin-perfectionist";
import { defineFlatConfig } from "eslint-define-config";

export default defineFlatConfig([
  prettier,
  security.configs.recommended,
  jsdoc.configs["flat/recommended"],
  editorconfig.configs.noconflict,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.node,
      parser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: "latest",
        project: "./tsconfig.json"
      }
    },
    plugins: {
      "@typescript-eslint": ts,
      drizzle,
      import: imprt,
      jsdoc,
      "no-secrets": noSecrets,
      perfectionist,
      ts
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
      "drizzle/enforce-delete-with-where": "error",
      "drizzle/enforce-update-with-where": "error",
      "no-secrets/no-secrets": "error",
      "perfectionist/sort-objects": [
        "error",
        {
          order: "asc",
          type: "natural"
        }
      ],
    }
  }
]);
