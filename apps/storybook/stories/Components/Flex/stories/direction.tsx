import { getToken } from "nice-styles"
import DemoDots from "../../../src/components/DemoDots"

export const directionDots = [
  {
    value: "row",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "column",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

export const prepareDirection = () =>
  directionDots.map(({ value, dots }) => ({
    name: value,
    description: `direction="${value}"`,
    demo: <DemoDots direction={value} dots={dots} />,
    code: `<Flex direction="${value}">\n+1{children}\n</Flex>`,
  }))
