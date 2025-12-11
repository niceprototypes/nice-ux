import styled from "styled-components"
import Flex from "nice-react-flex"
import { getToken } from "nice-styles"

const BREAKPOINT_MD_MIN = "768px"

interface StyledFlexProps {
  $width?: string
  $code?: boolean
}

export const OuterFlex = styled(Flex)<StyledFlexProps>`
  &:first-child > div:last-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  &:last-child > div:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`

export const CellFlex = styled(Flex)<StyledFlexProps>`
  ${props => props.$code && `background-color: hsla(220, 5%, 15%, 1);`}
  @media (min-width: ${BREAKPOINT_MD_MIN}) {
    width: ${props => props.$width};
  }
`

export const DefaultFlex = styled(Flex)<StyledFlexProps>`
`
