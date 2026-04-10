import type { Meta, StoryObj } from "@storybook/react-vite"
import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import VariableList from "../../../../src/components/VariableList"
import DemoDots from "../../../../src/components/DemoDots"
import CodeBlock from "../../../../src/components/CodeBlock"
import { createToken } from "../../../../src/services"

// Renders a 3-line usage block showing .key, .var, .value for a token group.
// Comments are aligned by padding the left side to the longest invocation.
const usageBlock = (group: string, variant: string): string => {
  const def = getToken(group as any)
  const v = getToken(group as any, variant)
  const lines: Array<[string, string]> = [
    [`getToken("${group}").key`, `// → "${def.key}"`],
    [`getToken("${group}", "${variant}").var`, `// → "${v.var}"`],
    [`getToken("${group}", "${variant}").value`, `// → "${v.value}"`],
  ]
  const maxLeft = Math.max(...lines.map(([l]) => l.length))
  return lines.map(([l, r]) => `${l.padEnd(maxLeft + 1)}${r}`).join("\n")
}

const CoreDemo = () => <></>

const meta = {
  title: "React/Styles/getToken",
  component: CoreDemo,
  tags: ['!dev'],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CoreDemo>

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

export const Tokens: Story = {
  name: "Tokens",
  parameters: storyParameters,
  render: () => (
    <Flex direction="column" gap="larger">
      <section>
        <Typography as="h3">animationDuration</Typography>
        <CodeBlock language="typescript">{usageBlock("animationDuration", "slow")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("animationEasing", "base")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("backgroundColor", "dark")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("borderColor", "heavy")}</CodeBlock>
        <VariableList
          variables={createToken("borderColor", ["base", "heavy", "heavier"], variant => (
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
        <CodeBlock language="typescript">{usageBlock("borderRadius", "large")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("borderWidth", "large")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("boxShadow", "large")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("cellHeight", "large")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("foregroundColor", "link")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("fontFamily", "heading")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("fontSize", "large")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("fontWeight", "bold")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("gap", "large")}</CodeBlock>
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
        <CodeBlock language="typescript">{usageBlock("lineHeight", "expanded")}</CodeBlock>
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
