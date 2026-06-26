import type { DataColumn } from "../DataTables/DataTables.types"

export interface DataTablesHeaderProps {
  /** Column definitions — each `header` labels its column. */
  columns: DataColumn[]
}