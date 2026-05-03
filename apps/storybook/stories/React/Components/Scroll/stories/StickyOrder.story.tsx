import Flex from "nice-react-flex"
import Typography from "../../../../../src/nice/Typography"
import { getToken } from "nice-react-styles"
import Story from "../../../../../src/components/Story"

const StickyOrderStory = () => (
  <Story
    variables={[
      {
        name: "stacking",
        description: "order={0}, order={1}",
        demo: (
          <Flex
            direction="column"
            gap="small"
          >
            <Typography
              size="small"
              color="light"
            >
              Multiple sticky elements stack based on their order prop. Lower
              numbers appear above higher numbers.
            </Typography>
            <Flex gap="small">
              <Flex
                style={{
                  padding: `${getToken("gap", "smaller").var} ${getToken("gap", "small").var}`,
                  backgroundColor: getToken("foregroundColor", "error").var,
                  borderRadius: getToken("borderRadius", "small").var,
                }}
              >
                <Typography
                  size="smaller"
                  color="lighter"
                >
                  order=0
                </Typography>
              </Flex>
              <Flex
                style={{
                  padding: `${getToken("gap", "smaller").var} ${getToken("gap", "small").var}`,
                  backgroundColor: getToken("foregroundColor", "warning").var,
                  borderRadius: getToken("borderRadius", "small").var,
                }}
              >
                <Typography
                  size="smaller"
                  color="lighter"
                >
                  order=1
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        ),
        code: `<Sticky order={0}><Header /></Sticky>\n<Sticky order={1}><Subheader /></Sticky>`,
      },
    ]}
  />
)

export default StickyOrderStory
