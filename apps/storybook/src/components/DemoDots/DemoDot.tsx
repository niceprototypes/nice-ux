import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import { DemoDotProps } from "./DemoDots.types"

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
