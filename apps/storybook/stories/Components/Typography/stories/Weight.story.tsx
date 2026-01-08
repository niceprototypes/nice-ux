import Typography from "nice-react-typography"
import { getToken } from "nice-styles"
import Story from "../../../../src/components/Story"

const WeightStory = () => (
  <Story
    variables={[
      {
        name: "light",
        description: 'weight="light"',
        value: getToken("fontWeight", "light").value,
        demo: <Typography weight="light">Light</Typography>,
      },
      {
        name: "base",
        description: 'weight="base"',
        value: getToken("fontWeight", "base").value,
        demo: <Typography weight="base">Base</Typography>,
      },
      {
        name: "medium",
        description: 'weight="medium"',
        value: getToken("fontWeight", "medium").value,
        demo: <Typography weight="medium">Medium</Typography>,
      },
      {
        name: "semibold",
        description: 'weight="semibold"',
        value: getToken("fontWeight", "semibold").value,
        demo: <Typography weight="semibold">Semibold</Typography>,
      },
      {
        name: "bold",
        description: 'weight="bold"',
        value: getToken("fontWeight", "bold").value,
        demo: <Typography weight="bold">Bold</Typography>,
      },
      {
        name: "extrabold",
        description: 'weight="extrabold"',
        value: getToken("fontWeight", "extrabold").value,
        demo: <Typography weight="extrabold">Extrabold</Typography>,
      },
      {
        name: "black",
        description: 'weight="black"',
        value: getToken("fontWeight", "black").value,
        demo: <Typography weight="black">Black</Typography>,
      },
    ]}
  />
)

export default WeightStory
