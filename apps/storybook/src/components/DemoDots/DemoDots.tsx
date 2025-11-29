import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import { DemoDotsProps } from "./types"
import DemoDot from "./DemoDot"

const DemoDots = ({
  gap,
  direction,
  justifyContent,
  alignItems,
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
        spacing={{ sm: { all: spacing } }}
        style={{
          height,
          width,
          ...(bordered && {
            borderRadius: getToken("borderRadius", "smaller").var,
            border: `${getToken("borderWidth").var} solid ${getToken("borderColor").var}`,
          }),
        }}
      >
        {dots.map(({ color, width: dotWidth, height: dotHeight }, index) => (
          <DemoDot
            key={index}
            backgroundColor={color}
            borderRadius="50%"
            width={dotWidth}
            height={dotHeight}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default DemoDots
