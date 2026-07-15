import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

/**
 * Wrapper for a single StoryNavigation control. Overrides the inlined Button's
 * default link color with the bar's muted `lighter`, brightening to full `color`
 * on hover. Targets `[role="button"]` because each control renders as a clickable
 * `<div>` (`as="div" inlined`), not an anchor.
 */
export const LinkFlex = styled(Flex)`
  [role="button"] {
    position: relative;
    color: ${getToken("color", "lighter")} !important;

    &:hover {
      color: ${getToken("color")} !important;
    }
  }
`
