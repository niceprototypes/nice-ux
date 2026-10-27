import * as React from "react"
import { withBreakpoints, type WithBreakpointsProps } from "@niceprototypes/styles"
import BaseCalendar from "./Calendar"
import type { CalendarProps } from "./Calendar.types"

// Explicit return-type annotation — without it, TS declaration emit can leave an
// unbound generic `<P>` in dist or collapse to `any`, erasing the `breakpoints`
// prop on consumers. Mirrors the standard bearer (@niceprototypes/ink).
const Calendar: React.FC<WithBreakpointsProps<CalendarProps>> = withBreakpoints<CalendarProps>(BaseCalendar)

export { Calendar }
export * from "./Calendar.types"
export { default as CalendarTypes } from "./Calendar.types"
