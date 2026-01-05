import type { Meta, StoryObj } from "@storybook/react"
import {
  ScrollProvider,
  StickyProvider,
  Sticky,
  FadeOnScroll,
  StickySection,
  StickySectionLinks,
  useScroll,
} from "nice-react-scroll"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import { getToken } from "nice-styles"
import Story from "../../../src/components/Story"
import { generateDescriptionString } from "../../../src/services"

/**
 * Performance-optimized scroll components for React with centralized scroll management,
 * sticky positioning, fade effects, and intersection observer utilities.
 *
 * The library provides:
 * - ScrollProvider: Centralized scroll management with RAF batching
 * - Sticky: Fixed headers with automatic stacking and scroll direction detection
 * - FadeOnScroll: Opacity animation based on scroll position
 * - StickySection: Semantic sections for navigation
 * - StickySectionLinks: Navigation with active section highlighting
 */
const meta = {
  title: "Components/Scroll",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-scroll", {
          setup: [
            {
              value:
                'import { ScrollProvider, Sticky, FadeOnScroll } from "nice-react-scroll"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value:
                "<ScrollProvider><Sticky>{header}</Sticky></ScrollProvider>",
              code: true,
            },
          ],
        }),
      },
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Sticky props
    order: {
      description: "Stack order for multiple sticky elements (lower = higher)",
      table: {
        category: "Sticky",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    onChange: {
      description: "Callback when sticky state changes",
      table: {
        category: "Sticky",
        type: { summary: "(isSticky: boolean) => void" },
      },
    },
    // FadeOnScroll props
    startPosition: {
      description: "Scroll progress % where fade in begins",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    peakPosition: {
      description: "Scroll progress % where peak opacity is reached",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "50" },
      },
    },
    endPosition: {
      description: "Scroll progress % where fade out completes",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    startOpacity: {
      description: "Initial opacity value",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    peakOpacity: {
      description: "Peak opacity value",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    endOpacity: {
      description: "Final opacity value",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    // StickySection props
    id: {
      description: "Unique identifier for the section",
      table: {
        category: "StickySection",
        type: { summary: "string" },
      },
    },
    as: {
      description: "HTML element type to render",
      table: {
        category: "StickySection",
        type: { summary: "keyof React.JSX.IntrinsicElements" },
        defaultValue: { summary: '"section"' },
      },
    },
    // StickySectionLinks props
    links: {
      description: "Array of navigation link objects",
      table: {
        category: "StickySectionLinks",
        type: { summary: "{ href: string; label: string }[]" },
      },
    },
    renderLink: {
      description: "Custom renderer for link items",
      table: {
        category: "StickySectionLinks",
        type: { summary: "(link, isActive) => ReactNode" },
      },
    },
    renderWrapper: {
      description: "Custom renderer for wrapper container",
      table: {
        category: "StickySectionLinks",
        type: { summary: "(children) => ReactNode" },
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const ScrollPositionDisplay = () => {
  const scrollY = useScroll()
  return (
    <Typography size="small" color="medium">
      Scroll position: {Math.round(scrollY)}px
    </Typography>
  )
}

const SectionContent = ({ title, color }: { title: string; color: string }) => (
  <Flex
    direction="column"
    gap="base"
    style={{
      padding: getToken("gap", "large").var,
      minHeight: "50vh",
      backgroundColor: color,
    }}
  >
    <Typography as="h2" weight="bold" size="larger">
      {title}
    </Typography>
    <Typography color="medium">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris.
    </Typography>
  </Flex>
)

export const UseScroll: Story = {
  name: "useScroll",
  render: () => (
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
                  padding: getToken("gap", "base").var,
                  borderRadius: getToken("borderRadius", "base").var,
                }}
              >
                <ScrollPositionDisplay />
                <Typography size="smaller" color="light">
                  Scroll the page to see the value update
                </Typography>
              </Flex>
            </ScrollProvider>
          ),
          code: `const scrollY = useScroll()\nreturn <div>Scrolled: {scrollY}px</div>`,
        },
      ]}
    />
  ),
}

export const StickyBasic: Story = {
  name: "Sticky",
  render: () => (
    <Story
      variables={[
        {
          name: "basic",
          description: "<Sticky>",
          demo: (
            <Typography size="small" color="medium">
              Sticky headers remain fixed at the top of the viewport when
              scrolled past their original position. They automatically hide on
              scroll down and show on scroll up.
            </Typography>
          ),
          code: `<ScrollProvider>\n+1<StickyProvider>\n+2<Sticky order={0}>\n+3<Header />\n+2</Sticky>\n+1</StickyProvider>\n</ScrollProvider>`,
        },
      ]}
    />
  ),
}

export const StickyOrder: Story = {
  name: "Sticky order",
  render: () => (
    <Story
      variables={[
        {
          name: "stacking",
          description: "order={0}, order={1}",
          demo: (
            <Flex direction="column" gap="small">
              <Typography size="small" color="medium">
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
                  <Typography size="smaller" color="lighter">
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
                  <Typography size="smaller" color="lighter">
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
  ),
}

export const FadeOnScrollBasic: Story = {
  name: "FadeOnScroll",
  render: () => (
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
  ),
}

export const FadeOnScrollPositions: Story = {
  name: "FadeOnScroll positions",
  render: () => (
    <Story
      variables={[
        {
          name: "startPosition",
          description: "startPosition={30}",
          demo: (
            <Typography size="small" color="medium">
              Scroll progress % where fade in begins (default: 0)
            </Typography>
          ),
          code: `<FadeOnScroll startPosition={30}>`,
        },
        {
          name: "peakPosition",
          description: "peakPosition={50}",
          demo: (
            <Typography size="small" color="medium">
              Scroll progress % where peak opacity is reached (default: 50)
            </Typography>
          ),
          code: `<FadeOnScroll peakPosition={50}>`,
        },
        {
          name: "endPosition",
          description: "endPosition={100}",
          demo: (
            <Typography size="small" color="medium">
              Scroll progress % where fade out completes (default: 100)
            </Typography>
          ),
          code: `<FadeOnScroll endPosition={100}>`,
        },
      ]}
    />
  ),
}

export const FadeOnScrollOpacity: Story = {
  name: "FadeOnScroll opacity",
  render: () => (
    <Story
      variables={[
        {
          name: "startOpacity",
          description: "startOpacity={0}",
          demo: (
            <Typography size="small" color="medium">
              Initial opacity value before fade in begins (default: 0)
            </Typography>
          ),
          code: `<FadeOnScroll startOpacity={0}>`,
        },
        {
          name: "peakOpacity",
          description: "peakOpacity={1}",
          demo: (
            <Typography size="small" color="medium">
              Peak opacity value at peakPosition (default: 1)
            </Typography>
          ),
          code: `<FadeOnScroll peakOpacity={1}>`,
        },
        {
          name: "endOpacity",
          description: "endOpacity={0}",
          demo: (
            <Typography size="small" color="medium">
              Final opacity value after fade out (default: 0)
            </Typography>
          ),
          code: `<FadeOnScroll endOpacity={0}>`,
        },
      ]}
    />
  ),
}

export const StickySectionBasic: Story = {
  name: "StickySection",
  render: () => (
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
  ),
}

export const StickySectionLinksBasic: Story = {
  name: "StickySectionLinks",
  render: () => (
    <Story
      variables={[
        {
          name: "basic",
          description: "<StickySectionLinks links={...}>",
          demo: (
            <Flex direction="column" gap="small">
              <Typography size="small" color="medium">
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
                <Typography size="small" color="medium">
                  Services
                </Typography>
                <Typography size="small" color="medium">
                  Contact
                </Typography>
              </Flex>
            </Flex>
          ),
          code: `<StickySectionLinks\n+1links={[\n+2{ href: "#about", label: "About" },\n+2{ href: "#services", label: "Services" },\n+1]}\n/>`,
        },
      ]}
    />
  ),
}

export const StickySectionLinksCustom: Story = {
  name: "StickySectionLinks custom",
  render: () => (
    <Story
      variables={[
        {
          name: "renderLink",
          description: "renderLink={...}",
          demo: (
            <Typography size="small" color="medium">
              Custom renderer for individual link items with isActive state
            </Typography>
          ),
          code: `<StickySectionLinks\n+1links={links}\n+1renderLink={(link, isActive) => (\n+2<Button variant={isActive ? "primary" : "ghost"}>\n+3{link.label}\n+2</Button>\n+1)}\n/>`,
        },
        {
          name: "renderWrapper",
          description: "renderWrapper={...}",
          demo: (
            <Typography size="small" color="medium">
              Custom renderer for the wrapper container
            </Typography>
          ),
          code: `<StickySectionLinks\n+1links={links}\n+1renderWrapper={(children) => (\n+2<nav className="custom-nav">{children}</nav>\n+1)}\n/>`,
        },
      ]}
    />
  ),
}