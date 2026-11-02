import { existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

/** The monorepo's packages folder. */
const packagesRoot = resolve(import.meta.dirname, "../../packages")

/**
 * Packages that load from their built `dist/`, as in Storybook (`apps/storybook/.storybook/main.ts`):
 * icon and the vendors, whose sources need their generators; the Storybook addons.
 */
const DIST_PACKAGES = /^(icon|icon-vendor|image-vendor|storybook-.*)$/

/**
 * Every other component package resolves to its `src/index.ts`, so edits show without a build;
 * styles' root entry is its React entry, and app's router adapters are subpaths.
 */
const sourceAliases = [
  ...readdirSync(packagesRoot)
    .filter(name => !DIST_PACKAGES.test(name) && name !== "styles" && existsSync(resolve(packagesRoot, name, "src/index.ts")))
    .map(name => ({ find: new RegExp(`^@niceprototypes/${name}$`), replacement: resolve(packagesRoot, name, "src/index.ts") })),
  { find: /^@niceprototypes\/styles$/, replacement: resolve(packagesRoot, "styles/src/react/index.ts") },
  { find: /^@niceprototypes\/app\/adapters\/(.*)$/, replacement: resolve(packagesRoot, "app/src/adapters/$1.tsx") },
]

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: sourceAliases,
    // One React and one styled-components context for this app and the Storybook modules it reuses.
    dedupe: ["react", "react-dom", "styled-components"],
  },
  // The fonts, favicon and vector assets the Storybook already serves.
  publicDir: resolve(import.meta.dirname, "../storybook/public"),
  server: { port: 6020, strictPort: true },
  preview: { port: 6020, strictPort: true },
})
