import Image from "nice-react-image"
import Story from "../../../../src/components/Story"

const DEMO_IMAGE = "https://picsum.photos/id/29/800/600"

const BackgroundSizeStory = () => (
  <Story
    variables={[
      {
        name: "contain",
        description: 'backgroundSize="contain"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Contain demo"
            width="300px"
            height="200px"
            backgroundSize="contain"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1width="300px"\n+1height="200px"\n+1backgroundSize="contain"\n/>`,
      },
      {
        name: "cover",
        description: 'backgroundSize="cover"',
        default: true,
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Cover demo"
            width="300px"
            height="200px"
            backgroundSize="cover"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1width="300px"\n+1height="200px"\n+1backgroundSize="cover"\n/>`,
      },
      {
        name: "fill",
        description: 'backgroundSize="fill"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Fill demo"
            width="300px"
            height="200px"
            backgroundSize="fill"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1width="300px"\n+1height="200px"\n+1backgroundSize="fill"\n/>`,
      },
      {
        name: "none",
        description: 'backgroundSize="none"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="None demo"
            width="300px"
            height="200px"
            backgroundSize="none"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1width="300px"\n+1height="200px"\n+1backgroundSize="none"\n/>`,
      },
      {
        name: "scale-down",
        description: 'backgroundSize="scale-down"',
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Scale-down demo"
            width="300px"
            height="200px"
            backgroundSize="scale-down"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1width="300px"\n+1height="200px"\n+1backgroundSize="scale-down"\n/>`,
      },
    ]}
  />
)

export default BackgroundSizeStory
