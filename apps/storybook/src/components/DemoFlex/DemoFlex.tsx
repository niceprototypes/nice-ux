import Flex, { GapSize } from "nice-react-flex"
import BorderedBox from "../BorderedBox"

interface DemoFlexProps {
  gap?: GapSize
}

const DemoFlex = ({ gap }: DemoFlexProps) => {
  return (
    <Flex alignItems="center" gap={gap}>
      <BorderedBox
        width="20px"
        height="20px"
        backgroundColor="#3b82f6"
        borderRadius="2px"
        borderWidth="0"
      />
      <BorderedBox
        width="20px"
        height="20px"
        backgroundColor="#8b5cf6"
        borderRadius="2px"
        borderWidth="0"
      />
    </Flex>
  )
}

export default DemoFlex