/**
 * Channel events bridging the preview-side StoryFooter and the manager-side
 * sidebar toggle registered in `.storybook/manager.js`.
 *
 * StoryFooter renders inside the preview iframe, but Storybook's sidebar (nav) is
 * owned by the manager. So the footer's sidebar toggle crosses the addons channel
 * — the same preview→manager bridge the dark-mode toggle uses:
 *  - preview emits TOGGLE_NAV_EVENT   → manager calls `api.toggleNav()`
 *  - preview emits REQUEST_NAV_STATE  → manager replies with NAV_STATE_EVENT
 *  - manager emits NAV_STATE_EVENT    → preview updates the button's icon
 *
 * "Open in editor" rides the same bridge: the preview can't read the current
 * story's source path, but the manager can, so the footer just signals intent
 * and the manager resolves the path and opens it (dev server only).
 *  - preview emits OPEN_IN_EDITOR_EVENT → manager calls
 *    `api.openInEditor({ file: api.getCurrentStoryData().importPath })`
 */
export const TOGGLE_NAV_EVENT = "nice/story-footer/toggle-nav"
export const NAV_STATE_EVENT = "nice/story-footer/nav-state"
export const REQUEST_NAV_STATE_EVENT = "nice/story-footer/request-nav-state"
export const OPEN_IN_EDITOR_EVENT = "nice/story-footer/open-in-editor"
