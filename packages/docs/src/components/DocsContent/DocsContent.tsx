import * as React from "react"
import { StyledDocsContent } from "./DocsContent.styles"

/**
 * DocsContent
 *
 * A docs page's content (an MDX page, a docs section page) laid out in the docs rhythm:
 * headings, prose, code, tables and rules spaced from one token scale.
 */
const DocsContent = ({ children, ref }: { children: React.ReactNode; ref?: React.Ref<HTMLDivElement> }) => (
  <StyledDocsContent ref={ref}>{children}</StyledDocsContent>
)

export default DocsContent
