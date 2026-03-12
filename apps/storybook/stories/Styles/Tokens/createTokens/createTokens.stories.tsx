import type { Meta, StoryObj } from "@storybook/react"
import { createTokens, getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import CodePreview from "../../../../src/components/CodePreview"

const ComponentDemo = () => <></>

const { GlobalStyles } = createTokens({
  // 1. Override an existing variant
  fontSize: {
    base: "18px",
  },
  // 2. Add a custom variant to an existing token
  foregroundColor: {
    brand: "#dc0000",
  },
  // 3. Add a completely new token
  headerHeight: {
    base: "64px",
    compact: "48px",
  },
})

const meta = {
  title: "React/Styles/createTokens",
  component: ComponentDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
  },

} satisfies Meta<typeof ComponentDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

const ColorSwatch = ({ color }: { color: string }) => (
  <Flex
    style={{
      width: 16,
      height: 16,
      borderRadius: "50%",
      backgroundColor: color,
    }}
  />
)

export const OverrideExisting: Story = {
  name: "Overriding an existing variant",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <GlobalStyles />
      <Typography color="light">
        Use an existing token key with an existing variant name to replace its value.
        Here, the base font size is changed from the default to 18px.
      </Typography>
      <CodePreview
        code={`createTokens({
  fontSize: {
    base: "18px",
  },
})`}
      />
      <Flex direction="column" gap="small">
        <Flex gap="base" alignItems="center">
          <Typography code>--np--font-size--base</Typography>
          <Typography color="light">18px</Typography>
          <Typography color="lightest">(was {getToken("fontSize").value})</Typography>
        </Flex>
      </Flex>
    </Flex>
  ),
}

export const ExtendExisting: Story = {
  name: "Assigning a variant to an existing token",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <GlobalStyles />
      <Typography color="light">
        Use an existing token key with a new variant name to extend it.
        Here, a "brand" variant is added to foregroundColor alongside the
        existing variants (base, light, lighter, etc).
      </Typography>
      <CodePreview
        code={`createTokens({
  foregroundColor: {
    brand: "#dc0000",
  },
})`}
      />
      <Flex direction="column" gap="small">
        <Flex gap="base" alignItems="center">
          <Typography code>--np--foreground-color--brand</Typography>
          <Typography color="light">#dc0000</Typography>
          <ColorSwatch color="#dc0000" />
          <Typography color="lightest">(new)</Typography>
        </Flex>
        <Flex gap="base" alignItems="center">
          <Typography code>--np--foreground-color--base</Typography>
          <Typography color="light">{getToken("foregroundColor").value}</Typography>
          <ColorSwatch color={getToken("foregroundColor").value} />
          <Typography color="lightest">(unchanged)</Typography>
        </Flex>
      </Flex>
    </Flex>
  ),
}

export const NewToken: Story = {
  name: "Creating a new token",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <GlobalStyles />
      <Typography color="light">
        Use a token key that doesn't exist in the base system to create
        an entirely new token with its own variants.
      </Typography>
      <CodePreview
        code={`createTokens({
  headerHeight: {
    base: "64px",
    compact: "48px",
  },
})`}
      />
      <Flex direction="column" gap="small">
        {[
          { key: "--np--header-height--base", value: "64px" },
          { key: "--np--header-height--compact", value: "48px" },
        ].map(({ key, value }) => (
          <Flex key={key} gap="base" alignItems="center">
            <Typography code>{key}</Typography>
            <Typography color="light">{value}</Typography>
            <Typography color="lightest">(new)</Typography>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
}

export const Combined: Story = {
  name: "Putting it all together",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <GlobalStyles />
      <Typography color="light">
        All three patterns work in a single call. The token map merges
        into the existing registry — overriding values where keys match,
        extending where variants are new, and creating where tokens are
        new. There is no distinction between "modifying" and "creating."
        The system overloads the existing tokens transparently.
      </Typography>
      <CodePreview
        code={`const { GlobalStyles } = createTokens({
  fontSize: { base: "18px" },            // override
  foregroundColor: { brand: "#dc0000" },  // extend
  headerHeight: {                         // create
    base: "64px",
    compact: "48px",
  },
})`}
      />
    </Flex>
  ),
}
