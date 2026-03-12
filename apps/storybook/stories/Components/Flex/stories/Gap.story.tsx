import { getToken } from "nice-react-styles"
import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"
import { threeDots } from "../Flex.services"

const GapStory = () => (
  <Story
    variables={["smaller", "small", "base", "large", "larger"].map(value => ({
      name: value,
      description: `gap="${value}"`,
      value: getToken("gap", value).value,
      demo: <DemoDots gap={value} dots={threeDots} />,
      code: `<Flex gap="${value}">\n+1{children}\n</Flex>`,
    }))}
  />
)

export default GapStory
