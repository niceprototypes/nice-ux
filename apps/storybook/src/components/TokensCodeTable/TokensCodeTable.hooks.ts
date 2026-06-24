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
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "night"
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

/**
 * Reads the deep-link highlight target — the variant a `parseTokenVarLink` link
 * pointed at — for this table's group, from sessionStorage only. A var-link
 * writes the key on click and the destination reads + clears it here, so the
 * highlight fires exactly once on arrival. The URL param is deliberately NOT
 * read: Storybook keeps query params across `navigate()` calls, so a stale
 * `np-token` would stick and re-highlight an unrelated row on later visits.
 */
export function useHighlightedVariant(group: string): string | null {
  const [variant, setVariant] = React.useState<string | null>(null)
  React.useEffect(() => {
    if (typeof window === "undefined" || !group) return
    let raw: string | null = null
    try {
      raw = sessionStorage.getItem(HIGHLIGHT_KEY)
      sessionStorage.removeItem(HIGHLIGHT_KEY) // one-shot: consumed on arrival
    } catch {
      raw = null
    }
    if (!raw) return
    const [g, v] = raw.split("--")
    if (g === group) setVariant(v ?? "base")
  }, [group])
  return variant
}
