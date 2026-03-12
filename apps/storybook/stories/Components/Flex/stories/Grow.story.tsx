import { getToken } from "nice-react-styles"
import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"

const GrowStory = () => (
  <Story
    variables={[
      {
        name: "0",
        description: "grow={0}",
        demo: (
          <DemoDots
            bordered
            width="12rem"
            dots={[
              {
                color: getToken("foregroundColor", "error").var,
                height: getToken("cellHeight", "smaller").var,
                width: getToken("cellHeight", "smaller").var,
                grow: 0,
              },
              {
                color: getToken("foregroundColor", "link").var,
                height: getToken("cellHeight", "smaller").var,
                grow: 1,
              },
            ]}
          />
        ),
        code: `<Flex>\n+1<Flex grow={0}>\n+1  {children}\n+1</Flex>\n+1<Flex grow={1}>\n+1  {children}\n+1</Flex>\n</Flex>`,
      },
      {
        name: "1",
        description: "grow={1}",
        demo: (
          <DemoDots
            bordered
            width="12rem"
            dots={[
              {
                color: getToken("foregroundColor", "error").var,
                height: getToken("cellHeight", "smaller").var,
                grow: 1,
              },
              {
                color: getToken("foregroundColor", "link").var,
                height: getToken("cellHeight", "smaller").var,
                grow: 1,
              },
            ]}
          />
        ),
        code: `<Flex>\n+1<Flex grow={1}>\n+1  {children}\n+1</Flex>\n+1<Flex grow={1}>\n+1  {children}\n+1</Flex>\n</Flex>`,
      },
      {
        name: "2",
        description: "grow={2}",
        demo: (
          <DemoDots
            bordered
            width="12rem"
            dots={[
              {
                color: getToken("foregroundColor", "error").var,
                height: getToken("cellHeight", "smaller").var,
                grow: 2,
              },
              {
                color: getToken("foregroundColor", "link").var,
                height: getToken("cellHeight", "smaller").var,
                grow: 1,
              },
            ]}
          />
        ),
        code: `<Flex>\n+1<Flex grow={2}>\n+1  {children}\n+1</Flex>\n+1<Flex grow={1}>\n+1  {children}\n+1</Flex>\n</Flex>`,
      },
    ]}
  />
)

export default GrowStory
