import styled from "styled-components"
import NiceInk, { InkProps } from "nice-react-ink"
import { getToken } from "nice-react-styles"

export const StyledInk = styled(NiceInk)<InkProps>`
  a {
    color: ${getToken("color", "link")};
  }
  code {
    font-family: ${getToken("fontFamily", "code")};
  }
`
