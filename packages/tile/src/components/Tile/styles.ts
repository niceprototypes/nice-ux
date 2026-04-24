import styled, { css } from "styled-components"
import Flex from "nice-react-flex"
import { getTileToken } from "../../tokens"

export const OuterFlex = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $backgroundImage?: string
  $backgroundColor?: string
  $foregroundColor?: string
  $backgroundPosition?: string
  $backgroundSize?: string
  $backgroundAttachment?: string
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${getTileToken("backgroundColor").var};
  color: ${getTileToken("foregroundColor").var};

  ${({ $backgroundColor }) => {
    if ($backgroundColor) {
      return css`
        background-color: ${$backgroundColor};
      `
    }
  }}

  ${({ $foregroundColor }) => {
    if ($foregroundColor) {
      return css`
        color: ${$foregroundColor};
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

export const InnerFlex = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $maxWidthMedium?: number
  $maxWidthLarge?: number
}>`
  margin: 0 auto;
  width: 100%;

  ${({ $maxWidthMedium }) => $maxWidthMedium && css`
    @media (min-width: ${$maxWidthMedium}px) {
      width: ${$maxWidthMedium}px;
    }
  `}

  ${({ $maxWidthLarge }) => $maxWidthLarge && css`
    @media (min-width: ${$maxWidthLarge}px) {
      width: ${$maxWidthLarge}px;
    }
  `}
`
