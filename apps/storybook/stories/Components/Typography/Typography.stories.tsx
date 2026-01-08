import type { StoryObj } from "@storybook/react"
import { meta } from "./Typography.meta"
import AlignStory from "./stories/Align.story"
import AntialiasedStory from "./stories/Antialiased.story"
import AsStory from "./stories/As.story"
import CodeStory from "./stories/Code.story"
import ColorStory from "./stories/Color.story"
import LegibilityOptimizedStory from "./stories/LegibilityOptimized.story"
import LineHeightStory from "./stories/LineHeight.story"
import SizeStory from "./stories/Size.story"
import WeightStory from "./stories/Weight.story"

export default meta
type Story = StoryObj<typeof meta>

export const Align: Story = {
  name: "align",
  render: AlignStory,
}

export const Antialiased: Story = {
  name: "antialiased",
  render: AntialiasedStory,
}

export const As: Story = {
  name: "as",
  render: AsStory,
}

export const Code: Story = {
  name: "code",
  render: CodeStory,
}

export const Color: Story = {
  name: "color",
  render: ColorStory,
}

export const LegibilityOptimized: Story = {
  name: "legibilityOptimized",
  render: LegibilityOptimizedStory,
}

export const LineHeight: Story = {
  name: "lineHeight",
  render: LineHeightStory,
}

export const Size: Story = {
  name: "size",
  render: SizeStory,
}

export const Weight: Story = {
  name: "weight",
  render: WeightStory,
}
