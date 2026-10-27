import { getToken } from "nice-react-styles"

/**
 * Offset in px used when `popover.offset` does not resolve to a plain number.
 * Matches the seed `gap:small` (8px) that `popover.offset` aliases today.
 */
export const POPOVER_OFFSET_FALLBACK = 8

// A plain px length ("8px", "12.5px") or a unitless number ("0").
const PLAIN_PX = /^(-?\d+(?:\.\d+)?)(?:px)?$/

/**
 * Reads the `popover.offset` token as a px number for JS positioning.
 *
 * Positioning runs off `getBoundingClientRect`, so the offset must be a number,
 * not a CSS var. The token's raw value (`as: "value"`) is parsed when it is a
 * plain px length. An alias such as the seed `var(--np--gap--small)` is not
 * resolved by `getToken`, so that case — and any other non-px value — returns
 * `POPOVER_OFFSET_FALLBACK`.
 *
 * @returns Offset in px between anchor and popover
 */
export function getPopoverOffset(): number {
  const match = PLAIN_PX.exec(getToken("popover.offset", { as: "value" }).trim())
  return match ? Number(match[1]) : POPOVER_OFFSET_FALLBACK
}
