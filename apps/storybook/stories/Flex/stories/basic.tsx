import { getToken } from "nice-styles"
import DemoDots from "../../../src/components/DemoDots"

export const basicDots = [
  {
    value: "",
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

export const prepareBasic = () =>
  basicDots.map(({ value, dots }) => ({
    name: value,
    demo: <DemoDots dots={dots} />,
    code: `<Flex>\n+1{children}\n</Flex>`,
  }))
