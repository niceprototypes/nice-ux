import Image from "nice-react-image"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import Story from "../../../../src/components/Story"

const DEMO_IMAGE = "https://picsum.photos/id/29/800/600"

const AsStory = () => (
  <Story
    variables={[
      {
        name: "img",
        description: 'as="img" (default)',
        default: true,
        demo: (
          <Image
            src={DEMO_IMAGE}
            alt="Standard img element"
            width="300px"
            height="200px"
            backgroundSize="cover"
          />
        ),
        code: `<Image\n+1src="/photo.jpg"\n+1alt="Description"\n+1width="300px"\n+1height="200px"\n+1backgroundSize="cover"\n/>`,
      },
      {
        name: "div",
        description: 'as="div"',
        demo: (
          <Image
            as="div"
            src={DEMO_IMAGE}
            alt="Background image div"
            width="300px"
            height="200px"
            backgroundSize="cover"
            borderRadius="base"
          >
            <Flex
              direction="column"
              justifyContent="flex-end"
              style={{
                height: "100%",
                padding: getToken("gap", "base").var,
                background: "linear-gradient(transparent 50%, rgba(0,0,0,0.6))",
              }}
            >
              <Typography
                color="lighter"
                weight="bold"
              >
                Overlay content
              </Typography>
            </Flex>
          </Image>
        ),
        code: `<Image\n+1as="div"\n+1src="/hero.jpg"\n+1alt="Hero banner"\n+1width="300px"\n+1height="200px"\n+1backgroundSize="cover"\n>\n+1<h1>Overlay content</h1>\n</Image>`,
      },
    ]}
  />
)

export default AsStory
