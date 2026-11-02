import * as React from "react"

interface PlainProps {
  /**
   * Optional inline element to wrap the unwrapped content in (e.g. "span")
   * when you need a hook for styling. Omit for a bare fragment — no element.
   */
  as?: keyof React.JSX.IntrinsicElements
  /** CSS class applied to the `as` element (ignored when `as` is omitted). */
  className?: string
  children?: React.ReactNode
}

/**
 * Strips the `<p>` that MDX/remark wraps around prose, so text can sit inline
 * (next to a component, inside a flex row, etc.) instead of in a block paragraph.
 *
 * Works whether the text is written inline or on its own lines:
 *
 * ```mdx
 * <Plain>Stays inline — no &lt;p&gt;</Plain>
 *
 * <Plain>
 *
 * Also unwrapped — the &lt;p&gt; MDX adds here is removed.
 *
 * </Plain>
 * ```
 *
 * Multi-line input compiles to a `<p>` child, which is replaced by its inner
 * content; inline input arrives as a raw string and passes through untouched.
 * Non-`<p>` children (components, code, etc.) are left as-is.
 */
const Plain: React.FC<PlainProps> = ({ as, className, children }) => {
  // Replace any wrapping <p> child with its inner content; pass everything else through
  const unwrapped = React.Children.map(children, child =>
    React.isValidElement(child) && child.type === "p"
      ? (child.props as { children?: React.ReactNode }).children
      : child
  )

  // No `as` → bare fragment, no wrapper element at all
  if (!as) return <>{unwrapped}</>

  const As = as
  return <As className={className}>{unwrapped}</As>
}

export default Plain
