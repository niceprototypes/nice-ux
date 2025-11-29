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

type AlignItems = "flex-start" | "flex-end" | "center" | "baseline" | "stretch"

interface DemoDotsProps {
  gap?: GapSize
  direction?: "row" | "column"
  justifyContent?: JustifyContent
  alignItems?: AlignItems
  spacing?: GapSize
  width?: string
  height?: string
  bordered?: boolean
  dots?: DotConfig[]
  demos?: DemoProps[]
}

const DemoDots = ({
  gap,
  direction,
  justifyContent,
  alignItems,
  spacing,
  width,
  height,
  bordered,
  dots,
  demos,
}: DemoDotsProps) => {
  const items = dots ? generateDemoDots(dots) : demos ?? []

  const style = {
    width,
    height,
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
      alignItems={alignItems}
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