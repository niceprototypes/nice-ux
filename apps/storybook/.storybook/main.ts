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
 * Package lists from the Nice ecosystem registry (nice-toolkit/registry.json).
 * Adding a new package to the registry automatically makes it available here.
 */
const registry = require('../../toolkit/src/registry')
const linkedPackages: Record<string, string> = registry.getLinkedPackageMap()
const sourceAliasablePackages: string[] = registry.getSourceAliasableNames()

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
      'nice-react-icon',
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