import * as React from "react"
import { useScroll } from "../../hooks/useScroll"
import { ScrollContext } from "./ScrollRoot"
import { viewportOf } from "../../utilities/scrollRoot"
import { getFadeOpacity, getScrollProgress } from "./ScrollFade.helpers"
import { StyledScrollFade } from "./ScrollFade.styles"
import type { ScrollFadeOptionsType } from "./Scroll.types"

/** Opacity changes below this are not rendered. */
const MIN_OPACITY_CHANGE = 0.01

/**
 * `<Scroll fade>`: content whose opacity follows its place in the root's view, fading in from
 * `start` to `peak` and out to `end` (percent of the view, 0 at its bottom edge, 100 at its top).
 * Needs a `<Scroll root>` above it.
 */
const ScrollFade = ({
  options: { start = 0, peak = 50, end = 100, opacity: opacities = [0, 1, 0] },
  children,
  ...rest
}: { options: ScrollFadeOptionsType } & React.HTMLAttributes<HTMLDivElement>) => {
  const scrollY = useScroll()
  const root = React.useContext(ScrollContext)?.root ?? null
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = React.useState(opacities[0])
  const [startOpacity, peakOpacity, endOpacity] = opacities

  React.useEffect(() => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const viewport = viewportOf(root)
    const next = getFadeOpacity(getScrollProgress(rect.top - viewport.top, viewport.height), [start, peak, end], [startOpacity, peakOpacity, endOpacity])
    setOpacity(previous => (Math.abs(next - previous) > MIN_OPACITY_CHANGE ? next : previous))
  }, [scrollY, root, start, peak, end, startOpacity, peakOpacity, endOpacity])

  return (
    <StyledScrollFade ref={wrapperRef} $opacity={opacity} {...rest}>
      {children}
    </StyledScrollFade>
  )
}

export default ScrollFade
