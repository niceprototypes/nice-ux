import type { Meta, StoryObj } from "@storybook/react-vite"

import Typography from "../../src/nice/Typography"
import Flex from "nice-react-flex"
import CodeBlock from "../../src/components/CodeBlock"

const JestDemo = () => <></>

const meta = {
  title: "Configuration/Jest",
  component: JestDemo,
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof JestDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}


export const ReactConfig: Story = {
  name: "react",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">React Jest Configuration</Typography>
      <Typography color="light">
        Complete Jest configuration for React components with TypeScript support.
        Uses ts-jest for native TypeScript compilation.
      </Typography>
      <CodeBlock language="typescript">{`// jest.config.js
export { default } from "nice-configuration/jest/react"`}</CodeBlock>
      <Typography as="h4">Included Configuration</Typography>
      <CodeBlock language="typescript">{`{
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transform: {
    "^.+\\\\.(ts|tsx|js|jsx)$": ["ts-jest", { useESM: true }]
  },
  transformIgnorePatterns: [
    "node_modules/(?!(nice-[^/]+)/)"
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^(\\\\.{1,2}/.*)\\\\.js$": "$1",
    "^.+\\\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"]
}`}</CodeBlock>
      <Typography as="h4">Peer Dependencies</Typography>
      <Typography color="light">
        Install the required peer dependencies:
      </Typography>
      <CodeBlock language="bash">{`npm install -D jest ts-jest jest-environment-jsdom @testing-library/jest-dom`}</CodeBlock>
    </Flex>
  ),
}

export const CssMock: Story = {
  name: "css-mock",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">CSS Mock</Typography>
      <Typography color="light">
        Empty module export for mocking CSS imports in Jest tests.
        Referenced by the React config's moduleNameMapper.
      </Typography>
      <CodeBlock language="typescript">{`// __mocks__/styleMock.js
module.exports = {}`}</CodeBlock>
      <Typography color="light">
        This mock is automatically configured in the React Jest config.
        Create the file at __mocks__/styleMock.js in your project root.
      </Typography>
      <Typography as="h4">Alternative: Direct Import</Typography>
      <Typography color="light">
        You can also import the mock directly if you customize your Jest config:
      </Typography>
      <CodeBlock language="typescript">{`// jest.config.js
export default {
  moduleNameMapper: {
    "^.+\\\\.(css|scss)$": "nice-configuration/jest/css-mock"
  }
}`}</CodeBlock>
    </Flex>
  ),
}
