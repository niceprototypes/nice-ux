import * as React from "react"

interface StoryHeaderProps {
  /** The page title text rendered as the `<h1>`. */
  title: React.ReactNode
  /** Optional content rendered between the title and the horizontal rule. */
  children?: React.ReactNode
}

/**
 * Story header — renders the `title` as an `<h1>`, then any `children`, then a
 * horizontal rule. Inserted by `Story` at the top of every docs page.
 */
const StoryHeader: React.FC<StoryHeaderProps> = ({ title, children }) => (
  <>
    <h1>{title}</h1>
    {children}
    <hr />
  </>
)

export default StoryHeader
