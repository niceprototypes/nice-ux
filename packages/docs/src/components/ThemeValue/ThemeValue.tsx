import { Theme } from "@niceprototypes/styles"
import Ink from "@niceprototypes/ink"
import type { PreviewThemeType } from "../ThemeSplit"
import { SwatchDiv, ThemeValueFlex } from "./ThemeValue.styles"

export interface ThemeValueProps {
  /** The theme the value belongs to; the cell renders on that theme's surface. */
  theme: PreviewThemeType
  /** The colour to fill the swatch with: an unpinned `getToken` read resolves under `theme`. */
  color: string
  /** The resolved value shown under the swatch. */
  value: string
}

/**
 * One colour token's value in one theme, as a swatch over its value on that
 * theme's surface. Two side by side give a token's light and dark values. The
 * cell is a nested `Theme`, so the swatch and surface resolve to `theme`
 * whatever theme the page is in. Built from Nice components only (Theme, Flex,
 * Ink, getToken), so it moves to a docs site unchanged.
 *
 * @example
 * <ThemeValue theme="night" color={getToken("color", "link")} value="hsla(202, 90%, 65%, 1)" />
 */
const ThemeValue = ({ theme, color, value }: ThemeValueProps) => (
  <Theme name={theme}>
    <ThemeValueFlex>
      <SwatchDiv $color={color} />
      <Ink code size="smaller" color="light">
        {value}
      </Ink>
    </ThemeValueFlex>
  </Theme>
)

export default ThemeValue
