import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"
import { CodeDiv } from "../Code/Code.styles"

/** The icon's colour variable (Icon reads `icon.color`), set here so the icon follows the block. */
const ICON_COLOR = getToken("icon.color:base", { as: "key" })

/** The copy icon's column: the block's top-right corner beside the code, in line with its padding. */
export const CopyDiv = styled.div`
  flex: none;
  display: flex;
  padding: ${getToken("gap")};
`

/**
 * The copy icon itself, operable: the divider colour at rest, the code's text colour while the
 * block is hovered or holds focus. It has no hover style of its own; a focus ring shows on keys.
 */
export const CopySpan = styled.span`
  display: inline-flex;
  cursor: pointer;
  ${ICON_COLOR}: ${getToken("borderColor")};
  border-radius: ${getToken("code.borderRadius:small")};

  ${CodeDiv}:hover &,
  ${CodeDiv}:focus-within & {
    ${ICON_COLOR}: ${getToken("code.color:base")};
  }

  &:focus-visible {
    outline: ${getToken("borderWidth", "large")} solid ${getToken("code.color:link")};
    outline-offset: ${getToken("borderWidth", "large")};
  }
`
