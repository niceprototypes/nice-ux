import * as React from "react"
import Flex from "nice-react-flex"
import TokenSummaryItem, { TokenSummaryItemProps } from "./TokenSummaryItem"

interface TokenSummaryProps {
  /** The summary entries — one {@link TokenSummaryItem} rendered per object. */
  items: TokenSummaryItemProps[]
}

/**
 * A vertical list of {@link TokenSummaryItem} entries — one heading + description
 * + callout per item. Replaces a dense summary table with a scannable list for
 * MDX docs.
 */
const TokenSummary: React.FC<TokenSummaryProps> = ({ items }) => (
  <Flex direction="column" gap="larger">
    {items.map(item => (
      <TokenSummaryItem key={item.token} {...item} />
    ))}
  </Flex>
)

export default TokenSummary
