import Flex from "nice-react-flex"
import Typography from "../../../../../src/nice/Typography"
import { getToken } from "nice-react-styles"
import Story from "../../../../../src/components/Story"

const CurrentIndexStory = () => (
  <Story
    variables={[
      {
        name: "currentIndex",
        description: "currentIndex={0}",
        demo: (
          <Typography
            size="small"
            color="light"
          >
            Controls which slide is currently visible. Zero-indexed.
          </Typography>
        ),
        code: `<Slider currentIndex={0}>`,
      },
      {
        name: "navigation",
        description: "Navigation example",
        demo: (
          <Flex
            direction="column"
            gap="small"
          >
            <Typography
              size="small"
              color="light"
            >
              Increment the index to navigate to the next slide:
            </Typography>
            <Flex gap="small">
              <Flex
                style={{
                  padding: `${getToken("gap", "smaller").var} ${getToken("gap", "small").var}`,
                  borderRadius: getToken("borderRadius", "small").var,
                }}
              >
                <Typography size="smaller">Previous: index - 1</Typography>
              </Flex>
              <Flex
                style={{
                  padding: `${getToken("gap", "smaller").var} ${getToken("gap", "small").var}`,
                  borderRadius: getToken("borderRadius", "small").var,
                }}
              >
                <Typography size="smaller">Next: index + 1</Typography>
              </Flex>
            </Flex>
          </Flex>
        ),
        code: `const [currentIndex, setCurrentIndex] = useState(0)\n\nconst next = () => setCurrentIndex(i => i + 1)\nconst prev = () => setCurrentIndex(i => i - 1)`,
      },
    ]}
  />
)

export default CurrentIndexStory
