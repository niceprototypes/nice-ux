import styled, { css } from "styled-components"
import Flex from "nice-react-flex"
import type { TileMaxWidthType } from "../Tile/Tile.types"

export const OuterFlex = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{
  $maxWidth?: TileMaxWidthType
}>`
  margin: 0 auto;
  width: 100%;

  ${({ $maxWidth }) =>
    // $maxWidth is a full CSS length ("980px") or "none" — both valid as-is.
    // Per-breakpoint variation is handled by the withBreakpoints wrapper.
    $maxWidth && css`max-width: ${$maxWidth};`}
`
