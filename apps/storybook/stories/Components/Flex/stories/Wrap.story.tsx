import { getToken } from "nice-styles"
import Story from "../../../../src/components/Story"
import DemoDots from "../../../../src/components/DemoDots"

const WrapStory = () => {
  const wrapDots = [
    {
      color: getToken("foregroundColor", "error").var,
      height: getToken("cellHeight", "small").var,
      width: getToken("cellHeight", "small").var,
    },
    {
      color: getToken("foregroundColor", "warning").var,
      height: getToken("cellHeight", "small").var,
      width: getToken("cellHeight", "small").var,
    },
    {
      color: getToken("foregroundColor", "link").var,
      height: getToken("cellHeight", "small").var,
      width: getToken("cellHeight", "small").var,
    },
    {
      color: getToken("foregroundColor", "success").var,
      height: getToken("cellHeight", "small").var,
      width: getToken("cellHeight", "small").var,
    },
    {
      color: getToken("foregroundColor", "disabled").var,
      height: getToken("cellHeight", "small").var,
      width: getToken("cellHeight", "small").var,
    },
  ]

  const nowrapDots = wrapDots.map(dot => ({ ...dot, grow: 1, width: undefined }))

  return (
    <Story
      variables={[
        {
          name: "nowrap",
          description: 'wrap="nowrap"',
          demo: (
            <DemoDots
              wrap="nowrap"
              dots={nowrapDots}
              width={`calc(${getToken("cellHeight", "small").var} * 3 + 2px)`}
              bordered
            />
          ),
          code: `<Flex wrap="nowrap">\n+1{children}\n</Flex>`,
        },
        {
          name: "wrap",
          description: 'wrap="wrap"',
          demo: (
            <DemoDots
              wrap="wrap"
              dots={wrapDots}
              width={`calc(${getToken("cellHeight", "small").var} * 3 + 2px)`}
              bordered
            />
          ),
          code: `<Flex wrap="wrap">\n+1{children}\n</Flex>`,
        },
        {
          name: "wrap-reverse",
          description: 'wrap="wrap-reverse"',
          demo: (
            <DemoDots
              wrap="wrap-reverse"
              dots={wrapDots}
              width={`calc(${getToken("cellHeight", "small").var} * 3 + 2px)`}
              bordered
            />
          ),
          code: `<Flex wrap="wrap-reverse">\n+1{children}\n</Flex>`,
        },
      ]}
    />
  )
}

export default WrapStory
