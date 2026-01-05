import styled from "styled-components"
import { getBreakpoint } from "nice-styles"

export const LabelWrapper = styled.div`
  ${getBreakpoint("tablet").query} {
    width: 10em;
  }
`
