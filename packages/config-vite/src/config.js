import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { getSourceAliases, viteWatcher } from 'nice-vite-watcher'

const require = createRequire(import.meta.url)
// The package registry (nice-toolkit/registry.json): every nice-* package, its local
// path, and whether it can be aliased to its source.
const registry = require('nice-toolkit/registry')

/** Packages every nice-* package must share a single copy of with the app. */
const SHARED_PACKAGES = ['react', 'react-dom', 'styled-components']

/** The folder holding the linked nice-* packages (the registry's basePath, ~/nice). */
export const getNiceRoot = () => registry.readRegistry().basePath.replace(/^~(?=$|\/)/, os.homedir())

/**
 * Vite settings for an app that consumes nice-* packages through `file:` links. Merge into
 * the app's config with Vite's `mergeConfig`.
 *
 * - One copy of React and styled-components: linked packages resolve their imports from
 *   their real location (~/nice/...), which would load a second copy; aliases pin them to
 *   the app's own copy, and dedupe also keeps one token registry and one icon registry.
 * - Symlinks: resolved to real paths, watched, and served (`fs.allow` covers the app and
 *   ~/nice; setting it replaces Vite's default, so the app is listed too).
 * - Every nice-* package is excluded from pre-bundling, so an added or renamed export in a
 *   foundation package is never hidden by a stale optimizer cache.
 * - `liveLinks`: hot reload from linked packages. Source-aliasable packages are aliased to
 *   their `src/index.ts`; the others' `dist/` folders are watched for rebuilds.
 *
 * @param {{ appRoot: string, liveLinks?: boolean }} options
 *   appRoot: the app's folder, whose node_modules holds the shared copies.
 * @returns {import('vite').UserConfig}
 */
export const createNiceViteConfig = ({ appRoot, liveLinks = false }) => {
  const linkedPackages = registry.getLinkedPackageMap()
  const sourceAliasable = registry.getSourceAliasableNames()

  const sharedAliases = SHARED_PACKAGES.map((name) => ({
    find: new RegExp(`^${name}(?=$|/)`),
    replacement: path.join(appRoot, 'node_modules', name),
  }))

  const liveAliases = liveLinks
    ? Object.entries(getSourceAliases(linkedPackages, sourceAliasable)).map(([find, replacement]) => ({ find, replacement }))
    : []

  // Packages without source aliasing reload when their dist/ is rebuilt.
  const watchedPackages = Object.fromEntries(
    Object.entries(linkedPackages).filter(([name]) => !sourceAliasable.includes(name)),
  )

  return {
    resolve: {
      dedupe: [...SHARED_PACKAGES, 'nice-react-icon', 'nice-styles'],
      preserveSymlinks: false,
      alias: [...sharedAliases, ...liveAliases],
    },
    optimizeDeps: { exclude: registry.getPackageNames() },
    server: {
      watch: { followSymlinks: true },
      fs: { allow: [appRoot, getNiceRoot()] },
    },
    plugins: liveLinks ? [viteWatcher({ packages: watchedPackages, verbose: true })] : [],
  }
}
