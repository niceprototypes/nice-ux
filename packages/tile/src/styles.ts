import styled, { css } from "styled-components"

export const OuterStyled = styled.div<{
  $backgroundImage?: string
  $backgroundColor?: string
  $isMobile?: boolean
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
      return css`
        background-color: ${$backgroundColor};
      `
    }
  }}

  ${({ $backgroundImage, $isMobile }) => {
    if ($backgroundImage) {
      return css`
        background-image: ${$backgroundImage};
        background-attachment: fixed;
        background-size: ${$isMobile ? 'auto 100%' : 'cover'};
        background-position: center;
        background-repeat: no-repeat;
      `
    }
  }}
`

export const InnerStyled = styled.div<{
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