import type { UserConfig } from 'vite'

export type NiceViteConfigOptions = {
  /** The app's folder, whose node_modules holds the shared React and styled-components. */
  appRoot: string
  /** Local mode: the path of a nice-ux checkout (e.g. `~/nice/nice-ux`); every `@niceprototypes/*` import resolves there. Omit to use the npm install. */
  local?: string
}

/** Vite settings for an app consuming @niceprototypes/* packages; merge with `mergeConfig`. */
export declare const createNiceViteConfig: (options: NiceViteConfigOptions) => UserConfig
