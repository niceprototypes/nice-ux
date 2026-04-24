import Typography from "../../../../src/nice/Typography"
import Story from "../../../../src/components/Story"

const StickySectionLinksCustomStory = () => (
  <Story
    variables={[
      {
        name: "renderLink",
        description: "renderLink={...}",
        demo: (
          <Typography size="small" color="light">
            Custom renderer for individual link items with isActive state
          </Typography>
        ),
        code: `<StickySectionLinks\n+1links={links}\n+1renderLink={(link, isActive) => (\n+2<Button variant={isActive ? "primary" : "ghost"}>\n+3{link.label}\n+2</Button>\n+1)}\n/>`,
      },
      {
        name: "renderWrapper",
        description: "renderWrapper={...}",
        demo: (
          <Typography size="small" color="light">
            Custom renderer for the wrapper container
          </Typography>
        ),
        code: `<StickySectionLinks\n+1links={links}\n+1renderWrapper={(children) => (\n+2<nav className="custom-nav">{children}</nav>\n+1)}\n/>`,
      },
    ]}
  />
)

export default StickySectionLinksCustomStory
