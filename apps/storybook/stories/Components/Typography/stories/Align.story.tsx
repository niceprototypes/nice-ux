import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"
import { loremIpsum } from "../Typography.services"

const AlignStory = () => (
  <Story
    variables={[
      {
        name: "left",
        description: 'align="left"',
        demo: (
          <Flex direction="column" grow={1}>
            <Typography align="left">{loremIpsum}</Typography>
          </Flex>
        ),
      },
      {
        name: "center",
        description: 'align="center"',
        demo: (
          <Flex direction="column" grow={1}>
            <Typography align="center">{loremIpsum}</Typography>
          </Flex>
        ),
      },
      {
        name: "right",
        description: 'align="right"',
        demo: (
          <Flex direction="column" grow={1}>
            <Typography align="right">{loremIpsum}</Typography>
          </Flex>
        ),
      },
      {
        name: "justify",
        description: 'align="justify"',
        demo: (
          <Flex grow={1}>
            <Typography align="justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua ut
              enim ad minim veniam.
            </Typography>
          </Flex>
        ),
      },
    ]}
  />
)

export default AlignStory
