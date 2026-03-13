import * as React from "react"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import type { TileContentProps } from "./types"

const TileContent: React.FC<TileContentProps> = ({
  children,
  contentTop,
  contentCenter,
  title,
  titleAs,
  titleSize,
  description,
  descriptionSize,
  align,
  gap,
  mode,
}) => {
  return (
    <Flex direction="column" gap={gap}>
      {contentTop}
      {title && (
        <Typography
          as={titleAs}
          size={titleSize}
          weight="semibold"
          align={align}
          mode={mode}
        >
          {title}
        </Typography>
      )}
      {contentCenter}
      {description && (
        <Typography
          color="light"
          size={descriptionSize}
          align={align}
          mode={mode}
        >
          {description}
        </Typography>
      )}
      {children}
    </Flex>
  )
}

export default TileContent
