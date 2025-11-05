import * as React from "react"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"

export interface TileSlotProps {
  children?: React.ReactNode
  title?: React.ReactNode
  titleAlign?: "left" | "center" | "right"
  titleColor?: string
}

const TileSlot: React.FC<TileSlotProps> = ({
  children,
  title,
  titleAlign = "left",
  titleColor,
}) => {
  return (
    <Flex direction="column" gap={5}>
      {title && (
        <Flex
          direction="column"
          spacing={{ sm: { horizontal: 4 }, md: { horizontal: 0 } }}
        >
          <Typography as="h4" size={5} align={titleAlign} color={titleColor}>
            {title}
          </Typography>
        </Flex>
      )}
      {children}
    </Flex>
  )
}

export default TileSlot