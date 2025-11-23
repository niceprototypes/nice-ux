import styled from "styled-components"
import Flex from "nice-react-flex"

const BREAKPOINT_MD_MIN = "768px"

export const CellFlex = styled(Flex)<{ $width?: string }>`
  gap: var(--font-size-base);
  @media (min-width: ${BREAKPOINT_MD_MIN}) {
    width: ${props => props.$width};
  }
`