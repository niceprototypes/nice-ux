// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import type { StorybookConfig } from "@storybook/react-vite"
import { join, dirname, resolve } from "path"
import { mergeConfig } from "vite"
import remarkGfm from "remark-gfm"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

/**
 * Resolves the absolute path of a package.
 * Needed for projects using Yarn PnP or monorepo setups.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")))
}

/** The monorepo's packages folder. */
const packagesRoot = resolve(__dirname, "../../../packages")

/**
 * Packages Storybook reads from source: each root import resolves to the package's
 * `src/index.ts`, so edits show without a build. The others (icon, the vendors and the
 * Storybook addons) resolve to their built `dist/`. styles' root entry is its React entry.
 */
const SOURCE_PACKAGES = [
  "button", "calendar", "checkbox", "code", "dialog", "field", "flex", "form", "head",
  "image", "ink", "input", "lightbox", "line", "list", "logo", "popover", "scroll",
  "select", "slider", "tabs", "tile", "toggle", "tooltip",
]

const sourceAliases = [
  ...SOURCE_PACKAGES.map(name => ({
    find: new RegExp(`^@niceprototypes/${name}$`),
    replacement: resolve(packagesRoot, name, "src/index.ts"),
  })),
  { find: /^@niceprototypes\/styles$/, replacement: resolve(packagesRoot, "styles/src/react/index.ts") },
]

/**
 * Storybook Configuration.
 */
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Hidden until ready — excluded from the sidebar, not deleted. The story
    // files stay on disk; remove these negations to re-show Slider / Scroll.
    "!../stories/Components/Slider/**",
    "!../stories/Components/Scroll/**",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    {
      name: getAbsolutePath("@storybook/addon-docs"),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "storybook-dark-mode",
    // Both load their own manager (and, for navigation, preview) entries.
    "@niceprototypes/storybook-navigation",
    "@niceprototypes/storybook-theme",
    // Preset: the boot overlay (managerHead) and the preview loader replacement (previewHead).
    "@niceprototypes/storybook-spinner",
  ],
  staticDirs: ["../public"],
  core: {
    // Suppress the "Learn what's new in Storybook" toast on every launch.
    disableWhatsNewNotifications: true,
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {},
  // One copy of React, styled-components and the token and icon registries; package
  // source through the aliases above.
  viteFinal: async config =>
    mergeConfig(config, {
      resolve: {
        dedupe: ["react", "react-dom", "styled-components", "@niceprototypes/styles", "@niceprototypes/icon"],
        alias: sourceAliases,
      },
    }),
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // Filter out props inherited from node_modules (e.g., HTMLAttributes)
      propFilter: prop => {
        if (prop.parent) {
          return !prop.parent.fileName.includes("node_modules")
        }
        return true
      },
    },
  },
}

export default config
