import type { Meta, StoryObj } from "@storybook/react"
import UseScrollStory from "./stories/UseScroll.story"
import StickyBasicStory from "./stories/StickyBasic.story"
import StickyOrderStory from "./stories/StickyOrder.story"
import FadeOnScrollBasicStory from "./stories/FadeOnScrollBasic.story"
import FadeOnScrollPositionsStory from "./stories/FadeOnScrollPositions.story"
import FadeOnScrollOpacityStory from "./stories/FadeOnScrollOpacity.story"
import StickySectionBasicStory from "./stories/StickySectionBasic.story"
import StickySectionLinksBasicStory from "./stories/StickySectionLinksBasic.story"
import StickySectionLinksCustomStory from "./stories/StickySectionLinksCustom.story"

const meta = {
  title: "React/Components/Scroll",
  parameters: {
    layout: "fullscreen",
    docs: {
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },

  argTypes: {
    order: {
      description: "Stack order for multiple sticky elements (lower = higher)",
      table: {
        category: "Sticky",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    onChange: {
      description: "Callback when sticky state changes",
      table: {
        category: "Sticky",
        type: { summary: "(isSticky: boolean) => void" },
      },
    },
    startPosition: {
      description: "Scroll progress % where fade in begins",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    peakPosition: {
      description: "Scroll progress % where peak opacity is reached",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "50" },
      },
    },
    endPosition: {
      description: "Scroll progress % where fade out completes",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    startOpacity: {
      description: "Initial opacity value",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    peakOpacity: {
      description: "Peak opacity value",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    endOpacity: {
      description: "Final opacity value",
      table: {
        category: "FadeOnScroll",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    id: {
      description: "Unique identifier for the section",
      table: {
        category: "StickySection",
        type: { summary: "string" },
      },
    },
    as: {
      description: "HTML element type to render",
      table: {
        category: "StickySection",
        type: { summary: "keyof React.JSX.IntrinsicElements" },
        defaultValue: { summary: '"section"' },
      },
    },
    links: {
      description: "Array of navigation link objects",
      table: {
        category: "StickySectionLinks",
        type: { summary: "{ href: string; label: string }[]" },
      },
    },
    renderLink: {
      description: "Custom renderer for link items",
      table: {
        category: "StickySectionLinks",
        type: { summary: "(link, isActive) => ReactNode" },
      },
    },
    renderWrapper: {
      description: "Custom renderer for wrapper container",
      table: {
        category: "StickySectionLinks",
        type: { summary: "(children) => ReactNode" },
      },
    },
  },
} satisfies Meta

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
