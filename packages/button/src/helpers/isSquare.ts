import type * as React from "react"
import type { IconNameType } from "nice-react-icon"

/**
 * Determines if the button should render as a square (icon-only mode)
 */
export function isSquare(icon: IconNameType | undefined, children: React.ReactNode): boolean {
  return !!icon && !children
}