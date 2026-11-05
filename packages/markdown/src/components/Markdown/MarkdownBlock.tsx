import * as React from "react"
import { astToJSX, type MarkdownToJSX } from "markdown-to-jsx/react"

type MarkdownBlockProps = {
  /** One top-level block of the parsed source */
  node: MarkdownToJSX.ASTNode
  /** The block's serialised node: equal strings mean the block is unchanged */
  signature: string
  /** The options every block renders with */
  options: MarkdownToJSX.Options
}

/**
 * One top-level block. It re-renders only when its content or the options change, so while a
 * reply streams only the last block re-renders.
 */
const MarkdownBlock = React.memo(
  ({ node, options }: MarkdownBlockProps) => <>{astToJSX([node], options)}</>,
  (previous, next) => previous.signature === next.signature && previous.options === next.options,
)

export default MarkdownBlock
