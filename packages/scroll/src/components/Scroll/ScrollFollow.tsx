import * as React from "react"
import { getToken } from "@niceprototypes/styles"
import { StyledScroll } from "./Scroll.styles"
import type { ScrollAxisType, ScrollProps } from "./Scroll.types"
import type { ScrollEndContextValue } from "./ScrollFollow.types"

/** The nearest `<Scroll follow>`'s end state; null outside one. */
export const ScrollEndContext = React.createContext<ScrollEndContextValue | null>(null)

const THRESHOLD_KEY = getToken("scroll.follow.threshold", { as: "key" })

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

/** The `scroll.follow.threshold` token as the element resolves it, in px. */
const thresholdOf = (element: HTMLElement): number => parseFloat(getComputedStyle(element).getPropertyValue(THRESHOLD_KEY)) || 0

/** The distance from the visible bottom to the end of the content. */
const distanceToEnd = (element: HTMLElement): number => element.scrollHeight - element.scrollTop - element.clientHeight

/** Assign `element` to a forwarded ref. */
const assignRef = (ref: React.Ref<HTMLElement> | undefined, element: HTMLElement | null) => {
  if (typeof ref === "function") ref(element)
  else if (ref) ref.current = element
}

/**
 * `<Scroll follow>`: the scroll container, pinned to the end while its content grows (children
 * added, text streamed in, media loading). Scrolling up past `scroll.follow.threshold` releases
 * the pin; reaching the end again, by scrolling or `scrollToEnd`, pins it. It opens at the end.
 */
const ScrollFollow = ({
  axis,
  showScrollbar,
  ref,
  children,
  ...rest
}: Omit<ScrollProps, "axis" | "root" | "sticky" | "fade" | "follow"> & { axis: ScrollAxisType }) => {
  const elementRef = React.useRef<HTMLElement | null>(null)
  const pinnedRef = React.useRef(true)
  const [atEnd, setAtEnd] = React.useState(true)

  const setRef = React.useCallback(
    (element: HTMLElement | null) => {
      elementRef.current = element
      assignRef(ref, element)
    },
    [ref],
  )

  const scrollToEnd = React.useCallback((behavior: ScrollBehavior = "smooth") => {
    const element = elementRef.current
    if (!element) return
    pinnedRef.current = true
    setAtEnd(true)
    const reducedMotion = window.matchMedia?.(REDUCED_MOTION_QUERY).matches
    element.scrollTo({ top: element.scrollHeight, behavior: reducedMotion ? "instant" : behavior })
  }, [])

  React.useEffect(() => {
    const element = elementRef.current
    if (!element) return
    let threshold = thresholdOf(element)
    let lastScrollTop = element.scrollTop

    // At the end pins; moving up anywhere else releases. Content shrinking clamps the offset to
    // the end, which pins rather than releases.
    const handleScroll = () => {
      if (distanceToEnd(element) <= threshold) pinnedRef.current = true
      else if (element.scrollTop < lastScrollTop) pinnedRef.current = false
      lastScrollTop = element.scrollTop
      setAtEnd(pinnedRef.current)
    }

    const handleContentChange = () => {
      threshold = thresholdOf(element)
      if (pinnedRef.current) scrollToEnd()
    }

    // The container's own size and each child's: content grows inside them without a mutation
    // (media loading, wrapping).
    const resizeObserver = new ResizeObserver(handleContentChange)
    resizeObserver.observe(element)
    Array.from(element.children, child => resizeObserver.observe(child))

    const mutationObserver = new MutationObserver(records => {
      records.forEach(record => {
        if (record.target !== element) return
        record.addedNodes.forEach(node => node instanceof Element && resizeObserver.observe(node))
        record.removedNodes.forEach(node => node instanceof Element && resizeObserver.unobserve(node))
      })
      handleContentChange()
    })
    mutationObserver.observe(element, { childList: true, subtree: true, characterData: true })

    element.addEventListener("scroll", handleScroll, { passive: true })
    scrollToEnd("instant")

    return () => {
      element.removeEventListener("scroll", handleScroll)
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [scrollToEnd])

  const value = React.useMemo<ScrollEndContextValue>(() => ({ atEnd, scrollToEnd }), [atEnd, scrollToEnd])

  return (
    <ScrollEndContext.Provider value={value}>
      <StyledScroll ref={setRef} $axis={axis} $showScrollbar={showScrollbar} {...rest}>
        {children}
      </StyledScroll>
    </ScrollEndContext.Provider>
  )
}

export default ScrollFollow
