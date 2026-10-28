import type { Plugin, PluginOption, UserConfig } from 'vite'

export type ExtensionConfigOptions = {
  /** The app's folder, whose node_modules holds the shared React and styled-components. */
  appRoot: string
  /** Local mode: the path of a nice-ux checkout (e.g. `~/nice/nice-ux`); every `@niceprototypes/*` import resolves there. Omit to use the npm install. */
  local?: string
  /** The build root; the manifest's entry paths are relative to it. */
  root: string
  /** The built extension (the folder to load unpacked). */
  outDir: string
  /** Dev-server and HMR port; unique per extension so several can run at once. */
  port: number
  /** Page origins allowed to load dev-server assets (content-script hosts). */
  corsOrigins?: RegExp[]
  /** HTML pages the manifest does not reference, built as extra entries. */
  pages?: Record<string, string>
  /** The app's plugins, including CRXJS (`crx({ manifest })`) and e.g. @vitejs/plugin-react. */
  plugins?: PluginOption[]
}

/** Vite plugin: CRXJS fixes for @niceprototypes/* packages (JSON import attributes, side-effect tokens). */
export declare const niceCrxjs: () => Plugin

/** Vite config for a CRXJS Chrome extension consuming @niceprototypes/* packages. */
export declare const createExtensionConfig: (options: ExtensionConfigOptions) => UserConfig
