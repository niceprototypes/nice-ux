import * as React from "react"

export interface ThemedFrameProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  /**
   * Text on the overlay that covers the frame until it is clicked.
   * @default "Click to scroll"
   */
  toggleLabel?: string
}
