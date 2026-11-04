import * as React from "react"
import { ScrollContext, StickyContext } from "./ScrollRoot"
import { StyledScrollSticky, StyledScrollStickySpacer } from "./ScrollSticky.styles"
import { scrollTargetOf, scrollTopOf, viewportOf } from "../../utilities/scrollRoot"
import type { ScrollStickyOptionsType } from "./Scroll.types"

/** Hides the bar on scrolling down past this offset from the root's top; scrolling up shows it. */
const HIDE_AFTER = 100

/**
 * `<Scroll sticky>`: a bar that stays at the top of the root, stacked below the bars of a lower
 * `order`. In the window it is fixed, with a spacer of its height in the flow; in an element root
 * it is CSS sticky. It slides up while the page scrolls down and back on scrolling up.
 * Outside a `<Scroll root>` it renders its children in place.
 */
const ScrollSticky = ({
  options: { order = 0, onChange },
  children,
  ...rest
}: { options: ScrollStickyOptionsType } & React.HTMLAttributes<HTMLDivElement>) => {
  const context = React.useContext(StickyContext)
  const root = React.useContext(ScrollContext)?.root ?? null
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const spacerRef = React.useRef<HTMLDivElement>(null)
  const [stickyTop, setStickyTop] = React.useState(0)
  const [isHidden, setIsHidden] = React.useState(false)
  const [height, setHeight] = React.useState(0)
  const lastScrollY = React.useRef(0)
  const ticking = React.useRef(false)

  // Register in the root's stack for this bar's offset, and measure it for the spacer.
  React.useEffect(() => {
    if (!context || !wrapperRef.current) return
    const elementHeight = wrapperRef.current.offsetHeight
    setHeight(elementHeight)
    setStickyTop(context.registerInstance(order, elementHeight))
    return () => context.unregisterInstance(order)
  }, [context, order])

  // Scrolling down past the bar's place hides it; scrolling up shows it.
  React.useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const currentScrollY = scrollTopOf(root)
        if (spacerRef.current) {
          const spacerTop = spacerRef.current.getBoundingClientRect().top - viewportOf(root).top
          setIsHidden(spacerTop < 0 && currentScrollY > lastScrollY.current && currentScrollY > HIDE_AFTER)
        }
        lastScrollY.current = currentScrollY
        ticking.current = false
      })
    }
    const target = scrollTargetOf(root)
    target.addEventListener("scroll", handleScroll, { passive: true })
    return () => target.removeEventListener("scroll", handleScroll)
  }, [root])

  // Stuck while the spacer is out of the root's view above its top (below the bars stacked above);
  // out of view below the bottom, the bar has not reached its place yet.
  React.useEffect(() => {
    if (!spacerRef.current || !onChange) return
    const observer = new IntersectionObserver(
      ([entry]) => onChange(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0) + stickyTop),
      {
        root,
        threshold: [0],
        rootMargin: `-${stickyTop}px 0px 0px 0px`,
      },
    )
    observer.observe(spacerRef.current)
    return () => observer.disconnect()
  }, [onChange, stickyTop, root])

  if (!context) return <>{children}</>

  return (
    <>
      {/* In an element root the bar stays in the flow, so the spacer is a zero-height sentinel. */}
      <StyledScrollStickySpacer ref={spacerRef} $height={root ? 0 : height} />
      <StyledScrollSticky ref={wrapperRef} $top={stickyTop} $isHidden={isHidden} $contained={root !== null} {...rest}>
        {children}
      </StyledScrollSticky>
    </>
  )
}

export default ScrollSticky
