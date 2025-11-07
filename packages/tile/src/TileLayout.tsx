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
  contentLeft: LeftRendered,
  contentRight: RightRendered,
}) => {
  const SlotRendered = (
    <TileSlot title={title} titleAlign={titleAlign} titleColor={titleColor}>
      {children}
    </TileSlot>
  )

  return (
    <Flex direction="column" gap={6}>
      {!!LeftRendered || !!RightRendered ? (
        <Flex
          direction={{ sm: "column", md: "row" }}
          alignItems="center"
          gap={5}
        >
          {LeftRendered}
          <Flex direction="column" grow={1}>
            {SlotRendered}
          </Flex>
          {RightRendered}
        </Flex>
      ) : SlotRendered}
    </Flex>
  )
}

export default TileLayout