import type * as React from "react"
import type { ButtonIconNameType } from "../components/ButtonIcon/ButtonIcon.types"

/**
 * Determines if the button should render as a square (icon-only mode) — exactly
 * one icon (left or right) and no label. Two icons with no label is not square.
 */
export function isSquare(
  iconLeft: ButtonIconNameType | undefined,
  iconRight: ButtonIconNameType | undefined,
  children: React.ReactNode
): boolean {
  return !!iconLeft !== !!iconRight && !children
}