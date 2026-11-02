import { getToken as getCoreToken, setTokens } from "@niceprototypes/styles"
import { TOKENS as THEME_TOKENS } from "@niceprototypes/storybook-theme"
import { AppTokenMap } from "@niceprototypes/docs/nice/tokens"

/**
 * The site's one unprefixed token map. A second unprefixed `setTokens` call replaces the first's
 * stylesheet, so this map is the Storybook's (which the reused Storybook modules read, and which
 * their own module registers on import) plus the site's overrides, registered last.
 */
export const getToken = setTokens({
  ...THEME_TOKENS,
  ...AppTokenMap,
  // Contents sticks one page padding below the top of the scrolling page (no navigation bar here).
  contents: { top: getCoreToken("gap", "large") },
  // Code takes Adobe Fonts' Antarctican Mono (its kit is linked in index.html).
  fontFamily: { ...AppTokenMap.fontFamily, code: '"antarctican-mono", sans-serif' },
})
