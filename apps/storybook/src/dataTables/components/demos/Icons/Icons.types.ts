export interface IconTableProps {
  /** Code columns, in order, rendered after the name column. */
  codeColumns: IconTableColumn[]
}

/** One code column — its header, snippet builder, and optional width. */
export interface IconTableColumn {
  /** Header label for this code column (e.g. "getIcon", "Icon"). */
  header: string
  /** Builds the code snippet shown for a given icon name. */
  code: (name: string) => string
  /** Optional pinned width. @default "20em" */
  width?: string
}
