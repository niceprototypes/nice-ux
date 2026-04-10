import type { Meta, StoryObj } from "@storybook/react-vite"

import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import CodeBlock from "../../../../src/components/CodeBlock"

const LinkDemo = () => <></>

const meta = {
  title: "Configuration/NPM/Link",
  component: LinkDemo,
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof LinkDemo>

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
      <Typography as="h3">Why nice-npm-link?</Typography>
      <Typography color="light">
        Nice ecosystem packages use file: references for local development.
        When npm installs these, each package gets its own node_modules with
        duplicate React/styled-components. This causes "Invalid hook call" errors.
      </Typography>
      <CodeBlock language="bash">{`# The problem: duplicate React instances
your-app/node_modules/react           ← App's React
nice-react-tile/node_modules/react    ← Tile's React (CONFLICT!)
nice-react-flex/node_modules/react    ← Flex's React (CONFLICT!)

# The solution: clean all linked packages
node ../nice-npm-link/nice-npm-link --clean-all`}</CodeBlock>
      <Typography as="h4">What It Removes</Typography>
      <Typography color="light">
        By default, these singleton packages are removed from linked packages:
      </Typography>
      <CodeBlock language="bash">{`• react
• react-dom
• styled-components
• @types/react
• @types/react-dom`}</CodeBlock>
    </Flex>
  ),
}

export const FileDependencies: Story = {
  name: "file: dependencies",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Local Development Setup</Typography>
      <Typography color="light">
        All nice-* packages use file: references for interdependencies.
        This enables live changes to propagate through the dependency chain.
      </Typography>
      <CodeBlock language="json">{`// package.json pattern
{
  "dependencies": {
    "nice-styles": "file:../nice-styles",
    "nice-react-styles": "file:../nice-react-styles"
  },
  "peerDependencies": {
    "nice-react-flex": ">=1.0.0",
    "react": ">=19.2.0"
  },
  "devDependencies": {
    "nice-configuration": "file:../nice-configuration",
    "nice-react-flex": "file:../nice-react-flex"
  }
}`}</CodeBlock>
      <Typography as="h4">After Any Dependency Change</Typography>
      <Typography color="light">
        Always run --clean-all after npm install or modifying dependencies:
      </Typography>
      <CodeBlock language="bash">{`node ../nice-npm-link/nice-npm-link --clean-all`}</CodeBlock>
    </Flex>
  ),
}

export const BasicUsage: Story = {
  name: "basic usage",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Basic Usage</Typography>
      <CodeBlock language="bash">{`# Link a single package
npx nice-npm-link ../nice-react-button

# Short alias
nnl ../nice-react-button

# Link multiple packages
nnl ../nice-react-button
nnl ../nice-react-icon
nnl ../nice-react-flex`}</CodeBlock>
      <Typography as="h4">Clean All Linked Packages</Typography>
      <Typography color="light">
        Recursively find and clean all file: linked packages in your project:
      </Typography>
      <CodeBlock language="bash">{`# Clean all linked packages at once
nnl --clean-all

# Preview what would be cleaned
nnl --clean-all --dry-run`}</CodeBlock>
    </Flex>
  ),
}

export const CleanOnly: Story = {
  name: "--clean-only",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">--clean-only</Typography>
      <Typography color="light">
        Remove conflicting packages without creating a new link. Useful when packages
        are already linked via package.json file: references.
      </Typography>
      <CodeBlock language="bash">{`# Clean a specific linked package
nnl --clean-only ../nice-react-button

# Clean with custom exclusions
nnl --clean-only --add-exclude @emotion/react ../nice-react-button`}</CodeBlock>
    </Flex>
  ),
}

export const Unlink: Story = {
  name: "--unlink",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">--unlink</Typography>
      <Typography color="light">
        Restore packages to their original npm versions. This removes file: references
        and reinstalls from the registry.
      </Typography>
      <CodeBlock language="bash">{`# Unlink all file: dependencies
nnl --unlink

# Preview what would be unlinked
nnl --unlink --dry-run`}</CodeBlock>
      <Typography color="light">
        Note: Run this before npm install in linked packages, or re-run
        nice-npm-link after installing dependencies in linked packages.
      </Typography>
    </Flex>
  ),
}

export const CustomExclusions: Story = {
  name: "--exclude / --add-exclude",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Custom Package Exclusions</Typography>
      <Typography as="h4">--exclude</Typography>
      <Typography color="light">
        Override the default list with your own packages:
      </Typography>
      <CodeBlock language="bash">{`# Only remove React packages (skip styled-components)
nnl --exclude react,react-dom ../my-component`}</CodeBlock>
      <Typography as="h4">--add-exclude</Typography>
      <Typography color="light">
        Add packages to the default list:
      </Typography>
      <CodeBlock language="bash">{`# Add Emotion packages to defaults
nnl --add-exclude @emotion/react,@emotion/styled ../my-component

# Add Material-UI packages
nnl --add-exclude @mui/material,@mui/icons-material ../my-component`}</CodeBlock>
    </Flex>
  ),
}

export const OtherOptions: Story = {
  name: "other options",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Other Options</Typography>
      <Typography as="h4">--dry-run</Typography>
      <Typography color="light">
        Preview changes without making them:
      </Typography>
      <CodeBlock language="bash">{`nnl --dry-run ../nice-react-button
nnl --dry-run --clean-all`}</CodeBlock>
      <Typography as="h4">--manager</Typography>
      <Typography color="light">
        Force a specific package manager (auto-detected by default):
      </Typography>
      <CodeBlock language="bash">{`nnl --manager pnpm ../my-component
nnl --manager yarn ../my-component
nnl --manager npm ../my-component`}</CodeBlock>
      <Typography as="h4">--skip-peer-check</Typography>
      <Typography color="light">
        Skip automatic peerDependencies enforcement:
      </Typography>
      <CodeBlock language="bash">{`nnl --skip-peer-check ../my-component`}</CodeBlock>
    </Flex>
  ),
}

