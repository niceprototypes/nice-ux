import styled from "styled-components"
import { getBreakpoint } from "nice-react-styles"

export const LabelWrapper = styled.div`
  ${getBreakpoint("tablet")} {
    width: 10em;
  }
`
