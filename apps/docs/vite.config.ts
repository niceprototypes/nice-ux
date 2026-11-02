import { existsSync, readdirSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import mdx from "@mdx-js/rollup"
import remarkGfm from "remark-gfm"

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

/** The Storybook APIs the reused MDX pages import, answered by this site (src/storybookShims). */
const storybookShims = [
  { find: /^@storybook\/addon-docs\/blocks$/, replacement: resolve(import.meta.dirname, "src/storybookShims/blocks.tsx") },
  { find: /^@storybook\/addon-links$/, replacement: resolve(import.meta.dirname, "src/storybookShims/links.ts") },
]

/** MDX compiled to components, GFM tables as in Storybook; a `?raw` import stays text (the plugin filters on the path alone). */
const mdxPlugin = mdx({ remarkPlugins: [remarkGfm] })
const mdxPages: Plugin = {
  ...mdxPlugin,
  enforce: "pre",
  transform(code, id) {
    return id.includes("?raw") ? null : mdxPlugin.transform.call(this, code, id)
  },
}

export default defineConfig({
  // MDX before React, so the compiled pages get React's transform.
  plugins: [mdxPages, react({ include: /\.(mdx|tsx?)$/ })],
  resolve: {
    alias: [...sourceAliases, ...storybookShims],
    // One React and one styled-components context for this app and the Storybook modules it reuses.
    dedupe: ["react", "react-dom", "styled-components"],
  },
  // The fonts, favicon and vector assets the Storybook already serves.
  publicDir: resolve(import.meta.dirname, "../storybook/public"),
  server: { port: 6020, strictPort: true },
  preview: { port: 6020, strictPort: true },
})
