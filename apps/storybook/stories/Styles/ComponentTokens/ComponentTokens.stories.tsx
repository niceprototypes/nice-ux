import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"
import Flex from "nice-react-flex"
import { getToken } from "nice-styles"
import { getIconToken } from "nice-react-icon"
import { getTypographyToken } from "nice-react-typography"
import { generateDescriptionString } from "../../../src/services"

const ComponentTokensDemo = () => <></>

const meta = {
  title: "Styles/ComponentTokens",
  component: ComponentTokensDemo,
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
              value: 'import { createTokens } from "nice-react-styles"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
            {
              value: 'const { GlobalStyles, getComponentToken } = createTokens("component", tokenMap)',
              code: true,
              newLine: true,
            },
          ],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ComponentTokensDemo>

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

const TokenRow = ({ name, cssVar, value }: { name: string; cssVar: string; value: string }) => (
  <Flex gap="base" style={{ fontFamily: getToken("fontFamily", "code").var, fontSize: getToken("fontSize", "small").var }}>
    <Typography code style={{ minWidth: "180px" }}>{name}</Typography>
    <Typography code color="medium" style={{ minWidth: "280px" }}>{cssVar}</Typography>
    <Typography code color="light">{value}</Typography>
  </Flex>
)

export const Overview: Story = {
  name: "Overview",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Component Tokens</Typography>
      <Typography color="medium">
        Component tokens are CSS custom properties scoped to a specific component.
        They follow the pattern --{"{component}"}--{"{token}"}--{"{variant}"} and allow
        consumers to customize component appearance via CSS.
      </Typography>
      <CodeBlock>
        {`// Creating component tokens
import { createTokens } from "nice-react-styles"

const TokenMap = {
  strokeWidth: {
    name: "stroke-width",
    items: {
      small: "1px",
      base: "1.5px",
      large: "2px",
    }
  }
} as const

export const { GlobalStyles, getComponentToken } = createTokens("icon", TokenMap)

// Generated CSS variables:
// --icon--stroke-width--small: 1px;
// --icon--stroke-width--base: 1.5px;
// --icon--stroke-width--large: 2px;`}
      </CodeBlock>
      <Typography as="h4">Usage</Typography>
      <CodeBlock>
        {`// Get token values
getComponentToken("strokeWidth", "base")
// Returns: { key: "--icon--stroke-width--base", var: "var(--icon--stroke-width--base)", value: "1.5px" }

// Override in CSS
:root {
  --icon--stroke-width--base: 2px;
}`}
      </CodeBlock>
    </Flex>
  ),
}

export const IconTokens: Story = {
  name: "Icon Tokens",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Icon Tokens</Typography>
      <Typography color="medium">
        Tokens exported from nice-react-icon for customizing icon appearance.
      </Typography>
      <CodeBlock>
        {`import { IconStyles, getIconToken } from "nice-react-icon"`}
      </CodeBlock>

      <Typography as="h4">strokeWidth</Typography>
      <Flex direction="column" gap="small">
        <TokenRow
          name="small"
          cssVar={getIconToken("strokeWidth", "small").key}
          value={getIconToken("strokeWidth", "small").value}
        />
        <TokenRow
          name="base"
          cssVar={getIconToken("strokeWidth", "base").key}
          value={getIconToken("strokeWidth", "base").value}
        />
        <TokenRow
          name="large"
          cssVar={getIconToken("strokeWidth", "large").key}
          value={getIconToken("strokeWidth", "large").value}
        />
      </Flex>

      <Typography as="h4">spinningAnimationDuration</Typography>
      <Flex direction="column" gap="small">
        <TokenRow
          name="base"
          cssVar={getIconToken("spinningAnimationDuration", "base").key}
          value={getIconToken("spinningAnimationDuration", "base").value}
        />
      </Flex>

      <Typography as="h4">viewBox</Typography>
      <Flex direction="column" gap="small">
        <TokenRow
          name="base"
          cssVar={getIconToken("viewBox", "base").key}
          value={getIconToken("viewBox", "base").value}
        />
      </Flex>
    </Flex>
  ),
}

