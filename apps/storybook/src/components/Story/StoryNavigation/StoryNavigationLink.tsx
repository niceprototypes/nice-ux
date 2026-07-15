import * as React from "react"
import type { IconNameType } from "nice-react-icon"
import type { CellHeightType } from "nice-react-styles"
import Button from "nice-react-button"
import { LinkFlex } from "./StoryNavigationLink.styles"

interface StoryNavigationLinkProps {
  /** Accessible label and visible text, e.g. "Return to Tokens". */
  label: string
  /** Action fired on click / Enter / Space. */
  onClick: () => void
  /** Icon on the leading side. */
  iconLeft?: IconNameType
  /** Icon on the trailing side. */
  iconRight?: IconNameType
  /** Resolve the icon through the vendor icon set. */
  iconVendor?: boolean
  /** Button size; defaults to "small". */
  size?: CellHeightType
}

/**
 * A single control in the StoryNavigation bar. Renders a link-styled
 * (`as="div" inlined`) Button that fires `onClick` — no anchor, since these are
 * actions/navigation handlers, not `href` links — with keyboard activation
 * handled by the Button. Used for every item in the bar: nav toggle, open in
 * editor, back/next story links, and the theme toggle.
 */
const StoryNavigationLink: React.FC<StoryNavigationLinkProps> = ({
  label,
  onClick,
  iconLeft,
  iconRight,
  iconVendor,
  size = "small",
}) => (
  <LinkFlex>
    <Button
      as="div"
      inlined
      size={size}
      weight="medium"
      aria-label={label}
      onClick={onClick}
      iconLeft={iconLeft}
      iconRight={iconRight}
      iconVendor={iconVendor}
    >
      {label}
    </Button>
  </LinkFlex>
)

export default StoryNavigationLink
