import * as React from "react"
import type { FlexProps } from "nice-react-flex"
import { ContentFlexStyled } from "./ContentFlex.styles"

type ContentFlexProps = FlexProps & {
  /** Cap the content at nice-storybook-theme's `contentMaxWidth`. @default false */
  wrapped?: boolean
}

/**
 * The storybook Flex: nice-react-flex's Flex plus an optional content-width cap.
 * Nestable — wrap a whole page, or one section inside it. A capped ContentFlex
 * cannot let a child grow wider than itself, so leave an outer one uncapped when
 * a section inside it must be full width.
 */
const ContentFlex: React.FC<ContentFlexProps> = ({ wrapped = false, ...props }) => (
  <ContentFlexStyled {...props} $wrapped={wrapped} />
)

export default ContentFlex
