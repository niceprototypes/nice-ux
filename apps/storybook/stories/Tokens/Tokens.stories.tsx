import type { Meta, StoryObj } from "@storybook/react"
import { getToken } from "nice-styles"
import Typography from "nice-react-typography"
import DemoDot from "../../src/components/DemoDot"
import DemoDots from "../../src/components/DemoDots"
import VariableList from "../../src/components/VariableList"
import { generateDescriptionString } from "../../src/utilities"
import Flex from "nice-react-flex"

const TokensDemo = () => <></>

const meta = {
  title: "Styles/Tokens",
  component: TokensDemo,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: "docs",
    docs: {
      description: {
        component: generateDescriptionString([
          "LINKS",
          "\u2002",
          {
            value: "[github](https://github.com/niceprototypes/nice-styles)",
          },
          "\u2002",
          {
            value: "[npm](https://www.npmjs.com/package/nice-styles)",
            newLine: true,
          },
          { value: "\u2002", newLine: true },
          { value: "SETUP", newLine: true },
          { value: "npm i nice-styles", code: true, newLine: true },
          {
            value: 'import { getToken } from "nice-styles"',
            code: true,
            newLine: true,
          },
          { value: "\u2002", newLine: true },
          { value: "USAGE", newLine: true },
          { value: 'getToken("fontSize").key', code: true },
          "\u2002\u2192\u2002",
          { value: '"--font-size-base"', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").key', code: true },
          "\u2002\u2192\u2002",
          { value: '"--font-size-large"', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").var', code: true },
          "\u2002\u2192\u2002",
          { value: 'var("--font-size-large")', code: true, newLine: true },
          { value: 'getToken("fontSize", "large").value', code: true },
          "\u2002\u2192\u2002",
          { value: '"24px"', code: true, newLine: true },
        ]),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TokensDemo>

export default meta
type Story = StoryObj<typeof meta>

// Helper function to generate variable arrays
const createVariables = <T extends string | { name: string }>(
  groupName: string,
  variants: T[],
  renderDemo?: (variant: T extends string ? string : T) => React.ReactNode
) => {
  return variants.map(variant => {
    const itemName = typeof variant === "string" ? variant : variant.name

    const token = getToken(groupName as any, itemName)
    const code =
      itemName === "base"
        ? `getToken("${groupName}")`
        : `getToken("${groupName}", "${itemName}")`
    return {
      name: itemName,
      key: token.key,
      var: token.var,
      value: token.value,
      code,
      demo: renderDemo ? renderDemo(variant as any) : undefined,
    }
  })
}

// Helper functions to generate variable arrays
const prepareAnimationDuration = () =>
  createVariables(
    "animationDuration",
    [
      {
        name: "base",
        backgroundColor: getToken("foregroundColor", "error").var,
      },
      {
        name: "slow",
        backgroundColor: getToken("foregroundColor", "warning").var,
      },
    ],
    ({ name, backgroundColor }: any) => {
      const animationName = name === "base" ? "slide" : "slideSlow"
      return (
        <Flex
          style={{
            width: "120px",
            backgroundColor: getToken("backgroundColor", "alternate").var,
            borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
          }}
        >
          <Demo
            style={{
              backgroundColor,
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
              borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
              animation: `${animationName} calc(${getToken("animationDuration", name).var} * 6) ${getToken("animationEasing").var} infinite`,
              animationDelay: name === "base" ? getToken("animationDuration", name).var : 0,
            }}
          />
        </Flex>
      )
    }
  )

const prepareAnimationEasing = () =>
  createVariables("animationEasing", ["base"], () => (
    <Flex
      style={{
        backgroundColor: getToken("backgroundColor", "alternate").var,
        padding: getToken("gap").var,
        borderRadius: getToken("borderRadius").var,
      }}
    >
      <svg width="60" height="24" viewBox="0 0 60 24">
        <path
          d="M 1 23 C 30 23, 30 1, 60 1"
          fill="none"
          stroke={getToken("foregroundColor", "lighter").var}
          strokeWidth={getToken("borderWidth", "large").var}
          strokeLinecap="round"
        />
      </svg>
    </Flex>
  ))

const prepareBackgroundColor = () =>
  createVariables(
    "backgroundColor",
    [
      { name: "base", backgroundColor: getToken("backgroundColor").var },
      {
        name: "alternate",
        backgroundColor: getToken("backgroundColor", "alternate").var,
      },
    ],
    ({ backgroundColor }: any) => (
      <Demo
        borderRadius={getToken("borderRadius", "small").var}
        style={{
          backgroundColor,
          width: `calc(${getToken("borderRadius", "larger").var} * 8)`,
          height: `calc(${getToken("borderRadius", "larger").var} * 2)`,
          border: `${getToken("borderWidth").var} solid ${getToken("borderColor").var}`,
          borderRadius: getToken("borderRadius", "small").var,
        }}
      />
    )
  )

const prepareBorderColor = () =>
  createVariables("borderColor", ["base", "heavy", "heavier"], variant => (
    <Demo
      style={{
        backgroundColor: "white",
        width: `calc(${getToken("borderRadius", "larger").var} * 8)`,
        height: `calc(${getToken("borderRadius", "larger").var} * 2)`,
        border: `${getToken("borderWidth").var} solid ${getToken("borderColor", variant).var}`,
        borderRadius: getToken("borderRadius", "small").var,
      }}
    />
  ))

const prepareBorderRadius = () =>
  createVariables(
    "borderRadius",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <Demo
        style={{
          borderRadius: getToken("borderRadius", variant).var,
          width: `calc(${getToken("borderRadius", "larger").var} * 8)`,
          height: `calc(${getToken("borderRadius", "larger").var} * 2)`,
          border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
        }}
      />
    )
  )

const prepareBorderWidth = () =>
  createVariables(
    "borderWidth",
    [{ name: "base" }, { name: "large" }],
    ({ name }: any) => (
      <Demo
        style={{
          width: `calc(${getToken("borderRadius", "larger").var} * 8)`,
          height: `calc(${getToken("borderRadius", "larger").var} * 2)`,
          border: `${getToken("borderWidth", name).var} solid ${getToken("foregroundColor", "light").var}`,
          borderRadius: getToken("borderRadius", "small").var,
        }}
      />
    )
  )

const prepareBoxShadow = () =>
  createVariables(
    "boxShadow",
    [{ name: "base" }, { name: "large" }],
    ({ name }: any) => (
      <Demo
        backgroundColor="rgba(0, 0, 0, 0.05)"
        borderRadius={getToken("borderRadius", "small").var}
        spacing={{ all: "large" }}
        style={{
          backgroundColor: getToken("backgroundColor").var,
          width: `calc((${getToken("borderRadius", "larger").var} * 8) - (${getToken("gap", "large").var} * 2))`,
          height: `calc(${getToken("borderRadius", "larger").var} * 2)`,
          borderRadius: getToken("borderRadius", "small").var,
          boxShadow: getToken("boxShadow", name).var,
        }}
      />
    )
  )

const prepareCellHeight = () =>
  createVariables(
    "cellHeight",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <Demo
        style={{
          width: `calc(${getToken("borderRadius", "larger").var} * 8)`,
          height: getToken("cellHeight", variant).var,
          border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
          borderRadius: getToken("borderRadius", "small").var,
        }}
      />
    )
  )

const prepareForegroundColor = () =>
  createVariables(
    "foregroundColor",
    [
      "lighter",
      "light",
      "medium",
      "heavy",
      "base",
      "disabled",
      "link",
      "success",
      "warning",
      "error",
    ],
    variant => (
      <Demo
        style={{
          width: getToken("cellHeight", "smaller").var,
          height: getToken("cellHeight", "smaller").var,
          backgroundColor: getToken("foregroundColor", variant).var,
          borderRadius: "50%",
        }}
      />
    )
  )

const prepareFontFamily = () =>
  createVariables(
    "fontFamily",
    [
      { name: "heading", weight: "bold", text: "Heading" },
      { name: "base", text: "Body" },
      { name: "code", code: true, text: "Code" },
    ],
    ({ size, weight, code, text }: any) => (
      <Typography size={size} weight={weight} code={code}>
        {text}
      </Typography>
    )
  )

const prepareFontSize = () =>
  createVariables(
    "fontSize",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <Typography size={variant as any}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Typography>
    )
  )

const prepareFontWeight = () =>
  createVariables(
    "fontWeight",
    ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
    variant => (
      <Typography weight={variant}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Typography>
    )
  )

const prepareGap = () =>
  createVariables(
    "gap",
    ["smaller", "small", "base", "large", "larger"],
    variant => (
      <DemoDots
        gap={variant as any}
        demos={[
          {
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
              backgroundColor: getToken("foregroundColor", "error").var,
              borderRadius: "50%",
            },
          },
          {
            style: {
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
              backgroundColor: getToken("foregroundColor", "link").var,
              borderRadius: "50%",
            },
          },
        ]}
      />
    )
  )

const prepareLineHeight = () => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  return createVariables(
    "lineHeight",
    ["condensed", "base", "expanded"],
    variant => <Typography lineHeight={variant as any}>{loremIpsum}</Typography>
  )
}

