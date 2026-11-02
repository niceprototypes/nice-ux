import * as React from "react"

/**
 * Render a data-file string: `backtick` spans become `<code>`, everything else
 * stays text. The only markup the JSON carries, so prose stays searchable and
 * free of JSX.
 */
export const renderInline = (text: string): React.ReactNode =>
  text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith("`") && part.endsWith("`") && part.length > 1 ? <code key={index}>{part.slice(1, -1)}</code> : part
  )
