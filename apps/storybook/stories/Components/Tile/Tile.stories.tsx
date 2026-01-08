import type { StoryObj } from "@storybook/react"
import { meta } from "./Tile.meta"
import BasicStory from "./stories/Basic.story"
import BackgroundColorStory from "./stories/BackgroundColor.story"
import SpacingStory from "./stories/Spacing.story"
import BreakpointLgStory from "./stories/BreakpointLg.story"
import FullWidthStory from "./stories/FullWidth.story"
import ContentLeftStory from "./stories/ContentLeft.story"
import ContentRightStory from "./stories/ContentRight.story"
import LayoutStory from "./stories/Layout.story"

export { meta as default } from "./Tile.meta"
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: BasicStory,
}

export const BackgroundColor: Story = {
  name: "backgroundColor",
  render: BackgroundColorStory,
}

export const Spacing: Story = {
  name: "spacing",
  render: SpacingStory,
}

export const BreakpointLg: Story = {
  name: "breakpointLg",
  render: BreakpointLgStory,
}

export const FullWidth: Story = {
  name: "fullWidth",
  render: FullWidthStory,
}

export const ContentLeft: Story = {
  name: "contentLeft",
  render: ContentLeftStory,
}

export const ContentRight: Story = {
  name: "contentRight",
  render: ContentRightStory,
}

export const Layout: Story = {
  name: "layout",
  render: LayoutStory,
}
