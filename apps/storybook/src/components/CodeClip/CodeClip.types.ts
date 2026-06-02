import * as React from "react"

export interface CodeClipProps {
  children: React.ReactNode
  /**
   * When true (default), clicking the code copies its text content to the
   * clipboard via `navigator.clipboard.writeText`.
   */
  copyOnClick?: boolean
}
