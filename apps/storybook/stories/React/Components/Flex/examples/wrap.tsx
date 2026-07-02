import { getToken } from "nice-react-styles"
import DemoDots from "../../../../../src/components/DemoDots"
import type { ComponentExample } from "./examples.types"

// Five equal squares in a track ~3 wide: they wrap to new lines when wrapping is
// on. The nowrap set instead grows to share one line (no width, grow 1).
const wrapDots = ["error", "warning", "link", "success", "disabled"].map(color => ({
  color: getToken("color", color),
  height: getToken("cellHeight", "small"),
  width: getToken("cellHeight", "small"),
}))

const nowrapDots = wrapDots.map(dot => ({ ...dot, grow: 1, width: undefined }))

const wrapWidth = `calc(${getToken("cellHeight", "small")} * 3 + 2px)`

const dotsFor = (variant: string) => (variant === "nowrap" ? nowrapDots : wrapDots)

export const wrap = {
  name: "wrap",
  description: "Controls whether flex items wrap onto multiple lines when they overflow.",
  variants: ["nowrap", "wrap", "wrap-reverse"],
  default: "nowrap",
  preview: variant => <DemoDots wrap={variant} dots={dotsFor(variant)} width={wrapWidth} bordered />,
  code: variant => `<Flex wrap="${variant}" />`,
} satisfies ComponentExample
