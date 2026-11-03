import * as React from "react"
import { Theme } from "@niceprototypes/styles"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import type { PreviewThemeType } from "../ThemeSplit"
import { SwatchDiv, ThemeValueFlex } from "./ThemeValue.styles"

/** The card's visual: a colour filling a swatch, or any preview node (a duration bar, an easing curve). */
type ThemeValueVisualProps = { color: string; children?: never } | { color?: never; children: React.ReactNode }

export type ThemeValueProps = ThemeValueVisualProps & {
  /** Pin the card to a theme: it renders on that theme's surface. Unset, it follows the page. */
  theme?: PreviewThemeType
  /** The resolved value shown under the visual. */
  value: string
}

/**
 * One token's value as a card: its visual on top (a colour swatch, or a preview
 * node), the resolved value under it. Every token table uses it: two pinned
 * cards side by side give a colour token's light and dark values; one unpinned
 * card gives any other token's default. The pinned cell is a nested `Theme`, so
 * the swatch and surface resolve to `theme` whatever theme the page is in. Built
 * from Nice components only (Theme, Flex, Ink, getToken).
 *
 * @example
 * <ThemeValue theme="night" color={getToken("color", "link")} value="hsla(202, 90%, 65%, 1)" />
 * <ThemeValue value="200ms">{durationBar}</ThemeValue>
 */
const ThemeValue = ({ theme, color, value, children }: ThemeValueProps) => {
  const card = (
    <ThemeValueFlex>
      {/* A row, as the table cell was: a preview that grows takes the card's width, not its height. */}
      {color === undefined ? <Flex>{children}</Flex> : <SwatchDiv $color={color} />}
      <Ink code size="small" color="light">
        {value}
      </Ink>
    </ThemeValueFlex>
  )
  return theme ? <Theme name={theme}>{card}</Theme> : card
}

export default ThemeValue
