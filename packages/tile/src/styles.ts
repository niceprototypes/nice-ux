import styled from "styled-components"

export const InnerFlexStyled = styled.div<{ 
  $isComplete?: boolean
  $breakpointMd: number
  $breakpointLg: number
}>`
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: ${({ $breakpointMd }) => $breakpointMd}px) {
    /* Medium breakpoint styles can be added here if needed */
  }
  
  @media (min-width: ${({ $breakpointLg }) => $breakpointLg}px) {
    width: ${({ $breakpointLg }) => $breakpointLg}px;
  }
`