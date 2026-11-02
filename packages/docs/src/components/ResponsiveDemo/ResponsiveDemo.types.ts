import type { BreakpointName } from "@niceprototypes/styles"

export interface ResponsiveDemoItem {
  /** The breakpoint band this item represents — it highlights when that band is the active viewport */
  breakpoint: BreakpointName
  /** Leading emoji */
  emoji: string
  /** Label text */
  text: string
}

export interface ResponsiveDemoProps {
  /** Items laid out column on phone and row on tablet+ */
  items: ResponsiveDemoItem[]
}