import type { Meta, StoryObj } from "@storybook/react"
import Button from "nice-react-button"
import Flex from "nice-react-flex"
import Story from "../../../src/components/Story"
import { generateDescriptionString } from "../../../src/services"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: generateDescriptionString("nice-react-button", {
          setup: [
            {
              value: 'import Button from "nice-react-button"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: "<Button onClick={handler}>{children}</Button>",
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
      name: "children",
      description: "",
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    onClick: {
      description: "",
      table: {
        type: { summary: "() => void" },
      },
    },
    status: {
      description: "",
      control: "select",
      options: ["primary", "secondary"],
      table: {
        type: { summary: "ButtonStatusType" },
        defaultValue: { summary: '"primary"' },
      },
    },
    state: {
      description: "",
      control: "select",
      options: ["base", "disabled", "error", "success", "warning"],
      table: {
        type: { summary: "ButtonStateType" },
        defaultValue: { summary: '"base"' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: "basic",
  render: () => (
    <Story
      variables={[
        {
          name: "onClick",
          description: "onClick={() => void}",
          demo: (
            <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
          ),
          code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
        },
      ]}
    />
  ),
}

export const Status: Story = {
  name: "status",
  render: () => (
    <Story
      variables={[
        {
          name: "primary",
          description: 'status="primary"',
          default: true,
          demo: <Button onClick={() => {}}>Primary</Button>,
          code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
        },
        {
          name: "secondary",
          description: 'status="secondary"',
          demo: (
            <Button onClick={() => {}} status="secondary">
              Secondary
            </Button>
          ),
          code: `<Button\n+1onClick={handler}\n+1status="secondary"\n>\n+1{children}\n</Button>`,
        },
      ]}
    />
  ),
}

export const State: Story = {
  name: "state",
  render: () => (
    <Story
      variables={[
        {
          name: "base",
          description: 'state="base"',
          default: true,
          demo: (
            <Flex gap="small">
              <Button onClick={() => {}}>Base</Button>
              <Button status="secondary" onClick={() => {}}>
                Base
              </Button>
            </Flex>
          ),
          code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
        },
        {
          name: "disabled",
          description: 'state="disabled"',
          demo: (
            <Flex gap="small">
              <Button onClick={() => {}} state="disabled">
                Disabled
              </Button>
              <Button status="secondary" onClick={() => {}} state="disabled">
                Disabled
              </Button>
            </Flex>
          ),
          code: `<Button\n+1onClick={handler}\n+1state="disabled"\n>\n+1{children}\n</Button>`,
        },
        {
          name: "error",
          description: 'state="error"',
          demo: (
            <Flex gap="small">
              <Button onClick={() => {}} state="error">
                Error
              </Button>
              <Button status="secondary" onClick={() => {}} state="error">
                Error
              </Button>
            </Flex>
          ),
          code: `<Button\n+1onClick={handler}\n+1state="error"\n>\n+1{children}\n</Button>`,
        },
        {
          name: "success",
          description: 'state="success"',
          demo: (
            <Flex gap="small">
              <Button onClick={() => {}} state="success">
                Success
              </Button>
              <Button status="secondary" onClick={() => {}} state="success">
                Success
              </Button>
            </Flex>
          ),
          code: `<Button\n+1onClick={handler}\n+1state="success"\n>\n+1{children}\n</Button>`,
        },
        {
          name: "warning",
          description: 'state="warning"',
          demo: (
            <Flex gap="small">
              <Button onClick={() => {}} state="warning">
                Warning
              </Button>
              <Button status="secondary" onClick={() => {}} state="warning">
                Warning
              </Button>
            </Flex>
          ),
          code: `<Button\n+1onClick={handler}\n+1state="warning"\n>\n+1{children}\n</Button>`,
        },
      ]}
    />
  ),
}

export const Size: Story = {
  name: "size",
  render: () => (
    <Story
      variables={[
        {
          name: "smaller",
          description: 'size="smaller"',
          demo: (
            <Button onClick={() => {}} size="smaller">
              Smaller
            </Button>
          ),
          code: `<Button\n+1onClick={handler}\n+1size="smaller"\n>\n+1{children}\n</Button>`,
        },
        {
          name: "small",
          description: 'size="small"',
          demo: (
            <Button onClick={() => {}} size="small">
              Small
            </Button>
          ),
          code: `<Button\n+1onClick={handler}\n+1size="small"\n>\n+1{children}\n</Button>`,
        },
        {
          name: "base",
          description: 'size="base"',
          default: true,
          demo: (
            <Button onClick={() => {}} size="base">
              Base
            </Button>
          ),
          code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
        },
        {
          name: "large",
          description: 'size="large"',
          demo: (
            <Button onClick={() => {}} size="large">
              Large
            </Button>
          ),
          code: `<Button\n+1onClick={handler}\n+1size="large"\n>\n+1{children}\n</Button>`,
        },
        {
          name: "larger",
          description: 'size="larger"',
          demo: (
            <Button onClick={() => {}} size="larger">
              Larger
            </Button>
          ),
          code: `<Button\n+1onClick={handler}\n+1size="larger"\n>\n+1{children}\n</Button>`,
        },
      ]}
    />
  ),
}

export const BorderRadius: Story = {
  name: "borderRadius",
  render: () => (
    <Story
      variables={[
        {
          name: "small",
          description: 'borderRadius="small"',
          demo: (
            <Button onClick={() => {}} borderRadius="small">
              Small
            </Button>
          ),
          code: `<Button\n+1onClick={handler}\n+1borderRadius="small"\n>\n+1{children}\n</Button>`,
        },
        {
          name: "base",
          description: 'borderRadius="base"',
          default: true,
          demo: (
            <Button onClick={() => {}} borderRadius="base">
              Base
            </Button>
          ),
          code: `<Button onClick={handler}>\n+1{children}\n</Button>`,
        },
        {
          name: "large",
          description: 'borderRadius="large"',
          demo: (
            <Button onClick={() => {}} borderRadius="large">
              Large
            </Button>
          ),
          code: `<Button\n+1onClick={handler}\n+1borderRadius="large"\n>\n+1{children}\n</Button>`,
        },
      ]}
    />
  ),
}

export const Icon: Story = {
  name: "icon",
  render: () => (
    <Story
      variables={[
        {
          name: "with text",
          description: 'icon="arrow-right"',
          demo: (
            <Button onClick={() => {}} icon="arrow">
              Next
            </Button>
          ),
          code: `<Button\n+1onClick={handler}\n+1icon="arrow-right"\n>\n+1{children}\n</Button>`,
        },
        {
          name: "icon only",
          description: 'icon="plus" (no children)',
          demo: (
            <Button onClick={() => {}} icon="plus" aria-label="Add item" />
          ),
          code: `<Button\n+1onClick={handler}\n+1icon="plus"\n+1aria-label="Add item"\n/>`,
        },
      ]}
    />
  ),
}
