import * as React from "react"
import type { BreakpointName } from "nice-react-styles"

export interface ResponsiveDemoProps {
  /** ResponsiveDemoItem children, laid out column on phone and row on tablet+ */
  children: React.ReactNode
}

export interface ResponsiveDemoItemProps {
  /** The breakpoint band this item represents — it highlights when that band is the active viewport */
  breakpoint: BreakpointName
  /** Leading emoji */
  emoji: string
  /** Label text */
  text: string
}
