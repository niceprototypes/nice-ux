import type { Meta } from "@storybook/react"
import { generateDescriptionString } from "../../../src/services"

export const meta = {
  title: "Components/Scroll",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-scroll", {
          setup: [
            {
              value:
                'import { ScrollProvider, Sticky, FadeOnScroll } from "nice-react-scroll"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value:
                "<ScrollProvider><Sticky>{header}</Sticky></ScrollProvider>",
              code: true,
            },
          ],
        }),
      },
      source: { code: null },
      canvas: { sourceState: "none" },
    },
  },
  tags: ["autodocs"],
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
