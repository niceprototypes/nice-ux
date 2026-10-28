import { mergeConfig } from 'vite'
import { createNiceViteConfig } from '@niceprototypes/config-vite'
import { niceCrxjs } from './plugin.js'

/**
 * Vite config for a Chrome extension built with CRXJS that consumes @niceprototypes/* packages:
 * @niceprototypes/config-vite's settings and niceCrxjs(). The app adds CRXJS itself (`crx({ manifest })`
 * in `plugins`), so CRXJS runs from the app's install: it looks for @vitejs/plugin-react
 * there to add React's dev preamble to content scripts.
 *
 * - `root`: the build root; the manifest's entry paths are relative to it.
 * - `outDir`: the built extension (the folder to load unpacked).
 * - `port`: dev-server and HMR port, unique per extension so several can run at once.
 * - `corsOrigins`: page origins allowed to load dev-server assets (content-script hosts).
 * - `pages`: HTML pages the manifest does not reference, built as extra entries.
 * - `plugins`: the app's plugins, including CRXJS (and e.g. @vitejs/plugin-react).
 * - `local`: a nice-ux checkout for @niceprototypes/config-vite's local mode.
 *
 * niceCrxjs() comes before config-vite's plugins: in local mode the checkout resolver would
 * otherwise resolve the side-effect `@niceprototypes/styles/tokens.css` before it is emptied.
 *
 * Module preload is off: its helper requests chunks from the host page's origin, which
 * breaks on-demand imports in content scripts.
 *
 * @param {import('./index').ExtensionConfigOptions} options
 * @returns {import('vite').UserConfig}
 */
export const createExtensionConfig = ({ appRoot, local, root, outDir, port, corsOrigins = [], pages, plugins = [] }) =>
  mergeConfig(mergeConfig({ plugins: [niceCrxjs()] }, createNiceViteConfig({ appRoot, local })), {
    root,
    plugins,
    server: {
      port,
      strictPort: true,
      hmr: { port },
      cors: { origin: [/^chrome-extension:\/\//, ...corsOrigins] },
    },
    build: { outDir, emptyOutDir: true, modulePreload: false, rollupOptions: { input: pages } },
  })
