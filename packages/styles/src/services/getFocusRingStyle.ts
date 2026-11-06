/**
 * The shared keyboard focus ring.
 *
 * Returns the `outline` and `outline-offset` declarations of a focus ring, read
 * from the core `focusRing` tokens or from a component's own `{prefix}.focusRing`
 * tokens. The caller supplies the selector (`&:focus-visible`,
 * `${StyledInput}:focus-visible + &`, …), since components differ in which
 * element shows the ring.
 *
 * @example
 * getFocusRingStyle()
 * // "outline: var(--np--focus-ring--width) solid var(--np--focus-ring--color); outline-offset: var(--np--focus-ring--offset);"
 *
 * @example
 * getFocusRingStyle("button")
 * // "outline: var(--np--button--focus-ring--width) solid var(--np--button--focus-ring--color); outline-offset: var(--np--button--focus-ring--offset);"
 */

import { getToken } from './getToken.js'
import type { ComponentPrefix, TokenGroup } from '../generated/types.js'

/** Component prefixes whose tokens carry `focusRing.width`, `focusRing.color` and `focusRing.offset`. */
export type FocusRingPrefix = {
  [P in ComponentPrefix]: [`${P}.focusRing.width`, `${P}.focusRing.color`, `${P}.focusRing.offset`] extends [
    TokenGroup,
    TokenGroup,
    TokenGroup,
  ]
    ? P
    : never
}[ComponentPrefix]

/**
 * Build the focus ring declarations.
 *
 * @param prefix - Component whose `focusRing` tokens to read; the core `focusRing` tokens when omitted
 * @returns `outline` and `outline-offset` declarations
 */
export function getFocusRingStyle(prefix?: FocusRingPrefix): string {
  const [width, color, offset] = prefix
    ? [
        getToken(`${prefix}.focusRing.width`),
        getToken(`${prefix}.focusRing.color`),
        getToken(`${prefix}.focusRing.offset`),
      ]
    : [getToken('focusRing', 'width'), getToken('focusRing', 'color'), getToken('focusRing', 'offset')]
  return `outline: ${width} solid ${color}; outline-offset: ${offset};`
}
