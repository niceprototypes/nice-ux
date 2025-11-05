import * as React from "react"
import Flex from "nice-react-flex"
import TileSlot from "./TileSlot"

export interface TileTopProps {
  children?: React.ReactNode
  title?: React.ReactNode
  titleAlign?: "left" | "center" | "right"
  titleColor?: string
  contentLeft?: React.ReactNode
  contentRight?: React.ReactNode
  spacing?: string
}

const TileTop: React.FC<TileTopProps> = ({
  children,
  title,
  titleAlign = "left",
  titleColor,
  contentLeft,
  contentRight,
  spacing = "var(--nice-tile-spacing, 8rem)",
}) => {
  return (
    <Flex direction="column" gap={6}>
      {!!contentLeft || !!contentRight ? (
        <Flex
          direction={{ sm: "column", md: "row" }}
          alignItems="center"
          gap={5}
          spacing={{ vertical: spacing }}
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
        <Flex direction="column" spacing={{ vertical: spacing }}>
          <TileSlot title={title} titleAlign={titleAlign} titleColor={titleColor}>
            {children}
          </TileSlot>
        </Flex>
      )}
    </Flex>
  )
}

export default TileTop