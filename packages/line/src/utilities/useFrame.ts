import { useLayoutEffect, useRef, useState } from "react"
import { getToken, type TokenAddress } from "@niceprototypes/styles"
import type { LineRadiusType } from "../components/Line/Line.types"
import { fitDasharray } from "./fitDasharray"
import { framePath } from "./framePath"
import { resolveCorners } from "./resolveCorners"

export type Frame = { width: number; height: number; d: string; dasharray: string }

/**
 * Measures the line's box (it fills its positioned parent) and builds the frame: the path along
 * its edge with the requested corners, and the dash pattern fitted to that path. The dash
 * measurements are read from the resolved `line.*` tokens on the element, so token overrides
 * anywhere above it apply. Rebuilt whenever the box resizes.
 */
export const useFrame = (radius: LineRadiusType) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [frame, setFrame] = useState<Frame>()
  // An array radius is a new object every render: compare its values. An Element compares by identity.
  const radiusKey = radius instanceof Element ? radius : JSON.stringify(radius)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const measure = () => {
      const { width, height } = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      const read = (address: TokenAddress) => parseFloat(style.getPropertyValue(getToken(address, { as: "key" }))) || 0
      const { d, length } = framePath(width, height, resolveCorners(radius, element.parentElement, width, height))
      const dasharray = fitDasharray(length, {
        width: read("line.width:base"),
        rimWidth: read("line.rimWidth:base"),
        dashLength: read("line.dashLength:base"),
        gap: read("line.gap:base"),
      })
      setFrame({ width, height, d, dasharray })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
    // radiusKey stands for radius (see above).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radiusKey])

  return { ref, frame }
}
