import Lightbox from "nice-react-lightbox"
import Story from "../../../../src/components/Story"
import { getPicsum } from "../../../../src/services"
import { DemoImage } from "../Lightbox.styles"

const DEMO_IMAGE = getPicsum(10)

const CaptionStory = () => (
  <Story
    variables={[
      {
        name: "title only",
        description: 'title="Photo title"',
        demo: (
          <Lightbox
            imageUrl={DEMO_IMAGE}
            alt="Demo landscape"
            title="Mountain landscape"
          >
            <DemoImage src={DEMO_IMAGE} alt="Click to expand" />
          </Lightbox>
        ),
        code: `<Lightbox\n+1imageUrl="/image.png"\n+1alt="Description"\n+1title="Photo title"\n>\n+1<img src="/image.png" />\n</Lightbox>`,
      },
      {
        name: "title + description",
        description: "title + description",
        demo: (
          <Lightbox
            imageUrl={DEMO_IMAGE}
            alt="Demo landscape"
            title="Mountain landscape"
            description="A scenic mountain view captured at golden hour."
          >
            <DemoImage src={DEMO_IMAGE} alt="Click to expand" />
          </Lightbox>
        ),
        code: `<Lightbox\n+1imageUrl="/image.png"\n+1alt="Description"\n+1title="Photo title"\n+1description="Caption text"\n>\n+1<img src="/image.png" />\n</Lightbox>`,
      },
    ]}
  />
)

export default CaptionStory