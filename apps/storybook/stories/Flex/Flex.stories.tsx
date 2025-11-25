import type { Meta, StoryObj } from "@storybook/react"
import Flex from "nice-react-flex"
import styled from "styled-components"

const Box = styled.div`
  background: var(--nice-background-color-muted);
  padding: 16px;
  border-radius: 4px;
`

const meta = {
  title: "Components/Flex",
  component: Flex,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Flex direction="row" gap="base" alignItems="center">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
}