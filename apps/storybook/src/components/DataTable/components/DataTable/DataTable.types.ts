import * as React from "react"
import type { ColorType, FontSizeType, GapType } from "nice-react-styles"

/** Language for a `shiki`-rendered column. */
export type DataLanguage = "tsx" | "css"

/** How a column's cell values are rendered. */
export type DataColumnRender = "node" | "shiki" | "text"

/** A column definition — the single owner of a column's render policy, header, and width. */
export interface DataColumn {
  /** Stable identity for the column (also the React key for its cells). */
  key: string
  /** Header label; `null`/omitted renders an empty header cell (e.g. a preview). */
  header?: React.ReactNode | null
  /**
   * - `"node"` (default): the value is a ReactNode, rendered as-is.
   * - `"shiki"`: the value is a code string, rendered in a Shiki CodeBlock.
   * - `"text"`: the value is wrapped in a `<Ink>` styled by `code`/`size`/`color`.
   * @default "node"
   */
  render?: DataColumnRender
  /** (`text`) render in the monospace code font. */
  code?: boolean
  /** (`text`) Ink font size. */
  size?: FontSizeType
  /** (`text`) Nice text color. */
  color?: ColorType
  /**
   * Clicking the cell copies to the clipboard, with the hover copy-icon
   * affordance. `text`/string `shiki` copy the string value; `node` copies the
   * cell's text content. `shiki` defaults on; `text`/`node` default off.
   */
  clickToCopy?: boolean
  /** (`shiki`) syntax-highlight language. @default "tsx" */
  language?: DataLanguage
}

/** One row — `values` index-aligned to the table's `columns`. */
export interface DataRowItem {
  /** Stable identity (React key, deep-link highlight target). */
  id: string
  /** Cell values, index-aligned to `columns`. */
  values: React.ReactNode[]
  /** Paint this row highlighted (deep-link arrival). @default false */
  highlighted?: boolean
}

/**
 * One table in the set. The single, recursive shape used by every instance: an
 * optional `name` heading, and then either `rows` (a leaf table) or `tables`
 * (sub-tables nested one heading level deeper). A node may carry both.
 */
export interface DataTableConfig {
  /** Heading above this table (level derives from nesting depth: h2, h3, h4…). */
  name?: React.ReactNode
  /** This table's rows. */
  rows?: DataRowItem[]
  /** Nested sub-tables, rendered one heading level below this one. */
  tables?: DataTableConfig[]
}

export interface DataTableProps {
  /** Column definitions shared by every table — render policy, headers, widths. */
  columns: DataColumn[]
  /** The tables, in render order. A single table is just a one-element array. */
  tables: DataTableConfig[]
  /**
   * Fixed CSS widths (at tablet+) index-aligned to `columns`; `null`/omitted/short
   * leaves a column equal-flex.
   */
  columnWidths?: (string | null)[]
  /** Render the column header row above each table. @default true */
  showHeader?: boolean
  /**
   * Draw a divider between consecutive rows, and under the column header. Never
   * after the last row. @default false
   */
  showLines?: boolean
  /**
   * Collapse rows flush against each other by dropping each row's top padding and
   * keeping only the bottom rim. Independent of `showLines`. @default false
   */
  condensed?: boolean
  /**
   * Vertical padding on each row's outermost Flex, applied as the gap-token
   * shorthand `${rowSpacing} none` (vertical only; horizontal stays flush).
   * Omitted leaves rows with no extra vertical padding.
   */
  rowSpacing?: GapType
}