import type { Meta, StoryObj } from "@storybook/react"
import { generateDescriptionString } from "../../../../src/services"

const ComponentDemo = () => <></>

const meta = {
  title: "Styles/Tokens/createTokens",
  component: ComponentDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-styles", {
          setup: [
            {
              value: 'import { createTokens } from "nice-react-styles"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: 'const { GlobalStyles, getToken } = createTokens(tokenMap, "component")',
              code: true,
              newLine: true,
            },
          ],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ComponentDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const Example: Story = {
  name: "Example",
  parameters: storyParameters,
  render: () => <></>,
}
