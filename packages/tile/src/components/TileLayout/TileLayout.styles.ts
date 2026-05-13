import styled, { css } from "styled-components"
import Flex from "nice-react-flex"
import { getBreakpoint } from "nice-react-styles"
import type { TileMaxWidthType, TileMaxWidthValueType } from "../Tile/Tile.types"

const renderMaxWidthValue = (value: TileMaxWidthValueType) =>
  value === "none" ? css`max-width: none;` : css`max-width: ${value}px;`

const renderResponsiveMaxWidth = ($maxWidth: TileMaxWidthType | undefined) => {
  if ($maxWidth === undefined) return null

  // Bare value applies at every breakpoint
  if (typeof $maxWidth === "number" || $maxWidth === "none") {
    return renderMaxWidthValue($maxWidth)
  }

  // Per-breakpoint object: small is base, medium/large emit media queries
  const { small, medium, large } = $maxWidth
  return css`
    ${small !== undefined ? renderMaxWidthValue(small) : null}
    ${medium !== undefined
      ? css`
          ${getBreakpoint("tablet")} {
            ${renderMaxWidthValue(medium)}
          }
        `
      : null}
    ${large !== undefined
      ? css`
          ${getBreakpoint("laptop")} {
            ${renderMaxWidthValue(large)}
          }
        `
      : null}
  `
}

export const OuterFlex = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $maxWidth?: TileMaxWidthType
}>`
  margin: 0 auto;
  width: 100%;

  ${({ $maxWidth }) => renderResponsiveMaxWidth($maxWidth)}
`
