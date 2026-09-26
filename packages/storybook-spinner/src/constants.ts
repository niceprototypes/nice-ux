/** Namespace of the addon (also its package name in `addons`). */
export const ADDON_ID = "nice-storybook-spinner"

/** Default for the `timeout` preset option: the boot overlay's hard cap, in ms. */
export const DEFAULT_TIMEOUT = 8000

/** localStorage key storybook-dark-mode persists its store under. */
export const THEME_STORAGE_KEY = "sb-addon-themes-3"

/** localStorage key that holds the boot overlay up (`"true"`) or releases it (`"false"`). */
export const HOLD_STORAGE_KEY = "nice-storybook-spinner:hold"

/** URL query parameter that holds the boot overlay up (`1` / `true`) or releases it (`0` / `false`). */
export const HOLD_QUERY_PARAM = "nsbHold"

/** Channel event storybook-dark-mode emits with `isDark` on every theme change. */
export const DARK_MODE_EVENT = "DARK_MODE"

/** Boot overlay element id (manager, and iframe.html viewed top-level). */
export const BOOT_ID = "nsb-boot"

/** Preview spinner element id (inside the preview iframe). */
export const PREVIEW_ID = "nsb-preview-spinner"

/** Spinner shown above the held snapshot during a cross-document View Transition (manager). Also its `view-transition-name`. */
export const SNAPSHOT_ID = "nsb-boot-snapshot"

/** Class on <html> while the previous page's snapshot is held under the spinner. */
export const VT_HOLD_CLASS = "nsb-vt-hold"

/** Class on <html> while the held snapshot cross-fades to the rendered page. */
export const VT_RELEASE_CLASS = "nsb-vt-release"

/** Cross-fade from the held snapshot to the rendered page, in ms. */
export const VT_RELEASE_MS = 180

/** After release, `skipTransition()` is called this many ms later as a safety net. */
export const VT_SKIP_MS = 1000

/** Default for the `viewTransition` preset option. */
export const DEFAULT_VIEW_TRANSITION = true
