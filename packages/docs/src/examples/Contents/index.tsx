// Contents example configs — one ComponentExample per prop, shaped like Toggle's. Each preview is
// Contents beside a bounded scrolling box holding the sections its rows link to.
import { useState } from "react"
import Contents from "@niceprototypes/contents"
import type { ContentsItemsType, ContentsProps } from "@niceprototypes/contents"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import type { ComponentExample } from "../../dataTables/components/demos/Components"
import ScrollBox, { SCROLL_BOX_HEIGHT } from "../Sticky/ScrollBox"

/** Rows with ids unique to one preview, nested one level under Usage when `nested`. */
const getItems = (scope: string, nested = true): ContentsItemsType => {
  const id = (label: string) => `contents-${scope}-${label.toLowerCase()}`
  const usage = [
    { id: id("Props"), label: "Props" },
    { id: id("Events"), label: "Events" },
  ]
  return [
    { id: id("Install"), label: "Install" },
    nested ? { id: id("Usage"), label: "Usage", items: usage } : { id: id("Usage"), label: "Usage" },
    ...(nested ? [] : usage),
  ]
}

/** Every row, depth-first: the sections in page order. */
const flatten = (items: ContentsItemsType): ContentsItemsType =>
  items.flatMap(item => [item, ...(item.items ? flatten(item.items) : [])])

/** Contents beside the box of sections its rows link to, one box-height each. */
const Preview = (props: ContentsProps) => (
  <Flex gap="base">
    <Contents {...props} />
    <ScrollBox>
      {flatten(props.items).map(item => (
        <Flex
          key={item.id}
          padding="small"
          style={{ blockSize: SCROLL_BOX_HEIGHT }}
        >
          <Ink
            as="h3"
            id={item.id}
          >
            {item.label}
          </Ink>
        </Flex>
      ))}
    </ScrollBox>
  </Flex>
)

/** Contents reporting the last id onActiveChange received. */
const ReportingPreview = () => {
  const [lastId, setLastId] = useState<string>()
  const items = getItems("onactivechange")
  return (
    <Flex
      direction="column"
      gap="small"
    >
      <Preview
        items={items}
        onActiveChange={setLastId}
      />
      <Ink
        size="small"
        color="light"
      >
        {lastId ? `onActiveChange("${lastId}")` : "Scroll the box or click a row"}
      </Ink>
    </Flex>
  )
}

const ITEMS_CODE = `items={[\n    { id: "install", label: "Install" },\n    { id: "usage", label: "Usage", items: [{ id: "props", label: "Props" }] },\n  ]}`

export const contentsItems = {
  name: "items",
  description:
    "Rows in page order, each linking to the element with its id; nested items indent one level. Scroll-spy marks the last row whose section top has passed the upper quarter of the viewport; a click scrolls its section into view.",
  variants: ["flat", "nested"],
  default: "nested",
  preview: variant => <Preview items={getItems(`items-${variant}`, variant === "nested")} />,
  code: variant =>
    variant === "nested"
      ? `<Contents\n  ${ITEMS_CODE}\n/>`
      : `<Contents\n  items={[\n    { id: "install", label: "Install" },\n    { id: "usage", label: "Usage" },\n    { id: "props", label: "Props" },\n  ]}\n/>`,
} satisfies ComponentExample

export const contentsHeading = {
  name: "heading",
  description: "Text of the sticky heading above the rows; it also names the nav landmark.",
  variants: ["Contents", "On this page"],
  default: "Contents",
  preview: variant => (
    <Preview
      items={getItems(`heading-${variant.replace(/ /g, "-").toLowerCase()}`)}
      heading={variant}
    />
  ),
  code: variant =>
    variant === "Contents" ? `<Contents\n  ${ITEMS_CODE}\n/>` : `<Contents\n  heading="${variant}"\n  ${ITEMS_CODE}\n/>`,
} satisfies ComponentExample

export const contentsActiveId = {
  name: "activeId",
  description: "Pins the highlight to this row whatever is in view; unset, scroll-spy moves it.",
  variants: ["unset", "props"],
  default: "unset",
  preview: variant => {
    const items = getItems(`activeid-${variant}`)
    return (
      <Preview
        items={items}
        activeId={variant === "props" ? flatten(items)[2].id : undefined}
      />
    )
  },
  code: variant =>
    variant === "props" ? `<Contents\n  activeId="props"\n  ${ITEMS_CODE}\n/>` : `<Contents\n  ${ITEMS_CODE}\n/>`,
} satisfies ComponentExample

export const contentsOnActiveChange = {
  name: "onActiveChange",
  description: "Called with the id scroll-spy or a click makes active.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingPreview />,
  code: () => `<Contents\n  ${ITEMS_CODE}\n  onActiveChange={id => setLastId(id)}\n/>`,
} satisfies ComponentExample

/** Every Contents example facet — each one a section of the Contents docs page. */
export const contentsExamples = {
  items: contentsItems,
  heading: contentsHeading,
  activeId: contentsActiveId,
  onActiveChange: contentsOnActiveChange,
} satisfies Record<string, ComponentExample>
