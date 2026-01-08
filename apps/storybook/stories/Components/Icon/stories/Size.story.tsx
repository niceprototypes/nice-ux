import Icon from "nice-react-icon"
import Story from "../../../../src/components/Story"
import { fontSizes } from "../Icon.services"

const SizeStory = () => (
  <Story
    variables={fontSizes.map(size => ({
      name: size,
      description: `size="${size}"`,
      demo: <Icon size={size} />,
      code: size === "base" ? `<Icon/>` : `<Icon size="${size}"/>`,
    }))}
  />
)

export default SizeStory
