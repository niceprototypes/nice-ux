import type * as React from "react"
import type { DataColumn } from "../DataSection/DataSection.types"

export interface DataSectionHeaderProps {
  /** Column definitions — each `header` labels its column. */
  columns: DataColumn[]
  /**
   * The leaf table's title, rendered in the first cell (small/semibold/base) in
   * place of that column's (empty) header. Set/cluster tables keep a heading
   * instead and don't pass this.
   */
  title?: React.ReactNode
}