import * as React from "react"

export type CodeRowLanguage = "tsx" | "css"

export interface CodeRowProps {
  previewCell: React.ReactNode
  /**
   * Source for the row's code cell(s). A single string renders one cell; an
   * array renders one cell per entry, laid out left-to-right in row order
   * (e.g. `[cssVar, getTokenCall]` shows the CSS variable before the accessor).
   */
  code: string | string[]
  language?: CodeRowLanguage
  previewCellWidth?: string
  /**
   * When true, the previewCell renders outside (just before) the row Flex
   * and takes full width, while the row Flex continues to lay out the
   * remaining cells (currently the code source). Useful for previews that
   * need to span the full container — e.g. Tile demos that lose their
   * visible footprint when constrained to the default 45% column.
   */
  fullWidth?: boolean
}
