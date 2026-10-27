# @niceprototypes/config-vite

Shared Vite configuration for apps that consume `nice-*` packages through `file:` links.
Used by `@niceprototypes/storybook` and nice-browser (through `@niceprototypes/config-crxjs`).

## Usage

```js
// vite.config.js
import { defineConfig, mergeConfig } from "vite"
import { createNiceViteConfig } from "@niceprototypes/config-vite"

export default defineConfig(
  mergeConfig(createNiceViteConfig({ appRoot: import.meta.dirname }), {
    // the app's own settings
  }),
)
```

Storybook (`.storybook/main.ts`):

```ts
viteFinal: async (config) =>
  mergeConfig(config, createNiceViteConfig({ appRoot: resolve(__dirname, ".."), liveLinks: true })),
```

## What it sets

| Setting | Why |
|---|---|
| `resolve.alias` for react, react-dom, styled-components → the app's `node_modules` | Linked packages resolve imports from their real location (`~/nice/...`), which would load a second copy |
| `resolve.dedupe`: react, react-dom, styled-components, @niceprototypes/icon, @niceprototypes/styles | One React, one styled-components context, one token registry, one icon registry |
| `resolve.preserveSymlinks: false`, `server.watch.followSymlinks: true` | Resolve and watch linked packages at their real paths |
| `server.fs.allow`: the app and `~/nice` | Serve files from linked packages (setting `allow` replaces Vite's default, so the app is listed too) |
| `optimizeDeps.exclude`: every package in the toolkit registry | A stale optimizer cache would hide added or renamed exports in foundation packages |
| `liveLinks: true` | Source-aliasable packages are aliased to `src/index.ts` (HMR); the others' `dist/` folders are watched by `@niceprototypes/vite-watcher` (full reload) |

## Exports

| Export | Purpose |
|---|---|
| `createNiceViteConfig({ appRoot, liveLinks? })` | The settings above, as a `UserConfig` to merge |
| `getNiceRoot()` | The folder holding the linked packages (the registry's `basePath`, `~/nice`) |

Package lists come from `@niceprototypes/toolkit/registry`, so a newly registered package is covered
without changes here.
