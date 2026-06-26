import * as React from "react"
import { CodeBlockDiv } from "./CodeBlock.styles"
import { CodeBlockBody } from "./CodeBlockBody"
import { copyToClipboard } from "../../services/copyToClipboard"

interface CodeBlockProps {
  code: string
  language?: string
  /** Show the language label in the top-right corner. @default true */
  showLabel?: boolean
  /**
   * When true (default), clicking the block copies its code to the clipboard
   * via `navigator.clipboard.writeText`.
   */
  copyOnClick?: boolean
  /**
   * Strip the card chrome — margin, padding, border, border-radius, and
   * box-shadow — so the code sits flush inline. @default false
   */
  inline?: boolean
  /**
   * Shrink the card to its content — `display: flex; align-items: center;
   * width: max-content` on the bordered wrapper — so it sits inline beside other
   * content rather than filling the row. @default false
   */
  fit?: boolean
}

/** Render a code string as Shiki dual-theme HTML. Use anywhere code is shown. */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLabel = true,
  copyOnClick = true,
  inline = false,
  fit = false,
}) => {
  const handleClick = copyOnClick ? () => copyToClipboard(code) : undefined

  const body = (
    <CodeBlockBody
      code={code}
      language={language}
      showLabel={showLabel}
      inline={inline}
      fit={fit}
    />
  )

  // fit: a single stable element — CodeBlockDiv lays out the code + label in a
  // centered, content-sized row via CSS ($fit), so the DOM shape never changes
  // between fit and non-fit.
  return (
    <CodeBlockDiv
      onClick={handleClick}
      $clickable={copyOnClick}
      $inline={inline}
      $fit={fit}
    >
      {body}
    </CodeBlockDiv>
  )
}

/**
 * Replacement for the markdown `pre` component in MDX docs.
 *
 * Storybook's default routes fenced code through its own <Source> block, which
 * renders multi-line blocks empty once an upstream highlighter is involved.
 * Reading the raw code straight off the child <code> element and rendering
 * Shiki ourselves bypasses Storybook's code path entirely — single- and
 * multi-line blocks both work.
 */
export const ShikiPre = ({ children, ...rest }: { children?: React.ReactNode }) => {
  const codeEl = React.Children.toArray(children).find(React.isValidElement) as
    | React.ReactElement<{ className?: string; children?: React.ReactNode }>
    | undefined

  const className = codeEl?.props?.className ?? ""
  const raw = codeEl?.props?.children
  const code = typeof raw === "string" ? raw.replace(/\n$/, "") : ""
  const langMatch = /language-(\w+)/.exec(className)

  // Not a fenced code block we can highlight — leave it as a plain <pre>.
  if (!langMatch || !code) return <pre {...rest}>{children}</pre>

  return (
    <CodeBlock
      code={code}
      language={langMatch[1]}
    />
  )
}
