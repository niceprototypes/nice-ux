import * as React from "react"
import { parser } from "markdown-to-jsx/react"
import { StyledMarkdown } from "./Markdown.styles"
import MarkdownBlock from "./MarkdownBlock"
import type { MarkdownProps } from "./Markdown.types"
import { getMarkdownOptions } from "../../utilities/getMarkdownOptions"

/**
 * Markdown text through Nice components: headings, paragraphs and list items as Ink, fenced code
 * as Code, inline code as `Code inlined`, links through `linkComponent` or an anchor.
 *
 * The source is parsed whole (reference links resolve across blocks), then each top-level block
 * renders on its own and is memoised on its content, so a streaming reply re-renders only the
 * block still growing. Blocks sit `markdown.gap` apart.
 */
const Markdown: React.FC<MarkdownProps> = ({ children, linkComponent, size, overrides }) => {
  const options = React.useMemo(
    () => getMarkdownOptions({ linkComponent, size, overrides }),
    [linkComponent, size, overrides],
  )
  const blocks = React.useMemo(
    () => parser(children).map(node => ({ node, signature: JSON.stringify(node) })),
    [children],
  )
  return (
    <StyledMarkdown>
      {blocks.map(({ node, signature }, index) => (
        <MarkdownBlock key={index} node={node} signature={signature} options={options} />
      ))}
    </StyledMarkdown>
  )
}

export default Markdown
