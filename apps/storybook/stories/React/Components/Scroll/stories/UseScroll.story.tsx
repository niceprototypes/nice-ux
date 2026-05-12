import { ScrollProvider } from "nice-react-scroll"
import Flex from "nice-react-flex"
import Typography from "../../../../../src/nice/Typography"
import { getReactToken } from "nice-react-styles"
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
                padding: getReactToken("gap", "base").var,
                borderRadius: getReactToken("borderRadius", "base").var,
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
