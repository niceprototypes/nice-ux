import * as React from "react"
import { StyledScroll } from "./Scroll.styles"
import ScrollRoot from "./ScrollRoot"
import ScrollSticky from "./ScrollSticky"
import ScrollFade from "./ScrollFade"
import ScrollFollow from "./ScrollFollow"
import type { ScrollProps } from "./Scroll.types"

/**
 * Scroll
 *
 * Every scrolling element and every page scroll behaviour in Nice UI.
 *
 * - The scroll container (default): scrollbars are hidden by default; `showScrollbar` sets one
 *   instance, the `scroll.scrollbarWidth` token sets the project default.
 * - `root`: the page scroller (`true` for the window) that the behaviours under it measure against.
 * - `sticky`: keeps its children at the top of the root, stacked by `order`.
 * - `fade`: fades its children with their place in the root's view.
 * - `follow`: the scroll container, pinned to the end while its content grows (useScrollEnd).
 *
 * @example
 * ```tsx
 * <Scroll axis="x" showScrollbar>{wideContent}</Scroll>
 *
 * <Scroll root>
 *   <Scroll sticky={{ onChange: setIsSticky }}><Header /></Scroll>
 *   <Scroll fade>{section}</Scroll>
 * </Scroll>
 *
 * <Scroll follow role="log">{messages}</Scroll>
 * ```
 */
const Scroll: React.FC<ScrollProps> = ({ axis = "y", showScrollbar, root, sticky, fade, follow, children, ref, ...rest }) => {
  if (root) return <ScrollRoot root={root}>{children}</ScrollRoot>
  if (sticky)
    return (
      <ScrollSticky options={sticky === true ? {} : sticky} {...rest}>
        {children}
      </ScrollSticky>
    )
  if (fade)
    return (
      <ScrollFade options={fade === true ? {} : fade} {...rest}>
        {children}
      </ScrollFade>
    )
  if (follow)
    return (
      <ScrollFollow ref={ref} axis={axis} showScrollbar={showScrollbar} {...rest}>
        {children}
      </ScrollFollow>
    )
  return (
    <StyledScroll ref={ref} $axis={axis} $showScrollbar={showScrollbar} {...rest}>
      {children}
    </StyledScroll>
  )
}

export default Scroll