export const DevMode: Story = {
  name: "--dev",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">--dev</Typography>
      <Typography color="light">
        Runs npm run dev in all linked packages concurrently. This rebuilds
        packages automatically when their source files change.
      </Typography>
      <CodeBlock language="bash">{`# Run dev scripts in all linked packages
nnl --dev`}</CodeBlock>
      <Typography color="light">
        Packages without a dev script are automatically skipped.
      </Typography>
    </Flex>
  ),
}

export const WatchMode: Story = {
  name: "--watch",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">--watch</Typography>
      <Typography color="light">
        Watches linked package dist folders and touches a trigger file when
        changes are detected. This causes webpack/CRA to recompile.
      </Typography>
      <CodeBlock language="bash">{`# Watch dist folders for changes
nnl --watch

# Watch a different folder (default: dist)
nnl --watch --watch-dir build`}</CodeBlock>
      <Typography as="h4">Setup for CRA/webpack</Typography>
      <Typography color="light">
        Add the trigger file import to your entry point:
      </Typography>
      <CodeBlock language="typescript">{`// src/index.tsx
import './.symlink-trigger.js';`}</CodeBlock>
      <Typography color="light">
        Add to .gitignore:
      </Typography>
      <CodeBlock language="bash">{`.symlink-trigger.js`}</CodeBlock>
    </Flex>
  ),
}

export const DevWatch: Story = {
  name: "--dev --watch",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">--dev --watch (Recommended)</Typography>
      <Typography color="light">
        Combines both flags: rebuilds packages on source changes AND triggers
        webpack/CRA recompilation. This is the recommended setup for CRA projects.
      </Typography>
      <CodeBlock language="bash">{`# In package.json
"scripts": {
  "watch:deps": "nnl --dev --watch"
}

# Run alongside your dev server
npm start          # Terminal 1
npm run watch:deps # Terminal 2`}</CodeBlock>
      <Typography as="h4">How it works</Typography>
      <CodeBlock language="bash">{`Source change in linked package
       ↓
--dev runs rollup/tsc rebuild
       ↓
dist/ files update
       ↓
--watch detects change
       ↓
Touches .symlink-trigger.js
       ↓
CRA/webpack recompiles`}</CodeBlock>
    </Flex>
  ),
}

export const Publish: Story = {
  name: "--publish",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">--publish</Typography>
      <Typography color="light">
        Publishes Nice ecosystem packages to npm in dependency order. Handles
        version bumping, file: dep swapping, building, and restoring local refs.
      </Typography>
      <CodeBlock language="bash">{`# Publish all changed packages (interactive prompts)
nnl --publish

# Publish specific packages
nnl --publish nice-styles,nice-react-styles

# Preview what would be published
nnl --publish --dry-run`}</CodeBlock>
      <Typography as="h4">Workflow</Typography>
      <CodeBlock language="bash">{`1. Scans ~/Code/nice-* for packages with changes
2. Prompts for version bump (patch/minor/major/skip)
3. Swaps file: deps → semver ranges
4. Builds each package
5. Publishes in dependency order (npm prompts for OTP)
6. Restores file: refs for local development
7. Commits and pushes version changes`}</CodeBlock>
      <Typography as="h4">Publish Order</Typography>
      <Typography color="light">
        Packages are published bottom-to-top per dependency chain.
        The publish order is defined in nice-npm-link/registry.json and
        queried via the registry service. Run nnl --publish --dry-run to
        see the current order.
      </Typography>
      <Typography as="h4">Dry Run</Typography>
      <Typography color="light">
        Use --dry-run or --dry-publish to preview without making changes:
      </Typography>
      <CodeBlock language="bash">{`nnl --publish --dry-run
nnl --dry-publish`}</CodeBlock>
    </Flex>
  ),
}

export const Troubleshooting: Story = {
  name: "troubleshooting",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Troubleshooting</Typography>
      <Typography as="h4">Invalid Hook Call Error</Typography>
      <Typography color="light">
        Re-run the link command to clean up duplicate React:
      </Typography>
      <CodeBlock language="bash">{`nnl --clean-all`}</CodeBlock>
      <Typography as="h4">Changes Not Appearing</Typography>
      <Typography color="light">
        Run --dev to rebuild linked packages when their source changes:
      </Typography>
      <CodeBlock language="bash">{`# Run in a separate terminal while developing
nnl --dev`}</CodeBlock>
      <Typography color="light">
        The nice-configuration rollup settings include optimized watch options that
        prevent file caching issues. Changes should appear immediately.
      </Typography>
      <Typography as="h4">Clear CRA Cache</Typography>
      <Typography color="light">
        If changes still don't appear, clear the webpack cache:
      </Typography>
      <CodeBlock language="bash">{`rm -rf node_modules/.cache && npm start`}</CodeBlock>
      <Typography as="h4">After Installing Dependencies</Typography>
      <Typography color="light">
        When you run npm install in a linked package, conflicts return.
        Either unlink first or re-run nice-npm-link:
      </Typography>
      <CodeBlock language="bash">{`# Option 1: Unlink before installing
nnl --unlink
cd ../nice-react-button && npm install
cd - && nnl ../nice-react-button

# Option 2: Re-clean after installing
cd ../nice-react-button && npm install
cd - && nnl --clean-all`}</CodeBlock>
    </Flex>
  ),
}
