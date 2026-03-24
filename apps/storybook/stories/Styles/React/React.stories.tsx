import type { Meta, StoryObj } from "@storybook/react-vite"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import CodeBlock from "../../../src/components/CodeBlock"


const ReactDemo = () => <></>

const meta = {
  title: "React/Styles/StylesProvider",
  component: ReactDemo,
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
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
      <Typography color="light">
        Wrap your application with StylesProvider to inject nice-styles CSS
        variables and enable styled-components theming.
      </Typography>
      <CodeBlock>{`<StylesProvider>
  {children}
</StylesProvider>`}</CodeBlock>
      <Typography color="light">
        This provides CSS custom properties on :root and makes the nice-styles
        Theme available via styled-components.
      </Typography>
    </Flex>
  ),
}