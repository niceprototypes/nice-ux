import Lightbox from "nice-react-lightbox"
import Story from "../../../../src/components/Story"
import { DemoImage } from "../Lightbox.styles"

const DEMO_IMAGE = "https://picsum.photos/id/10/800/600"

const BasicStory = () => (
  <Story
    variables={[
      {
        name: "default",
        description: 'imageUrl="/image.png"',
        default: true,
        demo: (
          <Lightbox imageUrl={DEMO_IMAGE} alt="Demo landscape">
            <DemoImage src={DEMO_IMAGE} alt="Click to expand" />
          </Lightbox>
        ),
        code: `<Lightbox imageUrl="/image.png" alt="Description">\n+1<img src="/image.png" alt="Thumbnail" />\n</Lightbox>`,
      },
    ]}
  />
)

export default BasicStory