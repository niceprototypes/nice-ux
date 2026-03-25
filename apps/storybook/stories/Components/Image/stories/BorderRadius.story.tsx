import Image from "nice-react-image"
import Story from "../../../../src/components/Story"

const DEMO_IMAGE = "https://picsum.photos/id/29/800/600"

const BorderRadiusStory = () => (
  <Story
    variables={[
      {
        name: "smaller",
        description: 'borderRadius="smaller"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Smaller radius demo"
            width="200px"
            height="150px"
            backgroundSize="cover"
            borderRadius="smaller"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1borderRadius="smaller"\n/>`,
      },
      {
        name: "small",
        description: 'borderRadius="small"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Small radius demo"
            width="200px"
            height="150px"
            backgroundSize="cover"
            borderRadius="small"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1borderRadius="small"\n/>`,
      },
      {
        name: "base",
        description: 'borderRadius="base"',
        default: true,
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Base radius demo"
            width="200px"
            height="150px"
            backgroundSize="cover"
            borderRadius="base"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1borderRadius="base"\n/>`,
      },
      {
        name: "large",
        description: 'borderRadius="large"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Large radius demo"
            width="200px"
            height="150px"
            backgroundSize="cover"
            borderRadius="large"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1borderRadius="large"\n/>`,
      },
      {
        name: "larger",
        description: 'borderRadius="larger"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Larger radius demo"
            width="200px"
            height="150px"
            backgroundSize="cover"
            borderRadius="larger"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1borderRadius="larger"\n/>`,
      },
    ]}
  />
)

export default BorderRadiusStory
