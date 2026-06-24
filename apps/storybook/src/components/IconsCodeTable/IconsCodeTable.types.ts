export interface IconsCodeTableProps {
  /** Header label for the code column (e.g. "getIcon", "Icon"). */
  codeHeader: string
  /** Builds the code snippet shown for a given icon name. */
  code: (name: string) => string
  /** Optional pinned width for the code column. @default "20em" */
  codeWidth?: string
}