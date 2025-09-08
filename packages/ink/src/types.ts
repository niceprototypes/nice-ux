import * as React from "react"

export type TypographyAsType = "h1" | "h2" | "h3" | "h4" | "p" | "span"

export type StatusType = 
  | "success"
  | "error"
  | "warning"
  | "active"
  | "default"
  | "disabled"
  | "highlighted"
  | "primary"
  | "secondary"

export type TypographyProps = {
  as?: TypographyAsType
  size?: number // 1-6, where 1 is smallest and 6 is largest
  weight?: number
  color?: string
  antialiased?: boolean
  legibilityOptimized?: boolean
  align?: "left" | "center" | "right" | "justify"
  lineHeight?: "default" | "condensed"
  status?: StatusType
  code?: boolean
  children: React.ReactNode
  className?: string
}
