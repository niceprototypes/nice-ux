import type { DataColumn } from "../DataSection/DataSection.types"

export interface DataSectionHeaderProps {
  /** Column definitions — each `header` labels its column. */
  columns: DataColumn[]
}