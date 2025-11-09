import styled, { css } from "styled-components"
import Flex from "nice-react-flex"

export const OuterStyled = styled.div<{
  $backgroundImage?: string
  $backgroundColor?: string
  $backgroundPosition?: string
  $backgroundSize?: string
  $backgroundAttachment?: string
  $fullWidth?: boolean
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
      return css`
        background-color: ${$backgroundColor};
      `
    }
  }}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $backgroundAttachment }) => {
    if ($backgroundImage) {
      return css`
        background-image: ${$backgroundImage};
        background-size: ${$backgroundSize || "cover"};
        background-position: ${$backgroundPosition || "center"};
        background-repeat: no-repeat;

        @media (orientation: landscape) {
          background-attachment: ${$backgroundAttachment || "fixed"};
        }
      `
    }
  }}
`

export const InnerStyled = styled(Flex)<{
  $isComplete?: boolean
  $breakpointMd?: number
  $breakpointLg?: number
}>`
  margin: 0 auto;
  width: 100%;

  ${({ $breakpointLg }) => $breakpointLg && css`
    @media (min-width: ${$breakpointLg}px) {
      width: ${$breakpointLg}px;
    }
  `}
`