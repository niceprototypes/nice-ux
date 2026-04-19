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
  titleProps,
  description,
  descriptionProps,
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
          weight="semibold"
          align={align}
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
            <Flex direction="column" gap={descriptionProps?.size}>
              {description.map((text, index) => (
                <Typography
                  key={index}
                  color="light"
                  align={align}
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
              align={align}
              mode={mode}
              {...descriptionProps}
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
