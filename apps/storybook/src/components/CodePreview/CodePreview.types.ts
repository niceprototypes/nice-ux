export interface CodePreviewProps {
  code: string
  display?: "inline" | "flex" | "block"
  /** Enable click to copy code to clipboard */
  clipboard?: boolean
}
