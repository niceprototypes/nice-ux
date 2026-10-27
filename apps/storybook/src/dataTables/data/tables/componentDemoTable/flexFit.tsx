import Flex from "nice-react-flex"
import { dotStyle, trackStyle } from "../../../utilities"
import type { ComponentExample } from "../../../components/demos/Components"

export const flexFit = {
  name: "fit",
  description: "Shrinks the container to its content (width: max-content) instead of filling the available width.",
  variants: ["false", "true"],
  default: "false",
  preview: variant => (
    <Flex
      fit={variant === "true"}
      gap="smaller"
      padding="smaller"
      style={trackStyle}
    >
      <span style={dotStyle("error")} />
      <span style={dotStyle("warning")} />
    </Flex>
  ),
  code: variant => (variant === "true" ? `<Flex fit>\n  …\n</Flex>` : `<Flex>\n  …\n</Flex>`),
} satisfies ComponentExample
