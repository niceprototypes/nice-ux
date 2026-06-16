import styled from "styled-components"
import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"

// Outer wrapper for a vertical set of CodeRow instances.
export const TableFlex = styled(Flex)`
  border-top: 1px solid ${getToken("borderColor")};
`
