import { useContext } from "react"
import { ScrollEndContext } from "../components/Scroll/ScrollFollow"
import type { ScrollEndContextValue } from "../components/Scroll/ScrollFollow.types"

/**
 * The end state of the nearest `<Scroll follow>`: `atEnd` is true while the scroll position is
 * pinned to the end; `scrollToEnd(behavior?)` scrolls there and pins it.
 *
 * @throws Error if used outside of a `<Scroll follow>`
 *
 * @example
 * ```tsx
 * const { atEnd, scrollToEnd } = useScrollEnd()
 * <Button inert={atEnd} onClick={() => scrollToEnd()} aria-label="Scroll to latest" />
 * ```
 */
export const useScrollEnd = (): ScrollEndContextValue => {
  const context = useContext(ScrollEndContext)

  if (!context) {
    throw new Error("useScrollEnd must be used within a <Scroll follow>")
  }

  return context
}
