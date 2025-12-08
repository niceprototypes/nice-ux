import type { Meta, StoryObj } from "@storybook/react"
import Icon, { iconNames } from "nice-react-icon"
import Flex from "nice-react-flex"
import IconGrid from "../../src/components/IconGrid"
import Story from "../../src/components/Story"
import { generateDescriptionString } from "../../src/services"

const IconsDemo = () => <></>

const meta = {
  title: "Styles/Icons",
  component: IconsDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString("nice-icons", {
          links: ["[Component](/docs/components-icon--docs)"],
          setup: [
            {
              value: 'import CheckIcon from "nice-icons/check/stroke.svg"',
              code: true,
            },
            "\u2002/\u2002",
            {
              value: 'import { CheckStrokeIcon } from "nice-icons"',
              code: true,
              newLine: true,
            },
          ],
          usage: [{ value: '<img src={CheckIcon} alt="check"/>', code: true }],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconsDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const AllIcons: Story = {
  name: "All Icons",
  render: () => <IconGrid icons={iconNames.map(name => ({ name }))} />,
  parameters: storyParameters,
}

export const Placeholder: Story = {
  name: "placeholder",
  render: () => (
    <Story
      variables={[
        {
          name: "placeholder",
          demo: (
            <Flex gap="base">
              <Icon name="placeholder" />
              <Icon name="placeholder" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Arrow: Story = {
  name: "arrow",
  render: () => (
    <Story
      variables={[
        {
          name: "arrow",
          demo: (
            <Flex gap="base">
              <Icon name="arrow" />
              <Icon name="arrow" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Attention: Story = {
  name: "attention",
  render: () => (
    <Story
      variables={[
        {
          name: "attention",
          demo: (
            <Flex gap="base">
              <Icon name="attention" />
              <Icon name="attention" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Box: Story = {
  name: "box",
  render: () => (
    <Story
      variables={[
        {
          name: "box",
          demo: (
            <Flex gap="base">
              <Icon name="box" />
              <Icon name="box" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Brush: Story = {
  name: "brush",
  render: () => (
    <Story
      variables={[
        {
          name: "brush",
          demo: (
            <Flex gap="base">
              <Icon name="brush" />
              <Icon name="brush" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Calendar: Story = {
  name: "calendar",
  render: () => (
    <Story
      variables={[
        {
          name: "calendar",
          demo: (
            <Flex gap="base">
              <Icon name="calendar" />
              <Icon name="calendar" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Cancel: Story = {
  name: "cancel",
  render: () => (
    <Story
      variables={[
        {
          name: "cancel",
          demo: (
            <Flex gap="base">
              <Icon name="cancel" />
              <Icon name="cancel" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Carat: Story = {
  name: "carat",
  render: () => (
    <Story
      variables={[
        {
          name: "carat",
          demo: (
            <Flex gap="base">
              <Icon name="carat" />
              <Icon name="carat" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Check: Story = {
  name: "check",
  render: () => (
    <Story
      variables={[
        {
          name: "check",
          demo: (
            <Flex gap="base">
              <Icon name="check" />
              <Icon name="check" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Cloud: Story = {
  name: "cloud",
  render: () => (
    <Story
      variables={[
        {
          name: "cloud",
          demo: (
            <Flex gap="base">
              <Icon name="cloud" />
              <Icon name="cloud" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Code: Story = {
  name: "code",
  render: () => (
    <Story
      variables={[
        {
          name: "code",
          demo: (
            <Flex gap="base">
              <Icon name="code" />
              <Icon name="code" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Cog: Story = {
  name: "cog",
  render: () => (
    <Story
      variables={[
        {
          name: "cog",
          demo: (
            <Flex gap="base">
              <Icon name="cog" />
              <Icon name="cog" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Contact: Story = {
  name: "contact",
  render: () => (
    <Story
      variables={[
        {
          name: "contact",
          demo: (
            <Flex gap="base">
              <Icon name="contact" />
              <Icon name="contact" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Content: Story = {
  name: "content",
  render: () => (
    <Story
      variables={[
        {
          name: "content",
          demo: (
            <Flex gap="base">
              <Icon name="content" />
              <Icon name="content" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Edit: Story = {
  name: "edit",
  render: () => (
    <Story
      variables={[
        {
          name: "edit",
          demo: (
            <Flex gap="base">
              <Icon name="edit" />
              <Icon name="edit" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Link: Story = {
  name: "link",
  render: () => (
    <Story
      variables={[
        {
          name: "link",
          demo: (
            <Flex gap="base">
              <Icon name="link" />
              <Icon name="link" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Lock: Story = {
  name: "lock",
  render: () => (
    <Story
      variables={[
        {
          name: "lock",
          demo: (
            <Flex gap="base">
              <Icon name="lock" />
              <Icon name="lock" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Menu: Story = {
  name: "menu",
  render: () => (
    <Story
      variables={[
        {
          name: "menu",
          demo: (
            <Flex gap="base">
              <Icon name="menu" />
              <Icon name="menu" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Message: Story = {
  name: "message",
  render: () => (
    <Story
      variables={[
        {
          name: "message",
          demo: (
            <Flex gap="base">
              <Icon name="message" />
              <Icon name="message" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Pause: Story = {
  name: "pause",
  render: () => (
    <Story
      variables={[
        {
          name: "pause",
          demo: (
            <Flex gap="base">
              <Icon name="pause" />
              <Icon name="pause" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Plus: Story = {
  name: "plus",
  render: () => (
    <Story
      variables={[
        {
          name: "plus",
          demo: (
            <Flex gap="base">
              <Icon name="plus" />
              <Icon name="plus" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Profile: Story = {
  name: "profile",
  render: () => (
    <Story
      variables={[
        {
          name: "profile",
          demo: (
            <Flex gap="base">
              <Icon name="profile" />
              <Icon name="profile" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Puzzle: Story = {
  name: "puzzle",
  render: () => (
    <Story
      variables={[
        {
          name: "puzzle",
          demo: (
            <Flex gap="base">
              <Icon name="puzzle" />
              <Icon name="puzzle" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Search: Story = {
  name: "search",
  render: () => (
    <Story
      variables={[
        {
          name: "search",
          demo: (
            <Flex gap="base">
              <Icon name="search" />
              <Icon name="search" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Shuffle: Story = {
  name: "shuffle",
  render: () => (
    <Story
      variables={[
        {
          name: "shuffle",
          demo: (
            <Flex gap="base">
              <Icon name="shuffle" />
              <Icon name="shuffle" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Skip: Story = {
  name: "skip",
  render: () => (
    <Story
      variables={[
        {
          name: "skip",
          demo: (
            <Flex gap="base">
              <Icon name="skip" />
              <Icon name="skip" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Spinner: Story = {
  name: "spinner",
  render: () => (
    <Story
      variables={[
        {
          name: "spinner",
          demo: (
            <Flex gap="base">
              <Icon name="spinner" />
              <Icon name="spinner" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Trash: Story = {
  name: "trash",
  render: () => (
    <Story
      variables={[
        {
          name: "trash",
          demo: (
            <Flex gap="base">
              <Icon name="trash" />
              <Icon name="trash" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const Upload: Story = {
  name: "upload",
  render: () => (
    <Story
      variables={[
        {
          name: "upload",
          demo: (
            <Flex gap="base">
              <Icon name="upload" />
              <Icon name="upload" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}

export const X: Story = {
  name: "x",
  render: () => (
    <Story
      variables={[
        {
          name: "x",
          demo: (
            <Flex gap="base">
              <Icon name="x" />
              <Icon name="x" outlined />
            </Flex>
          ),
        },
      ]}
    />
  ),
  parameters: storyParameters,
}
