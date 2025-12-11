import type { Meta, StoryObj } from "@storybook/react"
import Icon, { iconNames } from "nice-react-icon"
import Flex from "nice-react-flex"
import IconGrid from "../../../src/components/IconGrid"
import Story from "../../../src/components/Story"
import { generateDescriptionString } from "../../../src/services"

const IconsDemo = () => <></>

const meta = {
  title: "Styles/Icons",
  component: IconsDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString("nice-icons", {
          links: ["[Component](/docs/components-icon--docs)"],
          setup: [
            {
              value: 'import { CheckStrokeIcon } from "nice-icons"',
              code: true,
              newLine: true,
            },
            "\u2002or\u2002",
            {
              value: 'import CheckIcon from "nice-icons/check/stroke.svg"',
              code: true,
            },
          ],
          usage: [{ value: '<img src={CheckIcon} alt="check"/>', code: true }],
        }),
      },
    },
  },
  tags: ["autodocs"],
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
