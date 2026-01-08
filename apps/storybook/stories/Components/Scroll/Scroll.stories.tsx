import type { StoryObj } from "@storybook/react"
import { meta } from "./Scroll.meta"
import UseScrollStory from "./stories/UseScroll.story"
import StickyBasicStory from "./stories/StickyBasic.story"
import StickyOrderStory from "./stories/StickyOrder.story"
import FadeOnScrollBasicStory from "./stories/FadeOnScrollBasic.story"
import FadeOnScrollPositionsStory from "./stories/FadeOnScrollPositions.story"
import FadeOnScrollOpacityStory from "./stories/FadeOnScrollOpacity.story"
import StickySectionBasicStory from "./stories/StickySectionBasic.story"
import StickySectionLinksBasicStory from "./stories/StickySectionLinksBasic.story"
import StickySectionLinksCustomStory from "./stories/StickySectionLinksCustom.story"

export default meta
type Story = StoryObj<typeof meta>

export const UseScroll: Story = {
  name: "useScroll",
  render: UseScrollStory,
}

export const StickyBasic: Story = {
  name: "Sticky",
  render: StickyBasicStory,
}

export const StickyOrder: Story = {
  name: "Sticky order",
  render: StickyOrderStory,
}

export const FadeOnScrollBasic: Story = {
  name: "FadeOnScroll",
  render: FadeOnScrollBasicStory,
}

export const FadeOnScrollPositions: Story = {
  name: "FadeOnScroll positions",
  render: FadeOnScrollPositionsStory,
}

export const FadeOnScrollOpacity: Story = {
  name: "FadeOnScroll opacity",
  render: FadeOnScrollOpacityStory,
}

export const StickySectionBasic: Story = {
  name: "StickySection",
  render: StickySectionBasicStory,
}

export const StickySectionLinksBasic: Story = {
  name: "StickySectionLinks",
  render: StickySectionLinksBasicStory,
}

export const StickySectionLinksCustom: Story = {
  name: "StickySectionLinks custom",
  render: StickySectionLinksCustomStory,
}
