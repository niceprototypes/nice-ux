import { SPINNER_HTML } from "../generated/spinner"
import {
  BOOT_ID,
  HOLD_QUERY_PARAM,
  HOLD_STORAGE_KEY,
  SNAPSHOT_ID,
  VT_HOLD_CLASS,
  VT_RELEASE_CLASS,
  VT_SKIP_MS,
} from "../constants"
import { bootCss } from "../styles/bootCss"
import { snapshotCss } from "../styles/viewTransitionCss"
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
 * - Snapshot mode (`viewTransition` option on): when `pagereveal` carries a
 *   cross-document View Transition, the opaque overlay is dropped and the
 *   previous page's snapshot is held under a transparent spinner instead
 *   (`viewTransitionCss` does the holding). The browser blocks pointer and
 *   wheel input during the transition but not the keyboard, so keydown / keyup
 *   are blocked (capture phase) until the release. The release cross-fades to the
 *   rendered page, then `skipTransition()` runs as a safety net. Without a View
 *   Transition (first visit, reload, unsupported engine) the overlay stays.
 * - Hold: `?nsbHold=` (1/true, 0/false) wins over localStorage
 *   `@niceprototypes/storybook-spinner:hold` ("true"/"false"), which wins over the preset
 *   `hold` option. It keeps whichever mode is active up.
 * - `window.__NSB` is a read-only debug view: `{ theme, hold, mode, removed }`.
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
    viewTransition: options.viewTransition,
    holdParam: HOLD_QUERY_PARAM,
    holdKey: HOLD_STORAGE_KEY,
    ...(options.viewTransition && {
      snapshotId: SNAPSHOT_ID,
      snapshotCss,
      holdClass: VT_HOLD_CLASS,
      releaseClass: VT_RELEASE_CLASS,
      skipMs: VT_SKIP_MS,
    }),
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
  let mode = "overlay"
  Object.defineProperty(window, "__NSB", {
    configurable: true,
    value: Object.freeze({ theme, hold, get mode() { return mode }, get removed() { return removed } }),
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
  let vt = null
  const keyEvents = ["keydown", "keyup"]
  const blockKey = e => { e.preventDefault(); e.stopImmediatePropagation() }
  const unblockKeys = () => { for (const n of keyEvents) window.removeEventListener(n, blockKey, true) }
  const remove = reason => {
    if (hold || removed) return
    removed = reason
    clearInterval(poll)
    mo.disconnect()
    ov.remove()
    st.remove()
    if (vt) {
      unblockKeys()
      const root = document.documentElement
      root.classList.remove(C.holdClass)
      root.classList.add(C.releaseClass)
      setTimeout(() => { try { vt.skipTransition() } catch (e) {} }, C.skipMs)
    }
  }
  if (C.viewTransition) window.addEventListener("pagereveal", e => {
    if (!e.viewTransition || vt || removed) return
    vt = e.viewTransition
    mode = "snapshot"
    mo.disconnect()
    ov.remove()
    st.remove()
    const root = document.documentElement
    const sst = document.createElement("style")
    sst.id = C.snapshotId + "-css"
    sst.textContent = C.snapshotCss
    const sp = document.createElement("div")
    sp.id = C.snapshotId
    sp.setAttribute("data-theme", theme)
    sp.setAttribute("role", "progressbar")
    sp.setAttribute("aria-busy", "true")
    sp.setAttribute("aria-label", "Loading Storybook")
    sp.innerHTML = C.html
    root.classList.add(C.holdClass)
    root.appendChild(sst)
    root.appendChild(sp)
    for (const n of keyEvents) window.addEventListener(n, blockKey, true)
    const done = () => {
      unblockKeys()
      sp.remove()
      sst.remove()
      root.classList.remove(C.holdClass, C.releaseClass)
    }
    vt.finished.then(done, done)
  })
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
