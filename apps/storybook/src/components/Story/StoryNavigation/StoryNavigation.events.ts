/**
 * Channel events bridging the preview-side StoryNavigation and the manager-side
 * sidebar toggle registered in `.storybook/manager.js`.
 *
 * StoryNavigation renders inside the preview iframe, but Storybook's sidebar (nav) is
 * owned by the manager. So the navigation bar's sidebar toggle crosses the addons channel
 * — the same preview→manager bridge the dark-mode toggle uses:
 *  - preview emits TOGGLE_NAV_EVENT   → manager calls `api.toggleNav()`
 *  - preview emits REQUEST_NAV_STATE  → manager replies with NAV_STATE_EVENT
 *  - manager emits NAV_STATE_EVENT    → preview updates the button's icon
 *
 * "Open in editor" rides the same bridge: the preview can't read the current
 * story's source path, but the manager can, so the navigation bar just signals intent
 * and the manager resolves the path and opens it (dev server only).
 *  - preview emits OPEN_IN_EDITOR_EVENT → manager calls
 *    `api.openInEditor({ file: api.getCurrentStoryData().importPath })`
 */
export const TOGGLE_NAV_EVENT = "nice/story-navigation/toggle-nav"
export const NAV_STATE_EVENT = "nice/story-navigation/nav-state"
export const REQUEST_NAV_STATE_EVENT = "nice/story-navigation/request-nav-state"
export const OPEN_IN_EDITOR_EVENT = "nice/story-navigation/open-in-editor"

/**
 * The settings menu (a preview-side replica of Storybook's built-in gear menu)
 * rides the same bridge: the preview emits NAV_ACTION_EVENT with an action name,
 * and the manager addon maps it to the matching manager `api` call
 * (toggleToolbar, togglePanel, jumpToStory/Component, collapseAll,
 * changeSettingsTab). See `.storybook/manager.js`.
 */
export const NAV_ACTION_EVENT = "nice/story-navigation/action"

/** Actions the settings menu can dispatch across the channel. */
export type NavAction =
  | "about"
  | "shortcuts"
  | "toggle-toolbar"
  | "toggle-panel"
  | "prev-component"
  | "next-component"
  | "prev-story"
  | "next-story"
  | "collapse-all"
