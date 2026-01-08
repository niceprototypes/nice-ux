import type { Meta } from "@storybook/react"
import { generateDescriptionString } from "../../../src/services"

export const meta = {
  title: "Components/Slider",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-slider", {
          setup: [
            {
              value: 'import Slider from "nice-react-slider"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value:
                "<Slider currentIndex={0}>{slides}</Slider>",
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
    children: {
      description: "Array of slide elements to display",
      table: {
        type: { summary: "React.ReactNode[]" },
      },
    },
    currentIndex: {
      description: "Index of the currently visible slide (zero-indexed)",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    isAnimating: {
      description: "Whether the slider is currently animating between slides",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onAnimationComplete: {
      description: "Callback fired when slide transition animation completes (after 300ms)",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
} satisfies Meta
