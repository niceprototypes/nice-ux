import * as React from "react"

/**
 * Callout variants. Each maps to a leading emoji prefixed before the text.
 * Extend by adding a key here and an entry in {@link CALLOUT_EMOJI}.
 */
export type CalloutType = "hint" | "learning"

// Variant → leading emoji shown before the text.
const CALLOUT_EMOJI: Record<CalloutType, string> = {
  hint: "💡",
  learning: "🧠",
}

interface CalloutProps {
  /**
   * Callout variant. When set, prefixes the matching emoji (e.g. `hint` → 💡).
   * Omit for a plain blockquote with no emoji — effectively `> {children}`.
   */
  type?: CalloutType
  /** Callout text. */
  children?: React.ReactNode
}

/**
 * A blockquote callout for MDX docs. Renders `> {children}`; with a `type` set
 * it prefixes that variant's emoji inline before the text. With no `type` it is
 * a plain blockquote and no emoji.
 */
const Callout: React.FC<CalloutProps> = ({ type, children }) => {
  // Unwrap the <p> MDX wraps block-style children in, so we don't nest a <p>
  // inside the <p> rendered below.
  const content = React.Children.map(children, (child) =>
    React.isValidElement(child) && child.type === "p"
      ? (child.props as { children?: React.ReactNode }).children
      : child
  )

  return (
    <blockquote>
      {/* Wrap in a <p> to match the native markdown blockquote structure
          (<blockquote><p>…</p></blockquote>) the docs CSS styles via `blockquote p`;
          a bare text child renders unstyled as body text. The emoji sits inside
          the <p> so it stays inline with the text. */}
      <p>
        {/* Trailing nbsp + space — a second regular space would collapse in HTML. */}
        {type ? `${CALLOUT_EMOJI[type]} \u00A0` : null}
        {content}
      </p>
    </blockquote>
  )
}

export default Callout
