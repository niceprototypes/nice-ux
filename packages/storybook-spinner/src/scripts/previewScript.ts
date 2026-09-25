import { SPINNER_HTML } from "../generated/spinner"
import { DARK_MODE_EVENT, PREVIEW_ID } from "../constants"
import { themeResolverSource } from "./themeResolverSource"
import { toScriptJson } from "./toScriptJson"

/**
 * Preview spinner script, run at document start in the preview iframe (and in
 * iframe.html opened top-level). Mounts `#nsb-preview-spinner` as the first
 * child of <body> as soon as <body> exists; `previewCss` decides when it shows.
 * Its theme is resolved like the boot overlay's and follows storybook-dark-mode's
 * `DARK_MODE` channel event afterwards, so a later navigation never shows a
 * stale theme.
 *
 * @returns Script source (no <script> wrapper)
 */
export function previewScript(): string {
  const config = { id: PREVIEW_ID, html: SPINNER_HTML, darkModeEvent: DARK_MODE_EVENT }
  return `(() => {
  const C = ${toScriptJson(config)}
  ${themeResolverSource}
  const el = document.createElement("div")
  el.id = C.id
  el.setAttribute("data-theme", resolveTheme())
  el.setAttribute("role", "progressbar")
  el.setAttribute("aria-busy", "true")
  el.setAttribute("aria-label", "Loading story")
  el.innerHTML = C.html
  const mount = () => {
    const body = document.body
    if (!body) return false
    if (!el.isConnected) body.insertBefore(el, body.firstChild)
    return true
  }
  if (!mount()) {
    const mo = new MutationObserver(() => { if (mount()) mo.disconnect() })
    mo.observe(document.documentElement, { childList: true })
  }
  const poll = setInterval(() => {
    const ch = window.__STORYBOOK_ADDONS_CHANNEL__
    if (!ch || !ch.on) return
    clearInterval(poll)
    ch.on(C.darkModeEvent, isDark => el.setAttribute("data-theme", isDark ? "night" : "day"))
  }, 5)
})()`
}
