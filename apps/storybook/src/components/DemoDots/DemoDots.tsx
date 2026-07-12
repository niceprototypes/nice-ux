import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import { DemoDotsProps } from "./DemoDots.types"
import DemoDot from "./DemoDot"

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
          ...(bordered && {
            borderRadius: `calc(${getToken("cellHeight", "smaller")} / 2 + 2px)`,
            border: `${getToken("borderWidth")} solid ${getToken("borderColor")}`,
          }),
        }}
      >
        {dots.map(
          ({ color, width: dotWidth, height: dotHeight, grow }, index) => (
            <DemoDot
              key={index}
              backgroundColor={color}
              borderRadius={`calc(${getToken("cellHeight", "smaller")} / 2)`}
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
