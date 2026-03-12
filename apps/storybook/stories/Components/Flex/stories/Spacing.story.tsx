import { getToken } from "nice-react-styles"
import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"
import { twoDots } from "../Flex.services"

const SpacingStory = () => (
  <Story
    variables={["smaller", "small", "base", "large", "larger"].map(value => ({
      name: value,
      description: `spacing="${value}"`,
      value: getToken("gap", value).value,
      demo: <DemoDots spacing={value} dots={twoDots} bordered />,
      code: `<Flex spacing="${value}">\n+1{children}\n</Flex>`,
    }))}
  />
)

export default SpacingStory
