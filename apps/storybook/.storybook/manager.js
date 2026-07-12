import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"
import {
  TOGGLE_NAV_EVENT,
  NAV_STATE_EVENT,
  REQUEST_NAV_STATE_EVENT,
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
})
