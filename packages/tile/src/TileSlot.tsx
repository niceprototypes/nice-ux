import * as React from "react"
import Flex from "nice-react-flex"

export interface TileSlotProps {
  children?: React.ReactNode
}

const TileSlot: React.FC<TileSlotProps> = ({
  children,
}) => {
  return (
    <Flex direction="column" gap="large">
      {children}
    </Flex>
  )
}

export default TileSlot