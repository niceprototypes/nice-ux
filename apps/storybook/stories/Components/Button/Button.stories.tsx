import type { StoryObj } from "@storybook/react"
import { meta } from "./Button.meta"
import BasicStory from "./stories/Basic.story"
import StatusStory from "./stories/Status.story"
import StateStory from "./stories/State.story"
import SizeStory from "./stories/Size.story"
import BorderRadiusStory from "./stories/BorderRadius.story"
import IconStory from "./stories/Icon.story"

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: BasicStory,
}

export const Status: Story = {
  name: "status",
  render: StatusStory,
}

export const State: Story = {
  name: "state",
  render: StateStory,
}

export const Size: Story = {
  name: "size",
  render: SizeStory,
}

export const BorderRadius: Story = {
  name: "borderRadius",
  render: BorderRadiusStory,
}

export const Icon: Story = {
  name: "icon",
  render: IconStory,
}
