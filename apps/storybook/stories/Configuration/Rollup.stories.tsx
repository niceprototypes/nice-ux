import type { Meta, StoryObj } from "@storybook/react-vite"

import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import CodeBlock from "../../src/components/CodeBlock"

const RollupDemo = () => <></>

const meta = {
  title: "Configuration/Rollup",
  component: RollupDemo,
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof RollupDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}


export const CreateConfiguration: Story = {
  name: "createConfiguration",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">createConfiguration</Typography>
      <Typography color="light">
        Creates a complete rollup configuration with sensible defaults for nice-* packages.
        Outputs both CJS and ESM formats with sourcemaps. All plugins are included by default.
      </Typography>
      <CodeBlock language="typescript">{`// rollup.config.js
import { createConfiguration } from "nice-configuration/rollup"

// Basic usage - uses all defaults
export default createConfiguration()

// With options
export default createConfiguration({
  input: "src/index.ts",
  additionalExternals: ["lodash"],
  bundlePackages: ["nice-icons"],
})`}</CodeBlock>
      <Typography as="h4">Options</Typography>
      <CodeBlock language="typescript">{`{
  input?: string              // Entry point (default: "src/index.ts")
  tsconfig?: string           // Path to tsconfig (default: "./tsconfig.json")
  output?: object             // Custom output config (merged with defaults)
  plugins?: Function[]        // Override default plugins (escape hatch)
  additionalExternals?: string[]   // Extra packages to externalize
  bundlePackages?: string[]   // nice-* packages to bundle instead of externalize
  dts?: boolean               // Generate declaration bundle (default: true)
  dtsInput?: string           // Custom dts input (default: "dist/types/index.d.ts")
}`}</CodeBlock>
      <Typography as="h4">Default Plugins</Typography>
      <Typography color="light">
        The following plugins are included automatically:
      </Typography>
      <CodeBlock language="text">{`• rollup-plugin-peer-deps-external
• @rollup/plugin-node-resolve (browser: true)
• @rollup/plugin-commonjs
• @rollup/plugin-typescript
• rollup-plugin-dts (for declaration bundling)`}</CodeBlock>
    </Flex>
  ),
}

export const IsNiceExternal: Story = {
  name: "isNiceExternal",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">isNiceExternal</Typography>
      <Typography color="light">
        Pattern-based external detection that automatically externalizes all nice-* packages,
        React ecosystem, and styled-components. Handles subpath imports like CSS files.
      </Typography>
      <CodeBlock language="typescript">{`import { isNiceExternal } from "nice-configuration/rollup"

// Returns true for:
isNiceExternal("nice-styles")           // nice-* packages
isNiceExternal("nice-styles/variables.css")  // subpath imports
isNiceExternal("react")                 // React
isNiceExternal("react-dom")             // React DOM
isNiceExternal("styled-components")     // styled-components

// Returns false for:
isNiceExternal("lodash")                // other packages`}</CodeBlock>
      <Typography as="h4">Manual Usage</Typography>
      <Typography color="light">
        If you need custom rollup config, use isNiceExternal directly:
      </Typography>
      <CodeBlock language="typescript">{`// rollup.config.js
import { isNiceExternal } from "nice-configuration/rollup"

export default {
  input: "src/index.ts",
  output: [...],
  plugins: [...],
  external: isNiceExternal
}`}</CodeBlock>
    </Flex>
  ),
}

export const WatchMode: Story = {
  name: "watchMode",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Watch Mode Configuration</Typography>
      <Typography color="light">
        The configuration includes optimized watch settings that prevent file caching issues
        during local development. This ensures changes appear immediately without delay.
      </Typography>
      <CodeBlock language="typescript">{`// Included automatically in createConfiguration()
{
  cache: false,  // Disable rollup internal caching
  watch: {
    buildDelay: 200,  // Debounce rapid changes
    clearScreen: false,
    chokidar: {
      awaitWriteFinish: {
        stabilityThreshold: 150,
        pollInterval: 50
      },
      usePolling: true,
      interval: 100
    }
  }
}`}</CodeBlock>
      <Typography as="h4">Why These Settings?</Typography>
      <Typography color="light">
        Without these settings, rollup's watch mode can exhibit an "off by one" caching bug
        where file changes appear one save behind. The awaitWriteFinish option ensures files
        are fully written to disk before rollup reads them, and usePolling provides more
        reliable file change detection on macOS.
      </Typography>
    </Flex>
  ),
}

export const CreateExternals: Story = {
  name: "createExternals",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">createExternals</Typography>
      <Typography color="light">
        Creates an external function with additional packages or bundle overrides.
      </Typography>
      <CodeBlock language="typescript">{`import { createExternals } from "nice-configuration/rollup"

// Add extra packages to externalize
const external = createExternals({
  additional: ["lodash", "date-fns"],
})

// Bundle specific nice-* packages instead of externalizing
const external = createExternals({
  bundle: ["nice-icons"],
})

// Both options together
const external = createExternals({
  additional: ["lodash"],
  bundle: ["nice-icons"],
})

export default {
  input: "src/index.ts",
  output: [...],
  plugins: [...],
  external
}`}</CodeBlock>
      <Typography color="light">
        Note: Legacy array format is still supported for backwards compatibility.
      </Typography>
    </Flex>
  ),
}
