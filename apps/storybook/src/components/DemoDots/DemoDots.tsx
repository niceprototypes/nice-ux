import Flex, { GapSize } from "nice-react-flex"
import Demo from "../Demo"
import { DemoProps } from "../Demo/types"
import { generateDemoDots, DotConfig } from "./utilities/generateDemoDots"

interface DemoDotsProps {
  gap?: GapSize
  direction?: "row" | "column"
  dots?: DotConfig[]
  demos?: DemoProps[]
}

const DemoDots = ({ gap, direction, dots, demos }: DemoDotsProps) => {
  const items = dots ? generateDemoDots(dots) : demos ?? []

  return (
    <Flex gap={gap} direction={direction}>
      {items.map((demoProps, index) => (
        <Demo key={index} {...demoProps} />
      ))}
    </Flex>
  )
}

export default DemoDots