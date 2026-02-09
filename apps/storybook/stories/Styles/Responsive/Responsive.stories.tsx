import type { Meta, StoryObj } from "@storybook/react"
import { getBreakpoint } from "nice-styles"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import { generateDescriptionString } from "../../../src/services"
import {
  BreakpointRow,
  Label,
  Value,
  Query,
  ResponsiveBox,
  MobileLabel,
  TabletLabel,
  DesktopLabel,
} from "./Responsive.styles"

const ResponsiveDemo = () => <></>

const meta = {
  title: "Styles/Responsive",
  component: ResponsiveDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString("nice-styles", {
          setup: [
            {
              value: 'import { getBreakpoint } from "nice-styles"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            { value: 'getBreakpoint("mobile").value', code: true },
            "\u2002\u2192\u2002",
            { value: "440", code: true, newLine: true },
            { value: 'getBreakpoint("mobile").query', code: true },
            "\u2002\u2192\u2002",
            { value: '"@media (max-width: 440px)"', code: true, newLine: true },
            { value: 'getBreakpoint("tablet").query', code: true },
            "\u2002\u2192\u2002",
            { value: '"@media (min-width: 441px)"', code: true, newLine: true },
            { value: 'getBreakpoint("desktop").query', code: true },
            "\u2002\u2192\u2002",
            { value: '"@media (min-width: 1280px)"', code: true, newLine: true },
          ],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResponsiveDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const Breakpoints: Story = {
  name: "getBreakpoint",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <section>
        <Typography as="h3">Breakpoint Values</Typography>
        <Flex direction="column" gap="small">
          {(["mobile", "tablet", "desktop"] as const).map(name => {
            const bp = getBreakpoint(name)
            return (
              <BreakpointRow key={name} justifyContent="space-between" alignItems="center">
                <Flex gap="large" alignItems="center">
                  <Label>{name}</Label>
                  <Value>{bp.value}px</Value>
                </Flex>
                <Query>{bp.query}</Query>
              </BreakpointRow>
            )
          })}
        </Flex>
      </section>

      <section>
        <Typography as="h3">Live Demo</Typography>
        <Typography color="medium">
          Resize the browser window to see the breakpoints in action.
        </Typography>
        <Flex style={{ marginTop: 16 }}>
          <ResponsiveBox grow={1} justifyContent="center" alignItems="center">
            <MobileLabel>📱 Mobile</MobileLabel>
            <TabletLabel>💻 Tablet</TabletLabel>
            <DesktopLabel>🖥️ Desktop</DesktopLabel>
          </ResponsiveBox>
        </Flex>
      </section>

      <section>
        <Typography as="h3">Usage in styled-components</Typography>
        <Flex
          direction="column"
          gap="small"
          style={{
            padding: 16,
            background: "var(--np--background-color--alternate)",
            borderRadius: 8,
            fontFamily: "var(--np--font-family--code)",
            fontSize: 14,
          }}
        >
          <code>{`const Box = styled.div\``}</code>
          <code>{`  background: blue;`}</code>
          <code></code>
          <code>{`  \${getBreakpoint("tablet").query} {`}</code>
          <code>{`    background: orange;`}</code>
          <code>{`  }`}</code>
          <code></code>
          <code>{`  \${getBreakpoint("desktop").query} {`}</code>
          <code>{`    background: green;`}</code>
          <code>{`  }`}</code>
          <code>{`\`;`}</code>
        </Flex>
      </section>
    </Flex>
  ),
}