export const TypographyTokens: Story = {
  name: "Typography Tokens",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Typography Tokens</Typography>
      <Typography color="medium">
        Tokens exported from nice-react-typography for customizing text appearance.
      </Typography>
      <CodeBlock>
        {`import { TypographyStyles, getTypographyToken } from "nice-react-typography"`}
      </CodeBlock>

      <Typography as="h4">letterSpacing</Typography>
      <Flex direction="column" gap="small">
        <TokenRow
          name="tight"
          cssVar={getTypographyToken("letterSpacing", "tight").key}
          value={getTypographyToken("letterSpacing", "tight").value}
        />
        <TokenRow
          name="base"
          cssVar={getTypographyToken("letterSpacing", "base").key}
          value={getTypographyToken("letterSpacing", "base").value}
        />
        <TokenRow
          name="wide"
          cssVar={getTypographyToken("letterSpacing", "wide").key}
          value={getTypographyToken("letterSpacing", "wide").value}
        />
        <TokenRow
          name="wider"
          cssVar={getTypographyToken("letterSpacing", "wider").key}
          value={getTypographyToken("letterSpacing", "wider").value}
        />
      </Flex>

      <Typography as="h4">maxWidth</Typography>
      <Flex direction="column" gap="small">
        <TokenRow
          name="prose"
          cssVar={getTypographyToken("maxWidth", "prose").key}
          value={getTypographyToken("maxWidth", "prose").value}
        />
        <TokenRow
          name="wide"
          cssVar={getTypographyToken("maxWidth", "wide").key}
          value={getTypographyToken("maxWidth", "wide").value}
        />
        <TokenRow
          name="full"
          cssVar={getTypographyToken("maxWidth", "full").key}
          value={getTypographyToken("maxWidth", "full").value}
        />
      </Flex>
    </Flex>
  ),
}

export const ButtonTokens: Story = {
  name: "Button Tokens",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Button Tokens</Typography>
      <Typography color="medium">
        Tokens exported from nice-react-button for customizing button appearance.
        Button has extensive tokens for height, spacing, border radius, and status colors.
      </Typography>
      <CodeBlock>
        {`import { ButtonStyles, getButtonToken, getButtonStatusToken } from "nice-react-button"`}
      </CodeBlock>

      <Typography as="h4">height</Typography>
      <Typography color="light">
        Button heights mapped to cellHeight tokens: smaller, small, base, large, larger
      </Typography>
      <CodeBlock>
        {`--button--height--smaller: var(--core--cell-height--smaller)
--button--height--small: var(--core--cell-height--small)
--button--height--base: var(--core--cell-height--base)
--button--height--large: var(--core--cell-height--large)
--button--height--larger: var(--core--cell-height--larger)`}
      </CodeBlock>

      <Typography as="h4">spacing</Typography>
      <Typography color="light">
        Horizontal padding calculated as half the cell height
      </Typography>
      <CodeBlock>
        {`--button--spacing--base: calc(var(--core--cell-height--base) / 2)`}
      </CodeBlock>

      <Typography as="h4">Status Colors</Typography>
      <Typography color="light">
        Status tokens define backgroundColor, borderColor, and foregroundColor for each
        combination of status (primary/secondary) and state (base/disabled/error/success/warning).
      </Typography>
      <CodeBlock>
        {`// Primary base
--button--status-primary-base--background-color
--button--status-primary-base--border-color
--button--status-primary-base--foreground-color

// Secondary error
--button--status-secondary-error--background-color
--button--status-secondary-error--border-color
--button--status-secondary-error--foreground-color

// Helper function for dynamic access
getButtonStatusToken("primary", "base", "backgroundColor")`}
      </CodeBlock>
    </Flex>
  ),
}

export const CreateTokens: Story = {
  name: "createTokens",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="large">
      <Typography as="h3">Creating Custom Tokens</Typography>
      <Typography color="medium">
        Use createTokens to define tokens for your own components.
      </Typography>
      <CodeBlock>
        {`// components/Card/tokens.ts
import { createTokens } from "nice-react-styles"

export const CardTokenMap = {
  padding: {
    name: "padding",
    items: {
      small: "8px",
      base: "16px",
      large: "24px",
    }
  },
  shadow: {
    name: "shadow",
    items: {
      base: "0 2px 4px rgba(0,0,0,0.1)",
      elevated: "0 4px 12px rgba(0,0,0,0.15)",
    }
  }
} as const

export const {
  GlobalStyles: CardStyles,
  getComponentToken: getCardToken
} = createTokens("card", CardTokenMap)

// Generated CSS:
// --card--padding--small: 8px;
// --card--padding--base: 16px;
// --card--padding--large: 24px;
// --card--shadow--base: 0 2px 4px rgba(0,0,0,0.1);
// --card--shadow--elevated: 0 4px 12px rgba(0,0,0,0.15);`}
      </CodeBlock>
      <Typography as="h4">Export from Package</Typography>
      <CodeBlock>
        {`// index.ts
export { CardStyles, CardTokenMap, getCardToken } from "./components/Card/tokens"`}
      </CodeBlock>
    </Flex>
  ),
}
