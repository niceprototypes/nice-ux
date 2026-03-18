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
        Array.isArray(description)
          ? (
            <Flex direction="column" gap={descriptionSize}>
              {description.map((text, index) => (
                <Typography
                  key={index}
                  color="light"
                  size={descriptionSize}
                  align={align}
                  mode={mode}
                >
                  {text}
                </Typography>
              ))}
            </Flex>
          )
          : (
            <Typography
              color="light"
              size={descriptionSize}
              align={align}
              mode={mode}
            >
              {description}
            </Typography>
          )
      )}
      {children}
    </Flex>
  )
}

export default TileContent
