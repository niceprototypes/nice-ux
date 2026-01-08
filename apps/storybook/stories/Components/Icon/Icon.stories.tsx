import type { StoryObj } from "@storybook/react"
import { meta } from "./Icon.meta"
import NameStory from "./stories/Name.story"
import SizeStory from "./stories/Size.story"
import OutlinedStory from "./stories/Outlined.story"
import ColorStory from "./stories/Color.story"
import StrokeWidthStory from "./stories/StrokeWidth.story"
import StrokeScalingStory from "./stories/StrokeScaling.story"

export { meta as default } from "./Icon.meta"
type Story = StoryObj<typeof meta>

export const Name: Story = {
  name: "name",
  render: NameStory,
}

export const Size: Story = {
  name: "size",
  render: SizeStory,
}

export const Outlined: Story = {
  name: "outlined",
  render: OutlinedStory,
}

export const Color: Story = {
  name: "color",
  render: ColorStory,
}

export const StrokeWidth: Story = {
  name: "strokeWidth",
  render: StrokeWidthStory,
}

export const StrokeScaling: Story = {
  name: "strokeScaling",
  render: StrokeScalingStory,
}
