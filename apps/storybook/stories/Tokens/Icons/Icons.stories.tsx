import type { Meta, StoryObj } from "@storybook/react-vite"
import { iconNames } from "nice-react-icon"
import IconGrid from "../../../src/components/IconGrid"

const IconsDemo = () => <></>

const meta = {
  title: "Tokens/Icons",
  component: IconsDemo,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof IconsDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const AllIcons: Story = {
  name: "Icons",
  render: () => <IconGrid icons={iconNames.map(name => ({ name }))} />,
  parameters: storyParameters,
}
