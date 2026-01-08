import Icon from "nice-react-icon"
import Story from "../../../../src/components/Story"

const OutlinedStory = () => (
  <Story
    variables={[
      {
        name: "false",
        description: "outlined={false}",
        demo: <Icon size="larger" outlined={false} />,
        code: `<Icon size="larger"/>`,
      },
      {
        name: "true",
        description: "outlined={true}",
        demo: <Icon size="larger" outlined={true} />,
        code: `<Icon size="larger" outlined={true}/>`,
      },
    ]}
  />
)

export default OutlinedStory
