import * as React from "react"

// MDX wraps inline content in <p>; unwrap so <Ink> doesn't nest a
// block-level <p> inside an inline element (or a styled element with its own
// block semantics).
export const unwrapMdxParagraph = (node: React.ReactNode): React.ReactNode => {
  if (React.isValidElement(node) && node.type === "p") {
    return (node.props as { children?: React.ReactNode }).children
  }
  return node
}
