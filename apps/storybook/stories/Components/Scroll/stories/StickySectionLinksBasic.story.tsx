import Flex from "nice-react-flex"
import Typography from "../../../../src/nice/Typography"
import Story from "../../../../src/components/Story"

const StickySectionLinksBasicStory = () => (
  <Story
    variables={[
      {
        name: "basic",
        description: "<StickySectionLinks links={...}>",
        demo: (
          <Flex direction="column" gap="small">
            <Typography size="small" color="light">
              Navigation links with automatic active section highlighting.
              Uses IntersectionObserver for efficient detection.
            </Typography>
            <Flex gap="base">
              <Typography
                size="small"
                color="link"
                style={{ textDecoration: "underline" }}
              >
                About
              </Typography>
              <Typography size="small" color="light">
                Services
              </Typography>
              <Typography size="small" color="light">
                Contact
              </Typography>
            </Flex>
          </Flex>
        ),
        code: `<StickySectionLinks\n+1links={[\n+2{ href: "#about", label: "About" },\n+2{ href: "#services", label: "Services" },\n+1]}\n/>`,
      },
    ]}
  />
)

export default StickySectionLinksBasicStory
