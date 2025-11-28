import Flex, { GapSize } from "nice-react-flex"
import Demo from "../Demo"
import { DemoProps } from "../Demo/types"
import { generateDemoDots, DotConfig } from "./utilities/generateDemoDots"
import { getToken } from "../../../../nice-styles/src"

type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"

interface DemoDotsProps {
  gap?: GapSize
  direction?: "row" | "column"
  justifyContent?: JustifyContent
  spacing?: GapSize
  width?: string
  bordered?: boolean
  dots?: DotConfig[]
  demos?: DemoProps[]
}

const DemoDots = ({
  gap,
  direction,
  justifyContent,
  spacing,
  width,
  bordered,
  dots,
  demos,
}: DemoDotsProps) => {
  const items = dots ? generateDemoDots(dots) : demos ?? []

  const style = {
    width,
    ...(bordered && {
      borderRadius: getToken("borderRadius", "smaller").var,
      border: `${getToken("borderWidth").var} solid ${getToken("borderColor").var}`,
    }),
  }

  return (
    <Flex
      gap={gap}
      direction={direction}
      justifyContent={justifyContent}
      spacing={{ sm: { all: spacing } }}
      style={style}
    >
      {items.map((demoProps, index) => (
        <Demo key={index} {...demoProps} />
      ))}
    </Flex>
  )
}

export default DemoDots