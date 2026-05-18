import styled from "styled-components"
import NiceTypography, { TypographyProps } from "nice-react-typography"
import { getToken } from "nice-react-styles"

export const StyledTypography = styled(NiceTypography)<TypographyProps>`
  a {
    color: ${getToken("foregroundColor", "link")};
  }
  code {
    font-family: ${getToken("fontFamily", "code")};
  }
`
