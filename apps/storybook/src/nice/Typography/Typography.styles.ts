import styled from "styled-components"
import NiceTypography, { TypographyProps } from "nice-react-typography"
import { getToken } from "nice-react-styles"

export const StyledTypography = styled(NiceTypography)<TypographyProps>`
  a {
    color: ${getToken("foregroundColor", "link").var};
  }
  code {
    font-family: ${getToken("fontFamily", "code").var};
  }
`
