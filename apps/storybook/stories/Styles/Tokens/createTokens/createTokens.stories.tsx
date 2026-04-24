import type { Meta, StoryObj } from "@storybook/react-vite"
import { createTokens, getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import CodeBlock from "../../../../src/components/CodeBlock"
import Typography from "../../../../src/nice/Typography"

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
  tags: ['!dev'],
  parameters: {
    layout: "padded",
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
        Use an existing token key with an existing variant name to replace its
        value. Here, the base font size is changed from the default to 18px.
      </Typography>
      <CodeBlock language="typescript">{`createTokens({
  fontSize: {
    base: "18px",
  },
})`}</CodeBlock>
      <Flex direction="column" gap="small">
        <Flex gap="base" alignItems="center">
          <Typography code>--np--font-size--base</Typography>
          <Typography color="light">18px</Typography>
          <Typography color="lightest">
            (was {getToken("fontSize").value})
          </Typography>
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
        Use an existing token key with a new variant name to extend it. Here, a
        "brand" variant is added to foregroundColor alongside the existing
        variants (base, light, lighter, etc).
      </Typography>
      <CodeBlock language="typescript">{`createTokens({
  foregroundColor: {
    brand: "#dc0000",
  },
})`}</CodeBlock>
      <Flex direction="column" gap="small">
        <Flex gap="base" alignItems="center">
          <Typography code>--np--foreground-color--brand</Typography>
          <Typography color="light">#dc0000</Typography>
          <ColorSwatch color="#dc0000" />
          <Typography color="lightest">(new)</Typography>
        </Flex>
        <Flex gap="base" alignItems="center">
          <Typography code>--np--foreground-color--base</Typography>
          <Typography color="light">
            {getToken("foregroundColor").value}
          </Typography>
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
        Use a token key that doesn't exist in the base system to create an
        entirely new token with its own variants.
      </Typography>
      <CodeBlock language="typescript">{`createTokens({
  headerHeight: {
    base: "64px",
    compact: "48px",
  },
})`}</CodeBlock>
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

export const ResponsiveVariants: Story = {
  name: "Responsive variants (breakpoints)",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <GlobalStyles />
      <Typography color="light">
        A variant value can be an object with breakpoint keys instead of a plain
        string. The mobile value becomes the default, and higher breakpoints
        override it via media queries. Static strings and breakpoint objects can
        be mixed within the same token group.
      </Typography>
      <CodeBlock language="typescript">{`createTokens({
  gap: {
    none: "0",                              // static
    small: { mobile: "12px", desktop: "16px" },  // responsive
    base: { mobile: "24px", desktop: "32px" },   // responsive
  },
})`}</CodeBlock>
      <Flex direction="column" gap="small">
        <Typography color="lighter" weight="semibold">
          Generated CSS
        </Typography>
        <CodeBlock language="css">{`:root {
  --np--gap--none: 0;
  --np--gap--small: 12px;
  --np--gap--small--desktop: 16px;
  --np--gap--base: 24px;
  --np--gap--base--desktop: 32px;
}

@media (min-width: 1280px) {
  :root {
    --np--gap--small: var(--np--gap--small--desktop);
    --np--gap--base: var(--np--gap--base--desktop);
  }
}`}</CodeBlock>
      </Flex>
      <Flex direction="column" gap="small">
        <Typography color="lighter" weight="semibold">
          Breakpoints
        </Typography>
        {[
          { name: "mobile", value: "default (no media query)" },
          { name: "tablet", value: "@media (min-width: 441px)" },
          { name: "desktop", value: "@media (min-width: 1280px)" },
        ].map(({ name, value }) => (
          <Flex key={name} gap="base" alignItems="center">
            <Typography code>{name}</Typography>
            <Typography color="light">{value}</Typography>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
}

export const ModeVariants: Story = {
  name: "Mode-aware variants (day/night)",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <GlobalStyles />
      <Typography color="light">
        A variant value can be an object with mode keys instead of a plain
        string. The day value becomes the default, and the night value is applied
        via a prefers-color-scheme media query. Static strings and mode objects
        can be mixed within the same token group.
      </Typography>
      <CodeBlock language="typescript">{`createTokens({
  headerColor: {
    base: { day: "#000", night: "#fff" },  // mode-aware
    accent: "#dc0000",                     // static (same in both modes)
  },
})`}</CodeBlock>
      <Flex direction="column" gap="small">
        <Typography color="lighter" weight="semibold">
          Generated CSS
        </Typography>
        <CodeBlock language="css">{`:root {
  --np--header-color--base: #000;
  --np--header-color--base--day: #000;
  --np--header-color--base--night: #fff;
  --np--header-color--accent: #dc0000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --np--header-color--base: var(--np--header-color--base--night);
  }
}`}</CodeBlock>
      </Flex>
      <Flex direction="column" gap="small">
        <Typography color="lighter" weight="semibold">
          Primitives
        </Typography>
        <Typography color="light">
          Day and night primitives are stable references that are never
          reassigned by media queries. Use getToken with a mode argument to
          access them directly.
        </Typography>
        <CodeBlock language="typescript">{`getToken("headerColor", "base", "day")
// → var(--np--header-color--base--day)

getToken("headerColor", "base", "night")
// → var(--np--header-color--base--night)`}</CodeBlock>
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
        All three patterns work in a single call. The token map merges into the
        existing registry — overriding values where keys match, extending where
        variants are new, and creating where tokens are new. There is no
        distinction between "modifying" and "creating." The system overloads the
        existing tokens transparently.
      </Typography>
      <Typography color="light">
        Variant values can be a plain string, a breakpoint object, or a mode
        object. These formats can be mixed freely within the same token group and
        within the same call.
      </Typography>
      <CodeBlock language="typescript">{`const { GlobalStyles } = createTokens({
  fontSize: { base: "18px" },            // override
  foregroundColor: { brand: "#dc0000" },  // extend
  headerHeight: {                         // create
    base: "64px",
    compact: "48px",
  },
  gap: {                                  // mixed static + responsive
    none: "0",
    base: { mobile: "24px", desktop: "32px" },
  },
  headerColor: {                          // mode-aware
    base: { day: "#000", night: "#fff" },
  },
})`}</CodeBlock>
    </Flex>
  ),
}
