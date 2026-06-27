import * as React from "react"
import Typography from "../../../nice/Typography"
import { HeaderFlex } from "./StoryHeader.styles"

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
  <HeaderFlex spacing="none none larger">
    <Typography as="h1" size="large" weight="base" color="lighter">{title}</Typography>
    {description ? <Typography>{description}</Typography> : null}
    {children}
  </HeaderFlex>
)

export default StoryHeader
