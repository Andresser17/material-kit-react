import globals from "globals";

import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    files: [
      "src/*.js",
      "src/*.ts",
      "src/*.jsx",
      "src/*.tsx",
      "src/*.cjs",
      "src/*.mjs",
    ],
    plugins: {
      unusedImports,
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [["src", "./src"]],
          extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
        },
        typescript: {},
      },
    },
    rules: {
      "no-alert": 0,
      camelcase: 0,
      "no-console": 0,
      "no-param-reassign": 0,
      "naming-convention": 0,
      "default-param-last": 0,
      "no-underscore-dangle": 0,
      "no-use-before-define": 0,
      "no-restricted-exports": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "no-promise-executor-return": 0,
      "import/prefer-default-export": 0,
      "jsx-a11y/control-has-associated-label": 0,
      "unusedImports/no-unused-imports": 1,
      "no-unused-vars": [
        1,
        {
          args: "none",
        },
      ],
    },
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: [
      "src/*.js",
      "src/*.ts",
      "src/*.jsx",
      "src/*.tsx",
      "src/*.cjs",
      "src/*.mjs",
    ],
    settings: {
      react: {
        version: "18",
      },
    },
    plugins: {
      react,
    },
    rules: {
      "react/display-name": 0,
      "react/no-children-prop": 0,
      "react/forbid-prop-types": 0,
      "react/react-in-jsx-scope": 0,
      "react/require-default-props": 0,
      "react/jsx-filename-extension": 0,
      "react/jsx-props-no-spreading": 0,
      "react/function-component-definition": 0,
      "react/no-array-index-key": 0,
      "react/jsx-no-useless-fragment": [
        1,
        {
          allowExpressions: true,
        },
      ],
      "react/no-unstable-nested-components": [
        1,
        {
          allowAsProps: true,
        },
      ],
    },
  },
];
