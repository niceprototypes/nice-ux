import * as React from "react"
import type { ColorType, FontSizeType } from "nice-react-styles"

/** Language for a `shiki`-rendered column. */
export type DataLanguage = "tsx" | "css"

/** How a column's cell values are rendered. */
export type DataColumnRender = "node" | "shiki" | "text"

/**
 * A column definition — the single owner of a column's render policy, header,
 * and width. This is the data-first inversion of the old `Code*` system, where
 * those three concerns were three positional arrays (`columns`, `columnHeaders`,
 * `columnWidths`) threaded per row. Here a row carries only values; the column
 * says how each is rendered.
 */
export interface DataColumn {
  /** Stable identity for the column (also the React key for its cells). */
  key: string
  /** Header label; `null`/omitted renders an empty header cell (e.g. preview). */
  header?: React.ReactNode | null
  /** Fixed CSS width at tablet+; `null`/omitted leaves the column equal-flex. */
  width?: string | null
  /**
   * How this column's values render:
   * - `"node"` (default): the value is an arbitrary ReactNode, rendered as-is.
   * - `"shiki"`: the value is a code string, rendered in a Shiki CodeBlock. A
   *   value that is a module-token root var becomes a deep link to its story.
   * - `"text"`: the value is wrapped in a `<Typography>` styled by the options
   *   below (`code` / `size` / `color`).
   * @default "node"
   */
  render?: DataColumnRender
  /** (`text`) render in the monospace code font. */
  code?: boolean
  /** (`text`) Typography font size. */
  size?: FontSizeType
  /** (`text`) Nice text color. */
  color?: ColorType
  /**
   * (`text`/string `shiki`) clicking the cell copies its string value. `shiki`
   * CodeBlocks already copy; this adds the affordance to a `text` string cell.
   */
  clickToCopy?: boolean
  /** (`shiki`) syntax-highlight language. @default "tsx" */
  language?: DataLanguage
}

/**
 * One row of data. `values` are index-aligned to the table's `columns`. The row
 * is pure data — no React.Children, no per-cell render flags (those live on the
 * column).
 */
export interface DataRowItem {
  /** Stable identity (React key, deep-link highlight target). */
  id: string
  /** Cell values, index-aligned to `columns`. */
  values: React.ReactNode[]
  /** Paint this row highlighted (deep-link arrival). @default false */
  highlighted?: boolean
  /**
   * Hoist the first value above the row at full width, the rest laid out in the
   * row below. For previews that need the full container (e.g. Tile demos).
   * @default false
   */
  fullWidth?: boolean
}

/** One (sub)table: an optional section name and its rows. */
export interface DataTableSpec {
  /** Section name shown in the leading name column (first row only). */
  name?: string
  /** The table's rows. */
  rows: DataRowItem[]
}

export interface DataTableProps extends DataTableSpec {
  /** Column definitions — render policy, headers, widths. */
  columns: DataColumn[]
  /** Strip CodeBlock card chrome on `shiki` cells (flush inline). @default false */
  inline?: boolean
  /** Render the header row from `columns[].header`. @default true */
  showHeader?: boolean
  /**
   * Width of the leading name column when `name` is set. @default "12em"
   */
  nameWidth?: string
}
