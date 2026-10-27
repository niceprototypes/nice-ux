import * as React from "react"
import Flex from "nice-react-flex"
import Ink from "nice-react-ink"
import type { ContentMainProps } from "./ContentMain.types"

/**
 * ContentMain
 *
 * Renders the Tile's primary content column — title, optional center slot,
 * and description (string or array of strings). Extracted from TileContent
 * so the title/description layout can be reused or swapped independently.
 */
const ContentMain: React.FC<ContentMainProps> = ({
  contentCenter,
  description,
  descriptionProps,
  gap,
  theme,
  title,
  titleProps,
}) => (
  <Flex direction="column" gap={gap} style={{ width: "100%" }}>
    {title && (
      <Ink
        as="h3"
        weight="semibold"
        theme={theme}
        {...titleProps}
      >
        {title}
      </Ink>
    )}
    {contentCenter}
    {description && (
      Array.isArray(description)
        ? (
          <Flex direction="column">
            {description.map((text, index) => (
              <Ink
                key={index}
                color="light"
                theme={theme}
                {...descriptionProps}
              >
                {text}
              </Ink>
            ))}
          </Flex>
        )
        : (
          <Ink
            color="light"
            theme={theme}
            {...descriptionProps}
          >
            {description}
          </Ink>
        )
    )}
  </Flex>
)

export default ContentMain