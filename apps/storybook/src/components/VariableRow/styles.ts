import styled from "styled-components"
import Flex from "nice-react-flex"

const BREAKPOINT_MD_MIN = "768px"

export const SpacerSpan = styled.span`
  opacity: 0;
`

export const CellFlex = styled(Flex)<{ $width?: string }>`
  @media (min-width: ${BREAKPOINT_MD_MIN}) {
    width: ${props => props.$width};
  }
`