import Typography from "nice-react-typography"
import { getToken } from "nice-react-styles"
import Story from "../../../../src/components/Story"
import { loremIpsumLong } from "../Typography.services"

const LineHeightStory = () => (
  <Story
    variables={[
      {
        name: "condensed",
        description: "",
        value: getToken("lineHeight", "condensed").value,
        demo: <Typography lineHeight="condensed">{loremIpsumLong}</Typography>,
      },
      {
        name: "base",
        description: "",
        value: getToken("lineHeight", "base").value,
        demo: <Typography lineHeight="base">{loremIpsumLong}</Typography>,
      },
      {
        name: "expanded",
        description: "",
        value: getToken("lineHeight", "expanded").value,
        demo: <Typography lineHeight="expanded">{loremIpsumLong}</Typography>,
      },
    ]}
  />
)

export default LineHeightStory
