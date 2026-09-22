import styled from "styled-components"
import Icon from "nice-react-icon"

import { getBreakpoint, getToken } from "nice-styles"

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

export const WelcomeLinkDiv = styled.div<{ $stripped?: boolean }>`
  display: block;
  cursor: pointer;
  border: ${({ $stripped }) => ($stripped ? "0" : `1px solid ${getToken("borderColor")}`)};
  border-radius: ${getToken("borderRadius")};
  box-shadow: ${({ $stripped }) => ($stripped ? "none" : getToken("boxShadow"))};
  max-width: ${getToken("contentMaxWidth")};

  h3 {
    line-height: ${getToken("size", "small")};
  }

  &:hover {
    border: ${({ $stripped }) => ($stripped ? "0" : `1px solid ${getToken("color", "link")}`)};
    color: ${getToken("color", "link")};
    
    h3, span {
      color: inherit;
    }
    
    svg * {
      stroke: ${getToken("color", "link")};
    }

    ${ArrowIcon} {
      opacity: 1;
    }
  }
`