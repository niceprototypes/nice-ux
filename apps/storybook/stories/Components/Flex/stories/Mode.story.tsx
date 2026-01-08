import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"
import { twoDots } from "../Flex.services"

const ModeStory = () => (
  <Story
    variables={["padding", "margin"].map(value => ({
      name: value,
      description: `mode="${value}"`,
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
              mode={value as "padding" | "margin"}
              spacing="base"
              style={{
                border: `${getToken("borderWidth").var} solid ${value === "margin" ? getToken("borderColor", "heavy").var : "transparent"}`,
                borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2 + 2px)`,
              }}
            >
              <DemoDots dots={twoDots} />
            </Flex>
          </Flex>
        </Flex>
      ),
      code: `<Flex mode="${value}">\n+1{children}\n</Flex>`,
    }))}
  />
)

export default ModeStory
