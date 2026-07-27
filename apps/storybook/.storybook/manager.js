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

const folderClosedIcon = getIconEncoded("folder-closed")
const folderOpenIcon = getIconEncoded("folder-open")
const stepIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMzAuNi4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogMi4xLjQgQnVpbGQgMTA5KSAgLS0+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5zdDAsIC5zdDEgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgc3Ryb2tlOiAjMDAwOwogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgICBzdHJva2Utd2lkdGg6IDEuNXB4OwogICAgICB9CgogICAgICAuc3QxIHsKICAgICAgICBzdHJva2UtbGluZWNhcDogcm91bmQ7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxsaW5lIGNsYXNzPSJzdDAiIHgxPSIxNiIgeTE9IjMyIiB4Mj0iMTYiLz4KICA8bGluZSBjbGFzcz0ic3QxIiB4MT0iMTYiIHkxPSIxNiIgeDI9IjMxIiB5Mj0iMTYiLz4KPC9zdmc+"
const stepEndIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMzAuNi4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogMi4xLjQgQnVpbGQgMTA5KSAgLS0+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5zdDAgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgc3Ryb2tlOiAjMDAwOwogICAgICAgIHN0cm9rZS1saW5lY2FwOiByb3VuZDsKICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdDogMTA7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAxLjVweDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBvbHlsaW5lIGNsYXNzPSJzdDAiIHBvaW50cz0iMTYgMCAxNiAxNiAzMSAxNiIvPgo8L3N2Zz4="

const sidebarGlyphStyle = document.createElement("style")
sidebarGlyphStyle.textContent = `
  [data-nodetype="group"] {
    > [tabindex][aria-expanded="true"] > div:first-child > svg {
      -webkit-mask-image: url("${folderOpenIcon}");
      mask-image: url("${folderOpenIcon}");
    }

    > [tabindex][aria-expanded="false"] > div:first-child > svg {
      -webkit-mask-image: url("${folderClosedIcon}");
      mask-image: url("${folderClosedIcon}");
    }
  }
  
  [data-nodetype="group"] {
    > [tabindex] > div:first-child > div:first-child > svg {
      -webkit-mask-image: url("${stepIcon}");
      mask-image: url("${stepIcon}");
    }

    &:not(:has(+ [data-nodetype="group"])) > [tabindex] > div:first-child > div:first-child > svg {
      -webkit-mask-image: url("${stepEndIcon}");
      mask-image: url("${stepEndIcon}");
    }
  }
  
  [data-nodetype="document"] {
    > [tabindex] > div:first-child > svg {
      -webkit-mask-image: url("${stepIcon}");
      mask-image: url("${stepIcon}");
    }

    &:not(:has(+ [data-nodetype="document"])) > [tabindex] > div:first-child > svg {
      -webkit-mask-image: url("${stepEndIcon}");
      mask-image: url("${stepEndIcon}");
    }
  }
`
document.head.appendChild(sidebarGlyphStyle)

// Tag each sidebar item with its full label path (e.g. data-path="Components/Lightbox/Caption").
// The tree is a flat, depth-first list where each item names its parent via
// data-parent-id; walk that chain up (item-id → element) collecting the visible
// labels. Re-runs whenever the tree re-renders (expand/collapse/navigate); the
// observer watches childList only, so our own attribute writes don't re-trigger it.
const tagSidebarPaths = () => {
  const items = [...document.querySelectorAll(".sidebar-item")]
  const byId = new Map(items.map(el => [el.getAttribute("data-item-id"), el]))

  for (const item of items) {
    let count = 0

    for (let cur = item; cur; cur = byId.get(cur.getAttribute("data-parent-id"))) {
      const hasLabel = !!(cur.firstElementChild?.textContent ?? "").trim()
      if (hasLabel) count += 1
    }

    item.setAttribute("data-path-depth", String(Math.max(0, count)))
  }
}
new MutationObserver(tagSidebarPaths).observe(document.body, { childList: true, subtree: true })
tagSidebarPaths()

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
