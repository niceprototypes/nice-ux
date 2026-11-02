/**
 * Public API. The addon's behavior lives in the manager entry (sidebar), which
 * Storybook loads from the `./manager` subpath when the package is listed in
 * `addons`. Its tokens are registered by the consumer: spread `TOKENS` into the
 * app's one `setTokens` call in the preview and in the manager.
 */
export { ADDON_ID, DARK_MODE_EVENT, THEME_STORAGE_KEY, UPDATE_DARK_MODE_EVENT } from "./constants"
export { contentMaxWidth, TOKENS } from "./tokens"
