import Icon from "nice-react-icon"
import Story from "../../../../src/components/Story"

const StrokeScalingStory = () => (
  <Story
    variables={[
      {
        name: "false",
        description: "strokeScaling={false}",
        demo: <Icon size="larger" strokeScaling={false} />,
        code: `<Icon size="larger"/>`,
      },
      {
        name: "true",
        description: "strokeScaling={true}",
        demo: <Icon size="larger" strokeScaling={true} />,
        code: `<Icon size="larger" strokeScaling/>`,
      },
    ]}
  />
)

export default StrokeScalingStory
