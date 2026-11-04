// Scroll example configs — one ComponentExample per container prop, shaped like Toggle's. Each
// preview is a bordered box smaller than its items, so it scrolls. The page behaviours (root,
// sticky, fade) need the real page scroller: they are on the Scroll / Page behaviour page.
import { Scroll } from "@niceprototypes/scroll"
import type { ScrollAxisType, ScrollProps } from "@niceprototypes/scroll"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import { getToken } from "@niceprototypes/styles"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

/** The box: three rows tall, four wide. */
const BOX = {
  maxBlockSize: `calc(${getToken("size", "larger")} * 3)`,
  inlineSize: `calc(${getToken("size", "larger")} * 4)`,
  border: `${getToken("borderWidth", "small")} solid ${getToken("borderColor", "base")}`,
  borderRadius: getToken("borderRadius", "base"),
}

/** One row of the list, wide enough that a row of them overflows the box sideways. */
const ITEM = { inlineSize: `calc(${getToken("size", "larger")} * 2)`, flexShrink: 0 }

const ITEMS = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`)

/** The items: a column for `y`, a row for `x`, columns of rows for `both`. */
const Items = ({ axis }: { axis: ScrollAxisType }) => {
  const item = (label: string) => (
    <Flex key={label} padding="small" style={ITEM}>
      <Ink>{label}</Ink>
    </Flex>
  )
  if (axis === "both")
    return (
      <Flex direction="column">
        {[0, 1, 2, 3].map(row => (
          <Flex key={row}>{ITEMS.slice(row * 3, row * 3 + 3).map(label => item(`${label} · ${row + 1}`))}</Flex>
        ))}
      </Flex>
    )
  return <Flex direction={axis === "x" ? "row" : "column"}>{ITEMS.map(item)}</Flex>
}

/** A box of items, with `props` over the defaults. */
const Box = (props: Omit<ScrollProps, "children">) => (
  <Scroll {...props} style={BOX}>
    <Items axis={props.axis ?? "y"} />
  </Scroll>
)

const ITEMS_CODE = "{items.map(item => <Row key={item}>{item}</Row>)}"

export const scrollChildren = {
  name: "children",
  description:
    "Content of the scroll container. Taller than the container's max height, it scrolls by wheel, touch and keyboard; the scrollbar is hidden by default.",
  variants: ["list"],
  default: "list",
  preview: () => <Box />,
  code: () => `<Scroll style={{ maxHeight }}>\n  ${ITEMS_CODE}\n</Scroll>`,
} satisfies ComponentExample

export const scrollAxis = {
  name: "axis",
  description: "The direction the content scrolls in: y (overflow-y: auto), x (overflow-x: auto) or both (overflow: auto).",
  variants: ["y", "x", "both"],
  default: "y",
  preview: (variant: ScrollAxisType) => <Box axis={variant} />,
  code: (variant: ScrollAxisType) =>
    variant === "y" ? `<Scroll style={{ maxHeight }}>\n  ${ITEMS_CODE}\n</Scroll>` : `<Scroll axis="${variant}" style={{ maxHeight }}>\n  ${ITEMS_CODE}\n</Scroll>`,
} satisfies ComponentExample

/** `showScrollbar` per variant: unset reads the `scroll.scrollbarWidth` token. */
const SHOW_SCROLLBAR: Record<string, boolean | undefined> = { unset: undefined, true: true, false: false }

export const scrollShowScrollbar = {
  name: "showScrollbar",
  description:
    "Show the scrollbar. Hidden, the content still scrolls. Unset, the scroll.scrollbarWidth token decides: hidden unless the project sets it to auto.",
  variants: ["unset", "true", "false"],
  default: "unset",
  preview: (variant: string) => <Box showScrollbar={SHOW_SCROLLBAR[variant]} />,
  code: (variant: string) =>
    variant === "unset"
      ? `<Scroll style={{ maxHeight }}>\n  ${ITEMS_CODE}\n</Scroll>`
      : `<Scroll showScrollbar${variant === "true" ? "" : "={false}"} style={{ maxHeight }}>\n  ${ITEMS_CODE}\n</Scroll>`,
} satisfies ComponentExample

/** Every Scroll example facet — each one a section of the Scroll docs page. */
export const scrollExamples = {
  children: scrollChildren,
  axis: scrollAxis,
  showScrollbar: scrollShowScrollbar,
} satisfies Record<string, ComponentExample>
