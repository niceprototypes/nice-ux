import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import { generateDescriptionString } from "../../src/services"

const TypeScriptDemo = () => <></>

const meta = {
  title: "Configuration/TypeScript",
  component: TypeScriptDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString("nice-configuration", {
          setup: [
            {
              value: "// tsconfig.json",
              code: true,
              newLine: true,
            },
            {
              value: '{ "extends": "nice-configuration/typescript/react" }',
              code: true,
              newLine: true,
            },
          ],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TypeScriptDemo>

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

export const Base: Story = {
  name: "base",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Base Configuration</Typography>
      <Typography color="medium">
        Extends the base TypeScript configuration for non-React packages like nice-styles.
      </Typography>
      <CodeBlock>
        {`// tsconfig.json
{
  "extends": "nice-configuration/typescript/base",
  "compilerOptions": {
    "outDir": "dist/esm",
    "declarationDir": "dist/esm/types"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`}
      </CodeBlock>
      <Typography as="h4">Included Options</Typography>
      <CodeBlock>
        {`{
  "target": "ES2020",
  "module": "ESNext",
  "lib": ["ES2020", "DOM", "DOM.Iterable"],
  "moduleResolution": "bundler",
  "declaration": true,
  "declarationMap": true,
  "strict": true,
  "esModuleInterop": true,
  "skipLibCheck": true,
  "forceConsistentCasingInFileNames": true,
  "isolatedModules": true,
  "resolveJsonModule": true
}`}
      </CodeBlock>
    </Flex>
  ),
}

export const React: Story = {
  name: "react",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">React Configuration</Typography>
      <Typography color="medium">
        Extends the base configuration with JSX support for React components.
      </Typography>
      <CodeBlock>
        {`// tsconfig.json
{
  "extends": "nice-configuration/typescript/react",
  "compilerOptions": {
    "outDir": "dist/esm",
    "declarationDir": "dist/esm/types"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`}
      </CodeBlock>
      <Typography as="h4">Additional Options</Typography>
      <CodeBlock>
        {`{
  "jsx": "react-jsx"
}`}
      </CodeBlock>
      <Typography color="light">
        Note: Path-relative options like outDir, declarationDir, and include must be specified
        in each project as they resolve relative to the config file location.
      </Typography>
    </Flex>
  ),
}
