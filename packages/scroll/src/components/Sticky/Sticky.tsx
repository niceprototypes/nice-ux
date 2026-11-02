import React, { useContext, useEffect, useRef, useState } from "react"
import { StickyContext } from "./StickyProvider"
import { StickyWrapper, StickySpacer } from "./Sticky.styles"
import { useScrollRoot } from "../../utilities/useScrollRoot"
import { scrollTargetOf, scrollTopOf, viewportOf } from "../../utilities/scrollRoot"
import type { StickyProps } from "./Sticky.types"

/**
 * Sticky component with automatic stacking support
 *
 * Uses native CSS position: sticky with IntersectionObserver for callbacks.
 * Provides significantly better performance than scroll-based approaches.
 *
 * Elements stick to the top of the viewport when scrolled to their position, or to the top
 * of the ScrollProvider's `root` when the page scrolls in one.
 * Multiple sticky elements stack on top of each other based on their order prop.
 *
 * @param order - Stacking order (lower numbers appear above). Default: 0
 * @param onStickyChange - Callback fired when sticky state changes
 *
 * @example
 * ```tsx
 * <Sticky order={0} onStickyChange={(isSticky) => console.log(isSticky)}>
 *   <Header />
 * </Sticky>
 * ```
 */
const Sticky: React.FC<StickyProps> = ({
  children,
  className,
  order = 0,
  onStickyChange,
}) => {
  const context = useContext(StickyContext)
  // In a scroll root the bar sticks inside it (CSS sticky), not to the viewport.
  const root = useScrollRoot()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const [stickyTop, setStickyTop] = useState(0)
  const [isHidden, setIsHidden] = useState(false)
  const [height, setHeight] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Register with StickyProvider to get stacking offset and measure height
  useEffect(() => {
    if (!context || !wrapperRef.current) return

    const element = wrapperRef.current
    const elementHeight = element.offsetHeight

    // Store height for spacer
    setHeight(elementHeight)

    // Register and get the sticky top offset
    const offset = context.registerInstance(order, elementHeight)
    setStickyTop(offset)

    return () => {
      context.unregisterInstance(order)
    }
  }, [context, order])

  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return

      ticking.current = true

      requestAnimationFrame(() => {
        const currentScrollY = scrollTopOf(root)

        // Only hide/show if scrolled past the spacer
        if (spacerRef.current) {
          const spacerTop = spacerRef.current.getBoundingClientRect().top - viewportOf(root).top

          // If we're past the original position
          if (spacerTop < 0) {
            // Hide on scroll down, show on scroll up
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
              setIsHidden(true)
            } else {
              setIsHidden(false)
            }
          } else {
            // If we're above the original position, always show
            setIsHidden(false)
          }
        }

        lastScrollY.current = currentScrollY
        ticking.current = false
      })
    }

    const target = scrollTargetOf(root)
    target.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      target.removeEventListener("scroll", handleScroll)
    }
  }, [root])

  // Use IntersectionObserver for sticky state callback
  useEffect(() => {
    if (!spacerRef.current || !onStickyChange) return

    // Observer to detect when the spacer crosses the viewport threshold
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When spacer is not intersecting, element is sticky
        const isSticky = !entry.isIntersecting
        onStickyChange(isSticky)
      },
      {
        root,
        threshold: [0],
        // Account for sticky offset from stacked elements
        rootMargin: `-${stickyTop}px 0px 0px 0px`,
      }
    )

    observer.observe(spacerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [onStickyChange, stickyTop, root])

  if (!context) {
    return <>{children}</>
  }

  return (
    <>
      {/* Spacer that also acts as spacer for scroll position detection */}
      {/* In a scroll root the bar stays in the flow, so the spacer is a zero-height sentinel. */}
      <StickySpacer ref={spacerRef} $height={root ? 0 : height} />

      {/* Fixed header (sticky inside a scroll root) that slides up/down based on scroll direction */}
      <StickyWrapper ref={wrapperRef} className={className} $top={stickyTop} $isHidden={isHidden} $contained={root !== null}>
        {children}
      </StickyWrapper>
    </>
  )
}

export default Sticky