import Flex, { GapSize } from "nice-react-flex"
import { getToken } from "nice-styles"
import DemoDots from "../../../src/components/DemoDots"

export const typeDots = [
  {
    value: "padding",
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
    value: "margin",
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

export const prepareType = () =>
  typeDots.map(({ value, dots }) => ({
    name: value,
    description: `type="${value}"`,
    default: value === "padding",
    demo: (
      <Flex direction="column">
        <Flex
          style={{
            border: `${getToken("borderWidth").var} solid ${value === "margin" ? getToken("borderColor").var : getToken("borderColor", "heavy").var}`,
            borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2 + 2px)`,
          }}
        >
          <Flex
            type={value}
            spacing={{ sm: { all: "base" as GapSize } }}
            style={{
              border: `${getToken("borderWidth").var} solid ${value === "margin" ? getToken("borderColor", "heavy").var : "transparent"}`,
              borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2 + 2px)`,
            }}
          >
            <DemoDots dots={dots} />
          </Flex>
        </Flex>
      </Flex>
    ),
    code: `<Flex type="${value}">\n+1{children}\n</Flex>`,
  }))
