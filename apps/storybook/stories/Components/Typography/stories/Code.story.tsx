import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const CodeStory = () => (
  <Story
    variables={[
      {
        name: "false",
        description: "code={false}",
        demo: <Typography>Hello world</Typography>,
      },
      {
        name: "true",
        description: "code={true}",
        demo: <Typography code>hello_world</Typography>,
      },
    ]}
  />
)

export default CodeStory
