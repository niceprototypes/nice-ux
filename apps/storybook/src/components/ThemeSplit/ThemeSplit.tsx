import * as React from "react"
import Flex from "nice-react-flex"

/** The two pinned themes a colour row demonstrates, in display order. */
export const PREVIEW_THEMES = ["day", "night"] as const

export type PreviewThemeType = (typeof PREVIEW_THEMES)[number]

export interface ThemeSplitProps {
  /** Renders one half, given the theme that half is pinned to. */
  render: (theme: PreviewThemeType) => React.ReactNode
}

/**
 * Splits a preview cell in half and renders the same swatch twice — once
 * pinned to day, once to night — so both are visible at once regardless of
 * which theme the page is in.
 *
 * Colour tokens are the only ones worth showing this way: every other module
 * (gap, fontSize, borderRadius) resolves to the same value in both themes, so a
 * split would render two identical halves.
 *
 * Each half is responsible for carrying its own surface. A night-pinned text
 * colour drawn on a day-lit cell is near-white on near-white — the pinning is
 * only legible when the background beside it is pinned to the same theme.
 *
 * @example
 * <ThemeSplit render={theme => (
 *   <PreviewCell backgroundColor={getToken("backgroundColor", variant, { theme })} />
 * )} />
 */
const ThemeSplit = ({ render }: ThemeSplitProps) => (
  <Flex direction="row" gap="smaller" grow={1}>
    {PREVIEW_THEMES.map(theme => (
      <Flex key={theme} grow={1}>
        {render(theme)}
      </Flex>
    ))}
  </Flex>
)

export default ThemeSplit
