import type * as React from "react"

/** Props for the WelcomeLink component. */
export interface WelcomeLinkProps {
  /** Story to navigate to, e.g. `"basics-tokens--docs"`. */
  storyId: string
  /** Icon shown at the left of the card. */
  iconName: string
  /** Card heading. */
  title: string
  /** Supporting line under the heading. */
  children: React.ReactNode
}