// Map of prepare functions for each token type
const prepareFunctions = {
  AnimationDuration: prepareAnimationDuration,
  AnimationEasing: prepareAnimationEasing,
  BackgroundColor: prepareBackgroundColor,
  BorderColor: prepareBorderColor,
  BorderRadius: prepareBorderRadius,
  BorderWidth: prepareBorderWidth,
  BoxShadow: prepareBoxShadow,
  CellHeight: prepareCellHeight,
  ForegroundColor: prepareForegroundColor,
  FontFamily: prepareFontFamily,
  FontSize: prepareFontSize,
  FontWeight: prepareFontWeight,
  Gap: prepareGap,
  LineHeight: prepareLineHeight,
}

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const AnimationDuration: Story = {
  name: "animationDuration",
  render: () => <VariableList variables={prepareFunctions.AnimationDuration()} />,
  parameters: storyParameters,
}

export const AnimationEasing: Story = {
  name: "animationEasing",
  render: () => <VariableList variables={prepareFunctions.AnimationEasing()} />,
  parameters: storyParameters,
}

export const BackgroundColor: Story = {
  name: "backgroundColor",
  render: () => <VariableList variables={prepareFunctions.BackgroundColor()} />,
  parameters: storyParameters,
}

export const BorderColor: Story = {
  name: "borderColor",
  render: () => <VariableList variables={prepareFunctions.BorderColor()} />,
  parameters: storyParameters,
}

