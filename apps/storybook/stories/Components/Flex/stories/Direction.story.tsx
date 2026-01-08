import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"
import { twoDots } from "../Flex.services"

const DirectionStory = () => (
  <Story
    variables={["row", "column"].map(value => ({
      name: value,
      description: `direction="${value}"`,
      demo: <DemoDots direction={value} dots={twoDots} />,
      code: `<Flex direction="${value}">\n+1{children}\n</Flex>`,
    }))}
  />
)

export default DirectionStory
