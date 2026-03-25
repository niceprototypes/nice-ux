import Image from "nice-react-image"
import Story from "../../../../src/components/Story"

const DEMO_IMAGE = "https://picsum.photos/id/29/800/600"

const BackgroundPositionStory = () => (
  <Story
    variables={[
      {
        name: "center",
        description: 'backgroundPosition="center"',
        default: true,
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Center demo"
            width="200px"
            height="200px"
            backgroundSize="cover"
            backgroundPosition="center"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1width="200px"\n+1height="200px"\n+1backgroundSize="cover"\n+1backgroundPosition="center"\n/>`,
      },
      {
        name: "top",
        description: 'backgroundPosition="top"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Top demo"
            width="200px"
            height="200px"
            backgroundSize="cover"
            backgroundPosition="top"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1backgroundSize="cover"\n+1backgroundPosition="top"\n/>`,
      },
      {
        name: "bottom right",
        description: 'backgroundPosition="bottom right"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Bottom right demo"
            width="200px"
            height="200px"
            backgroundSize="cover"
            backgroundPosition="bottom right"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1backgroundSize="cover"\n+1backgroundPosition="bottom right"\n/>`,
      },
    ]}
  />
)

export default BackgroundPositionStory
