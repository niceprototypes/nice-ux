import * as React from "react"
import Typography from "../../../nice/Typography"
import Flex from "nice-react-flex"

interface StoryHeaderProps {
  /** The page title text rendered as the `<h1>`. */
  title: React.ReactNode
  /** Optional lead paragraph rendered under the title, above the rule. */
  description?: React.ReactNode
  /** Optional content rendered between the description and the horizontal rule. */
  children?: React.ReactNode
}

/**
 * Story header — renders the `title` as an `<h1>`, an optional `description`
 * paragraph, then any `children`, then a horizontal rule. Inserted at the top
 * of every docs page.
 */
const StoryHeader: React.FC<StoryHeaderProps> = ({ title, description, children }) => (
  <Flex direction="column" gap="base">
    <h1>{title}</h1>
    {description ? <Typography>{description}</Typography> : null}
    {children}
  </Flex>
)

export default StoryHeader
