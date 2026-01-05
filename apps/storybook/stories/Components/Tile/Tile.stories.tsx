import type { Meta, StoryObj } from "@storybook/react"
import Tile from "nice-react-tile"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import { getToken } from "nice-styles"
import Story from "../../../src/components/Story"
import { generateDescriptionString } from "../../../src/services"

/**
 * A layout component for creating full-width sections with background styling,
 * responsive breakpoints, and optional side content areas.
 *
 * Tile provides consistent spacing and max-width constraints for page sections,
 * with support for background images, colors, and responsive layouts.
 */
const meta = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-tile", {
          setup: [
            {
              value: 'import Tile from "nice-react-tile"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: "<Tile>{children}</Tile>",
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
    children: {
      name: "children *",
      description: "",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    backgroundColor: {
      description: "",
      control: "color",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundImage: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    backgroundPosition: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"center"' },
      },
    },
    backgroundSize: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"cover"' },
      },
    },
    backgroundAttachment: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"fixed"' },
      },
    },
    breakpointMd: {
      description: "",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    breakpointLg: {
      description: "",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    fullWidth: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    spacing: {
      description: "[`Tokens.gap`](/?path=/story/styles-tokens--gap)",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: null },
      },
    },
    contentLeft: {
      description: "",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    contentRight: {
      description: "",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    className: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    style: {
      description: "",
      table: {
        type: { summary: "React.CSSProperties" },
      },
    },
  },
} satisfies Meta<typeof Tile>

export default meta
type Story = StoryObj<typeof meta>

const SampleContent = () => (
  <Flex direction="column" gap="small">
    <Typography as="h2" weight="bold">
      Section Title
    </Typography>
    <Typography color="medium">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Typography>
  </Flex>
)

export const Basic: Story = {
  name: "basic",
  render: () => (
    <Story
      variables={[
        {
          name: "",
          demo: (
            <Tile>
              <SampleContent />
            </Tile>
          ),
          code: `<Tile>\n+1{children}\n</Tile>`,
        },
      ]}
    />
  ),
}

export const BackgroundColor: Story = {
  name: "backgroundColor",
  render: () => (
    <Story
      variables={[
        {
          name: "custom color",
          description: 'backgroundColor="..."',
          demo: (
            <Tile>
              <SampleContent />
            </Tile>
          ),
          code: `<Tile backgroundColor={color}>\n+1{children}\n</Tile>`,
        },
      ]}
    />
  ),
}

export const Spacing: Story = {
  name: "spacing",
  render: () => (
    <Story
      variables={["smaller", "small", "base", "large", "larger"].map(value => ({
        name: value,
        description: `spacing="${value}"`,
        value: getToken("gap", value).value,
        demo: (
          <Tile
            spacing={value as "smaller" | "small" | "base" | "large" | "larger"}
          >
            <SampleContent />
          </Tile>
        ),
        code: `<Tile spacing="${value}">\n+1{children}\n</Tile>`,
      }))}
    />
  ),
}

export const BreakpointLg: Story = {
  name: "breakpointLg",
  render: () => (
    <Story
      variables={[
        {
          name: "1200",
          description: "breakpointLg={1200}",
          demo: (
            <Tile breakpointLg={1200} spacing="base">
              <Typography color="medium">
                Content constrained to 1200px max-width
              </Typography>
            </Tile>
          ),
          code: `<Tile breakpointLg={1200}>\n+1{children}\n</Tile>`,
        },
      ]}
    />
  ),
}

export const FullWidth: Story = {
  name: "fullWidth",
  render: () => (
    <Story
      variables={[
        {
          name: "false",
          description: "fullWidth={false}",
          default: true,
          demo: (
            <Tile>
              <Typography color="medium">Default width</Typography>
            </Tile>
          ),
          code: `<Tile>\n+1{children}\n</Tile>`,
        },
        {
          name: "true",
          description: "fullWidth={true}",
          demo: (
            <Tile fullWidth>
              <Typography color="medium">Full width tile</Typography>
            </Tile>
          ),
          code: `<Tile fullWidth>\n+1{children}\n</Tile>`,
        },
      ]}
    />
  ),
}

const SideContent = ({ label }: { label: string }) => (
  <Flex
    style={{
      width: "80px",
      height: "80px",
      borderRadius: getToken("borderRadius", "base").var,
    }}
    alignItems="center"
    justifyContent="center"
  >
    <Typography size="small" color="medium">
      {label}
    </Typography>
  </Flex>
)

export const ContentLeft: Story = {
  name: "contentLeft",
  render: () => (
    <Story
      variables={[
        {
          name: "with left content",
          description: "contentLeft={...}",
          demo: (
            <Tile contentLeft={<SideContent label="Left" />} spacing="base">
              <SampleContent />
            </Tile>
          ),
          code: `<Tile contentLeft={node}>\n+1{children}\n</Tile>`,
        },
      ]}
    />
  ),
}

export const ContentRight: Story = {
  name: "contentRight",
  render: () => (
    <Story
      variables={[
        {
          name: "with right content",
          description: "contentRight={...}",
          demo: (
            <Tile contentRight={<SideContent label="Right" />} spacing="base">
              <SampleContent />
            </Tile>
          ),
          code: `<Tile contentRight={node}>\n+1{children}\n</Tile>`,
        },
      ]}
    />
  ),
}

export const Layout: Story = {
  name: "layout",
  render: () => (
    <Story
      variables={[
        {
          name: "with both sides",
          description: "contentLeft + contentRight",
          demo: (
            <Tile
              contentLeft={<SideContent label="Left" />}
              contentRight={<SideContent label="Right" />}
              spacing="base"
            >
              <SampleContent />
            </Tile>
          ),
          code: `<Tile\n+1contentLeft={left}\n+1contentRight={right}\n>\n+1{children}\n</Tile>`,
        },
      ]}
    />
  ),
}
