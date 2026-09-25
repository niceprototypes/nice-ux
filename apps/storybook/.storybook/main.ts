// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import type { StorybookConfig } from "@storybook/react-vite"
import { join, dirname, resolve } from "path"
import { viteWatcher, getSourceAliases } from "nice-vite-watcher"
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
 * Package lists from the Nice ecosystem registry (nice-toolkit/registry.json).
 * Adding a new package to the registry automatically makes it available here.
 *
 * Imported through the package boundary (`nice-toolkit/registry`) rather
 * than reaching into `toolkit/src/`. Toolkit's package.json `exports`
 * field declares this subpath; internal layout changes there don't break
 * this import.
 */
const registry = require("nice-toolkit/registry")
const linkedPackages: Record<string, string> = registry.getLinkedPackageMap()
const sourceAliasablePackages: string[] = registry.getSourceAliasableNames()
const allNicePackages: string[] = registry.getPackageNames()

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
  viteFinal: async config => {
    config.resolve = config.resolve || {}

    // Dedupe ensures a single instance of these packages across all
    // dependencies. Prevents "multiple React instances" or styled-components
    // context mismatches when Nice packages have their own copies.
    config.resolve.dedupe = [
      ...(config.resolve.dedupe || []),
      "styled-components",
      "react",
      "react-dom",
      "nice-react-icon",
    ]

    // Required for Vite to resolve the real paths of symlinked packages
    config.resolve.preserveSymlinks = false

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Force styled-components to use Storybook's copy (see dedupe above)
      "styled-components": resolve(
        __dirname,
        "../node_modules/styled-components"
      ),
      // Map source-aliasable packages directly to their src/index.ts
      ...getSourceAliases(linkedPackages, sourceAliasablePackages),
    }

    // Enable file watching through symlinks
    config.server = config.server || {}
    config.server.watch = {
      ...config.server.watch,
      followSymlinks: true,
    }

    // Allow Vite to serve files from the workspace root (~/nice) and below.
    // Without this, imports that resolve to files outside storybook/ — e.g.
    // nice-styles/dist/errors.json reached via a symlinked nice-react-styles —
    // get blocked with HTTP 403.
    config.server.fs = config.server.fs || {}
    config.server.fs.allow = [
      ...(config.server.fs.allow || []),
      resolve(__dirname, "../.."),
    ]

    // Exclude every nice-* package — direct or transitive — from Vite's
    // optimizer. Pre-bundling caches a snapshot of exports; when a foundation
    // package (e.g. nice-styles) gains or renames an export, transitive
    // consumers see "module X does not provide export Y" until the cache is
    // wiped. Sourcing the exclude list from the registry means adding a new
    // nice-* package automatically excludes it — no per-consumer drift.
    config.optimizeDeps = config.optimizeDeps || {}
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      ...allNicePackages,
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
      // nice-vite-watcher's types resolve against its own vite ^5 devDependency,
      // so its Plugin type nominally differs from storybook's vite 7 PluginOption.
      // The versions are runtime-compatible (vite-watcher declares `vite >=4.0.0`
      // as a peer), so cast to storybook's plugin element type to bridge the leak.
      viteWatcher({
        packages: packagesToWatch,
        verbose: true,
      }) as NonNullable<typeof config.plugins>[number],
    ]

    return config
  },
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
