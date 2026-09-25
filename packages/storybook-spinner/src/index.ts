/**
 * Public API. The addon's behaviour lives in the preset (`./preset`), which
 * Storybook loads when the package is listed in `addons`. This entry exposes the
 * addon id and the option types for consumers that reference them.
 */
export { ADDON_ID } from "./constants"
export type { SpinnerOptions } from "./types"
