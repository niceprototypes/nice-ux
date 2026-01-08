import type { StoryObj } from "@storybook/react"
import { meta } from "./Slider.meta"
import DefaultStory from "./stories/Default.story"
import CurrentIndexStory from "./stories/CurrentIndex.story"
import IsAnimatingStory from "./stories/IsAnimating.story"
import OnAnimationCompleteStory from "./stories/OnAnimationComplete.story"

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Slider",
  render: DefaultStory,
}

export const CurrentIndex: Story = {
  name: "currentIndex",
  render: CurrentIndexStory,
}

export const IsAnimating: Story = {
  name: "isAnimating",
  render: IsAnimatingStory,
}

export const OnAnimationComplete: Story = {
  name: "onAnimationComplete",
  render: OnAnimationCompleteStory,
}
