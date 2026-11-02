import * as React from "react"
import { DocsNavigationContext } from "../DocsNavigation"
import Button from "@niceprototypes/button"
import Plain from "../Plain"

interface ArrowLinkProps {
  /**
   * Target Storybook story/docs id — e.g. "tokens--docs", opened through the host's
   * DocsNavigationContext (Storybook routes it through the manager; a raw `href` would 404
   * inside the docs iframe).
   */
  storyId: string
  /** Link label text. */
  children: React.ReactNode
}

/**
 * A semibold arrow call-to-action link — the "Browse all tokens →" pattern.
 * Renders the nice Button styled as a link; clicking opens the page through the
 * host's DocsNavigationContext (as WelcomeLink does). `Plain` strips the `<p>` MDX
 * may wrap the label in.
 */
const ArrowLink: React.FC<ArrowLinkProps> = ({ storyId, children }) => {
  const navigate = React.useContext(DocsNavigationContext)
  return (
    <Button as="a" weight="semibold" iconRight="arrow-right" onClick={() => navigate(storyId)}>
      <Plain>{children}</Plain>
    </Button>
  )
}

export default ArrowLink
