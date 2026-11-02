import * as React from "react"
import type { TokenVariants } from "@niceprototypes/styles"
import { ZIndexAccent, ZIndexReference, ZIndexStack } from "./ZIndex.styles"

interface ZIndexProps {
  /** The zIndex token the accent square carries. */
  variant: TokenVariants["zIndex"]
}

/**
 * The zIndex token preview: two overlapping squares in one stacking context.
 * The reference holds a fixed z-index between the `low` and `medium` tiers; the
 * accent carries `variant`, so which square renders on top shows where the
 * variant sits on the scale.
 */
const ZIndex: React.FC<ZIndexProps> = ({ variant }) => (
  <ZIndexStack>
    <ZIndexReference />
    <ZIndexAccent $zIndex={variant} />
  </ZIndexStack>
)

export default ZIndex
