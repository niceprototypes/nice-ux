import * as React from "react"

export type DocsRowLanguage = "tsx" | "css"

export interface DocsRowProps {
  previewCell: React.ReactNode
  code: string
  language?: DocsRowLanguage
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
