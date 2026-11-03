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

/** The Storybook API the shared MDX pages import (Meta), answered by this site (src/storybookShims). */
const storybookShims = [
  { find: /^@storybook\/addon-docs\/blocks$/, replacement: resolve(import.meta.dirname, "src/storybookShims/blocks.tsx") },
]

/** An MDX tree node: a markdown link (`url`) or a JSX element (`<a href>`) among the ones walked. */
type MdxNodeType = { type: string; name?: string; url?: string; attributes?: { name?: string; value?: unknown }[]; children?: MdxNodeType[] }

/** Root-relative links (`/?path=/docs/…`, `[…](/docs/…)`, JSX `<a href>` included) under the site's base. */
const remarkBase = (base: string) => () => (tree: MdxNodeType) => {
  const prefixed = (url: string) => (url.startsWith("/") && !url.startsWith("//") ? `${base}${url}` : url)
  const walk = (node: MdxNodeType) => {
    if (node.type === "link" && node.url) node.url = prefixed(node.url)
    if (node.name === "a")
      node.attributes?.forEach(attribute => {
        if (attribute.name === "href" && typeof attribute.value === "string") attribute.value = prefixed(attribute.value)
      })
    node.children?.forEach(walk)
  }
  walk(tree)
}

/** MDX compiled to components, GFM tables as in Storybook; a `?raw` import stays text (the plugin filters on the path alone). */
const mdxPages = (base: string): Plugin => {
  const mdxPlugin = mdx({ remarkPlugins: [remarkGfm, remarkBase(base)] })
  return {
    ...mdxPlugin,
    enforce: "pre",
    transform(code, id) {
      return id.includes("?raw") ? null : mdxPlugin.transform.call(this, code, id)
    },
  }
}

/** Built for niceprototypes.com/ui (the website's public/ui); the dev server stays at the root. */
const baseOf = (command: string) => (command === "build" ? "/ui" : "")

export default defineConfig(({ command }) => ({
  base: `${baseOf(command)}/`,
  // MDX before React, so the compiled pages get React's transform.
  plugins: [mdxPages(baseOf(command)), react({ include: /\.(mdx|tsx?)$/ })],
  resolve: {
    alias: [...sourceAliases, ...storybookShims],
    // One React and one styled-components context for this app and the Storybook modules it reuses.
    dedupe: ["react", "react-dom", "styled-components"],
  },
  // The fonts, favicon and vector assets the Storybook already serves.
  publicDir: resolve(import.meta.dirname, "../storybook/public"),
  server: { port: 6020, strictPort: true },
  preview: { port: 6020, strictPort: true },
}))
