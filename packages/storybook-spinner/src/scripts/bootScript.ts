import { SPINNER_HTML } from "../generated/spinner"
import { BOOT_ID, HOLD_QUERY_PARAM, HOLD_STORAGE_KEY } from "../constants"
import { bootCss } from "../styles/bootCss"
import type { ResolvedSpinnerOptions } from "../types"
import { themeResolverSource } from "./themeResolverSource"
import { toScriptJson } from "./toScriptJson"

/**
 * Boot overlay script, run at document start in the manager and in iframe.html
 * when it is opened top-level (inside the manager's iframe it does nothing; the
 * preview spinner covers that document).
 *
 * - Paints a full-viewport spinner, themed synchronously from storybook-dark-mode's store.
 * - Removes it after `storyRendered` / `docsRendered`, then fonts ready (capped
 *   at 1s), then two animation frames; immediately on `storyErrored` /
 *   `storyThrewException` / `storyMissing`; and after `timeout` ms regardless.
 * - Hold: `?nsbHold=` (1/true, 0/false) wins over localStorage
 *   `nice-storybook-spinner:hold` ("true"/"false"), which wins over the preset
 *   `hold` option.
 * - `window.__NSB` is a read-only debug view: `{ theme, hold, removed }`.
 *
 * @param options - Resolved preset options
 * @returns Script source (no <script> wrapper)
 */
export function bootScript(options: ResolvedSpinnerOptions): string {
  const config = {
    id: BOOT_ID,
    css: bootCss,
    html: SPINNER_HTML,
    hold: options.hold,
    timeout: options.timeout,
    holdParam: HOLD_QUERY_PARAM,
    holdKey: HOLD_STORAGE_KEY,
  }
  return `(() => {
  if (window.top !== window) return
  const C = ${toScriptJson(config)}
  ${themeResolverSource}
  const theme = resolveTheme()
  const hold = (() => {
    try {
      const q = new URLSearchParams(location.search).get(C.holdParam)
      if (q === "1" || q === "true") return true
      if (q === "0" || q === "false") return false
      const v = localStorage.getItem(C.holdKey)
      if (v === "true") return true
      if (v === "false") return false
    } catch (e) {}
    return C.hold
  })()
  let removed = ""
  Object.defineProperty(window, "__NSB", {
    configurable: true,
    value: Object.freeze({ theme, hold, get removed() { return removed } }),
  })
  const st = document.createElement("style")
  st.id = C.id + "-css"
  st.textContent = C.css
  const ov = document.createElement("div")
  ov.id = C.id
  ov.setAttribute("data-theme", theme)
  ov.setAttribute("role", "progressbar")
  ov.setAttribute("aria-busy", "true")
  ov.setAttribute("aria-label", "Loading Storybook")
  ov.innerHTML = C.html
  const mount = () => {
    const root = document.documentElement
    if (removed || !root || ov.isConnected) return
    root.appendChild(st)
    root.appendChild(ov)
  }
  mount()
  const mo = new MutationObserver(mount)
  mo.observe(document, { childList: true })
  let poll = 0
  const remove = reason => {
    if (hold || removed) return
    removed = reason
    clearInterval(poll)
    mo.disconnect()
    ov.remove()
    st.remove()
  }
  setTimeout(() => remove("timeout"), C.timeout)
  const onReady = reason => {
    Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1000))])
      .then(() => requestAnimationFrame(() => requestAnimationFrame(() => remove(reason))))
  }
  poll = setInterval(() => {
    const ch = window.__STORYBOOK_ADDONS_CHANNEL__
    if (!ch || !ch.on) return
    clearInterval(poll)
    ch.on("storyRendered", () => onReady("storyRendered"))
    ch.on("docsRendered", () => onReady("docsRendered"))
    for (const n of ["storyErrored", "storyThrewException", "storyMissing"]) ch.on(n, () => remove(n))
  }, 5)
})()`
}
