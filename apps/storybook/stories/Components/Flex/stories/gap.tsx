import { getToken } from "nice-styles"
import DemoDots from "../../../../src/components/DemoDots"

export const gapDots = [
  {
    value: "smaller",
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
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "small",
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
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "base",
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
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "large",
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
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
  {
    value: "larger",
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
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "smaller").var,
        width: getToken("cellHeight", "smaller").var,
      },
    ],
  },
]

export const prepareGap = () =>
  gapDots.map(({ value, dots }) => ({
    name: value,
    description: `gap="${value}"`,
    value: getToken("gap", value).value,
    demo: <DemoDots gap={value} dots={dots} />,
    code: `<Flex gap="${value}">\n+1{children}\n</Flex>`,
  }))
