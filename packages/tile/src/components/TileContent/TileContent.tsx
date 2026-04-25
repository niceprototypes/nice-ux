import * as React from "react"
import Flex from "nice-react-flex"
import ContentMain from "../ContentMain"
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
        <ContentMain
          title={title}
          titleProps={titleProps}
          contentCenter={contentCenter}
          description={description}
          descriptionProps={descriptionProps}
          mode={mode}
        />
      )}
      {children}
    </Flex>
  )
}

export default TileContent
