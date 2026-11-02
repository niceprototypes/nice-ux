import * as React from "react"
import { copyToClipboard } from "../../services/copyToClipboard"
import { ClickToCopyWrapper } from "./ClickToCopy.styles"

interface ClickToCopyProps {
  /** Text written to the clipboard when the wrapped node is clicked. */
  text: string
  children: React.ReactNode
}

/**
 * Wraps any node so clicking it copies `text` to the clipboard — the same
 * affordance a shiki CodeBlock gives, reusable on Ink cells and the like.
 */
export const ClickToCopy: React.FC<ClickToCopyProps> = ({ text, children }) => (
  <ClickToCopyWrapper onClick={() => copyToClipboard(text)}>{children}</ClickToCopyWrapper>
)
