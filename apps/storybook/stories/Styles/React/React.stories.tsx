import type { Meta, StoryObj } from "@storybook/react"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import CodePreview from "../../../src/components/CodePreview"
import { generateDescriptionString } from "../../../src/services"

const ReactDemo = () => <></>

const meta = {
  title: "Styles/React",
  component: ReactDemo,
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
              value: 'import { StylesProvider } from "nice-react-styles"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: "<StylesProvider>{children}</StylesProvider>",
              code: true,
              newLine: true,
            },
          ],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReactDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const Basic: Story = {
  name: "Basic",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography color="medium">
        Wrap your application with StylesProvider to inject nice-styles CSS
        variables and enable styled-components theming.
      </Typography>
      <CodePreview
        code={`<StylesProvider>\n+2{children}\n</StylesProvider>`}
      />
      <Typography color="medium">
        This provides CSS custom properties on :root and makes the nice-styles
        Theme available via styled-components.
      </Typography>
    </Flex>
  ),
}