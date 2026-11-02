import Flex from "@niceprototypes/flex"
import { dotStyle, trackStyle } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

/** Two containers in a row of plain flow: inline-level ones share a line, block-level ones stack. */
export const flexInlined = {
  name: "inlined",
  description: "Renders an inline-level flex container (display: inline-flex), so it flows within a line instead of starting a block.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <div>
      <Flex
        inlined={variant === "true"}
        padding="smaller"
        style={trackStyle}
      >
        <span style={dotStyle("error")} />
      </Flex>
      <Flex
        inlined={variant === "true"}
        padding="smaller"
        style={trackStyle}
      >
        <span style={dotStyle("link")} />
      </Flex>
    </div>
  ),
  code: variant =>
    variant === "true" ? `<Flex inlined>…</Flex>\n<Flex inlined>…</Flex>` : `<Flex>…</Flex>\n<Flex>…</Flex>`,
} satisfies ComponentExample
