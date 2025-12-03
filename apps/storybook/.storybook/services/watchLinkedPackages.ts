/**
 * @fileoverview Vite plugin for hot-reloading symlinked npm packages in Storybook
 *
 * This service provides HMR (Hot Module Replacement) support for locally linked
 * npm packages in the Nice Prototypes ecosystem. It solves the problem where Vite
 * doesn't automatically detect changes in symlinked package dist folders.
 *
 * ## Problem
 * When using `npm link` or `file:` protocol dependencies, Vite's dev server doesn't
 * watch changes in the linked packages' dist folders. This means changes to linked
 * packages require a full server restart to take effect.
 *
 * ## Solution
 * This plugin:
 * 1. Registers dist folders of linked packages with Vite's file watcher
 * 2. Listens for changes in those dist folders
 * 3. Invalidates the affected modules in Vite's module graph
 * 4. Triggers a browser reload to reflect the changes
 *
 * ## Usage
 * ```typescript
 * // In .storybook/main.ts viteFinal:
 * import { watchLinkedPackages, linkedPackagePaths } from './services/watchLinkedPackages'
 *
 * config.plugins = [
 *   ...(config.plugins || []),
 *   watchLinkedPackages(),
 * ]
 * ```
 *
 * ## How it works with the build pipeline
 * 1. Developer makes changes to a linked package's source files
 * 2. The package's own rollup watcher rebuilds the dist files
 * 3. This plugin detects the dist file changes
 * 4. Vite's module graph is invalidated for affected modules
 * 5. Browser receives a full-reload signal and refreshes with new code
 *
 * ## Note on source aliases
 * For packages that don't require special build transforms (like SVGR for SVGs),
 * you can use source aliases instead, which provides true HMR without full reload.
 * See the `sourceAliases` export for packages that support this.
 *
 * @module watchLinkedPackages
 */

import type { Plugin, ViteDevServer } from "vite"
import { join } from "path"
import { existsSync } from "fs"

/**
 * Base path for all Nice Prototype packages
 */
const NICE_PACKAGES_BASE = "/Users/mohammedibrahim/Code"

/**
 * Registry of all linked packages and their local paths
 *
 * These are the Nice Prototype ecosystem packages that are symlinked
 * for local development. Each key is the npm package name and the
 * value is the absolute path to the local package directory.
 */
export const linkedPackagePaths = {
  "nice-react-flex": `${NICE_PACKAGES_BASE}/nice-react-flex`,
  "nice-react-typography": `${NICE_PACKAGES_BASE}/nice-react-typography`,
  "nice-react-styles": `${NICE_PACKAGES_BASE}/nice-react-styles`,
  "nice-react-icon": `${NICE_PACKAGES_BASE}/nice-react-icon`,
  "nice-react-hook-device-detector": `${NICE_PACKAGES_BASE}/nice-react-hook-device-detector`,
  "nice-styles": `${NICE_PACKAGES_BASE}/nice-styles`,
} as const

/**
 * Type representing valid linked package names
 */
export type LinkedPackageName = keyof typeof linkedPackagePaths

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
export const sourceAliasablePackages: LinkedPackageName[] = [
  "nice-react-flex",
  "nice-react-typography",
  "nice-react-styles",
  "nice-react-hook-device-detector",
]

/**
 * Generates source aliases for packages that support direct source imports
 *
 * @returns Record of package names to their source entry points
 *
 * @example
 * ```typescript
 * config.resolve.alias = {
 *   ...config.resolve.alias,
 *   ...getSourceAliases(),
 * }
 * ```
 */
export function getSourceAliases(): Record<string, string> {
  const aliases: Record<string, string> = {}

  for (const pkgName of sourceAliasablePackages) {
    const pkgPath = linkedPackagePaths[pkgName]
    aliases[pkgName] = join(pkgPath, "src/index.ts")
  }

  return aliases
}

/**
 * Packages that must use dist watching (cannot use source aliases)
 *
 * These packages use build-time transforms that aren't available when
 * importing source directly. For example, nice-react-icon uses @svgr/rollup
 * to transform SVG files into React components.
 */
export const distOnlyPackages: LinkedPackageName[] = [
  "nice-react-icon",
  "nice-styles",
]

/**
 * Registers dist folders with Vite's file watcher
 *
 * @param server - The Vite dev server instance
 */
function registerDistWatchers(server: ViteDevServer): void {
  for (const [, pkgPath] of Object.entries(linkedPackagePaths)) {
    const distPath = join(pkgPath, "dist")
    if (existsSync(distPath)) {
      server.watcher.add(distPath)
    }
  }
}

/**
 * Checks if a file path belongs to a linked package's dist folder
 *
 * @param filePath - The absolute path of the changed file
 * @returns The package name if found, undefined otherwise
 */
function getPackageForDistPath(filePath: string): LinkedPackageName | undefined {
  for (const [pkgName, pkgPath] of Object.entries(linkedPackagePaths)) {
    const distPath = join(pkgPath, "dist")
    if (filePath.startsWith(distPath)) {
      return pkgName as LinkedPackageName
    }
  }
  return undefined
}

/**
 * Invalidates all modules from a specific package in Vite's module graph
 *
 * @param server - The Vite dev server instance
 * @param pkgName - The name of the package to invalidate
 * @param pkgPath - The absolute path to the package
 */
function invalidatePackageModules(
  server: ViteDevServer,
  pkgName: string,
  pkgPath: string
): void {
  const { moduleGraph } = server

  for (const [url, mod] of moduleGraph.urlToModuleMap) {
    if (mod && (url.includes(pkgName) || mod.file?.includes(pkgPath))) {
      moduleGraph.invalidateModule(mod)
    }
  }
}

/**
 * Creates a Vite plugin that watches linked package dist folders for changes
 *
 * This plugin enables hot-reloading for symlinked npm packages by:
 * 1. Adding dist folders to Vite's file watcher
 * 2. Detecting changes in those folders
 * 3. Invalidating affected modules
 * 4. Triggering a browser reload
 *
 * @returns A Vite plugin configuration object
 *
 * @example
 * ```typescript
 * // In viteFinal config:
 * config.plugins = [
 *   ...(config.plugins || []),
 *   watchLinkedPackages(),
 * ]
 * ```
 */
export function watchLinkedPackages(): Plugin {
  return {
    name: "watch-linked-packages",

    configureServer(server) {
      // Register all dist folders with the file watcher
      registerDistWatchers(server)

      // Listen for file changes
      server.watcher.on("change", (filePath) => {
        const pkgName = getPackageForDistPath(filePath)

        if (pkgName) {
          const pkgPath = linkedPackagePaths[pkgName]

          // Invalidate all modules from this package
          invalidatePackageModules(server, pkgName, pkgPath)

          // Trigger full reload since HMR boundaries may not be set up
          // for external package changes
          server.ws.send({ type: "full-reload" })
        }
      })
    },
  }
}

/**
 * List of all linked package names for use in optimizeDeps.exclude
 *
 * Vite pre-bundles dependencies by default. For linked packages, we need
 * to exclude them from pre-bundling so changes are picked up immediately.
 *
 * @example
 * ```typescript
 * config.optimizeDeps.exclude = [
 *   ...(config.optimizeDeps.exclude || []),
 *   ...linkedPackageNames,
 * ]
 * ```
 */
export const linkedPackageNames = Object.keys(linkedPackagePaths) as LinkedPackageName[]