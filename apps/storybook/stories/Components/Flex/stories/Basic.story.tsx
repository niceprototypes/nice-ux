import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"
import { twoDots } from "../Flex.services"

const BasicStory = () => (
  <Story
    variables={[
      {
        name: "",
        demo: <DemoDots dots={twoDots} />,
        code: `<Flex>{children}</Flex>`,
      },
    ]}
  />
)

export default BasicStory
