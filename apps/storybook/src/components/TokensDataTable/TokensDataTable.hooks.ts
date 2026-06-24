import * as React from "react"
import { HIGHLIGHT_KEY } from "../../services"

/**
 * The active Nice theme, read from `<html data-theme>` — Storybook's dark-mode
 * addon is mirrored there in `.storybook/preview.tsx`. A MutationObserver
 * re-renders on toggle; reading the attribute is more reliable inside the Docs
 * iframe than the addon's own hook.
 */
export function useNiceTheme(): "day" | "night" {
  const read = (): "day" | "night" =>
    typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "night"
      ? "night"
      : "day"
  const [theme, setTheme] = React.useState<"day" | "night">(read)
  React.useEffect(() => {
    const update = () => setTheme(read())
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => observer.disconnect()
  }, [])
  return theme
}

/** The deep-link highlight target a `parseTokenVarLink` click stashed. */
export interface HighlightedToken {
  group: string
  variant: string
}

/**
 * Reads the deep-link highlight target a `parseTokenVarLink` link stashed in
 * sessionStorage, as `{ group, variant }`, then clears it — so the highlight
 * fires exactly once on arrival. Unlike the old per-group hook this returns the
 * whole token, so an aggregated set can highlight the matching row in whichever
 * sub-table owns the group. The URL param is deliberately NOT read: Storybook
 * keeps query params across `navigate()` calls, so a stale `np-token` would
 * stick and re-highlight an unrelated row later.
 */
export function useHighlightedToken(): HighlightedToken | null {
  const [token, setToken] = React.useState<HighlightedToken | null>(null)
  React.useEffect(() => {
    if (typeof window === "undefined") return
    let raw: string | null = null
    try {
      raw = sessionStorage.getItem(HIGHLIGHT_KEY)
      sessionStorage.removeItem(HIGHLIGHT_KEY) // one-shot: consumed on arrival
    } catch {
      raw = null
    }
    if (!raw) return
    const [group, variant] = raw.split("--")
    if (group) setToken({ group, variant: variant ?? "base" })
  }, [])
  return token
}
