import * as React from "react"
import type { DataColumn } from "../DataSection/DataSection.types"

export interface DataSectionRowProps {
  /** Column definitions — render policy and widths. */
  columns: DataColumn[]
  /** Cell values, index-aligned to `columns`. */
  values: React.ReactNode[]
  /** Strip CodeBlock card chrome on `shiki` cells. @default false */
  inline?: boolean
  /** Paint the row highlighted (deep-link arrival). @default false */
  highlighted?: boolean
}