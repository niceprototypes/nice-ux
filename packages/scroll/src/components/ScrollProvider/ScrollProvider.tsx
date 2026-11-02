import React, { createContext, useEffect, useRef, useCallback, useState } from "react"
import { scrollTargetOf, scrollTopOf, type ScrollRootElement } from "../../utilities/scrollRoot"
import type {
  ScrollContextValue,
  ScrollProviderProps,
  ScrollSubscribeCallbackType,
} from "./ScrollProvider.types"

export const ScrollContext = createContext<ScrollContextValue | null>(null)

/**
 * Centralized scroll management provider for @niceprototypes/scroll
 *
 * Provides a single scroll listener with RAF batching for optimal performance.
 * All scroll-dependent components should subscribe via useScroll hook. The page scrolls in
 * the window, or in `root` (an app shell's scrolling region), which the scroll components
 * below then measure and scroll against.
 *
 * @example
 * ```tsx
 * <ScrollProvider>
 *   <Sticky>Header</Sticky>
 *   <FadeOnScroll>Content</FadeOnScroll>
 * </ScrollProvider>
 * ```
 */
const ScrollProvider: React.FC<ScrollProviderProps> = ({ children, root }) => {
  // The root element, read after mount: a passive effect runs once every ref is attached,
  // the root's included when it is an ancestor of this provider. null is the window.
  const [element, setElement] = useState<ScrollRootElement>(null)
  useEffect(() => {
    setElement(root && "current" in root ? root.current : root ?? null)
  }, [root])
  const scrollYRef = useRef(0)
  const subscribersRef = useRef<Set<ScrollSubscribeCallbackType>>(new Set())
  const rafIdRef = useRef<number | null>(null)

  const subscribe = useCallback((callback: ScrollSubscribeCallbackType) => {
    subscribersRef.current.add(callback)

    // Immediately call with current scroll position
    callback(scrollYRef.current)

    // Return unsubscribe function
    return () => {
      subscribersRef.current.delete(callback)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous RAF if it exists (throttle to one update per frame)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      // Schedule update for next animation frame
      rafIdRef.current = requestAnimationFrame(() => {
        scrollYRef.current = scrollTopOf(element)

        // Notify all subscribers with updated scroll position
        subscribersRef.current.forEach(callback => {
          callback(scrollYRef.current)
        })

        rafIdRef.current = null
      })
    }

    // Set initial scroll position
    scrollYRef.current = scrollTopOf(element)

    // Single scroll listener for entire app
    const target = scrollTargetOf(element)
    target.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      target.removeEventListener("scroll", handleScroll)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [element])

  const value: ScrollContextValue = {
    scrollY: scrollYRef.current,
    subscribe,
    root: element,
  }

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  )
}

export default ScrollProvider
