import styled from "styled-components"
import { getToken } from "../../tokens"

/** The switch's label in the Contents rows' colour and weight, as it sits beside them. */
export const StyledThemeToggleLabel = styled.span`
  color: ${getToken("contents.color:base")};
  font-weight: ${getToken("contents.fontWeight:base")};
`
