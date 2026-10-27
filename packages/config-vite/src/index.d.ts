import type { UserConfig } from 'vite'

export type NiceViteConfigOptions = {
  /** The app's folder, whose node_modules holds the shared React and styled-components. */
  appRoot: string
  /** Hot reload from linked nice-* packages (source aliases + dist watching). */
  liveLinks?: boolean
}

/** Vite settings for an app consuming linked nice-* packages; merge with `mergeConfig`. */
export declare const createNiceViteConfig: (options: NiceViteConfigOptions) => UserConfig

/** The folder holding the linked nice-* packages (~/nice). */
export declare const getNiceRoot: () => string
