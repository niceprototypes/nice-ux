import Flex, { GapSize } from "nice-react-flex"
import Demo from "../Demo"
import { DemoProps } from "../Demo/types"

interface DemoListProps {
  gap?: GapSize
  direction?: "row" | "column"
  demos: DemoProps[]
}

const DemoList = ({ gap, direction, demos }: DemoListProps) => {
  return (
    <Flex gap={gap} direction={direction}>
      {demos.map((demoProps, index) => (
        <Demo key={index} {...demoProps} />
      ))}
    </Flex>
  )
}

export default DemoList