export interface IllustrationTableProps {
  /** Code columns, in order, rendered after the name column. */
  codeColumns: IllustrationTableColumn[]
}

/** One code column — its header, snippet builder, and optional width. */
export interface IllustrationTableColumn {
  /** Header label for this code column (e.g. "getIllustration", "Illustration"). */
  header: string
  /** Builds the code snippet shown for a given illustration name. */
  code: (name: string) => string
  /** Optional pinned width. @default "20em" */
  width?: string
}
