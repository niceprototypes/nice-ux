import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import { DemoDotProps } from "./types"

const DemoDot = ({
  backgroundColor,
  borderRadius,
  spacing,
  height = "auto",
  width = "auto",
  grow,
  style,
}: DemoDotProps) => (
  <Flex grow={grow} spacing={spacing}>
    <Flex
      grow={1}
      style={{
        backgroundColor,
        borderRadius,
        height,
        width,
        ...style,
      }}
    />
  </Flex>
)

export default DemoDot
