import { getToken } from "nice-styles"
import DemoDots from "../../../../src/components/DemoDots"

export const wrapDots = [
  {
    value: "nowrap",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "success").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
      {
        color: getToken("foregroundColor", "disabled").var,
        height: getToken("cellHeight", "small").var,
        grow: 1,
      },
    ],
  },
  {
    value: "wrap",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "success").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "disabled").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
    ],
  },
  {
    value: "wrap-reverse",
    dots: [
      {
        color: getToken("foregroundColor", "error").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "warning").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "link").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "success").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
      {
        color: getToken("foregroundColor", "disabled").var,
        height: getToken("cellHeight", "small").var,
        width: getToken("cellHeight", "small").var,
      },
    ],
  },
]

export const prepareWrap = () =>
  wrapDots.map(({ value, dots }) => ({
    name: value,
    description: `wrap="${value}"`,
    demo: (
      <DemoDots
        wrap={value}
        dots={dots}
        width={`calc(${getToken("cellHeight", "small").var} * 3 + 2px)`}
        bordered
      />
    ),
    code: `<Flex wrap="${value}">\n+1{children}\n</Flex>`,
  }))
