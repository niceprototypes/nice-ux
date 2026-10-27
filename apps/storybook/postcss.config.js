/**
 * PostCSS config — resolves @niceprototypes/styles' named breakpoint queries in PREVIEW CSS.
 *
 * Vite bundles the Storybook preview and runs this config, so preview-side CSS
 * (`.storybook/preview*.css`, component CSS) can gate media queries by name:
 *
 *   @media (--np--tablet--up) { … }   →   @media (min-width: 641px) { … }
 *
 * `@csstools/postcss-global-data` injects the `@custom-media` definitions from
 * @niceprototypes/styles' generated `breakpoints.custom-media.css` into every processed
 * file, so resolution does NOT depend on Vite's `@import` inlining order (and
 * no file needs to `@import` the aliases itself). postcss-custom-media v10+
 * dropped `importFrom`, making global-data the supported way to share defs.
 *
 * Because the definitions come from the generated file, the pixel floors track
 * `styles/src/tokens/breakpoints.json` — rebuild @niceprototypes/styles to pick up changes.
 *
 * NOTE: this does NOT apply to the Storybook MANAGER (manager.css /
 * manager-sidebar.css). The manager is bundled by Storybook's own esbuild-based
 * builder, which runs no PostCSS — manager CSS uses literal-px media queries.
 */

import { createRequire } from "node:module"
import postcssGlobalData from "@csstools/postcss-global-data"
import postcssCustomMedia from "postcss-custom-media"

const require = createRequire(import.meta.url)

export default {
  plugins: [
    postcssGlobalData({
      files: [require.resolve("@niceprototypes/styles/breakpoints.custom-media.css")],
    }),
    postcssCustomMedia(),
  ],
}