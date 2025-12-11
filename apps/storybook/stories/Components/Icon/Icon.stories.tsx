import type { Meta, StoryObj } from "@storybook/react"
import Icon, { iconNames } from "nice-react-icon"
import { Theme } from "nice-styles"
import Story from "../../../src/components/Story"
import Flex from "nice-react-flex"

/**
 * A flexible and customizable React icon component with built-in icon set.
 *
 * Features:
 * - 30+ built-in icons with fill and stroke variants
 * - Custom SVG URL support
 * - Sizing via nice-styles fontSize tokens
 * - Color via nice-styles foregroundColor tokens
 * - TypeScript support
 */
const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "padded",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "",
      control: "select",
      options: [
        "placeholder",
        "arrow",
        "attention",
        "box",
        "brush",
        "calendar",
        "cancel",
        "carat",
        "check",
        "cloud",
        "code",
        "cog",
        "contact",
        "content",
        "edit",
        "link",
        "lock",
        "menu",
        "message",
        "pause",
        "plus",
        "profile",
        "puzzle",
        "search",
        "shuffle",
        "skip",
        "spinner",
        "trash",
        "upload",
        "x",
      ],
      table: {
        type: { summary: "IconNameType" },
      },
    },
    outlined: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    url: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    color: {
      description:
        "[`Tokens.foregroundColor`](/?path=/story/styles-tokens--foreground-color)",
      control: "select",
      options: [
        "lighter",
        "light",
        "medium",
        "heavy",
        "base",
        "disabled",
        "link",
        "success",
        "warning",
        "error",
      ],
      table: {
        type: { summary: null },
        defaultValue: { summary: '"base"' },
      },
    },
    size: {
      description:
        "[`Tokens.fontSize`](/?path=/story/styles-tokens--font-size)",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: null },
        defaultValue: { summary: '"base"' },
      },
    },
    viewBox: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"0 0 16 16"' },
      },
    },
    strokeWidth: {
      description:
        "[`Tokens.borderWidth`](/?path=/story/styles-tokens--border-width)",
      control: "select",
      options: ["small", "base", "large"],
      table: {
        type: { summary: null },
        defaultValue: { summary: '"base"' },
      },
    },
    className: {
      description: "",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    strokeScaling: {
      description: "",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Name: Story = {
  name: "name",
  render: () => (
    <Story
      variables={iconNames.map(name => ({
        name,
        description: `name="${name}"`,
        demo: <Icon name={name} />,
        code: name === "placeholder" ? `<Icon/>` : `<Icon name="${name}"/>`,
      }))}
    />
  ),
}

const fontSizes = Object.keys(
  Theme.fontSize.items
) as (keyof typeof Theme.fontSize.items)[]

export const Size: Story = {
  name: "size",
  render: () => (
    <Story
      variables={fontSizes.map(size => ({
        name: size,
        description: `size="${size}"`,
        demo: <Icon size={size} />,
        code: size === "base" ? `<Icon/>` : `<Icon size="${size}"/>`,
      }))}
    />
  ),
}

export const Outlined: Story = {
  name: "outlined",
  render: () => (
    <Story
      variables={[
        {
          name: "false",
          description: "outlined={false}",
          demo: <Icon size="larger" outlined={false} />,
          code: `<Icon size="larger"/>`,
        },
        {
          name: "true",
          description: "outlined={true}",
          demo: <Icon size="larger" outlined={true} />,
          code: `<Icon size="larger" outlined={true}/>`,
        },
      ]}
    />
  ),
}

const foregroundColors = Object.keys(
  Theme.foregroundColor.items
) as (keyof typeof Theme.foregroundColor.items)[]

export const Color: Story = {
  name: "color",
  render: () => (
    <Story
      variables={foregroundColors.map(color => ({
        name: color,
        description: `color="${color}"`,
        demo: <Icon color={color} />,
        code: `<Icon color="${color}"/>`,
      }))}
    />
  ),
}

const borderWidths = Object.keys(
  Theme.borderWidth.items
) as (keyof typeof Theme.borderWidth.items)[]

export const StrokeWidth: Story = {
  name: "strokeWidth",
  render: () => (
    <Story
      variables={borderWidths.map(width => ({
        name: width,
        description: `strokeWidth="${width}"`,
        demo: <Icon strokeWidth={width} />,
        code: width === "base" ? `<Icon/>` : `<Icon strokeWidth="${width}"/>`,
      }))}
    />
  ),
}

export const StrokeScaling: Story = {
  name: "strokeScaling",
  render: () => (
    <Story
      variables={[
        {
          name: "false",
          description: "strokeScaling={false}",
          demo: <Icon size="larger" strokeScaling={false} />,
          code: `<Icon size="larger"/>`,
        },
        {
          name: "true",
          description: "strokeScaling={true}",
          demo: <Icon size="larger" strokeScaling={true} />,
          code: `<Icon size="larger" strokeScaling/>`,
        },
      ]}
    />
  ),
}
