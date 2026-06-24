import * as React from "react"
import type { ColorType, FontSizeType } from "nice-react-styles"

export type CodeRowLanguage = "tsx" | "css"

/**
 * A single column's width. A CSS length/percentage string sets that column's
 * width; `null` (or an omitted entry) leaves the column at its default
 * equal-flex width.
 */
export type ColumnWidth = string | null

/**
 * Per-cell rendering options, matched to `cells` by index. The row is
 * structural — these options tell it how to render a given cell. `shiki` makes
 * it a syntax-highlighted code block; the rest style a plain (non-`shiki`)
 * cell's Typography.
 */
export interface CodeColumn {
  /**
   * Render this cell as a Shiki syntax-highlighted code block (the cell must be
   * a code string). When false/omitted the cell renders as-is. @default false
   */
  shiki?: boolean
  /**
   * Render a non-`shiki` cell's text in the monospace code font (Typography
   * `code`). @default false
   */
  code?: boolean
  /**
   * Font size applied to a non-`shiki` cell's Typography. @default none
   */
  size?: FontSizeType
  /**
   * Apply this Nice text color to a non-`shiki` cell's Typography. A Typography
   * cell receives it directly; a plain string cell is wrapped in a styled
   * `<Typography>`. No effect on `shiki` cells. @default none
   */
  color?: ColorType
  /**
   * Make a non-`shiki` cell with a string value click-to-copy — clicking copies
   * the string to the clipboard, the same affordance a `shiki` CodeBlock has.
   * No effect on `shiki` cells (already copyable) or non-string cells.
   * @default false
   */
  clickToCopy?: boolean
}

export interface CodeRowProps {
  /**
   * The row's cells, left-to-right. A cell whose `columns` entry sets
   * `shiki: true` is a code string rendered in a CodeBlock; every other cell is
   * an arbitrary node rendered as-is (a rendered component, a Flex pairing an
   * example with a label, a value, …), optionally styled via its column's
   * `code` / `size` / `color`.
   */
  cells: React.ReactNode[]
  /**
   * Options for each cell, matched by index (`columns[i]` describes `cells[i]`).
   * A `null` (or missing) entry means a plain, non-code cell.
   */
  columns?: (CodeColumn | null)[]
  /** Language for code cells. @default "tsx" */
  language?: CodeRowLanguage
  /**
   * Render code cells inline — strips the CodeBlock card chrome (margin,
   * padding, border, border-radius, box-shadow). @default false
   */
  inline?: boolean
  /**
   * Hoist the first cell out above the row at full width, while the row lays
   * out the remaining cells. Useful for previews that need to span the full
   * container — e.g. Tile demos. @default false
   */
  fullWidth?: boolean
  /**
   * Text for the leading "name" cell (index 0). Rendered only when
   * `nameColumn` is true. Within a CodeTable, only the first row receives a
   * `name`; the remaining rows get an empty name cell.
   */
  name?: string
  /**
   * Reserve the leading name cell (index 0) even when `name` is empty, so a set
   * of sibling rows keep their columns aligned. CodeTable sets this on every
   * row when the table has a `name`. @default false
   */
  nameColumn?: boolean
  /**
   * Per-column CSS widths applied positionally over the row's columns at
   * tablet+ (where the row lays out horizontally). Column order is
   * [name cell?, ...cells]; entry `i` sets that column's width, a `null`/omitted
   * entry leaves it at the default equal-flex width. The hoisted first cell in
   * `fullWidth` mode is not a row column.
   */
  columnWidths?: ColumnWidth[]
  /**
   * Paint the row as the active/highlighted one (background-color: yellow).
   * Set by a module table when a `parseTokenVarLink` deep link targets this
   * row's variant. @default false
   */
  highlighted?: boolean
}