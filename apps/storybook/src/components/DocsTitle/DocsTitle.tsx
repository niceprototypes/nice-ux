import * as React from "react"

interface DocsTitleProps {
  /** The page title text rendered as the `<h1>`. */
  title: React.ReactNode
  /** Optional content rendered between the title and the horizontal rule. */
  children?: React.ReactNode
}

/**
 * Standard docs page title — renders the `title` as an `<h1>`, then any
 * `children`, then a horizontal rule, the equivalent of:
 *
 * ```md
 * # {title}
 *
 * {children}
 *
 * ---
 * ```
 *
 * Use at the top of every story MDX file in place of a bare `# Title` heading.
 * Pass intro content as children to place it between the title and the rule.
 */
const DocsTitle: React.FC<DocsTitleProps> = ({ title, children }) => (
  <>
    <h1>{title}</h1>
    {children}
    <hr />
  </>
)

export default DocsTitle
