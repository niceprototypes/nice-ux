import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "../../../../nice-styles/src"

const BREAKPOINT_MD_MIN = "768px"

interface StyledFlexProps {
  $width?: string
}

export const CellFlex = styled(Flex)<StyledFlexProps>`
  @media (min-width: ${BREAKPOINT_MD_MIN}) {
    width: ${props => props.$width}
  }
`
