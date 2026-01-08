import Icon from "nice-react-icon"
import Story from "../../../../src/components/Story"
import { foregroundColors } from "../Icon.services"

const ColorStory = () => (
  <Story
    variables={foregroundColors.map(color => ({
      name: color,
      description: `color="${color}"`,
      demo: <Icon color={color} />,
      code: `<Icon color="${color}"/>`,
    }))}
  />
)

export default ColorStory
