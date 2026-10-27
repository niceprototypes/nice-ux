import * as React from "react"
import Flex from "nice-react-flex"
import ContentMain from "../ContentMain"
import type { TileContentProps } from "./TileContent.types"

const TileContent: React.FC<TileContentProps> = ({
  children,
  contentTop,
  contentCenter,
  title,
  titleProps,
  description,
  descriptionProps,
  theme,
  gap,
  alignItems,
  justifyContent,
}) => {
  const hasContentMain = !!title || !!description || !!contentCenter

  return (
    <Flex direction="column" grow={1} gap={gap} alignItems={alignItems} justifyContent={justifyContent}>
      {contentTop}
      {hasContentMain && (
        <ContentMain
          title={title}
          titleProps={titleProps}
          contentCenter={contentCenter}
          description={description}
          descriptionProps={descriptionProps}
          theme={theme}
          gap={gap}
        />
      )}
      {children}
    </Flex>
  )
}

export default TileContent
