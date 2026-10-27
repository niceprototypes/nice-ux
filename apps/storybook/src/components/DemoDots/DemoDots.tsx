import Flex from "@niceprototypes/flex"
import { getToken } from "@niceprototypes/styles"
import { DemoDotsProps } from "./DemoDots.types"
import DemoDot from "./DemoDot"
import { trackStyle } from "../../dataTables/utilities/dots"

const DemoDots = ({
  gap,
  direction,
  justifyContent,
  alignItems,
  wrap,
  spacing,
  width,
  height,
  bordered,
  dots = [],
}: DemoDotsProps) => {
  return (
    <Flex direction="column">
      <Flex
        gap={gap}
        direction={direction}
        justifyContent={justifyContent}
        alignItems={alignItems}
        wrap={wrap}
        padding={spacing}
        style={{
          height,
          width,
          padding: !spacing && 1,
          gap: !gap && 1,
          ...(bordered && trackStyle),
        }}
      >
        {dots.map(
          ({ color, width: dotWidth, height: dotHeight, grow }, index) => (
            <DemoDot
              key={index}
              backgroundColor={color}
              borderRadius={`calc(${getToken("size", "smaller")} / 2)`}
              width={dotWidth}
              height={dotHeight}
              grow={grow}
            />
          )
        )}
      </Flex>
    </Flex>
  )
}

export default DemoDots
