/**
 * Shared ESLint configuration for the nice-* ecosystem (React + TypeScript +
 * Prettier).
 *
 * Consume via .eslintrc.cjs:  module.exports = require("@niceprototypes/config-eslint")
 *
 * The parser and plugins are declared as this package's peerDependencies so
 * npm installs them into the CONSUMER's node_modules — the only place ESLint 8
 * resolves plugins from. The consumer lists just @niceprototypes/config-eslint (plus the
 * eslint / prettier it runs); the plugins come in automatically as peers.
 */
module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  settings: { react: { version: "detect" } },
}
