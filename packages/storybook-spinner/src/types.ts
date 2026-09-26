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
  /**
   * Hold the previous page's snapshot under the spinner during same-origin
   * navigations of the manager, via cross-document View Transitions (the opaque
   * overlay remains the fallback where they do not run). `false` keeps only the
   * opaque overlay. Default: `DEFAULT_VIEW_TRANSITION` (`true`).
   */
  viewTransition?: boolean
}

/** Options after defaults and validation. */
export interface ResolvedSpinnerOptions {
  hold: boolean
  timeout: number
  viewTransition: boolean
}
