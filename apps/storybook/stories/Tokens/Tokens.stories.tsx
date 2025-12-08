import type { Meta, StoryObj } from "@storybook/react"
import { getToken } from "nice-styles"
import Flex, { GapSize } from "nice-react-flex"
import Typography from "nice-react-typography"
import Story from "../../src/components/Story"
import DemoDots from "../../src/components/DemoDots"
import { generateDescriptionString, createToken } from "../../src/services"

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
        component: generateDescriptionString("nice-styles", {
          setup: [
            {
              value: 'import { getToken } from "nice-styles"',
              code: true,
              newLine: true,
            },
          ],
          usage: [
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
          ],
        }),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TokensDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

export const AnimationDuration: Story = {
  name: "animationDuration",
  render: () => (
    <Story
      variables={createToken(
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
              <Flex
                style={{
                  backgroundColor,
                  width: getToken("cellHeight", "smaller").var,
                  height: getToken("cellHeight", "smaller").var,
                  borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
                  animation: `${animationName} calc(${getToken("animationDuration", name).var} * 6) ${getToken("animationEasing").var} infinite`,
                  animationDelay:
                    name === "base"
                      ? getToken("animationDuration", name).var
                      : 0,
                }}
              />
            </Flex>
          )
        }
      )}
    />
  ),
  parameters: storyParameters,
}

export const AnimationEasing: Story = {
  name: "animationEasing",
  render: () => (
    <Story
      variables={createToken("animationEasing", ["base"], () => (
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
      ))}
    />
  ),
  parameters: storyParameters,
}

export const BackgroundColor: Story = {
  name: "backgroundColor",
  render: () => (
    <Story
      variables={createToken(
        "backgroundColor",
        [
          { name: "base", backgroundColor: getToken("backgroundColor").var },
          {
            name: "alternate",
            backgroundColor: getToken("backgroundColor", "alternate").var,
          },
        ],
        ({ backgroundColor }: any) => (
          <Flex
            style={{
              backgroundColor,
              width: getToken("cellHeight", "larger").var,
              height: getToken("cellHeight", "larger").var,
              border: `${getToken("borderWidth").var} solid ${getToken("borderColor").var}`,
              borderRadius: getToken("borderRadius", "small").var,
            }}
          />
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const BorderColor: Story = {
  name: "borderColor",
  render: () => (
    <Story
      variables={createToken(
        "borderColor",
        ["base", "heavy", "heavier"],
        variant => (
          <Flex
            style={{
              backgroundColor: "white",
              width: getToken("cellHeight", "larger").var,
              height: getToken("cellHeight", "larger").var,
              border: `${getToken("borderWidth").var} solid ${getToken("borderColor", variant).var}`,
              borderRadius: getToken("borderRadius", "small").var,
            }}
          />
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const BorderRadius: Story = {
  name: "borderRadius",
  render: () => (
    <Story
      variables={createToken(
        "borderRadius",
        ["smaller", "small", "base", "large", "larger"],
        variant => (
          <Flex
            style={{
              borderRadius: getToken("borderRadius", variant).var,
              width: getToken("cellHeight", "larger").var,
              height: getToken("cellHeight", "larger").var,
              border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
            }}
          />
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const BorderWidth: Story = {
  name: "borderWidth",
  render: () => (
    <Story
      variables={createToken(
        "borderWidth",
        [{ name: "base" }, { name: "large" }],
        ({ name }: any) => (
          <Flex
            style={{
              width: getToken("cellHeight", "larger").var,
              height: getToken("cellHeight", "larger").var,
              border: `${getToken("borderWidth", name).var} solid ${getToken("foregroundColor", "light").var}`,
              borderRadius: getToken("borderRadius", "small").var,
            }}
          />
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const BoxShadow: Story = {
  name: "boxShadow",
  render: () => (
    <Story
      variables={createToken(
        "boxShadow",
        [{ name: "base" }, { name: "large" }],
        ({ name }: any) => (
          <Flex
            spacing={{ sm: { all: "large" as GapSize } }}
            style={{
              backgroundColor: getToken("backgroundColor", "alternate").var,
              borderRadius: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
            }}
          >
            <Flex
              style={{
                backgroundColor: getToken("backgroundColor").var,
                width: getToken("cellHeight", "larger").var,
                height: getToken("cellHeight", "larger").var,
                borderRadius: getToken("borderRadius", "small").var,
                boxShadow: getToken("boxShadow", name).var,
              }}
            />
          </Flex>
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const CellHeight: Story = {
  name: "cellHeight",
  render: () => (
    <Story
      variables={createToken(
        "cellHeight",
        ["smaller", "small", "base", "large", "larger"],
        variant => (
          <Flex
            style={{
              width: getToken("cellHeight", "larger").var,
              height: getToken("cellHeight", variant).var,
              border: `${getToken("borderWidth").var} solid ${getToken("foregroundColor", "light").var}`,
              borderRadius: getToken("cellHeight", "smaller").var,
            }}
          />
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const ForegroundColor: Story = {
  name: "foregroundColor",
  render: () => (
    <Story
      variables={createToken(
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
          <Flex
            style={{
              width: getToken("cellHeight", "smaller").var,
              height: getToken("cellHeight", "smaller").var,
              backgroundColor: getToken("foregroundColor", variant).var,
              borderRadius: "50%",
            }}
          />
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const FontFamily: Story = {
  name: "fontFamily",
  render: () => (
    <Story
      variables={createToken(
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
      )}
    />
  ),
  parameters: storyParameters,
}

export const FontSize: Story = {
  name: "fontSize",
  render: () => (
    <Story
      variables={createToken(
        "fontSize",
        ["smaller", "small", "base", "large", "larger"],
        variant => (
          <Typography size={variant as any}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const FontWeight: Story = {
  name: "fontWeight",
  render: () => (
    <Story
      variables={createToken(
        "fontWeight",
        ["light", "base", "medium", "semibold", "bold", "extrabold", "black"],
        variant => (
          <Typography weight={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
        )
      )}
    />
  ),
  parameters: storyParameters,
}

export const Gap: Story = {
  name: "gap",
  render: () => (
    <Story
      variables={createToken(
        "gap",
        ["smaller", "small", "base", "large", "larger"],
        variant => (
          <DemoDots
            gap={variant as any}
            dots={[
              {
                color: getToken("foregroundColor", "error").var,
                width: getToken("cellHeight", "smaller").var,
                height: getToken("cellHeight", "smaller").var,
              },
              {
                color: getToken("foregroundColor", "link").var,
                width: getToken("cellHeight", "smaller").var,
                height: getToken("cellHeight", "smaller").var,
              },
            ]}
          />
        )
      )}
    />
  ),
  parameters: storyParameters,
}

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."

export const LineHeight: Story = {
  name: "lineHeight",
  render: () => (
    <Story
      variables={createToken(
        "lineHeight",
        ["condensed", "base", "expanded"],
        variant => (
          <Typography lineHeight={variant as any}>{loremIpsum}</Typography>
        )
      )}
    />
  ),
  parameters: storyParameters,
}
