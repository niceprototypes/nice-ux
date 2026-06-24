import * as React from "react"
import { navigate } from "@storybook/addon-links"
import Button from "nice-react-button"
import Plain from "../Plain"

interface ArrowLinkProps {
  /**
   * Target Storybook story/docs id — e.g. "tokens-modules--docs". Navigated via
   * addon-links so it routes through the manager. (A raw `href` would 404: the
   * real route is `/?path=/docs/…`, and the link renders inside the docs iframe.)
   */
  storyId: string
  /** Link label text. */
  children: React.ReactNode
}

/**
 * A semibold arrow call-to-action link — the "Browse all tokens →" pattern.
 * Renders the nice Button styled as a link; clicking navigates via Storybook's
 * built-in addon-links `navigate`, so it works from inside the docs iframe (the
 * same mechanism WelcomeLink uses). `Plain` strips the `<p>` MDX may wrap the
 * label in.
 */
const ArrowLink: React.FC<ArrowLinkProps> = ({ storyId, children }) => (
  <Button link weight="semibold" icon="arrow-right" onClick={() => navigate({ storyId })}>
    <Plain>{children}</Plain>
  </Button>
)

export default ArrowLink
