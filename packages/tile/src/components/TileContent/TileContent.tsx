import * as React from "react"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import type { TileContentProps } from "./types"

const TileContent: React.FC<TileContentProps> = ({
  children,
  contentTop,
  contentCenter,
  title,
  titleProps,
  description,
  descriptionProps,
  align,
  mode,
}) => {
  const hasContentMain = !!title || !!description || !!contentCenter

  return (
    <Flex direction="column" gap="none">
      {contentTop}
      {hasContentMain && (
        <Flex direction="column">
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
      )}
      {children}
    </Flex>
  )
}

export default TileContent
