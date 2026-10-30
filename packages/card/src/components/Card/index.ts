import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseCard from "./Card"
import type { CardProps } from "./Card.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an unbound
// generic `<P>` in dist or collapse to `any`, erasing the `breakpoints` prop on consumers.
const Card: React.FC<WithBreakpointsProps<CardProps>> = withBreakpoints<CardProps>(BaseCard)

export { Card }
export * from "./Card.types"
export { default as CardTypes } from "./Card.types"
