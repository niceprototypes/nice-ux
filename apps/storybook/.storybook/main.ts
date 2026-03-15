// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-vite"
import { join, dirname, resolve } from "path"
import {
  viteWatcher,
  getSourceAliases,
} from "nice-vite-watcher"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

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
  "nice-react-button": `${NICE_PACKAGES_BASE}/nice-react-button`,
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
  "nice-react-button",
]

/**
 * Storybook Configuration
 *
 * This config handles two HMR strategies for linked Nice packages:
 *
 * 1. SOURCE ALIASING (preferred)
 *    Packages in `sourceAliasablePackages` are aliased directly to their
 *    src/index.ts. Changes to source files trigger instant HMR with no
 *    build step required.
 *
 * 2. DIST WATCHING (fallback)
 *    Packages that require build transforms (e.g., nice-react-icon uses SVGR)
 *    cannot be source-aliased. Instead, the symlink watcher monitors their
 *    dist/ folders and triggers a full reload when builds complete.
 *
 * These two strategies are mutually exclusive per package to avoid
 * duplicate invalidations.
 */
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

    // Dedupe ensures a single instance of these packages across all
    // dependencies. Prevents "multiple React instances" or styled-components
    // context mismatches when Nice packages have their own copies.
    config.resolve.dedupe = [
      ...(config.resolve.dedupe || []),
      'styled-components',
      'react',
      'react-dom',
    ]

    // Required for Vite to resolve the real paths of symlinked packages
    config.resolve.preserveSymlinks = false

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Force styled-components to use Storybook's copy (see dedupe above)
      'styled-components': resolve(__dirname, '../node_modules/styled-components'),
      // Map source-aliasable packages directly to their src/index.ts
      ...getSourceAliases(linkedPackages, sourceAliasablePackages),
    }

    // Enable file watching through symlinks
    config.server = config.server || {}
    config.server.watch = {
      ...config.server.watch,
      followSymlinks: true,
    }

    // Exclude linked packages from pre-bundling. Vite's optimizer would
    // otherwise cache stale versions and ignore live changes.
    config.optimizeDeps = config.optimizeDeps || {}
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      ...Object.keys(linkedPackages),
    ]

    // Only watch dist/ for packages that aren't source-aliased.
    // Source-aliased packages already get HMR from their source files.
    const packagesToWatch = Object.fromEntries(
      Object.entries(linkedPackages).filter(
        ([name]) => !sourceAliasablePackages.includes(name)
      )
    )
    config.plugins = [
      ...(config.plugins || []),
      viteWatcher({
        packages: packagesToWatch,
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
      // Filter out props inherited from node_modules (e.g., HTMLAttributes)
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