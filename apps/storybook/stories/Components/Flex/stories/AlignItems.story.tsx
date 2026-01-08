import { getToken } from "nice-styles"
import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"
import { threeDots } from "../Flex.services"

const AlignItemsStory = () => (
  <Story
    variables={[
      {
        name: "flex-start",
        description: 'alignItems="flex-start"',
        demo: <DemoDots alignItems="flex-start" dots={threeDots} height="6rem" bordered />,
        code: `<Flex alignItems="flex-start">\n+1{children}\n</Flex>`,
      },
      {
        name: "flex-end",
        description: 'alignItems="flex-end"',
        demo: <DemoDots alignItems="flex-end" dots={threeDots} height="6rem" bordered />,
        code: `<Flex alignItems="flex-end">\n+1{children}\n</Flex>`,
      },
      {
        name: "center",
        description: 'alignItems="center"',
        demo: <DemoDots alignItems="center" dots={threeDots} height="6rem" bordered />,
        code: `<Flex alignItems="center">\n+1{children}\n</Flex>`,
      },
      {
        name: "baseline",
        description: 'alignItems="baseline"',
        demo: (
          <DemoDots
            alignItems="baseline"
            dots={[
              {
                color: getToken("foregroundColor", "error").var,
                height: getToken("cellHeight", "small").var,
                width: getToken("cellHeight", "smaller").var,
              },
              {
                color: getToken("foregroundColor", "warning").var,
                height: getToken("cellHeight", "smaller").var,
                width: getToken("cellHeight", "smaller").var,
              },
              {
                color: getToken("foregroundColor", "link").var,
                height: getToken("cellHeight").var,
                width: getToken("cellHeight", "smaller").var,
              },
            ]}
            height="6rem"
            bordered
          />
        ),
        code: `<Flex alignItems="baseline">\n+1{children}\n</Flex>`,
      },
      {
        name: "stretch",
        description: 'alignItems="stretch"',
        demo: (
          <DemoDots
            alignItems="stretch"
            dots={[
              {
                color: getToken("foregroundColor", "error").var,
                width: getToken("cellHeight", "smaller").var,
              },
              {
                color: getToken("foregroundColor", "warning").var,
                width: getToken("cellHeight", "smaller").var,
              },
              {
                color: getToken("foregroundColor", "link").var,
                width: getToken("cellHeight", "smaller").var,
              },
            ]}
            height="6rem"
            bordered
          />
        ),
        code: `<Flex alignItems="stretch">\n+1{children}\n</Flex>`,
      },
    ]}
  />
)

export default AlignItemsStory
