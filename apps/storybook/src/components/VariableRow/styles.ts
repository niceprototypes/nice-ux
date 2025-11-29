import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "../../../../nice-styles/src"

const BREAKPOINT_MD_MIN = "768px"

export const DefaultFlex = styled(Flex)`
  background-color: ${getToken("backgroundColor", "alternate").var};
  border-radius: ${getToken("borderRadius", "small").var};
  padding: 0.125rem 0.25rem;
  @media (min-width: ${BREAKPOINT_MD_MIN}) {
    width: ${props => props.$width}
  }
`

export const CellFlex = styled(Flex)`
  @media (min-width: ${BREAKPOINT_MD_MIN}) {
    width: ${props => props.$width}
  }
`
