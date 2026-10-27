# Build config

Shared tool configs, one package per tool in `packages/config-*`. All private (not published) except `config-vite` and `config-crxjs`. Each package's README documents its options. Shared tool versions: pnpm `catalog:` in `pnpm-workspace.yaml`.

| Package | Exports |
|---|---|
| `@niceprototypes/config-typescript` | `./base`, `./react` (JSON for `extends`) |
| `@niceprototypes/config-rollup` | `createConfiguration()`, `isNiceExternal`, `createExternals` |
| `@niceprototypes/config-jest` | `./react`, `./css-mock` |
| `@niceprototypes/config-exports` | bin `nice-generate-exports` (writes `src/index.ts` from `package.exports.json`), `./schema.json` |
| `@niceprototypes/config-eslint`, `config-prettier` | `.` |
| `@niceprototypes/config-vite` | `createNiceViteConfig` for Vite apps outside nice-ux (options: its README) |
| `@niceprototypes/config-crxjs` | `.` |

## Canonical files (every component package)

```js
// rollup.config.js
import { createConfiguration } from "@niceprototypes/config-rollup"
export default createConfiguration()            // options: { bundlePackages: [...], additionalExternals, input, plugins, dts, clean }
```

```json
// tsconfig.json
{ "extends": "@niceprototypes/config-typescript/react",
  "compilerOptions": { "outDir": "dist", "declarationDir": "dist/types" },
  "include": ["src"], "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"] }
```

```js
// jest.config.js: only when src/ has tests; add "test": "jest" with it
export { default } from "@niceprototypes/config-jest/react"
```

- Rollup externalizes `@niceprototypes/*` (and subpaths), react, react-dom, `react/jsx-runtime`, styled-components and the package's peers. `bundlePackages` inlines a package into the JS and `.d.ts` bundles; it then stays a devDependency. Output: `dist/index.js` (CJS), `dist/index.esm.js`, `dist/index.d.ts`. `clean` prunes files in `dist/` the build did not write.
- tsconfig base: ES2020, ESNext modules, bundler resolution, strict, declarations; `react` adds `jsx: react-jsx`. Do not override these.
- Generator and non-React packages (styles) test with `node:test` through `tsx` (`edit/generators.md` → Tests).
- Never add `prepare` scripts or convenience aliases (`build:watch`, `test:watch`, `lint:fix`).

## Justified exceptions

| Package | Exception | Reason |
|---|---|---|
| icon | custom rollup plugins | SVGR turns the SVG set into React components |
| styles | hand-written `src/index.ts`, bespoke build (`build:tokens`, `build:types`, `build:css`, `build:ts`) | token pipeline (`read/styles/tokens.md`) |

A new deviation needs a row here with its reason; otherwise normalize the package.
