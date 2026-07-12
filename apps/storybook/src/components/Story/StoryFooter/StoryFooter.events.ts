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
 */
export const TOGGLE_NAV_EVENT = "nice/story-footer/toggle-nav"
export const NAV_STATE_EVENT = "nice/story-footer/nav-state"
export const REQUEST_NAV_STATE_EVENT = "nice/story-footer/request-nav-state"
