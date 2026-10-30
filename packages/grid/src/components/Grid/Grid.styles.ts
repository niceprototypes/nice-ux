import styled from "styled-components"
import { getGapSize, getSpacingValue, styleSpacing } from "@niceprototypes/flex"
import type {
  GridAlignItemsType,
  GridColumnsType,
  GridGapType,
  GridMarginType,
  GridMinChildWidthType,
  GridPaddingType,
  GridRowsType,
} from "./Grid.types"

/** Column tracks: auto-filled from `minChildWidth` when set, else `columns` equal tracks. */
const columnTracks = ({ $columns, $minChildWidth }: { $columns: GridColumnsType; $minChildWidth?: GridMinChildWidthType }) =>
  $minChildWidth
    ? `repeat(auto-fill, minmax(min(${$minChildWidth}, 100%), 1fr))`
    : `repeat(${$columns}, minmax(0, 1fr))`

/** The grid container. Gap and spacing resolve through Flex's token services. */
export const StyledGrid = styled.div<{
  $columns: GridColumnsType
  $minChildWidth?: GridMinChildWidthType
  $rows?: GridRowsType
  $gap: GridGapType
  $alignItems: GridAlignItemsType
  $padding?: GridPaddingType
  $margin?: GridMarginType
  $fit: boolean
}>`
  display: grid;
  grid-template-columns: ${columnTracks};
  ${({ $rows }) => ($rows ? `grid-template-rows: repeat(${$rows}, minmax(0, 1fr));` : "")}
  gap: ${({ $gap }) => getGapSize($gap)};
  align-items: ${({ $alignItems }) => $alignItems};
  ${({ $fit }) => ($fit ? "width: max-content;" : "")}
  ${({ $padding }) => styleSpacing("padding", getSpacingValue($padding))}
  ${({ $margin }) => styleSpacing("margin", getSpacingValue($margin))}
`
