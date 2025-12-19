import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
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

const CodeBlock = ({ children }: { children: string }) => (
  <Typography
    code
    style={{
      display: "block",
      backgroundColor: getToken("backgroundColor", "alternate").var,
      padding: getToken("gap", "base").var,
      borderRadius: getToken("borderRadius", "base").var,
      whiteSpace: "pre",
      overflow: "auto",
    }}
  >
    {children}
  </Typography>
)

export const Basic: Story = {
  name: "Basic",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Basic Usage</Typography>
      <Typography color="medium">
        Wrap your application with StylesProvider to enable nice-styles CSS variables
        and styled-components theme.
      </Typography>
      <CodeBlock>
        {`import { StylesProvider } from "nice-react-styles"

function App() {
  return (
    <StylesProvider>
      <YourApplication />
    </StylesProvider>
  )
}`}
      </CodeBlock>
    </Flex>
  ),
}

export const LoadFonts: Story = {
  name: "loadFonts",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Load Default Fonts</Typography>
      <Typography color="medium">
        Set loadFonts to automatically load the default nice-styles fonts:
        Google Sans Flex (base/heading) and Roboto Mono (code).
      </Typography>
      <CodeBlock>
        {`<StylesProvider loadFonts>
  <App />
</StylesProvider>`}
      </CodeBlock>
    </Flex>
  ),
}

export const GoogleFonts: Story = {
  name: "googleFonts",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Custom Google Fonts</Typography>
      <Typography color="medium">
        Pass a Google Fonts URL to load custom fonts. This overrides loadFonts.
      </Typography>
      <CodeBlock>
        {`<StylesProvider googleFonts="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">
  <App />
</StylesProvider>`}
      </CodeBlock>
      <Typography as="h4">Manual Configuration</Typography>
      <Typography color="medium">
        For full control, pass a configuration object with links and optional font metadata.
      </Typography>
      <CodeBlock>
        {`<StylesProvider googleFonts={{
  links: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700' }
  ]
}}>
  <App />
</StylesProvider>`}
      </CodeBlock>
    </Flex>
  ),
}

export const ComponentStyles: Story = {
  name: "componentStyles",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Component Styles</Typography>
      <Typography color="medium">
        Pass an array of GlobalStyles components from nice-react-* libraries to inject
        component-level CSS custom properties.
      </Typography>
      <CodeBlock>
        {`import { StylesProvider } from "nice-react-styles"
import { IconStyles } from "nice-react-icon"
import { ButtonStyles } from "nice-react-button"
import { TypographyStyles } from "nice-react-typography"

function App() {
  return (
    <StylesProvider componentStyles={[IconStyles, ButtonStyles, TypographyStyles]}>
      <YourApplication />
    </StylesProvider>
  )
}`}
      </CodeBlock>
      <Typography as="h4">What This Does</Typography>
      <Typography color="medium">
        Each component library exports a GlobalStyles component that defines CSS custom
        properties for that component. For example, IconStyles defines:
      </Typography>
      <CodeBlock>
        {`:root {
  --icon--stroke-width--small: 1px;
  --icon--stroke-width--base: 1.5px;
  --icon--stroke-width--large: 8px;
  --icon--spinning-animation-duration--base: 750ms;
  --icon--view-box--base: 0 0 16 16;
}`}
      </CodeBlock>
    </Flex>
  ),
}

export const FullExample: Story = {
  name: "Full Example",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Complete Setup</Typography>
      <Typography color="medium">
        A complete example showing all StylesProvider features together.
      </Typography>
      <CodeBlock>
        {`// App.tsx
import { StylesProvider } from "nice-react-styles"
import { IconStyles } from "nice-react-icon"
import { ButtonStyles } from "nice-react-button"
import { TypographyStyles } from "nice-react-typography"

function App() {
  return (
    <StylesProvider
      loadFonts
      componentStyles={[IconStyles, ButtonStyles, TypographyStyles]}
    >
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </StylesProvider>
  )
}

export default App`}
      </CodeBlock>
    </Flex>
  ),
}