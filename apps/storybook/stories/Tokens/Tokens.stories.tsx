import type { Meta, StoryObj } from "@storybook/react"
import { getToken } from "nice-styles"
import VariableList from "../../src/components/VariableList"
import { generateDescriptionString } from "../../src/utilities"

const TokensDemo = () => <></>

const meta = {
  title: "Styles/Tokens",
  component: TokensDemo,
  parameters: {
    layout: "padded",
    controls: { disable: true },
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString([
          { value: "[REPO](https://github.com/niceprototypes/nice-styles)", newLine: true },
          { value: "SETUP", newLine: true },
          { value: "npm i nice-styles", code: true, newLine: true },
          { value: "import { getToken } from \"nice-styles\"", code: true, newLine: true },
          { value: "USAGE", newLine: true },
          { value: "getToken(\"fontSize\").key", code: true },
          "\u2002\u2192\u2002",
          { value: "\"--font-size-base\"", code: true, newLine: true },
          { value: "getToken(\"fontSize\", \"large\").key", code: true },
          "\u2002\u2192\u2002",
          { value: "\"--font-size-large\"", code: true, newLine: true },
          { value: "getToken(\"fontSize\", \"large\").var", code: true },
          "\u2002\u2192\u2002",
          { value: "var(\"--font-size-large\")", code: true, newLine: true },
          { value: "getToken(\"fontSize\", \"large\").value", code: true },
          "\u2002\u2192\u2002",
          { value: "\"24px\"", code: true, newLine: true },
        ]),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TokensDemo>

export default meta
type Story = StoryObj<typeof meta>

const tokenItems: Record<string, string[]> = {
  animationDuration: ["base", "slow"],
  animationEasing: ["base"],
  backgroundColor: ["base", "alternate"],
  borderColor: ["base", "heavy", "heavier"],
  borderRadius: ["smaller", "small", "base", "large", "larger"],
  borderWidth: ["base", "large"],
  boxShadow: ["base", "large"],
  cellHeight: ["smaller", "small", "base", "large", "larger"],
  fontFamily: ["heading", "base", "code"],
  fontSize: ["smaller", "small", "base", "large", "larger"],
  fontWeight: ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
  foregroundColor: ["lighter", "light", "medium", "heavy", "base", "disabled", "link", "success", "warning", "error"],
  gap: ["smaller", "small", "base", "large", "larger"],
  lineHeight: ["condensed", "base", "expanded"],
}

const createTokenStory = (groupName: string) => {
  const items = tokenItems[groupName] || []

  return {
    name: groupName,
    render: () => (
      <VariableList
        spacer={false}
        variables={items.map(itemKey => {
          const token = getToken(groupName as any, itemKey)
          return {
            name: itemKey,
            value: token.value
          }
        })}
      />
    ),
    parameters: {
      docs: {
        source: {
          code: null,
        },
        canvas: {
          sourceState: 'none',
        },
      },
    },
  }
}

export const AnimationDuration: Story = createTokenStory("animationDuration")

export const AnimationEasing: Story = createTokenStory("animationEasing")

export const BackgroundColor: Story = createTokenStory("backgroundColor")

export const BorderColor: Story = createTokenStory("borderColor")

export const BorderRadius: Story = createTokenStory("borderRadius")

export const BorderWidth: Story = createTokenStory("borderWidth")

export const BoxShadow: Story = createTokenStory("boxShadow")

export const CellHeight: Story = createTokenStory("cellHeight")

export const FontFamily: Story = createTokenStory("fontFamily")

export const FontSize: Story = createTokenStory("fontSize")

export const FontWeight: Story = createTokenStory("fontWeight")

export const ForegroundColor: Story = createTokenStory("foregroundColor")

export const Gap: Story = createTokenStory("gap")

export const LineHeight: Story = createTokenStory("lineHeight")