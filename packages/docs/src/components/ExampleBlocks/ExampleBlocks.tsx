import Flex from "@niceprototypes/flex"
import Code from "@niceprototypes/code"
import { TokenName, variantKey } from "../../dataTables/utilities"
import type { ComponentExample } from "../../dataTables/components/demos/Components/Components.types"

/**
 * ExampleBlocks
 *
 * A facet's live examples, one per variant: the variant's name as an inline chip (the default
 * flagged with a check), and under it one full-width Code block with the live demo above its code.
 */
const ExampleBlocks = ({ example }: { example: ComponentExample }) => {
  const defaultVariant = example.default ?? "base"
  return (
    <Flex direction="column" gap="large">
      {example.variants.map(item => {
        const variant = variantKey(item)
        return (
          <Flex key={variant} direction="column" gap="small">
            <TokenName variant={variant} isDefault={variant === defaultVariant} />
            <Code code={example.code(item)} language="tsx">
              {example.preview(item)}
            </Code>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default ExampleBlocks
