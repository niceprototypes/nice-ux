import type { Meta, StoryObj } from "@storybook/react-vite"

import Typography from "../../src/nice/Typography"
import Flex from "nice-react-flex"
import CodeBlock from "../../src/components/CodeBlock"

const TypeScriptDemo = () => <></>

const meta = {
  title: "Configuration/TypeScript",
  component: TypeScriptDemo,
  tags: ["!dev"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TypeScriptDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const Base: Story = {
  name: "base",
  parameters: storyParameters,
  render: () => (
    <Flex
      direction="column"
      gap="large"
    >
      <Typography as="h3">Base Configuration</Typography>
      <Typography color="light">
        Extends the base TypeScript configuration for non-React packages like
        nice-styles.
      </Typography>
      <CodeBlock language="json">{`// tsconfig.json
{
  "extends": "nice-configuration/typescript/base",
  "compilerOptions": {
    "outDir": "dist/esm",
    "declarationDir": "dist/esm/types"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`}</CodeBlock>
      <Typography as="h4">Included Options</Typography>
      <CodeBlock language="json">{`{
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
}`}</CodeBlock>
    </Flex>
  ),
}

export const React: Story = {
  name: "react",
  parameters: storyParameters,
  render: () => (
    <Flex
      direction="column"
      gap="large"
    >
      <Typography as="h3">React Configuration</Typography>
      <Typography color="light">
        Extends the base configuration with JSX support for React components.
      </Typography>
      <CodeBlock language="json">{`// tsconfig.json
{
  "extends": "nice-configuration/typescript/react",
  "compilerOptions": {
    "outDir": "dist/esm",
    "declarationDir": "dist/esm/types"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`}</CodeBlock>
      <Typography as="h4">Additional Options</Typography>
      <CodeBlock language="json">{`{
  "jsx": "react-jsx"
}`}</CodeBlock>
      <Typography color="light">
        Note: Path-relative options like outDir, declarationDir, and include
        must be specified in each project as they resolve relative to the config
        file location.
      </Typography>
    </Flex>
  ),
}
