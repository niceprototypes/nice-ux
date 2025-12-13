import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import { generateDescriptionString } from "../../src/services"

const RollupDemo = () => <></>

const meta = {
  title: "Configuration/Rollup",
  component: RollupDemo,
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
              value: 'import { createConfiguration } from "nice-configuration/rollup"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: "export default createConfiguration({ plugins: [...] })",
              code: true,
              newLine: true,
            },
          ],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RollupDemo>

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

export const CreateConfiguration: Story = {
  name: "createConfiguration",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">createConfiguration</Typography>
      <Typography color="medium">
        Creates a complete rollup configuration with sensible defaults for nice-* packages.
        Outputs both CJS and ESM formats with sourcemaps.
      </Typography>
      <CodeBlock>
        {`// rollup.config.js
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import { createConfiguration } from "nice-configuration/rollup"

export default createConfiguration({
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  dtsPlugin: dts(),
})`}
      </CodeBlock>
      <Typography as="h4">Options</Typography>
      <CodeBlock>
        {`{
  input?: string           // Entry point (default: "src/index.ts")
  output?: object          // Custom output config (merged with defaults)
  plugins: Function[]      // Required - your rollup plugins
  additionalExternals?: string[]  // Extra packages to externalize
  dts?: boolean            // Generate declaration bundle (default: true)
  dtsInput?: string        // Custom dts input path
  dtsPlugin?: Plugin       // The dts plugin instance
}`}
      </CodeBlock>
    </Flex>
  ),
}

export const IsNiceExternal: Story = {
  name: "isNiceExternal",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">isNiceExternal</Typography>
      <Typography color="medium">
        Pattern-based external detection that automatically externalizes all nice-* packages,
        React ecosystem, and styled-components. Handles subpath imports like CSS files.
      </Typography>
      <CodeBlock>
        {`import { isNiceExternal } from "nice-configuration/rollup"

// Returns true for:
isNiceExternal("nice-styles")           // nice-* packages
isNiceExternal("nice-styles/variables.css")  // subpath imports
isNiceExternal("react")                 // React
isNiceExternal("react-dom")             // React DOM
isNiceExternal("styled-components")     // styled-components

// Returns false for:
isNiceExternal("lodash")                // other packages`}
      </CodeBlock>
      <Typography as="h4">Manual Usage</Typography>
      <Typography color="medium">
        If you need custom rollup config, use isNiceExternal directly:
      </Typography>
      <CodeBlock>
        {`// rollup.config.js
import { isNiceExternal } from "nice-configuration/rollup"

export default {
  input: "src/index.ts",
  output: [...],
  plugins: [...],
  external: isNiceExternal
}`}
      </CodeBlock>
    </Flex>
  ),
}

export const CreateExternals: Story = {
  name: "createExternals",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">createExternals</Typography>
      <Typography color="medium">
        Creates an external function with additional packages beyond the nice-* defaults.
      </Typography>
      <CodeBlock>
        {`import { createExternals } from "nice-configuration/rollup"

// Add lodash and date-fns to externals
const external = createExternals(["lodash", "date-fns"])

export default {
  input: "src/index.ts",
  output: [...],
  plugins: [...],
  external
}`}
      </CodeBlock>
    </Flex>
  ),
}
