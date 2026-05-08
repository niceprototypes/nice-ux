import * as React from "react"

export type DocsRowLanguage = "tsx" | "css"

export interface DocsRowProps {
  previewCell: React.ReactNode
  code: string
  language?: DocsRowLanguage
  previewCellWidth?: string
}
