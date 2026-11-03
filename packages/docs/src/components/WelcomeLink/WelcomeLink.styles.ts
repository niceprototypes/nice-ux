import styled from "styled-components"
import Icon from "@niceprototypes/icon"

import { getBreakpoint, getTextHeight, getToken } from "@niceprototypes/styles"

/**
 * The trailing arrow.
 *
 * From laptop up it sits back at low opacity and comes forward on hover — a
 * pointer is available there, so the card can hint rather than announce. Below
 * laptop it stays fully opaque, since a touch user never sees the hover state.
 */
export const ArrowIcon = styled(Icon)`
  ${getBreakpoint("laptop+")} {
    opacity: 0.15;
  }
`

/** The leading icon, a square as tall as one line of the title (large type at condensed heading leading). */
export const LeadIcon = styled(Icon)`
  width: ${getTextHeight("large", "condensed")};
  height: ${getTextHeight("large", "condensed")};
`

export const WelcomeLinkDiv = styled.div<{ $stripped?: boolean }>`
  display: block;
  cursor: pointer;
  border: ${({ $stripped }) => ($stripped ? "0" : `1px solid ${getToken("borderColor")}`)};
  border-radius: ${getToken("borderRadius")};
  box-shadow: ${({ $stripped }) => ($stripped ? "none" : getToken("boxShadow"))};
  /* A raised surface, like a code block. */
  background-color: ${({ $stripped }) => ($stripped ? "transparent" : getToken("backgroundColor", "raised"))};

  h3 {
    line-height: ${getToken("size", "small")};
  }

  /* Highlighted in the base text colour: near-white at night, near-black by day. */
  &:hover,
  &:focus-visible {
    border: ${({ $stripped }) => ($stripped ? "0" : `1px solid ${getToken("color")}`)};
    color: ${getToken("color")};

    h3, span {
      color: inherit;
    }

    svg * {
      stroke: ${getToken("color")};
    }

    ${ArrowIcon} {
      opacity: 1;
    }
  }
`