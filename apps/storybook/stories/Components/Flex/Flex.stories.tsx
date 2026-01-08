import type { StoryObj } from "@storybook/react"
import { meta } from "./Flex.meta"
import BasicStory from "./stories/Basic.story"
import DirectionStory from "./stories/Direction.story"
import GapStory from "./stories/Gap.story"
import SpacingStory from "./stories/Spacing.story"
import ModeStory from "./stories/Mode.story"
import GrowStory from "./stories/Grow.story"
import JustifyContentStory from "./stories/JustifyContent.story"
import AlignItemsStory from "./stories/AlignItems.story"
import WrapStory from "./stories/Wrap.story"

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: BasicStory,
}

export const Direction: Story = {
  name: "direction",
  render: DirectionStory,
}

export const Gap: Story = {
  name: "gap",
  render: GapStory,
}

export const Spacing: Story = {
  name: "spacing",
  render: SpacingStory,
}

export const Mode: Story = {
  name: "mode",
  render: ModeStory,
}

export const Grow: Story = {
  name: "grow",
  render: GrowStory,
}

export const JustifyContent: Story = {
  name: "justifyContent",
  render: JustifyContentStory,
}

export const AlignItems: Story = {
  name: "alignItems",
  render: AlignItemsStory,
}

export const Wrap: Story = {
  name: "wrap",
  render: WrapStory,
}
