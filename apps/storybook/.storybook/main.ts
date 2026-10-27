// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import type { StorybookConfig } from "@storybook/react-vite"
import { join, dirname, resolve } from "path"
import { mergeConfig } from "vite"
import { createNiceViteConfig } from "nice-config-vite"
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

/**
 * Storybook Configuration. Linked nice-* packages hot-reload through nice-config-vite's
 * `liveLinks`: source-aliasable packages are aliased to their src/index.ts, the others'
 * dist/ folders are watched (see config-vite/README.md).
 */
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Hidden until ready — excluded from the sidebar, not deleted. The story
    // files stay on disk; remove these negations to re-show Slider / Scroll.
    "!../stories/React/Components/Slider/**",
    "!../stories/React/Components/Scroll/**",
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
    "nice-storybook-navigation",
    "nice-storybook-theme",
    // Preset: the boot overlay (managerHead) and the preview loader replacement (previewHead).
    "nice-storybook-spinner",
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
  // Nice-on-Vite settings (dedupe, shared React/styled-components, symlinks, fs.allow,
  // optimizer exclusions, live reload from linked packages) come from nice-config-vite.
  viteFinal: async config =>
    mergeConfig(config, createNiceViteConfig({ appRoot: resolve(__dirname, ".."), liveLinks: true })),
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
