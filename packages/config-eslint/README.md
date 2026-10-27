# nice-config-eslint

Shared ESLint configuration for the `nice-*` ecosystem (React + TypeScript +
Prettier). Split out of the per-package `.eslintrc.cjs` files.

## Usage

In `.eslintrc.cjs`:

```js
module.exports = require("nice-config-eslint")
```

Add the `lint` script and the peer dependencies. ESLint 8 resolves plugins from
the **consumer's** `node_modules`, so the parser/plugins must be installed here
(they're declared as this package's `peerDependencies`):

```json
{
  "scripts": { "lint": "eslint src --ext .ts,.tsx" },
  "prettier": "nice-config-prettier",
  "devDependencies": {
    "nice-config-eslint": "file:../config-eslint",
    "nice-config-prettier": "file:../config-prettier",
    "eslint": "^8.53.0",
    "prettier": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint-config-prettier": "^9.1.2",
    "eslint-plugin-prettier": "^5.5.4",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^4.6.2"
  }
}
```

Pair with [`nice-config-prettier`](https://github.com/niceprototypes/nice-config-prettier)
(`"prettier": "nice-config-prettier"`) so the `prettier/prettier` rule formats
against the shared config.

## What it provides

- `eslint:recommended` + `@typescript-eslint/recommended` + `react` +
  `react-hooks` + `prettier`, with `react/react-in-jsx-scope` off (new JSX
  transform) and relaxed explicit-return-type rules.
- The value is a **single canonical config** — every `nice-react-*` package
  requires the same rules, so they can't drift. The parser/plugins are
  `peerDependencies` the consumer installs (an ESLint 8 constraint: plugins
  resolve from the consuming project, not from a shared config's own tree).
