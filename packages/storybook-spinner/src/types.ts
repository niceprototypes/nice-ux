/** Options accepted by the preset: `{ name: "nice-storybook-spinner", options: { … } }`. */
export interface SpinnerOptions {
  /**
   * Keep the boot overlay up for good (for styling it). Overridden by the
   * `?nsbHold=` query parameter and the `nice-storybook-spinner:hold`
   * localStorage key. Default `false`.
   */
  hold?: boolean
  /** Remove the boot overlay after this many ms whatever the readiness signals say. Default `8000`. */
  timeout?: number
}

/** Options after defaults and validation. */
export interface ResolvedSpinnerOptions {
  hold: boolean
  timeout: number
}
