import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

/** Footer row: back on the left, next on the right, separated from the page by a top rule. */
export const NavFooter = styled(Flex).attrs({
  justifyContent: "space-between",
  alignItems: "center",
  gap: "base",
})`
  margin-top: ${getToken("gap", "larger")};
  padding-top: ${getToken("gap", "large")};
  border-top: ${getToken("borderWidth")} solid ${getToken("borderColor")};
`
