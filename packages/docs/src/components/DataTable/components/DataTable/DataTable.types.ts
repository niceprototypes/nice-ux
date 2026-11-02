import * as React from "react"
import type { ColorType, FontSizeType, GapType } from "@niceprototypes/styles"

/** Language for a `@niceprototypes/code` column. */
export type DataLanguage = "tsx" | "css"

/** How a column's cell values are rendered; omit `render` to render the value as-is. */
export type DataColumnRender = "@niceprototypes/ink" | "@niceprototypes/code"

/** A column definition — the single owner of a column's render policy, header, and width. */
export interface DataColumn {
  /** Stable identity for the column (also the React key for its cells). */
  key: string
  /** Header label; `null`/omitted renders an empty header cell (e.g. a preview). */
  header?: React.ReactNode | null
  /**
   * - omitted (default): the value is a ReactNode, rendered as-is.
   * - `"@niceprototypes/code"`: the value is a code string, rendered by the nice `Code` component (inlined).
   * - `"@niceprototypes/ink"`: the value is wrapped in an `<Ink>` styled by `code`/`size`/`color`.
   */
  render?: DataColumnRender
  /** (`@niceprototypes/ink`) render in the monospace code font. */
  code?: boolean
  /** (`@niceprototypes/ink`) Ink font size. */
  size?: FontSizeType
  /** (`@niceprototypes/ink`) Nice text color. */
  color?: ColorType
  /**
   * Clicking the cell copies to the clipboard, with the hover copy-icon
   * affordance. `@niceprototypes/ink` / `@niceprototypes/code` copy the string value; a
   * node copies the cell's text content. `@niceprototypes/code` defaults on; the others default off.
   */
  clickToCopy?: boolean
  /** (`@niceprototypes/code`) syntax-highlight language. @default "tsx" */
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
  /** Cap each section heading at the content width (rows stay full width). @default false */
  sectionWrapped?: boolean
}