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

// Module-level one-shot cache. The highlight key is read (and cleared) exactly
// once per page load, then shared by every hook caller — so a page that renders
// several tables (e.g. the merged Colors page: color + backgroundColor +
// borderColor) doesn't have its first table consume the key and starve the rest.
// A deep-link navigates with target="_top" (a full manager reload), which
// re-executes this module, so the cache re-arms for the next arrival.
let cachedHighlight: HighlightedToken | null | undefined

function readHighlightOnce(): HighlightedToken | null {
  if (cachedHighlight !== undefined) return cachedHighlight
  if (typeof window === "undefined") return null // server: don't consume; the client reads
  cachedHighlight = null
  try {
    const raw = sessionStorage.getItem(HIGHLIGHT_KEY)
    sessionStorage.removeItem(HIGHLIGHT_KEY) // one-shot: consumed on arrival
    if (raw) {
      const [group, variant] = raw.split("--")
      if (group) cachedHighlight = { group, variant: variant ?? "base" }
    }
  } catch {
    cachedHighlight = null
  }
  return cachedHighlight
}

/**
 * Reads the deep-link highlight target a `parseTokenVarLink` link stashed in
 * sessionStorage, as `{ group, variant }`. The read is memoized module-side
 * (see above), so multiple tables on one page all see the same arrival token and
 * the matching sub-table highlights its row. The URL param is deliberately NOT
 * read: Storybook keeps query params across navigations, so a stale `np-token`
 * would stick and re-highlight an unrelated row later.
 */
export function useHighlightedToken(): HighlightedToken | null {
  // Lazy initializer → read during first render (value is ready on first paint).
  return React.useState(readHighlightOnce)[0]
}
