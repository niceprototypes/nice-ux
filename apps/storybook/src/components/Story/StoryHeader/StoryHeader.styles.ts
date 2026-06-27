import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"

/**
 * Story header column — wraps the title, optional description, and any children
 * in a vertical Flex so the header stacks as one styled block, closed by a rule.
 */
export const HeaderFlex = styled(Flex).attrs({
  direction: "column",
})`
  border-bottom: 1px solid ${getToken("borderColor")};
`
