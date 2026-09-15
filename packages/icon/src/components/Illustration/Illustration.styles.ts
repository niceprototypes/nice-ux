import styled, { css, keyframes } from "styled-components"
import { getToken } from "nice-react-styles"
import type {
  IconSizeType,
  IconAnimationType,
  IconAnimationDurationType,
} from "../Icon/Icon.types"

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

/**
 * Illustration wrapper — the color-preserving counterpart to `IconWrapperStyled`.
 * Sizes the root and forwards the spin animation, but deliberately has NO
 * path fill/stroke recolor block: an illustration keeps the authored colors baked
 * into its SVG. (That recolor block is the one thing that would destroy them.)
 */
export const IllustrationWrapperStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => !String(prop).startsWith("$"),
})<{
  $size?: IconSizeType
  $animation?: IconAnimationType
  $animationDuration?: IconAnimationDurationType
}>`
  width: ${({ $size = "base" }) => getToken("size", $size, { prefix: "icon" })};
  height: ${({ $size = "base" }) => getToken("size", $size, { prefix: "icon" })};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  img, svg {
    width: 100%;
    height: 100%;
    ${({ $animation, $animationDuration = "base" }) => $animation === "spin" && css`
      animation: ${spin} ${getToken("animationDuration", $animationDuration, { prefix: "icon" })} linear infinite;
    `}
  }
`
