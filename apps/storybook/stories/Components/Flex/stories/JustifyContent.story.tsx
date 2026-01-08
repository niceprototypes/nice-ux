import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"
import { threeDots } from "../Flex.services"

const JustifyContentStory = () => (
  <Story
    variables={[
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
    ].map(value => ({
      name: value,
      description: `justifyContent="${value}"`,
      demo: (
        <DemoDots justifyContent={value} dots={threeDots} width="12rem" bordered />
      ),
      code: `<Flex justifyContent="${value}">\n+1{children}\n</Flex>`,
    }))}
  />
)

export default JustifyContentStory
