import type { Meta, StoryObj } from "@storybook/react"

import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import CodeBlock from "../../src/components/CodeBlock"

const ViteWatcherDemo = () => <></>

const meta = {
  title: "Configuration/ViteWatcher",
  component: ViteWatcherDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
  },

} satisfies Meta<typeof ViteWatcherDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}


export const Overview: Story = {
  name: "overview",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">The Problem</Typography>
      <Typography color="light">
        When developing with npm link or file: dependencies, Vite's dev server doesn't
        detect changes in linked packages. You're forced to restart the dev server
        every time you modify a linked package.
      </Typography>
      <Typography as="h4">The Solution</Typography>
      <Typography color="light">
        This plugin watches the dist folder of linked packages and triggers a browser
        reload when they rebuild.
      </Typography>
      <CodeBlock>{`Developer edits source
       ↓
Package build runs
       ↓
dist/ updates
       ↓
Plugin detects change (debounced)
       ↓
Browser reloads`}</CodeBlock>
      <Typography as="h4">Vite Only</Typography>
      <Typography color="light">
        This plugin is for Vite projects (including Storybook with Vite).
        For webpack/CRA projects, use nice-npm-link --dev --watch instead.
      </Typography>
    </Flex>
  ),
}

export const BasicUsage: Story = {
  name: "viteWatcher",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">viteWatcher</Typography>
      <Typography color="light">
        Creates the Vite plugin that watches linked package dist folders.
      </Typography>
      <CodeBlock>{`// vite.config.ts
import { defineConfig } from 'vite'
import { viteWatcher } from 'nice-vite-watcher'

export default defineConfig({
  plugins: [
    viteWatcher({
      packages: {
        'nice-react-button': '/Users/me/Code/nice-react-button',
        'nice-react-icon': '/Users/me/Code/nice-react-icon',
      },
      verbose: true,
    }),
  ],
})`}</CodeBlock>
      <Typography as="h4">Options</Typography>
      <CodeBlock>{`{
  packages: Record<string, string>  // Package name → local path
  watchDir?: string                 // Subdirectory to watch (default: 'dist')
  verbose?: boolean                 // Log changes (default: false)
  debounce?: number                 // Debounce delay in ms (default: 300)
}`}</CodeBlock>
    </Flex>
  ),
}

export const SourceAliases: Story = {
  name: "getSourceAliases",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">getSourceAliases</Typography>
      <Typography color="light">
        Generates Vite resolve aliases pointing to package source files.
        Use this for packages without special build transforms to get true HMR
        with state preservation.
      </Typography>
      <CodeBlock>{`import { getSourceAliases } from 'nice-vite-watcher'

const linkedPackages = {
  'nice-react-button': '/Users/me/Code/nice-react-button',
  'nice-react-icon': '/Users/me/Code/nice-react-icon',
}

// Only alias packages that don't need build transforms
const aliases = getSourceAliases(
  linkedPackages,
  ['nice-react-button'],  // These get aliased to src/
  'index.ts'              // Entry point (default)
)

// Result:
// { 'nice-react-button': '/Users/me/Code/nice-react-button/src/index.ts' }`}</CodeBlock>
    </Flex>
  ),
}

export const CombinedStrategy: Story = {
  name: "combined strategy",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Combining Both Approaches</Typography>
      <Typography color="light">
        For the best experience, use source aliases for simple packages (true HMR)
        and dist watching for packages with build transforms (SVGR, PostCSS, etc.).
      </Typography>
      <CodeBlock>{`// vite.config.ts
import { defineConfig } from 'vite'
import { viteWatcher, getSourceAliases } from 'nice-vite-watcher'

const linkedPackages = {
  'nice-react-button': '/Users/me/Code/nice-react-button',
  'nice-react-icon': '/Users/me/Code/nice-react-icon',  // Uses SVGR
  'nice-react-flex': '/Users/me/Code/nice-react-flex',
}

// Packages without special build transforms
const sourceAliasable = ['nice-react-button', 'nice-react-flex']

export default defineConfig({
  plugins: [
    viteWatcher({
      packages: linkedPackages,
      verbose: true,
    }),
  ],
  resolve: {
    alias: getSourceAliases(linkedPackages, sourceAliasable),
  },
  optimizeDeps: {
    exclude: Object.keys(linkedPackages),
  },
})`}</CodeBlock>
      <Typography as="h4">Strategy Comparison</Typography>
      <CodeBlock>{`| Package Type              | Strategy        | HMR Behavior          |
|---------------------------|-----------------|----------------------|
| Simple TypeScript/React   | Source alias    | True HMR (state kept)|
| Uses SVGR, PostCSS, etc.  | Dist watching   | Full reload          |`}</CodeBlock>
    </Flex>
  ),
}

export const StorybookIntegration: Story = {
  name: "storybook integration",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Storybook Integration</Typography>
      <Typography color="light">
        Works with Storybook's Vite builder via viteFinal config.
      </Typography>
      <CodeBlock>{`// .storybook/main.ts
import { viteWatcher, getSourceAliases } from 'nice-vite-watcher'

const linkedPackages = {
  'nice-react-button': '../nice-react-button',
}

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.plugins = [
      ...(config.plugins || []),
      viteWatcher({
        packages: linkedPackages,
        verbose: true,
      }),
    ]
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...getSourceAliases(linkedPackages, Object.keys(linkedPackages)),
    }
    return config
  },
}`}</CodeBlock>
    </Flex>
  ),
}

export const Limitations: Story = {
  name: "limitations",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Limitations</Typography>
      <Typography as="h4">Full Page Reload</Typography>
      <Typography color="light">
        Packages watched via dist (not source-aliased) trigger full reloads,
        not granular HMR. This resets React component state.
      </Typography>
      <Typography as="h4">Build Pipeline Delay</Typography>
      <Typography color="light">
        You need to wait for the linked package's build to complete before
        changes appear. Run the package in watch mode for faster iteration.
      </Typography>
      <CodeBlock>{`# In the linked package directory
npm run dev  # or npm run build --watch`}</CodeBlock>
      <Typography as="h4">Why Not Source Aliases for Everything?</Typography>
      <Typography color="light">
        Source aliases bypass the package's build pipeline, which breaks packages using:
      </Typography>
      <CodeBlock>{`• SVGR — transforms SVG imports to React components
• PostCSS/Tailwind — processes CSS
• Custom Babel plugins — transforms code
• Asset processing — handles images, fonts`}</CodeBlock>
    </Flex>
  ),
}
