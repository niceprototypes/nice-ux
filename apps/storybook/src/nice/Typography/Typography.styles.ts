import styled from "styled-components"
import NiceTypography, { TypographyProps } from "nice-react-typography"
import { getReactToken } from "nice-react-styles"

export const StyledTypography = styled(NiceTypography)<TypographyProps>`
  a {
    color: ${getReactToken("foregroundColor", "link")};
  }
  code {
    font-family: ${getReactToken("fontFamily", "code")};
  }
`
