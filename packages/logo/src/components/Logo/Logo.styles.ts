import styled from "styled-components"
import { Illustration } from "@niceprototypes/icon"
import { getToken } from "@niceprototypes/styles"
import type { LogoGapType, LogoHeightType, LogoNameHeightScaleType } from "./Logo.types"

/**
 * The root: its height is the `height` prop in pixels, or the `logo.height` token when unset;
 * each piece takes its width from its SVG's viewBox. The space between them is the `gap` prop's
 * core gap token, or the `logo.gap` token when unset (a fixed length, so nothing shrinks).
 */
export const StyledLogo = styled.span<{ $height?: LogoHeightType; $gap?: LogoGapType }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  height: ${({ $height }) => ($height === undefined ? getToken("logo.height") : `${$height}px`)};
  gap: ${({ $gap }) => ($gap === undefined ? getToken("logo.gap") : getToken("gap", $gap))};

  svg {
    height: 100%;
  }
`

/**
 * The heart: @niceprototypes/icon's illustration, square at the logo's full height instead of an
 * icon size. Doubled class so these sizes win over the illustration's own icon-size rules.
 */
export const StyledHeart = styled(Illustration)`
  && {
    height: 100%;
    width: auto;
    aspect-ratio: 1;
  }
`

/**
 * The name: `$heightScale` of the logo's height (`nameHeightScale`), filled with the
 * `logo.color` token so it follows the theme.
 */
export const StyledName = styled.span<{ $heightScale: LogoNameHeightScaleType }>`
  display: block;
  height: ${({ $heightScale }) => `${$heightScale * 100}%`};
  fill: ${getToken("logo.color:base")};
`
