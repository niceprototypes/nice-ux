import Flex, { type FlexAsType } from "@niceprototypes/flex"
import type { ComponentExample } from "../../../components/demos/Components"

const variants: FlexAsType[] = ["div", "nav", "header", "section", "footer", "main", "article", "aside", "ul", "ol", "li"]

/** The rendered element's tag, inside a Flex of that element; list items sit in a list. */
const preview = (variant: FlexAsType) => {
  const tag = <code>{`<${variant}>`}</code>
  if (variant === "ul" || variant === "ol") {
    return (
      <Flex as={variant}>
        <Flex as="li">{tag}</Flex>
      </Flex>
    )
  }
  if (variant === "li") {
    return (
      <Flex as="ul">
        <Flex as="li">{tag}</Flex>
      </Flex>
    )
  }
  return <Flex as={variant}>{tag}</Flex>
}

export const flexAs = {
  name: "as",
  description:
    "The HTML element Flex renders, for semantic landmarks (nav, header, section, footer, main, article, aside) and lists (ul, ol, li). The flex styles and forwarded props (aria-*, id, role, event handlers) are the same on every element.",
  variants,
  default: "div",
  preview: (variant) => preview(variant as FlexAsType),
  code: (variant) => (variant === "div" ? `<Flex />` : `<Flex as="${variant}" />`),
} satisfies ComponentExample
