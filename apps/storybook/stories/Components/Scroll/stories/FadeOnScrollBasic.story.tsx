import { ScrollProvider, FadeOnScroll } from "nice-react-scroll"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import { getToken } from "nice-react-styles"
import Story from "../../../../src/components/Story"

const FadeOnScrollBasicStory = () => (
  <Story
    variables={[
      {
        name: "basic",
        description: "<FadeOnScroll>",
        demo: (
          <ScrollProvider>
            <FadeOnScroll
              startPosition={0}
              peakPosition={50}
              endPosition={100}
              startOpacity={0.3}
              peakOpacity={1}
              endOpacity={0.3}
            >
              <Flex
                style={{
                  padding: getToken("gap", "base").var,
                  borderRadius: getToken("borderRadius", "base").var,
                }}
              >
                <Typography>
                  This element fades in and out as you scroll
                </Typography>
              </Flex>
            </FadeOnScroll>
          </ScrollProvider>
        ),
        code: `<FadeOnScroll\n+1startPosition={0}\n+1peakPosition={50}\n+1endPosition={100}\n>\n+1{children}\n</FadeOnScroll>`,
      },
    ]}
  />
)

export default FadeOnScrollBasicStory
