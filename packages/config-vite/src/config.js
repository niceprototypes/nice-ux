import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/** Packages every @niceprototypes/* package must share a single copy of with the app. */
const SHARED_PACKAGES = ['react', 'react-dom', 'styled-components']

/** Singletons: one token registry and one icon registry. */
const SINGLETON_PACKAGES = ['@niceprototypes/styles', '@niceprototypes/icon']

/** Expands a leading `~` to the home folder and resolves the path. */
const expandHome = (folder) => path.resolve(folder.replace(/^~(?=$|\/)/, os.homedir()))

/** Names of the publishable packages in a nice-ux checkout (`packages/*`, not private). */
const getLocalPackageNames = (local) => {
  const packagesFolder = path.join(expandHome(local), 'packages')
  return fs
    .readdirSync(packagesFolder)
    .map((folder) => path.join(packagesFolder, folder, 'package.json'))
    .filter((file) => fs.existsSync(file))
    .map((file) => JSON.parse(fs.readFileSync(file, 'utf8')))
    .filter((manifest) => !manifest.private)
    .map((manifest) => manifest.name)
}

/**
 * Vite plugin for local mode: resolves every `@niceprototypes/*` import as if it were
 * imported by the umbrella package (`packages/ux`), whose install holds every package.
 * The import stays a bare module request, so each package's `exports` (subpaths such as
 * `@niceprototypes/styles/tokens.css`) apply, and the result is the package's real folder
 * in the checkout.
 *
 * @param {string} local the nice-ux checkout
 * @returns {import('vite').Plugin}
 */
const niceLocal = (local) => {
  const importer = path.join(expandHome(local), 'packages/ux/package.json')
  return {
    name: '@niceprototypes/config-vite:local',
    enforce: 'pre',
    resolveId(source, _importer, options) {
      if (!source.startsWith('@niceprototypes/')) return null
      return this.resolve(source, importer, { ...options, skipSelf: true })
    },
  }
}

/**
 * Vite settings for an app that consumes @niceprototypes/* packages. Merge into the app's
 * config with Vite's `mergeConfig`.
 *
 * - From npm (default): one copy of React, styled-components and the singleton packages.
 * - `local`: the path of a nice-ux checkout (e.g. `~/nice/nice-ux`). Every
 *   `@niceprototypes/*` import resolves to that checkout instead of `node_modules`, so the
 *   app runs unreleased changes. Packages resolve the way their `package.json` points
 *   (their builds today: rebuild with `pnpm --filter <name> build`). React and
 *   styled-components stay the app's copies, the checkout is served (`fs.allow`), and the
 *   packages are excluded from pre-bundling so a stale optimizer cache never hides a change.
 *   The singletons are not deduped here: dedupe resolves from the app root, which would
 *   bypass the checkout, and each one already has a single folder in it.
 *
 * @param {{ appRoot: string, local?: string }} options
 *   appRoot: the app's folder, whose node_modules holds the shared copies.
 * @returns {import('vite').UserConfig}
 */
export const createNiceViteConfig = ({ appRoot, local }) => {
  if (!local) return { resolve: { dedupe: [...SHARED_PACKAGES, ...SINGLETON_PACKAGES] } }

  return {
    resolve: {
      dedupe: SHARED_PACKAGES,
      alias: SHARED_PACKAGES.map((name) => ({
        find: new RegExp(`^${name}(?=$|/)`),
        replacement: path.join(appRoot, 'node_modules', name),
      })),
    },
    optimizeDeps: { exclude: getLocalPackageNames(local) },
    server: { fs: { allow: [appRoot, expandHome(local)] } },
    plugins: [niceLocal(local)],
  }
}
