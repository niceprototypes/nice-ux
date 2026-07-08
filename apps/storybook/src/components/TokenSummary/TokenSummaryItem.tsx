import * as React from "react"
import Flex from "nice-react-flex"
import Typography from "../../nice/Typography"

export interface TokenSummaryItemProps {
  /** The key / token name, rendered as an `<h3>` in inline code (e.g. `borderBox`). */
  token: string
  /** The one-line description shown between the heading and the element list. */
  description?: React.ReactNode
  /** The HTML elements (or selectors) this item affects, rendered as inline code chips. */
  elements: string[]
}

/**
 * One entry in a {@link TokenSummary}: an `<h3>` code heading, a short
 * description, and the list of HTML elements it affects as inline code chips.
 * Replaces one row of a summary table with a scannable block.
 */
const TokenSummaryItem: React.FC<TokenSummaryItemProps> = ({ token, description, elements }) => (
  <Flex direction="column" gap="small">
    <Typography as="h3" code>{token}</Typography>
    {description != null && <Typography as="span">{description}</Typography>}
    <Flex gap="small" wrap="wrap">
      {elements.map(element => (
        <p><code>{element}</code></p>
      ))}
    </Flex>
  </Flex>
)

export default TokenSummaryItem
