import * as React from "react"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import type { ContentMainProps } from "./types"

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
  mode,
  title,
  titleProps,
}) => (
  <Flex direction="column" gap={gap} style={{ width: "100%" }}>
    {title && (
      <Typography
        as="h3"
        weight="semibold"
        mode={mode}
        {...titleProps}
      >
        {title}
      </Typography>
    )}
    {contentCenter}
    {description && (
      Array.isArray(description)
        ? (
          <Flex direction="column">
            {description.map((text, index) => (
              <Typography
                key={index}
                color="light"
                mode={mode}
                {...descriptionProps}
              >
                {text}
              </Typography>
            ))}
          </Flex>
        )
        : (
          <Typography
            color="light"
            mode={mode}
            {...descriptionProps}
          >
            {description}
          </Typography>
        )
    )}
  </Flex>
)

export default ContentMain
