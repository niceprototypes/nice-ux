import { useAppContext } from "../utilities/AppContext"

/**
 * The index and the page on screen, for a scene that moves between pages (chaining, loops) or drops its own chrome in the bare view.
 * - entries: every scene and docs page, in nav order
 * - current: the page on screen
 * - bare: whether the bare view (`/frame/<page>`, the page alone, full screen) is on
 * - open(entry): goes to a page, keeping the URL's query string (and the bare view, if on it)
 * - preload(entry): loads a page's module ahead of time, so opening it later renders at once
 */
export const useScenes = () => {
  const { entries, current, bare, open, preload } = useAppContext()
  return { entries, current, bare, open, preload }
}
