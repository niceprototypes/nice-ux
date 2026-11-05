import * as React from "react"
import { RuleType, type MarkdownToJSX } from "markdown-to-jsx/react"
import Ink from "@niceprototypes/ink"
import Code from "@niceprototypes/code"
import type { MarkdownProps } from "../components/Markdown/Markdown.types"

type Children = { children?: React.ReactNode }
type Heading = Children & { id?: string }

/**
 * The markdown-to-jsx options for Markdown's props: headings, paragraphs and list items through
 * Ink, links through `linkComponent` or an anchor, `overrides` over those; fenced code as a Code
 * block and inline code as `Code inlined`, unless `overrides` replaces `pre` or `code`.
 */
export const getMarkdownOptions = ({
  linkComponent: Link,
  size,
  overrides,
}: Omit<MarkdownProps, "children">): MarkdownToJSX.Options => ({
  // Top-level blocks render one by one, so none needs a wrapper.
  wrapper: null,
  overrides: {
    h1: ({ children, id }: Heading) => <Ink as="h1" id={id} size="larger" weight="semibold">{children}</Ink>,
    h2: ({ children, id }: Heading) => <Ink as="h2" id={id} size="large" weight="semibold">{children}</Ink>,
    h3: ({ children, id }: Heading) => <Ink as="h3" id={id} weight="semibold">{children}</Ink>,
    p: ({ children }: Children) => <Ink as="p" size={size}>{children}</Ink>,
    li: ({ children }: Children) => (
      <li>
        <Ink size={size}>{children}</Ink>
      </li>
    ),
    a: ({ children, href = "" }: Children & { href?: string }) =>
      Link ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>,
    ...overrides,
  },
  renderRule: (next, node, _renderChildren, state) => {
    // Fenced code: a Code block, its spacing left to markdown.gap.
    if (node.type === RuleType.codeBlock && !overrides?.pre && !overrides?.code)
      return <Code key={state.key} code={node.text} language={node.lang} margin="none" />
    if (node.type === RuleType.codeInline && !overrides?.code) return <Code key={state.key} code={node.text} inlined />
    return next()
  },
})
