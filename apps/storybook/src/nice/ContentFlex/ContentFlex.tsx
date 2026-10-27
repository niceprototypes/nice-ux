import * as React from "react"
import type { FlexProps } from "@niceprototypes/flex"
import { ContentFlexStyled } from "./ContentFlex.styles"

type ContentFlexProps = FlexProps & {
  /** Cap the content at @niceprototypes/storybook-theme's `contentMaxWidth`. @default false */
  wrapped?: boolean
}

/**
 * The storybook Flex: @niceprototypes/flex's Flex plus an optional content-width cap.
 * Nestable — wrap a whole page, or one section inside it. A capped ContentFlex
 * cannot let a child grow wider than itself, so leave an outer one uncapped when
 * a section inside it must be full width.
 */
const ContentFlex: React.FC<ContentFlexProps> = ({
  wrapped = false,
  gap = "larger",
  ...props
}) => (
  <ContentFlexStyled
    {...props}
    gap={gap}
    $wrapped={wrapped}
  />
)

export default ContentFlex
