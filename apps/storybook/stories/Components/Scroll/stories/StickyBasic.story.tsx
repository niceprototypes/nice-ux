import Typography from "../../../../src/nice/Typography"
import Story from "../../../../src/components/Story"

const StickyBasicStory = () => (
  <Story
    variables={[
      {
        name: "basic",
        description: "<Sticky>",
        demo: (
          <Typography size="small" color="light">
            Sticky headers remain fixed at the top of the viewport when
            scrolled past their original position. They automatically hide on
            scroll down and show on scroll up.
          </Typography>
        ),
        code: `<ScrollProvider>\n+1<StickyProvider>\n+2<Sticky order={0}>\n+3<Header />\n+2</Sticky>\n+1</StickyProvider>\n</ScrollProvider>`,
      },
    ]}
  />
)

export default StickyBasicStory
