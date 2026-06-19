import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

/**
 * Fixed bottom-right control bar — the flex wrapper holding the back/next nav
 * and the theme toggle in one row.
 */
export const FooterFlex = styled(Flex).attrs({
  alignItems: "center",
  gap: "small",
})`
  position: fixed;
  bottom: ${getToken("gap", { variant: "large" })};
  right: ${getToken("gap", { variant: "large" })};
  z-index: 9999;
`
