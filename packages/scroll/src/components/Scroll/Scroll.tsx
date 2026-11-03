import * as React from "react"
import { StyledScroll } from "./Scroll.styles"
import type { ScrollProps } from "./Scroll.types"

/**
 * Scroll
 *
 * The scroll container every scrolling region in Nice UI renders through, so one setting
 * shows or hides every scrollbar. Scrollbars are hidden by default; `showScrollbar` sets
 * one instance, the `scroll.scrollbarWidth` token sets the project default.
 *
 * @example
 * ```tsx
 * <Scroll axis="x" showScrollbar>{wideContent}</Scroll>
 * ```
 */
const Scroll: React.FC<ScrollProps> = ({ axis = "y", showScrollbar, children, ...rest }) => (
  <StyledScroll $axis={axis} $showScrollbar={showScrollbar} {...rest}>
    {children}
  </StyledScroll>
)

export default Scroll
