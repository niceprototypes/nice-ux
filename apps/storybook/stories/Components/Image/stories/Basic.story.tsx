import Image from "nice-react-image"
import Story from "../../../../src/components/Story"

const DEMO_IMAGE = "https://picsum.photos/id/29/800/600"

const BasicStory = () => (
  <Story
    variables={[
      {
        name: "default",
        description: 'src="/photo.jpg"',
        default: true,
        demo: (
          <Image src={DEMO_IMAGE} alt="Demo landscape" />
        ),
        code: `<Image src="/photo.jpg" alt="Description" />`,
      },
      {
        name: "sized",
        description: 'width="400px" height="300px"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Demo landscape"
            width="400px"
            height="300px"
            backgroundSize="cover"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1width="400px"\n+1height="300px"\n+1backgroundSize="cover"\n/>`,
      },
    ]}
  />
)

export default BasicStory
