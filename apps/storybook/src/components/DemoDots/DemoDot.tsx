import Flex from "@niceprototypes/flex"
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
  <Flex
    grow={grow}
    padding={spacing}
  >
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
