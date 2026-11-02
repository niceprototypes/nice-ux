import * as React from "react"
import Code from "@niceprototypes/code"

// MDX wraps inline content in <p>; unwrap so <Ink> doesn't nest a
// block-level <p> inside an inline element (or a styled element with its own
// block semantics).
export const unwrapMdxParagraph = (node: React.ReactNode): React.ReactNode => {
  if (React.isValidElement(node) && node.type === "p") {
    return (node.props as { children?: React.ReactNode }).children
  }
  return node
}

/** A `<code>` element's text, when its children are plain text (`value: {x}` included). */
const codeText = (children: React.ReactNode): string | undefined => {
  const parts = React.Children.toArray(children)
  return parts.every(part => typeof part === "string" || typeof part === "number") ? parts.join("") : undefined
}

/**
 * Inline code in prose as the portable inline Code: each `<code>` among the
 * children (and inside their host elements) becomes `<Code inlined>`, the chip
 * with its copy tooltip. A nested Ink handles its own children.
 */
export const inlineCode = (node: React.ReactNode): React.ReactNode =>
  React.Children.map(node, child => {
    if (!React.isValidElement(child) || typeof child.type !== "string") return child
    const { children } = child.props as { children?: React.ReactNode }
    const text = child.type === "code" ? codeText(children) : undefined
    if (text !== undefined) return <Code code={text} inlined margin="none" />
    return children === undefined ? child : React.cloneElement(child, undefined, inlineCode(children))
  })
