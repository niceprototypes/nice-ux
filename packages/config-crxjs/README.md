# @niceprototypes/config-crxjs

Vite + CRXJS configuration for Chrome extensions that consume `nice-*` packages. Builds on
`@niceprototypes/config-vite`. Used by nice-browser (`~/nice/browser/chrome`).

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { crx } from "@crxjs/vite-plugin"
import { createExtensionConfig } from "@niceprototypes/config-crxjs"
import manifest from "./manifest.config"

export default defineConfig(
  createExtensionConfig({
    appRoot: import.meta.dirname,
    root: import.meta.dirname,
    outDir: "dist",
    port: 5174,
    plugins: [react(), crx({ manifest })],
  }),
)
```

The app passes `crx({ manifest })` itself so CRXJS runs from the app's install: in dev it
looks for `@vitejs/plugin-react` there to add React's preamble to content scripts.

## What it adds to @niceprototypes/config-vite

| Part | Why |
|---|---|
| `niceCrxjs()`: inlines relative JSON imports in modules outside the project | In dev, CRXJS copies `file.json?import` from `<root>/@fs/<path>`, which doesn't exist for linked packages (@niceprototypes/styles' `errors.json`: ENOENT) |
| `niceCrxjs()`: `@niceprototypes/styles/tokens.css` (plain import) → empty module | @niceprototypes/styles imports it for its side effect; in a content script CRXJS would attach the tokens to the host page's `:root`. Load tokens as `?raw` text instead |
| `build.modulePreload: false` | Vite's preload helper requests chunks from the host page's origin, breaking on-demand imports in content scripts |
| Dev server: fixed `port` + HMR port, CORS for `chrome-extension://` and `corsOrigins` | Several extensions can run dev servers at once; content scripts on host pages load dev assets |
| `pages` → extra build entries | HTML pages the manifest doesn't reference (offscreen documents, extra windows) |

## Exports

| Export | Purpose |
|---|---|
| `createExtensionConfig({ appRoot, root, outDir, port, corsOrigins?, pages?, plugins? })` | Full Vite config for one extension |
| `niceCrxjs()` | The plugin alone |
