import * as React from "react"
import { ColumnWidth } from "../CodeRow/CodeRow.types"

/**
 * A single column's header label. A string renders inside a Typography in that
 * column's header cell; `null` (or an omitted entry) leaves the cell empty.
 */
export type ColumnHeader = string | null

export interface CodeTableProps {
  /**
   * Section name shown in the leading cell of the first row. When set, every
   * row reserves a leading name cell so columns stay aligned; only the first
   * row displays the text.
   */
  name?: string
  /**
   * Per-column CSS widths applied positionally to every row's columns at
   * tablet+ (where rows lay out horizontally). Entry `i` sets column `i`'s
   * width; a `null`/omitted entry leaves that column at its default equal-flex
   * width, and entries past the column count are ignored — e.g.
   * `["10%", null, "200px"]` pins columns 1 and 3 if a third column exists.
   *
   * Vary widths per viewport via the `breakpoints` prop, e.g.
   * `breakpoints={{ "laptop+": { columnWidths: ["20%", null, "300px"] } }}`.
   */
  columnWidths?: ColumnWidth[]
  /**
   * Optional header row rendered as the table's first row. Each entry is
   * placed positionally in its column — same order and `columnWidths`
   * constraints as the data rows — with a string rendered inside a Typography
   * and `null` leaving that column's header empty. E.g.
   * `[null, null, "CSS", "JS"]` labels only the two code columns.
   */
  columnHeaders?: ColumnHeader[]
  /** CodeRow instances. Optional — a header-only table (just `columnHeaders`)
   * has no rows. */
  children?: React.ReactNode
}
