import { useContext, useEffect, useState } from "react"
import { ScrollContext } from "../components/Scroll/ScrollRoot"

/**
 * Hook to subscribe to scroll updates from the nearest `<Scroll root>`
 *
 * Returns the current scroll Y position and automatically updates
 * when the user scrolls. All updates are RAF-batched for performance.
 *
 * @throws Error if used outside of a `<Scroll root>`
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const scrollY = useScroll()
 *
 *   return <div>Scrolled {scrollY}px</div>
 * }
 * ```
 */
export const useScroll = (): number => {
  const context = useContext(ScrollContext)

  if (!context) {
    throw new Error("useScroll must be used within a <Scroll root>")
  }

  const [scrollY, setScrollY] = useState(context.scrollY)

  useEffect(() => {
    // Subscribe to scroll updates
    const unsubscribe = context.subscribe(setScrollY)

    // Cleanup subscription on unmount
    return unsubscribe
  }, [context])

  return scrollY
}
