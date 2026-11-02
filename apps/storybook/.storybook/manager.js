// @ts-check
//
// Project-specific manager configuration only. The sidebar tree styling and the
// navigation bar's manager bridge are addons now — see `@niceprototypes/storybook-theme`
// and `@niceprototypes/storybook-navigation` in `main.ts`. What stays here is what belongs
// to this Storybook rather than to either addon: its brand theme and its tab
// title.
import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"
import { getToken, setTokens } from "@niceprototypes/styles"
import { TOKENS } from "@niceprototypes/storybook-theme"
import { BRAND_LOGO } from "./brandLogo"
import "./manager.css"

// The manager document's one setTokens call: the theme's tokens (the sidebar highlight).
setTokens(TOKENS)

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
  brandTitle: BRAND_LOGO,
  brandUrl: "https://niceprototypes.com",
  // null makes Storybook render brandTitle as HTML: the inline logo, themed below.
  brandImage: null,
  brandTarget: "_self",

  fontBase:
    "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
  fontCode: '"Roboto Mono", "Courier New", serif',
})

// The brand wordmark follows the theme: letters in the logo colour, outlined in the
// base background so they keep their weight on either background.
const brandStyle = document.createElement("style")
brandStyle.textContent = `
.nice-brand {
  display: block;
  height: ${getToken("size:small")};
}
.nice-brand-name {
  fill: ${getToken("logo.color:base")};
  stroke: ${getToken("backgroundColor")};
}`
document.head.appendChild(brandStyle)

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

// Prefix the browser tab title with "Nice UI / ". Storybook rewrites
// document.title on every navigation (its "{story} ⋅ Storybook" format has no
// prefix config), so watch the <title> element and re-apply the prefix whenever
// it changes. The startsWith guard makes the observer's own write a no-op, so it
// doesn't loop.
const TITLE_PREFIX = "Nice UI / "
const applyTitlePrefix = () => {
  if (!document.title.startsWith(TITLE_PREFIX)) {
    document.title = `${TITLE_PREFIX}${document.title}`
  }
}
const titleEl = document.querySelector("title")
if (titleEl) new MutationObserver(applyTitlePrefix).observe(titleEl, { childList: true })
applyTitlePrefix()