export const BorderRadius: Story = {
  name: "borderRadius",
  render: () => <VariableList variables={prepareFunctions.BorderRadius()} />,
  parameters: storyParameters,
}

export const BorderWidth: Story = {
  name: "borderWidth",
  render: () => <VariableList variables={prepareFunctions.BorderWidth()} />,
  parameters: storyParameters,
}

export const BoxShadow: Story = {
  name: "boxShadow",
  render: () => <VariableList variables={prepareFunctions.BoxShadow()} />,
  parameters: storyParameters,
}

export const CellHeight: Story = {
  name: "cellHeight",
  render: () => <VariableList variables={prepareFunctions.CellHeight()} />,
  parameters: storyParameters,
}

export const ForegroundColor: Story = {
  name: "foregroundColor",
  render: () => <VariableList variables={prepareFunctions.ForegroundColor()} />,
  parameters: storyParameters,
}

export const FontFamily: Story = {
  name: "fontFamily",
  render: () => <VariableList variables={prepareFunctions.FontFamily()} />,
  parameters: storyParameters,
}

export const FontSize: Story = {
  name: "fontSize",
  render: () => <VariableList variables={prepareFunctions.FontSize()} />,
  parameters: storyParameters,
}

export const FontWeight: Story = {
  name: "fontWeight",
  render: () => <VariableList variables={prepareFunctions.FontWeight()} />,
  parameters: storyParameters,
}

export const Gap: Story = {
  name: "gap",
  render: () => <VariableList variables={prepareFunctions.Gap()} />,
  parameters: storyParameters,
}

export const LineHeight: Story = {
  name: "lineHeight",
  render: () => <VariableList variables={prepareFunctions.LineHeight()} />,
  parameters: storyParameters,
}
