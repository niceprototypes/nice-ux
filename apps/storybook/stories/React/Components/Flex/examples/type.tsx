import Flex from "nice-react-flex"
import { getToken } from "nice-react-styles"
import DemoDots from "../../../../../src/components/DemoDots"
import { twoDots } from "../Flex.services"
import type { ComponentExample } from "./examples.types"

const radius = `calc(${getToken("cellHeight", "smaller")} / 2 + 2px)`

// Two nested bordered frames make the padding/margin difference visible: the
// inner frame carries the `type` prop, so `padding` grows the gap inside its
// border while `margin` pushes the border away from the outer frame.
const typePreview = (variant: string) => (
  <Flex direction="column">
    <Flex
      spacing="small"
      style={{
        border: `${getToken("borderWidth")} solid ${variant === "margin" ? getToken("borderColor") : getToken("borderColor", "dark")}`,
        borderRadius: radius,
      }}
    >
      <Flex
        spacing="small"
        type={variant}
        style={{
          border: `${getToken("borderWidth")} solid ${variant === "margin" ? getToken("borderColor", "dark") : "transparent"}`,
          borderRadius: radius,
        }}
      >
        <DemoDots dots={twoDots} />
      </Flex>
    </Flex>
  </Flex>
)

// Exported as `typeExample` (not `type`) so the barrel's `import { … }` never
// collides with TypeScript's `import { type X }` type-only modifier syntax.
export const typeExample = {
  name: "type",
  description: "Switches the spacing prop between applying inner padding or outer margin.",
  variants: ["padding", "margin"],
  default: "padding",
  preview: variant => typePreview(variant),
  code: variant => `<Flex type="${variant}" />`,
} satisfies ComponentExample
