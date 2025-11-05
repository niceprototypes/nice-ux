import * as React from "react"
import Flex from "nice-react-flex"
import TileSlot from "./TileSlot"

export interface TileLayoutProps {
  children?: React.ReactNode
  title?: React.ReactNode
  titleAlign?: "left" | "center" | "right"
  titleColor?: string
  contentLeft?: React.ReactNode
  contentRight?: React.ReactNode
}

const TileLayout: React.FC<TileLayoutProps> = ({
  children,
  title,
  titleAlign = "left",
  titleColor,
  contentLeft,
  contentRight,
}) => {
  return (
    <Flex direction="column" gap={6}>
      {!!contentLeft || !!contentRight ? (
        <Flex
          direction={{ sm: "column", md: "row" }}
          alignItems="center"
          gap={5}
        >
          {contentLeft}
          <Flex direction="column" grow={1}>
            <TileSlot title={title} titleAlign={titleAlign} titleColor={titleColor}>
              {children}
            </TileSlot>
          </Flex>
          {contentRight}
        </Flex>
      ) : (
        <TileSlot title={title} titleAlign={titleAlign} titleColor={titleColor}>
          {children}
        </TileSlot>
      )}
    </Flex>
  )
}

export default TileLayout