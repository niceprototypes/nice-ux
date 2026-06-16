import * as React from "react"
import type { FontSizeType, FontWeightType } from "nice-react-styles"

export type CodeRowLanguage = "tsx" | "css"

/**
 * A single column's width. A CSS length/percentage string sets that column's
 * width; `null` (or an omitted entry) leaves the column at its default
 * equal-flex width.
 */
export type ColumnWidth = string | null

export interface CodeRowProps {
  previewCell: React.ReactNode
  /**
   * Source for the row's code cell(s). A single string renders one cell; an
   * array renders one cell per entry, laid out left-to-right in row order
   * (e.g. `[cssVar, getTokenCall]` shows the CSS variable before the accessor).
   */
  code: string | string[]
  language?: CodeRowLanguage
  /**
   * When true, the previewCell renders outside (just before) the row Flex
   * and takes full width, while the row Flex continues to lay out the
   * remaining cells (currently the code source). Useful for previews that
   * need to span the full container — e.g. Tile demos that lose their
   * visible footprint when constrained to the default 45% column.
   */
  fullWidth?: boolean
  /**
   * Render the code cell(s) inline — strips the CodeBlock card chrome (margin,
   * padding, border, border-radius, box-shadow). @default false
   */
  inline?: boolean
  /**
   * Text for the leading "name" cell (index 0). Rendered only when
   * `nameColumn` is true. Within a CodeTable, only the first row receives a
   * `name`; the remaining rows get an empty name cell.
   */
  name?: string
  /**
   * Reserve the leading name cell (index 0) even when `name` is empty, so a
   * set of sibling rows keep their columns aligned. CodeTable sets this on
   * every row when the table has a `name`. @default false
   */
  nameColumn?: boolean
  /**
   * Per-column CSS widths applied positionally to the row's columns at tablet+
   * (where the row lays out horizontally). Passed down by CodeTable; entry `i`
   * sets the width of column `i`, a `null`/omitted entry leaves that column at
   * its default equal-flex width, and entries beyond the column count are
   * ignored. Column order matches render order: [name cell?, preview, …code
   * cells, value?] (the preview is not a row column in `fullWidth` mode).
   */
  columnWidths?: ColumnWidth[]
  /**
   * Optional trailing cell for a plain value, rendered as the last column in a
   * `<Typography code>` (the code font, no Shiki highlighting). Use for token
   * values that should read as text, not a syntax-highlighted code block.
   */
  value?: React.ReactNode
  /**
   * Font size for the trailing value cell's Typography (maps to its `size`).
   * Passed down by CodeTable; no effect without `value`.
   */
  fontSize?: FontSizeType
  /**
   * Font weight for the trailing value cell's Typography (maps to its
   * `weight`). Passed down by CodeTable; no effect without `value`.
   */
  fontWeight?: FontWeightType
}
