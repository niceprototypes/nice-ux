import Icon from "nice-react-icon"
import Story from "../../../../src/components/Story"

const strokeWidths = ["small", "base", "large"] as const

const StrokeWidthStory = () => (
  <Story
    variables={strokeWidths.map(width => ({
      name: width,
      description: `strokeWidth="${width}"`,
      default: width === "base",
      demo: <Icon strokeWidth={width} />,
      code: width === "base" ? `<Icon/>` : `<Icon strokeWidth="${width}"/>`,
    }))}
  />
)

export default StrokeWidthStory
