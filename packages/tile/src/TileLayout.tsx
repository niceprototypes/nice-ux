import * as React from "react"
import Flex from "nice-react-flex"
import TileSlot from "./TileSlot"

export interface TileLayoutProps {
  children?: React.ReactNode
  contentLeft?: React.ReactNode
  contentRight?: React.ReactNode
}

const TileLayout: React.FC<TileLayoutProps> = ({
  children,
  contentLeft: LeftRendered,
  contentRight: RightRendered,
}) => {
  const SlotRendered = (
    <TileSlot>
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