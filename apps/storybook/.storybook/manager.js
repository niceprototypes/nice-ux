// @ts-check
import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import { applyTheme } from "nice-styles"
import { getIconEncoded } from "nice-icons/get-icon-encoded"
import {
  TOGGLE_NAV_EVENT,
  NAV_STATE_EVENT,
  REQUEST_NAV_STATE_EVENT,
  OPEN_IN_EDITOR_EVENT,
  NAV_ACTION_EVENT,
} from "../src/components/Story/StoryNavigation/StoryNavigation.events"
import "./manager.css"

// Seed the initial manager + nice theme from the dark-mode addon's persisted
// choice (its own localStorage key), defaulting to LIGHT — never the OS
// prefers-color-scheme — so Storybook opens light regardless of browser
// settings. The addon takes over once it initializes; see darkMode.current in
// preview.tsx.
const prefersDark = (() => {
  try {
    return JSON.parse(window.localStorage.getItem("sb-addon-themes-3") || "{}").current === "dark"
  } catch {
    return false
  }
})()
const theme = create({
  base: prefersDark ? "dark" : "light",
  brandTitle: "Nice Components",
  brandUrl: "https://niceprototypes.com",
  brandImage: "https://niceprototypes.com/vectors/logo.svg",
  brandTarget: "_self",

  fontBase:
    "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
  fontCode: '"Roboto Mono", "Courier New", serif',
})

addons.setConfig({
  theme,
  // Render top-level sections as collapsible folders instead of always-open
  // roots. Storybook expands only the selected story's ancestors on load, and
  // the default landing story is Basics/Welcome (first in storySort) — so on a
  // fresh load Basics is open and every other section is collapsed.
  sidebar: {
    showRoots: false,
  },
})

const caratIcon = getIconEncoded("carat-right")
const folderClosedIcon = getIconEncoded("folder-closed")
const folderOpenIcon = getIconEncoded("folder-open")
const fileIcon = getIconEncoded("file")

const sidebarGlyphStyle = document.createElement("style")
sidebarGlyphStyle.textContent = `
  [data-nodetype="root"],
  [data-nodetype="group"] {
     > [tabindex] > div:first-child {
      transform: none;

      > svg * {
        display: none;
      }
    }

    /* Folder glyph tracks the node's expansion: aria-expanded="true" on the row
       button shows the open folder, "false" shows the closed one. */
    > [tabindex][aria-expanded="true"] > div:first-child > svg {
      -webkit-mask-image: url("${folderOpenIcon}");
      mask-image: url("${folderOpenIcon}");
    }

    > [tabindex][aria-expanded="false"] > div:first-child > svg {
      -webkit-mask-image: url("${folderClosedIcon}");
      mask-image: url("${folderClosedIcon}");
    }
  }
  
  [data-nodetype="document"] > [tabindex] > div:first-child {
    display: none;
  }
`
document.head.appendChild(sidebarGlyphStyle)

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

// Bridge the preview-side StoryNavigation's sidebar toggle to the manager. The navigation bar
// runs in the preview iframe and can't touch the manager-owned sidebar directly,
// so it drives it over the addons channel.
addons.register("nice/story-navigation", (api) => {
  const channel = addons.getChannel()
  const emitState = () => channel.emit(NAV_STATE_EVENT, api.getIsNavShown())

  channel.on(TOGGLE_NAV_EVENT, () => {
    // Emit the intended next state (getIsNavShown may not reflect the toggle
    // synchronously), so the navigation bar's icon flips deterministically.
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

  // Settings menu — map each preview-side action to the manager api. Mirrors
  // Storybook's built-in gear menu (minus the sidebar toggle, which the bar owns).
  const ACTIONS = {
    "about": () => api.changeSettingsTab("about"),
    "shortcuts": () => api.changeSettingsTab("shortcuts"),
    "toggle-toolbar": () => api.toggleToolbar(),
    "toggle-panel": () => api.togglePanel(),
    "prev-component": () => api.jumpToComponent(-1),
    "next-component": () => api.jumpToComponent(1),
    "prev-story": () => api.jumpToStory(-1),
    "next-story": () => api.jumpToStory(1),
    "collapse-all": () => api.collapseAll(),
  }
  channel.on(NAV_ACTION_EVENT, (action) => ACTIONS[action]?.())
})
