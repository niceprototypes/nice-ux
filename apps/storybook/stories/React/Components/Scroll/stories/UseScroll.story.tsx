import { ScrollProvider } from "nice-react-scroll"
import Flex from "nice-react-flex"
import Typography from "../../../../../src/nice/Typography"
import { getToken } from "nice-react-styles"
import Story from "../../../../../src/components/Story"
import { ScrollPositionDisplay } from "../Scroll.services"

const UseScrollStory = () => (
  <Story
    variables={[
      {
        name: "hook",
        description: "useScroll()",
        demo: (
          <ScrollProvider>
            <Flex
              direction="column"
              style={{
                padding: getToken("gap", "base"),
                borderRadius: getToken("borderRadius", "base"),
              }}
            >
              <ScrollPositionDisplay />
              <Typography
                size="smaller"
                color="light"
              >
                Scroll the page to see the value update
              </Typography>
            </Flex>
          </ScrollProvider>
        ),
        code: `const scrollY = useScroll()\nreturn <div>Scrolled: {scrollY}px</div>`,
      },
    ]}
  />
)

export default UseScrollStory
