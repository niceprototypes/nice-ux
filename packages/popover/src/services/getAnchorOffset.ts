import { getToken, type TokenAddress } from "@niceprototypes/styles"

/**
 * Offset in px used when the token does not resolve to a plain px value.
 * Matches the seed `gap:small` that `popover.offset` and `tooltip.offset` alias.
 */
export const ANCHOR_OFFSET_FALLBACK = 8

// A plain px length ("8px", "12.5px") or a unitless number ("0").
const PLAIN_PX = /^(-?\d+(?:\.\d+)?)(?:px)?$/

/**
 * Reads an offset token as a px number for JS positioning.
 *
 * Positioning runs off `getBoundingClientRect`, so the offset must be a number,
 * not a CSS var. The token's raw value (`as: "value"`) is read; `getToken`
 * follows a single-`var()` alias such as the seed `var(--np--gap--small)` to its
 * value. A plain px length is parsed; anything else (`calc()`, `rem`, an
 * unregistered var) returns `ANCHOR_OFFSET_FALLBACK`.
 *
 * @param address - Offset token to read
 * @returns Offset in px between anchor and element
 *
 * @example
 * computeAnchorPosition(rect, "top", "center", getAnchorOffset("tooltip.offset"))
 */
export function getAnchorOffset(address: TokenAddress = "popover.offset"): number {
  const match = PLAIN_PX.exec(getToken(address, { as: "value" }).trim())
  return match ? Number(match[1]) : ANCHOR_OFFSET_FALLBACK
}
