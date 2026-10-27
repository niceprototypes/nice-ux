import * as React from "react"
import { Theme } from "@niceprototypes/styles"
import { isDevelopment } from "../../utilities/isDevelopment"
import { useFrame } from "../../utilities/useFrame"
import { StyledDash, StyledLine, StyledRim, StyledSvg } from "./Line.styles"
import type { LineProps } from "./Line.types"

/**
 * Line frames its parent element with a dashed line: pill-shaped dashes, each with its own
 * rim, centered on the parent's edge and following its corners. The dash pattern is fitted so
 * a whole number of dashes goes around.
 *
 * Line is a frame, not a divider: it fills and outlines its nearest positioned ancestor. Place
 * it inside a positioned element (relative, absolute, fixed or sticky). Under a statically
 * positioned parent it frames whatever ancestor is positioned, up to the whole viewport; in
 * development it warns once per instance when its parent's computed position is `static`.
 *
 * Colors and measurements come from the `line.*` component tokens: `line.borderColor`
 * (defaults to the root border color), `line.rimColor`, `line.width`, `line.rimWidth`,
 * `line.dashLength`, `line.gap`.
 *
 * @example
 * ```tsx
 * <div style={{ position: "relative", borderRadius: 12 }}>
 *   Content
 *   <Line />
 * </div>
 *
 * <Line color="link" radius={8} />
 * ```
 */
const Line: React.FC<LineProps> = ({ color = "base", radius = "element", className, theme }) => {
  const { ref, frame } = useFrame(radius)

  // Dev warning: the silent failure mode is a static parent, which makes Line frame a far ancestor.
  const warnedRef = React.useRef(false)
  React.useEffect(() => {
    if (warnedRef.current || !isDevelopment()) return
    const parent = ref.current?.parentElement
    if (!parent || getComputedStyle(parent).position !== "static") return
    warnedRef.current = true
    console.warn(
      "@niceprototypes/line: Line's parent element is statically positioned, so Line frames its nearest positioned ancestor " +
        "(up to the whole viewport). Line is a frame, not a divider: give its parent a position (relative, absolute, fixed or sticky)."
    )
  })

  const element = (
    <StyledLine ref={ref} className={className} aria-hidden="true">
      {frame && (
        <StyledSvg width={frame.width} height={frame.height}>
          <StyledRim d={frame.d} strokeDasharray={frame.dasharray} />
          <StyledDash $color={color} d={frame.d} strokeDasharray={frame.dasharray} />
        </StyledSvg>
      )}
    </StyledLine>
  )

  return theme ? <Theme name={theme}>{element}</Theme> : element
}

export default Line
