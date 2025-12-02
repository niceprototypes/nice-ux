import type { Meta, StoryObj } from "@storybook/react"
import VariableList from "../../src/components/VariableList"
import { generateDescriptionString } from "../../src/services"
import { prepareAnimationDuration } from "./stories/animationDuration"
import { prepareAnimationEasing } from "./stories/animationEasing"
import { prepareBackgroundColor } from "./stories/backgroundColor"
import { prepareBorderColor } from "./stories/borderColor"
import { prepareBorderRadius } from "./stories/borderRadius"
import { prepareBorderWidth } from "./stories/borderWidth"
import { prepareBoxShadow } from "./stories/boxShadow"
import { prepareCellHeight } from "./stories/cellHeight"
import { prepareForegroundColor } from "./stories/foregroundColor"
import { prepareFontFamily } from "./stories/fontFamily"
import { prepareFontSize } from "./stories/fontSize"
import { prepareFontWeight } from "./stories/fontWeight"
import { prepareGap } from "./stories/gap"
import { prepareLineHeight } from "./stories/lineHeight"

const TokensDemo = () => <></>

const meta = {
  title: "Styles/Tokens",
  component: TokensDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString([
          "LINKS",
          "\u2002",
          {
            value: "[github](https://github.com/niceprototypes/nice-styles)",
          },
          "\u2002",
          {
            value: "[npm](https://www.npmjs.com/package/nice-styles)",
            newLine: true,
          },
          { value: "\u2002", newLine: true },
          { value: "SETUP", newLine: true },
          { value: "npm i nice-styles", code: true, newLine: true },
          {
            value: 'import { getToken } from "nice-styles"',
            code: true,
            newLine: true,
          },
          { value: "\u2002", newLine: true },
          { value: "USAGE", newLine: true },
          { value: 'getToken("fontSize").key', code: true },
          "\u2002\u2192\u2002",
          { value: '"--font-size-base"', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").key', code: true },
          "\u2002\u2192\u2002",
          { value: '"--font-size-large"', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").var', code: true },
          "\u2002\u2192\u2002",
          { value: 'var("--font-size-large")', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").value', code: true },
          "\u2002\u2192\u2002",
          { value: '"24px"', code: true, newLine: true },
        ]),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TokensDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const AnimationDuration: Story = {
  name: "animationDuration",
  render: () => <VariableList variables={prepareAnimationDuration()} />,
  parameters: storyParameters,
}

export const AnimationEasing: Story = {
  name: "animationEasing",
  render: () => <VariableList variables={prepareAnimationEasing()} />,
  parameters: storyParameters,
}

export const BackgroundColor: Story = {
  name: "backgroundColor",
  render: () => <VariableList variables={prepareBackgroundColor()} />,
  parameters: storyParameters,
}

export const BorderColor: Story = {
  name: "borderColor",
  render: () => <VariableList variables={prepareBorderColor()} />,
  parameters: storyParameters,
}

export const BorderRadius: Story = {
  name: "borderRadius",
  render: () => <VariableList variables={prepareBorderRadius()} />,
  parameters: storyParameters,
}

export const BorderWidth: Story = {
  name: "borderWidth",
  render: () => <VariableList variables={prepareBorderWidth()} />,
  parameters: storyParameters,
}

export const BoxShadow: Story = {
  name: "boxShadow",
  render: () => <VariableList variables={prepareBoxShadow()} />,
  parameters: storyParameters,
}

export const CellHeight: Story = {
  name: "cellHeight",
  render: () => <VariableList variables={prepareCellHeight()} />,
  parameters: storyParameters,
}

export const ForegroundColor: Story = {
  name: "foregroundColor",
  render: () => <VariableList variables={prepareForegroundColor()} />,
  parameters: storyParameters,
}

export const FontFamily: Story = {
  name: "fontFamily",
  render: () => <VariableList variables={prepareFontFamily()} />,
  parameters: storyParameters,
}

export const FontSize: Story = {
  name: "fontSize",
  render: () => <VariableList variables={prepareFontSize()} />,
  parameters: storyParameters,
}

export const FontWeight: Story = {
  name: "fontWeight",
  render: () => <VariableList variables={prepareFontWeight()} />,
  parameters: storyParameters,
}

export const Gap: Story = {
  name: "gap",
  render: () => <VariableList variables={prepareGap()} />,
  parameters: storyParameters,
}

export const LineHeight: Story = {
  name: "lineHeight",
  render: () => <VariableList variables={prepareLineHeight()} />,
  parameters: storyParameters,
}
