import * as React from "react"
import Flex from "nice-react-flex"
import TileContent from "../TileContent"
import type { TileLayoutProps } from "./types"

const TileLayout: React.FC<TileLayoutProps> = ({
  children,
  contentTop,
  contentRight: TileRight,
  contentCenter,
  contentLeft: TileLeft,
  title,
  titleProps,
  description,
  descriptionProps,
  mode,
  gap,
}) => {
  return (
    <Flex direction="column" gap="larger">
      {!!TileLeft || !!TileRight ? (
        <Flex
          direction={{ small: "column", medium: "row" }}
          gap="large"
        >
          {TileLeft}
          <Flex direction="column" grow={1}>
            <TileContent
              contentTop={contentTop}
              contentCenter={contentCenter}
              title={title}
              titleProps={titleProps}
              description={description}
              descriptionProps={descriptionProps}
              mode={mode}
              gap={gap}
            >
              {children}
            </TileContent>
          </Flex>
          {TileRight}
        </Flex>
      ) : (
        <TileContent
          contentTop={contentTop}
          contentCenter={contentCenter}
          title={title}
          titleProps={titleProps}
          description={description}
          descriptionProps={descriptionProps}
          mode={mode}
          gap={gap}
        >
          {children}
        </TileContent>
      )}
    </Flex>
  )
}

export default TileLayout
