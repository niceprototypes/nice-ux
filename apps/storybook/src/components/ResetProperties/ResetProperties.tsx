import * as React from "react"
import Flex from "@niceprototypes/flex"
import ResetPropertiesItem, { ResetPropertiesItemProps } from "./ResetPropertiesItem"

interface ResetPropertiesProps {
  /** The entries — one {@link ResetPropertiesItem} rendered per object. */
  items: ResetPropertiesItemProps[]
}

/**
 * A vertical list of {@link ResetPropertiesItem} entries — one heading +
 * elements + description per item. A scannable list for MDX docs.
 */
const ResetProperties: React.FC<ResetPropertiesProps> = ({ items }) => (
  <Flex direction="column" gap="larger">
    {items.map(item => (
      <ResetPropertiesItem key={item.token} {...item} />
    ))}
  </Flex>
)

export default ResetProperties
