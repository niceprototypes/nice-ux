/** Namespace for the addon's registered manager entries. */
export const ADDON_ID = "nice/storybook-theme"

/** Channel event the manager emits with `isDark` on every theme change. */
export const DARK_MODE_EVENT = "DARK_MODE"

/** Channel event that asks the manager to switch to the other theme. */
export const UPDATE_DARK_MODE_EVENT = "UPDATE_DARK_MODE"

/** localStorage key the theme choice persists under, as `{ "current": "dark" | "light" }`. */
export const THEME_STORAGE_KEY = "sb-addon-themes-3"
