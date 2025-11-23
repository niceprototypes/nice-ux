import Flex, { GapSize } from "nice-react-flex"
import Demo from "../Demo"

interface FlexDemoProps {
  gap?: GapSize
}

const FlexDemo = ({ gap }: FlexDemoProps) => {
  return (
    <Flex alignItems="center" gap={gap}>
      <Demo
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "hsla(180, 40%, 60%, 1)",
          borderRadius: "2px",
        }}
      />
      <Demo
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "hsla(240, 80%, 80%, 1)",
          borderRadius: "2px",
        }}
      />
    </Flex>
  )
}

export default FlexDemo