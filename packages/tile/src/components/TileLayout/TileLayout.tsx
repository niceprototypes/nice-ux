import * as React from "react"
import Flex from "nice-react-flex"
import TileContent from "../TileContent"
import type { TileLayoutProps } from "./types"

const TileLayout: React.FC<TileLayoutProps> = ({
  children,
  contentTop,
  contentCenter,
  contentLeft: TileLeft,
  contentRight: TileRight,
  title,
  titleAs,
  titleSize,
  description,
  descriptionSize,
  align,
  gap,
  mode,
}) => {
  const content = (
    <TileContent
      contentTop={contentTop}
      contentCenter={contentCenter}
      title={title}
      titleAs={titleAs}
      titleSize={titleSize}
      description={description}
      descriptionSize={descriptionSize}
      align={align}
      gap={gap}
      mode={mode}
    >
      {children}
    </TileContent>
  )

  return (
    <Flex direction="column" gap="larger">
      {!!TileLeft || !!TileRight ? (
        <Flex
          direction={{ mobile: "column", tablet: "row" }}
          alignItems="center"
          gap="large"
        >
          {TileLeft}
          <Flex direction="column" grow={1}>
            {content}
          </Flex>
          {TileRight}
        </Flex>
      ) : content}
    </Flex>
  )
}

export default TileLayout
