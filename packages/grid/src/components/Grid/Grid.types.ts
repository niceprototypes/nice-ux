import type * as React from "react"
import type { GapType, SpacingShorthandType } from "@niceprototypes/styles"
import type { FlexAsType } from "@niceprototypes/flex"

/**
 * GridChildrenType
 *
 * The grid's items: GridItems, or any elements (each takes one cell).
 */
export type GridChildrenType = React.ReactNode

/**
 * GridColumnsType
 *
 * Number of equal column tracks: `repeat(columns, minmax(0, 1fr))`. Ignored when
 * `minChildWidth` is set.
 */
export type GridColumnsType = number

/**
 * GridMinChildWidthType
 *
 * Minimum item width; the grid fits as many columns of at least this width as the row holds:
 * `repeat(auto-fill, minmax(min(minChildWidth, 100%), 1fr))`. Overrides `columns`. Pass a token
 * value (`getToken(...)`), not an inline literal.
 */
export type GridMinChildWidthType = string

/**
 * GridRowsType
 *
 * Number of equal row tracks: `repeat(rows, minmax(0, 1fr))`. Unset, rows size to content.
 */
export type GridRowsType = number

/**
 * GridGapType
 *
 * Re-export of GapType from @niceprototypes/styles.
 * Space between rows and columns, from the core `gap` tokens (Flex's `getGapSize`).
 */
export type GridGapType = GapType

/**
 * GridAlignItemsType
 *
 * Block-axis alignment of items within their cells (CSS `align-items`).
 *
 * Values:
 * - "start"
 * - "end"
 * - "center"
 * - "baseline"
 * - "stretch": default, items fill the cell height
 */
export type GridAlignItemsType = "start" | "end" | "center" | "baseline" | "stretch"

/**
 * GridAsType
 *
 * Re-export of FlexAsType from @niceprototypes/flex.
 * HTML element to render. Use "ul" with GridItem `as="li"` for a list of cards.
 */
export type GridAsType = FlexAsType

/**
 * GridPaddingType
 *
 * Re-export of SpacingShorthandType from @niceprototypes/styles.
 * Internal padding as a CSS-like shorthand of 1–4 gap tokens.
 */
export type GridPaddingType = SpacingShorthandType

/**
 * GridMarginType
 *
 * Re-export of SpacingShorthandType from @niceprototypes/styles.
 * External margin as a CSS-like shorthand of 1–4 gap tokens.
 */
export type GridMarginType = SpacingShorthandType

/**
 * GridFitType
 *
 * Shrink the grid to its content width (`width: max-content`).
 */
export type GridFitType = boolean

/**
 * GridProps
 *
 * Complete prop definition for the Grid component: a CSS grid container for two-dimensional and
 * column layouts. Every prop takes per-viewport overrides through `breakpoints`.
 */
export interface GridProps {
  /** The grid's items */
  children?: GridChildrenType
  /**
   * Number of equal column tracks
   * @default 1
   */
  columns?: GridColumnsType
  /** Minimum item width; auto-fills columns and overrides `columns` */
  minChildWidth?: GridMinChildWidthType
  /** Number of equal row tracks */
  rows?: GridRowsType
  /**
   * Space between rows and columns
   * @default "base"
   */
  gap?: GridGapType
  /**
   * Alignment of items within their cells
   * @default "stretch"
   */
  alignItems?: GridAlignItemsType
  /**
   * HTML element to render
   * @default "div"
   */
  as?: GridAsType
  /** Internal padding as gap-token shorthand */
  padding?: GridPaddingType
  /** External margin as gap-token shorthand */
  margin?: GridMarginType
  /**
   * Shrink to content width
   * @default false
   */
  fit?: GridFitType
}

// Declaration merging: const + namespace creates exportable type namespace
const GridTypes = {} as const

namespace GridTypes {
  export type Children = GridChildrenType
  export type Columns = GridColumnsType
  export type MinChildWidth = GridMinChildWidthType
  export type Rows = GridRowsType
  export type Gap = GridGapType
  export type AlignItems = GridAlignItemsType
  export type As = GridAsType
  export type Padding = GridPaddingType
  export type Margin = GridMarginType
  export type Fit = GridFitType
  export type Props = GridProps
}

export default GridTypes
