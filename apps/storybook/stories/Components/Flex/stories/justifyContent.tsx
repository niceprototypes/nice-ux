import { getToken } from "nice-styles"
import DemoDots from "../../../../src/components/DemoDots"

export const justifyContentDots = [
  {
    value: "flex-start",
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
    value: "flex-end",
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
    value: "center",
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
    value: "space-between",
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
    value: "space-around",
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
    value: "space-evenly",
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

export const prepareJustifyContent = () =>
  justifyContentDots.map(({ value, dots }) => ({
    name: value,
    description: `justifyContent="${value}"`,
    demo: (
      <DemoDots justifyContent={value} dots={dots} width="12rem" bordered />
    ),
    code: `<Flex justifyContent="${value}">\n+1{children}\n</Flex>`,
  }))
