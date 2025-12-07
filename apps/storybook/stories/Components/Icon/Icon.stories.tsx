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
        "placeholder",
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
        type: { summary: "ForegroundColorType" },
        defaultValue: { summary: '"base"' },
      },
    },
    size: {
      description:
        "[`Tokens.fontSize`](/?path=/story/styles-tokens--font-size)",
      control: "select",
      options: ["smaller", "small", "base", "large", "larger"],
      table: {
        type: { summary: "FontSizeType" },
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
      options: ["base", "large"],
      table: {
        type: { summary: "BorderWidthType" },
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
        demo: (
          <Flex gap="base">
            <Icon name={name} />
            <Icon name={name} outlined />
          </Flex>
        ),
        code: `<Icon name="${name}"/>`,
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
          demo: <Icon name="placeholder" outlined={false} />,
          code: `<Icon name="placeholder"/>`,
        },
        {
          name: "true",
          description: "outlined={true}",
          demo: <Icon name="placeholder" outlined={true} />,
          code: `<Icon name="placeholder" outlined={true}/>`,
        },
      ]}
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
        demo: <Icon name="placeholder" size={size} />,
        code: size === "base" ? `<Icon/>` : `<Icon size="${size}"/>`,
      }))}
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
        demo: <Icon name="placeholder" color={color} />,
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
        demo: <Icon name="placeholder" strokeWidth={width} />,
        code: width === "base" ? `<Icon/>` : `<Icon strokeWidth="${width}"/>`,
      }))}
    />
  ),
}
