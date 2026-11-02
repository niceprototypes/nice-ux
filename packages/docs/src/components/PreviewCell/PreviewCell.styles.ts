import styled, { css } from "styled-components"
import Flex from "@niceprototypes/flex"

/**
 * The swatch box. Every value arrives as a transient prop so the CSS lives here
 * rather than in an inline style object at each call site.
 *
 * Fill, size and border are each emitted only when given: a cell with no
 * `$borderColor` draws no border at all, which is how a caller asks for a
 * borderless swatch (there is no separate "none" prop to keep in sync).
 */
export const CellFlex = styled(Flex).attrs({ padding: "none base" })<{
  $backgroundColor?: string
  $borderColor?: string
  $borderWidth: string
  $borderRadius: string
  $height?: string
  $width?: string
}>`
  border-radius: ${({ $borderRadius }) => $borderRadius};

  ${({ $backgroundColor }) => $backgroundColor && css`background-color: ${$backgroundColor};`}
  ${({ $height }) => $height && css`height: ${$height};`}
  ${({ $width }) => $width && css`width: ${$width};`}
  ${({ $borderColor, $borderWidth }) => $borderColor && css`border: ${$borderWidth} solid ${$borderColor};`}
`
