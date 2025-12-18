import type { IconNameType } from "../types"

/**
 * Determines if the icon should spin (spinner icon)
 */
export function isSpinning(name: IconNameType): boolean {
  return name === "spinner"
}