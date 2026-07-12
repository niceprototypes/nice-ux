import type * as React from "react"
import type { IconNameType } from "nice-react-icon"

/**
 * Determines if the button should render as a square (icon-only mode) — exactly
 * one icon (left or right) and no label. Two icons with no label is not square.
 */
export function isSquare(
  iconLeft: IconNameType | undefined,
  iconRight: IconNameType | undefined,
  children: React.ReactNode
): boolean {
  return !!iconLeft !== !!iconRight && !children
}