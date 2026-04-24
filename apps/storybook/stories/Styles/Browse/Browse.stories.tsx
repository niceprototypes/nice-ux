import type { Meta, StoryObj } from "@storybook/react-vite"
import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import Typography from "../../../src/nice/Typography"
import VariableList from "../../../src/components/VariableList"
import DemoDots from "../../../src/components/DemoDots"
import { createToken } from "../../../src/services"

const BrowseDemo = () => <></>

const meta = {
  title: "Tokens/Browse",
  component: BrowseDemo,
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BrowseDemo>

export default meta
type Story = StoryObj<typeof meta>

const storyParameters = {
  docs: {
    source: { code: null },
    canvas: { sourceState: "none" },
  },
}

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."

export const AllTokens: Story = {
  name: "Browse",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="larger">
      <section>
        <Typography as="h3">animationDuration</Typography>
        <VariableList
          variables={createToken(
            "animationDuration",
            [
              { name: "base", backgroundColor: getToken("foregroundColor", "error").var },
              { name: "slow", backgroundColor: getToken("foregroundColor", "warning").var },
            ],
            ({ name, backgroundColor }: any) => {
              const animationName = name === "base" ? "slide" : "slideSlow"
              return (
                <Flex
                  style={{
                    width: "120px",
                    backgroundColor: getToken("backgroundColor", "dark").var,
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
                      animationDelay: name === "base" ? getToken("animationDuration", name).var : 0,
                    }}
                  />
                </Flex>
              )
            }
          )}
        />
      </section>

      <section>
        <Typography as="h3">animationEasing</Typography>
        <VariableList
          variables={createToken("animationEasing", ["base"], () => (
            <Flex
              style={{
                backgroundColor: getToken("backgroundColor", "dark").var,
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
      </section>

      <section>
        <Typography as="h3">backgroundColor</Typography>
        <VariableList
          variables={createToken(
            "backgroundColor",
            [
              { name: "base", backgroundColor: getToken("backgroundColor").var },
              { name: "dark", backgroundColor: getToken("backgroundColor", "dark").var },
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
      </section>

      <section>
        <Typography as="h3">borderColor</Typography>
        <VariableList
          variables={createToken("borderColor", ["base", "dark", "darker"], variant => (
            <Flex
              style={{
                backgroundColor: "white",
                width: getToken("cellHeight", "larger").var,
                height: getToken("cellHeight", "larger").var,
                border: `${getToken("borderWidth").var} solid ${getToken("borderColor", variant).var}`,
                borderRadius: getToken("borderRadius", "small").var,
              }}
            />
          ))}
        />
      </section>

      <section>
        <Typography as="h3">borderRadius</Typography>
        <VariableList
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
      </section>

      <section>
        <Typography as="h3">borderWidth</Typography>
        <VariableList
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
      </section>

      <section>
        <Typography as="h3">boxShadow</Typography>
        <VariableList
          variables={createToken(
            "boxShadow",
            [{ name: "base" }, { name: "large" }],
            ({ name }: any) => (
              <Flex
                spacing="large"
                style={{
                  backgroundColor: getToken("backgroundColor", "dark").var,
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
      </section>

      <section>
        <Typography as="h3">cellHeight</Typography>
        <VariableList
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
      </section>

      <section>
        <Typography as="h3">foregroundColor</Typography>
        <VariableList
          variables={createToken(
            "foregroundColor",
            ["lightest", "lighter", "light", "base", "disabled", "link", "success", "warning", "error"],
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
      </section>

      <section>
        <Typography as="h3">fontFamily</Typography>
        <VariableList
          variables={createToken(
            "fontFamily",
            [
              { name: "heading", weight: "bold", text: "Heading" },
              { name: "base", text: "Body" },
              { name: "code", code: true, text: "Code" },
            ],
            ({ weight, code, text }: any) => (
              <Typography weight={weight} code={code}>
                {text}
              </Typography>
            )
          )}
        />
      </section>

      <section>
        <Typography as="h3">fontSize</Typography>
        <VariableList
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
      </section>

      <section>
        <Typography as="h3">fontWeight</Typography>
        <VariableList
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
      </section>

      <section>
        <Typography as="h3">gap</Typography>
        <VariableList
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
      </section>

      <section>
        <Typography as="h3">lineHeight</Typography>
        <VariableList
          variables={createToken(
            "lineHeight",
            ["condensed", "base", "expanded"],
            variant => <Typography lineHeight={variant as any}>{loremIpsum}</Typography>
          )}
        />
      </section>
    </Flex>
  ),
}