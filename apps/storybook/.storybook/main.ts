import type { StorybookConfig } from "@storybook/react-vite"
import { join, dirname, resolve } from "path"
import {
  symlinkWatcher,
  getSourceAliases,
} from "nice-vite-symlink-watcher"

/**
 * Resolves the absolute path of a package.
 * Needed for projects using Yarn PnP or monorepo setups.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")))
}

/**
 * Base path for all Nice Prototype packages
 */
const NICE_PACKAGES_BASE = "/Users/mohammedibrahim/Code"

/**
 * Registry of all linked packages and their local paths
 */
const linkedPackages = {
  "nice-react-flex": `${NICE_PACKAGES_BASE}/nice-react-flex`,
  "nice-react-typography": `${NICE_PACKAGES_BASE}/nice-react-typography`,
  "nice-react-styles": `${NICE_PACKAGES_BASE}/nice-react-styles`,
  "nice-react-icon": `${NICE_PACKAGES_BASE}/nice-react-icon`,
  "nice-react-device-detector": `${NICE_PACKAGES_BASE}/nice-react-device-detector`,
  "nice-styles": `${NICE_PACKAGES_BASE}/nice-styles`,
}

/**
 * Packages that can use source aliases for true HMR
 *
 * These packages don't use special build transforms (like SVGR) and can
 * be aliased directly to their source files. This provides faster HMR
 * compared to watching dist folders.
 *
 * Packages NOT in this list (like nice-react-icon) must go through their
 * build pipeline because they use transforms that aren't available in
 * Storybook's Vite config.
 */
const sourceAliasablePackages = [
  "nice-react-flex",
  "nice-react-typography",
  "nice-react-styles",
  "nice-react-device-detector",
]

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs")
  ],
  staticDirs: ['../public'],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {},
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.dedupe = [
      ...(config.resolve.dedupe || []),
      'styled-components',
      'react',
      'react-dom',
    ]
    config.resolve.preserveSymlinks = false
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'styled-components': resolve(__dirname, '../node_modules/styled-components'),
      ...getSourceAliases(linkedPackages, sourceAliasablePackages),
    }
    config.server = config.server || {}
    config.server.watch = {
      ...config.server.watch,
      followSymlinks: true,
    }
    config.optimizeDeps = config.optimizeDeps || {}
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      ...Object.keys(linkedPackages),
      'nice-react-button',
    ]
    config.plugins = [
      ...(config.plugins || []),
      symlinkWatcher({
        packages: linkedPackages,
        verbose: true,
      }),
    ]
    return config
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes("node_modules")
        }
        return true
      },
    },
  },
}

export default config