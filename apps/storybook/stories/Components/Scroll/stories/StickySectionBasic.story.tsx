import Typography from "nice-react-typography"
import Story from "../../../../src/components/Story"

const StickySectionBasicStory = () => (
  <Story
    variables={[
      {
        name: "basic",
        description: '<StickySection id="...">',
        demo: (
          <Typography size="small" color="medium">
            Wraps content with a semantic section element and ID for use with
            StickySectionLinks navigation.
          </Typography>
        ),
        code: `<StickySection id="about">\n+1<h2>About Us</h2>\n+1<p>Content...</p>\n</StickySection>`,
      },
      {
        name: "as",
        description: 'as="div"',
        demo: (
          <Typography size="small" color="medium">
            Render as a different HTML element type (default: section)
          </Typography>
        ),
        code: `<StickySection id="hero" as="div">`,
      },
      {
        name: "render",
        description: "render={...}",
        demo: (
          <Typography size="small" color="medium">
            Custom render function for full control over the wrapper element
          </Typography>
        ),
        code: `<StickySection\n+1id="custom"\n+1render={({ id, children }) => (\n+2<article id={id}>{children}</article>\n+1)}\n>`,
      },
    ]}
  />
)

export default StickySectionBasicStory
