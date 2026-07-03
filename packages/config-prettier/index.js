/**
 * Shared Prettier configuration for the nice-* ecosystem.
 *
 * Consume via package.json:  "prettier": "nice-config-prettier"
 */
module.exports = {
  arrowParens: "avoid",
  semi: false,
  tabWidth: 2,
  singleQuote: false,
  useTabs: false,
  printWidth: 80,
  bracketSameLine: false,
  trailingComma: "es5",
  bracketSpacing: true,
  jsxSingleQuote: false,
  endOfLine: "lf",
  objectWrap: "preserve",
  singleAttributePerLine: true,
}
