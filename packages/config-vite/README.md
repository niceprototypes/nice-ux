# @niceprototypes/config-vite

Shared Vite configuration for apps that consume `@niceprototypes/*` packages, from npm or, in
local mode, from a nice-ux checkout. Used by nice-browser through `@niceprototypes/config-crxjs`.

## Usage

```js
// vite.config.js
import { defineConfig, mergeConfig } from "vite"
import { createNiceViteConfig } from "@niceprototypes/config-vite"

export default defineConfig(
  mergeConfig(createNiceViteConfig({ appRoot: import.meta.dirname, local: process.env.NICE_LOCAL }), {
    // the app's own settings
  }),
)
```

`NICE_LOCAL=~/nice/nice-ux npm run dev` runs the app against the checkout; without it the app uses its npm install.

## What it sets

| Setting | Mode | Why |
|---|---|---|
| `resolve.dedupe`: react, react-dom, styled-components | both | One React, one styled-components context |
| `resolve.dedupe`: @niceprototypes/styles, @niceprototypes/icon | npm | One token registry, one icon registry (in local mode each already has one folder, and dedupe would resolve them from the app instead of the checkout) |
| Plugin resolving `@niceprototypes/*` from `<local>/packages/ux` | local | The umbrella's install holds every package; the import stays a bare module request, so package `exports` and subpaths apply |
| `resolve.alias` for react, react-dom, styled-components → the app's `node_modules` | local | Checkout packages resolve imports from their real folder, which would load a second copy |
| `server.fs.allow`: the app and the checkout | local | Serve files from the checkout (setting `allow` replaces Vite's default, so the app is listed too) |
| `optimizeDeps.exclude`: the checkout's publishable packages | local | A stale optimizer cache would hide changes in the checkout |

Local packages load the way their `package.json` points (their `dist/` builds today); rebuild a changed package with `pnpm --filter <name> build` in the checkout.

## Exports

| Export | Purpose |
|---|---|
| `createNiceViteConfig({ appRoot, local? })` | The settings above, as a `UserConfig` to merge |
