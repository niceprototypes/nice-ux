import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import { getToken, getSizeToken, getBreakpoint } from "nice-react-styles"
import Story from "../../../../src/components/Story"

const mobileLabel = `≤${getBreakpoint("mobile").value}px`
const desktopLabel = `≥${getBreakpoint("desktop").value}px`

const ResponsiveStory = () => (
  <Story
    variables={[
      {
        name: "smaller",
        description: `${getToken("fontSize", "smaller").value} → ${getSizeToken("fontSize", "smaller", "desktop").value}`,
        demo: (
          <Flex direction="column" gap="small">
            <Typography size="smaller">
              Smaller — {mobileLabel}: {getToken("fontSize", "smaller").value}, {desktopLabel}: {getSizeToken("fontSize", "smaller", "desktop").value}
            </Typography>
          </Flex>
        ),
      },
      {
        name: "small",
        description: `${getToken("fontSize", "small").value} → ${getSizeToken("fontSize", "small", "desktop").value}`,
        demo: (
          <Flex direction="column" gap="small">
            <Typography size="small">
              Small — {mobileLabel}: {getToken("fontSize", "small").value}, {desktopLabel}: {getSizeToken("fontSize", "small", "desktop").value}
            </Typography>
          </Flex>
        ),
      },
      {
        name: "base",
        description: `${getToken("fontSize", "base").value} → ${getSizeToken("fontSize", "base", "desktop").value}`,
        demo: (
          <Flex direction="column" gap="small">
            <Typography size="base">
              Base — {mobileLabel}: {getToken("fontSize", "base").value}, {desktopLabel}: {getSizeToken("fontSize", "base", "desktop").value}
            </Typography>
          </Flex>
        ),
      },
      {
        name: "large",
        description: `${getToken("fontSize", "large").value} → ${getSizeToken("fontSize", "large", "desktop").value}`,
        demo: (
          <Flex direction="column" gap="small">
            <Typography size="large">
              Large — {mobileLabel}: {getToken("fontSize", "large").value}, {desktopLabel}: {getSizeToken("fontSize", "large", "desktop").value}
            </Typography>
          </Flex>
        ),
      },
      {
        name: "larger",
        description: `${getToken("fontSize", "larger").value} → ${getSizeToken("fontSize", "larger", "desktop").value}`,
        demo: (
          <Flex direction="column" gap="small">
            <Typography size="larger">
              Larger — {mobileLabel}: {getToken("fontSize", "larger").value}, {desktopLabel}: {getSizeToken("fontSize", "larger", "desktop").value}
            </Typography>
          </Flex>
        ),
      },
    ]}
  />
)

export default ResponsiveStory
