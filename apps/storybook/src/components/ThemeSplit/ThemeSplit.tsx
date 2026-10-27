import * as React from "react"
import Flex from "nice-react-flex"
import { Theme } from "nice-react-styles"

/** The two pinned themes a colour row demonstrates, in display order. */
export const PREVIEW_THEMES = ["day", "night"] as const

export type PreviewThemeType = (typeof PREVIEW_THEMES)[number]

export interface ThemeSplitProps {
  /** The swatch to show twice — once under each theme. */
  children: React.ReactNode
}

/**
 * Splits a preview cell in half and renders the same swatch under both themes,
 * so a token's day and night values read together regardless of which theme the
 * page is in.
 *
 * The halves are real nested themes, not hand-pinned reads: each is wrapped in
 * `Theme`, which sets `data-theme` on a `display: contents` wrapper, and
 * `tokens.css` reassigns every semantic var inside it. So the *same* children
 * render differently in each half, and plain unpinned `getToken` calls resolve
 * to the right theme on their own — no `{ theme }` argument anywhere.
 *
 * That also means font smoothing follows the cascade: `preview.css` exempts
 * nested `[data-theme="night"]` subtrees from the day rule that forces
 * `-webkit-font-smoothing: auto`.
 *
 * Colour tokens are the only ones worth showing this way: every other module
 * (gap, fontSize, borderRadius) resolves to the same value in both themes.
 *
 * @example
 * <ThemeSplit>
 *   <PreviewCell backgroundColor={getToken("backgroundColor", variant)} />
 * </ThemeSplit>
 */
const ThemeSplit = ({ children }: ThemeSplitProps) => (
  <Flex direction="row" gap="smaller" grow={1}>
    {PREVIEW_THEMES.map(theme => (
      <Theme key={theme} name={theme}>
        <Flex grow={1}>{children}</Flex>
      </Theme>
    ))}
  </Flex>
)

export default ThemeSplit
