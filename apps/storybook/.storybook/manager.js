import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import { applyTheme } from "nice-styles"
import {
  TOGGLE_NAV_EVENT,
  NAV_STATE_EVENT,
  REQUEST_NAV_STATE_EVENT,
  OPEN_IN_EDITOR_EVENT,
} from "../src/components/Story/StoryFooter/StoryFooter.events"
import "./manager.css"

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
const theme = create({
  base: prefersDark ? "dark" : "light",
  brandTitle: "Nice Components",
  brandUrl: "https://niceprototypes.com",
  brandImage: "https://niceprototypes.com/vectors/logo-storybook.svg",
  brandTarget: "_self",

  fontBase:
    "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
  fontCode: '"Roboto Mono", "Courier New", serif',
})

addons.setConfig({
  theme,
})

// Mirror storybook-dark-mode into the manager's <html data-theme="night|day"> so
// nice-styles' [data-theme] cascade themes the manager chrome (sidebar/toolbar) —
// the manager-side equivalent of the bridge preview.tsx runs for the canvas.
// nice-styles keys theming on [data-theme], not the addon's body.light/.dark, so
// without this the sidebar's nice tokens never flip on toggle. Seed from the OS
// preference, then follow the toggle over the channel.
const syncTheme = (isDark) => applyTheme(isDark ? "night" : "day")
syncTheme(prefersDark)

addons.register("nice/theme-sync", () => {
  addons.getChannel().on(DARK_MODE_EVENT_NAME, syncTheme)
})

// Bridge the preview-side StoryFooter's sidebar toggle to the manager. The footer
// runs in the preview iframe and can't touch the manager-owned sidebar directly,
// so it drives it over the addons channel.
addons.register("nice/story-footer", (api) => {
  const channel = addons.getChannel()
  const emitState = () => channel.emit(NAV_STATE_EVENT, api.getIsNavShown())

  channel.on(TOGGLE_NAV_EVENT, () => {
    // Emit the intended next state (getIsNavShown may not reflect the toggle
    // synchronously), so the footer's icon flips deterministically.
    const next = !api.getIsNavShown()
    api.toggleNav()
    channel.emit(NAV_STATE_EVENT, next)
  })
  channel.on(REQUEST_NAV_STATE_EVENT, emitState)

  // Open the current story/docs source in the local editor. Only the manager
  // knows the file (importPath); the dev server does the actual opening, so this
  // is a no-op in a static (built) Storybook.
  channel.on(OPEN_IN_EDITOR_EVENT, () => {
    const file = api.getCurrentStoryData()?.importPath
    if (file) api.openInEditor({ file })
  })
})
