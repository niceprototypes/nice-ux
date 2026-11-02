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
  // DocsPage's columns: the gap between them, and the settings column right of Contents, as wide as its Dark toggle.
  docs: { ...AppTokenMap.docs, columnGap: getCoreToken("gap", "larger"), settingsWidth: "80px" },
  // Contents sticks one page padding below the top of the scrolling page (no navigation bar here).
  contents: { top: getCoreToken("gap", "large") },
  // One scale at every breakpoint, base 12 to larger 48: base to larger doubles each step (×2), and
  // below base the steps go down 1px each, since halving would make them unreadable.
  fontSize: { smaller: "10px", small: "11px", base: "12px", large: "24px", larger: "48px" },
  // Code takes Adobe Fonts' Antarctican Mono (its kit is linked in index.html).
  fontFamily: { ...AppTokenMap.fontFamily, code: '"antarctican-mono", sans-serif' },
})
