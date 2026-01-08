import Icon, { iconNames } from "nice-react-icon"
import Story from "../../../../src/components/Story"

const NameStory = () => (
  <Story
    variables={iconNames.map(name => ({
      name,
      description: `name="${name}"`,
      demo: <Icon name={name} />,
      code: name === "placeholder" ? `<Icon/>` : `<Icon name="${name}"/>`,
    }))}
  />
)

export default NameStory
