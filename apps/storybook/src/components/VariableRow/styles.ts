import styled from "styled-components"
import Flex from "nice-react-flex"

const BREAKPOINT_MD_MIN = "768px"

export const CellFlex = styled(Flex)<{ $width?: string }>`
  @media (min-width: ${BREAKPOINT_MD_MIN}) {
    flex-shrink: ${props => props.$width && "0"};
  }
    width: ${props => props.$width}
`
