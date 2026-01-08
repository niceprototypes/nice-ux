import Icon from "nice-react-icon"
import Story from "../../../../src/components/Story"
import { borderWidths } from "../Icon.services"

const StrokeWidthStory = () => (
  <Story
    variables={borderWidths.map(width => ({
      name: width,
      description: `strokeWidth="${width}"`,
      demo: <Icon strokeWidth={width} />,
      code: width === "base" ? `<Icon/>` : `<Icon strokeWidth="${width}"/>`,
    }))}
  />
)

export default StrokeWidthStory
