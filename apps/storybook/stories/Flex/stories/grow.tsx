import { getToken } from "nice-styles"
import DemoDots from "../../../src/components/DemoDots"

export const growDots = [
  {
    value: 0,
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
        grow: 0,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 1,
      },
    ],
  },
  {
    value: 1,
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 1,
      },
    ],
  },
  {
    value: 2,
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 2,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        grow: 1,
      },
    ],
  },
]

export const prepareGrow = () =>
  growDots.map(({ value, dots }) => ({
    name: String(value),
    description: `grow={${value}}`,
    demo: <DemoDots bordered width="12rem" dots={dots} />,
    code: `<Flex>\n+1<Flex grow={${value}}>\n+2{children}\n+1</Flex>\n+2<Flex grow={1}>\n+1{children}\n+1</Flex>\n</Flex>`,
  }))
