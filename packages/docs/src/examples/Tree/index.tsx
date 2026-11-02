// Tree example configs — one ComponentExample per facet, shaped like Toggle's. ComponentDocs renders each
// entry as a section of the Tree docs page, sorted by name.
import { useState } from "react"
import Tree, { type TreeNodeType } from "@niceprototypes/tree"
import Flex from "@niceprototypes/flex"
import Icon from "@niceprototypes/icon"
import Ink from "@niceprototypes/ink"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

/** A "Guides" folder holding two links. */
const GUIDES: TreeNodeType = {
  id: "guides",
  name: "Guides",
  icon: null,
  items: [
    { id: "start", name: "Start", icon: null, url: "#start" },
    { id: "theming", name: "Theming", icon: null, url: "#theming" },
  ],
}

/** The Guides folder plus a top-level link. */
const ITEMS: TreeNodeType[] = [GUIDES, { id: "changelog", name: "Changelog", icon: null, url: "#changelog" }]

/** The `items` code for ITEMS. */
const ITEMS_CODE = `const items = [
  {
    id: "guides",
    name: "Guides",
    icon: null,
    items: [
      { id: "start", name: "Start", icon: null, url: "#start" },
      { id: "theming", name: "Theming", icon: null, url: "#theming" },
    ],
  },
  { id: "changelog", name: "Changelog", icon: null, url: "#changelog" },
]`

/** One `items` variant per node field. */
const ITEM_VARIANTS: Record<string, TreeNodeType[]> = {
  links: [
    { id: "start", name: "Start", icon: null, url: "#start" },
    { id: "theming", name: "Theming", icon: null, url: "#theming" },
  ],
  folder: [GUIDES],
  "folder link": [{ ...GUIDES, url: "#guides" }],
  icon: [{ ...GUIDES, icon: <Icon name="folder-closed" /> }],
  status: [
    {
      ...GUIDES,
      items: [
        { id: "start", name: "Start", icon: null, url: "#start", status: "active" },
        { id: "theming", name: "Theming", icon: null, url: "#theming" },
      ],
    },
  ],
  children: [
    {
      ...GUIDES,
      items: [
        { id: "start", name: "Start", icon: null, url: "#start", children: <Ink size="small">New</Ink> },
        { id: "theming", name: "Theming", icon: null, url: "#theming" },
      ],
    },
  ],
}

const ITEM_CODE: Record<string, string> = {
  links: `[
  { id: "start", name: "Start", icon: null, url: "#start" },
  { id: "theming", name: "Theming", icon: null, url: "#theming" },
]`,
  folder: `[
  {
    id: "guides",
    name: "Guides",
    icon: null,
    items: [
      { id: "start", name: "Start", icon: null, url: "#start" },
      { id: "theming", name: "Theming", icon: null, url: "#theming" },
    ],
  },
]`,
  "folder link": `[
  {
    id: "guides",
    name: "Guides",
    icon: null,
    url: "#guides",
    items: [
      { id: "start", name: "Start", icon: null, url: "#start" },
      { id: "theming", name: "Theming", icon: null, url: "#theming" },
    ],
  },
]`,
  icon: `[
  {
    id: "guides",
    name: "Guides",
    icon: <Icon name="folder-closed" />,
    items: [
      { id: "start", name: "Start", icon: null, url: "#start" },
      { id: "theming", name: "Theming", icon: null, url: "#theming" },
    ],
  },
]`,
  status: `[
  {
    id: "guides",
    name: "Guides",
    icon: null,
    items: [
      { id: "start", name: "Start", icon: null, url: "#start", status: "active" },
      { id: "theming", name: "Theming", icon: null, url: "#theming" },
    ],
  },
]`,
  children: `[
  {
    id: "guides",
    name: "Guides",
    icon: null,
    items: [
      { id: "start", name: "Start", icon: null, url: "#start", children: <Ink size="small">New</Ink> },
      { id: "theming", name: "Theming", icon: null, url: "#theming" },
    ],
  },
]`,
}

/** Variants that start with the Guides folder open, so its sub-rows show. */
const OPEN_VARIANTS = ["folder link", "icon", "children"]

/** A controlled Tree whose parent state starts at `initial`. */
const ControlledTree = ({ initial }: { initial: string[] }) => {
  const [expandedIds, setExpandedIds] = useState(initial)
  return (
    <Tree
      aria-label="Docs"
      items={ITEMS}
      expandedIds={expandedIds}
      onExpandedChange={setExpandedIds}
    />
  )
}

/** Shows what onExpandedChange receives. */
const ReportingExpandTree = () => {
  const [last, setLast] = useState("Toggle Guides")
  return (
    <Flex
      direction="column"
      gap="small"
    >
      <Tree
        aria-label="Docs"
        items={ITEMS}
        onExpandedChange={(expandedIds, event) => setLast(`onExpandedChange(${JSON.stringify(expandedIds)}, ${event.type})`)}
      />
      <Ink size="small">{last}</Ink>
    </Flex>
  )
}

/** Shows what onSelect receives; prevents the link's default navigation, as a client-side router does. */
const ReportingSelectTree = () => {
  const [last, setLast] = useState("Click a link")
  return (
    <Flex
      direction="column"
      gap="small"
    >
      <Tree
        aria-label="Docs"
        items={ITEMS}
        defaultExpandedIds={["guides"]}
        onSelect={(node, event) => {
          event.preventDefault()
          setLast(`onSelect("${node.id}", ${event.type})`)
        }}
      />
      <Ink size="small">{last}</Ink>
    </Flex>
  )
}

export const treeItems = {
  name: "items",
  description:
    "The top-level rows. A node with url is a link, a node with items is a folder; a folder with a url is a link with no toggle. Each variant shows one node field.",
  variants: ["links", "folder", "folder link", "icon", "status", "children"],
  default: "links",
  preview: variant => (
    <Tree
      aria-label="Docs"
      items={ITEM_VARIANTS[variant]}
      defaultExpandedIds={OPEN_VARIANTS.includes(variant) ? ["guides"] : undefined}
    />
  ),
  code: variant =>
    `<Tree\n  aria-label="Docs"${OPEN_VARIANTS.includes(variant) ? `\n  defaultExpandedIds={["guides"]}` : ""}\n  items={${ITEM_CODE[variant].replace(/\n/g, "\n  ")}}\n/>`,
} satisfies ComponentExample

export const treeExpandedIds = {
  name: "expandedIds",
  description: "Open folders, controlled by the parent. Pair it with onExpandedChange; without it the folders do not toggle.",
  variants: ["[]", "[\"guides\"]"],
  default: "[]",
  preview: variant => <ControlledTree initial={JSON.parse(variant)} />,
  code: variant =>
    `${ITEMS_CODE}\n\nconst [expandedIds, setExpandedIds] = useState(${variant})\n\n<Tree aria-label="Docs" items={items} expandedIds={expandedIds} onExpandedChange={setExpandedIds} />`,
} satisfies ComponentExample

export const treeDefaultExpandedIds = {
  name: "defaultExpandedIds",
  description: "Folders open at first, when the tree keeps its own state. Unset, the active node's ancestors.",
  variants: ["unset", "[\"guides\"]"],
  default: "unset",
  preview: variant => (
    <Tree
      aria-label="Docs"
      items={ITEMS}
      defaultExpandedIds={variant === "unset" ? undefined : JSON.parse(variant)}
    />
  ),
  code: variant =>
    `${ITEMS_CODE}\n\n<Tree aria-label="Docs" items={items}${variant === "unset" ? "" : ` defaultExpandedIds={${variant}}`} />`,
} satisfies ComponentExample

export const treeOnExpandedChange = {
  name: "onExpandedChange",
  description: "Called when a folder row is toggled, with the next open folder ids and the click event.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingExpandTree />,
  code: () =>
    `<Tree\n  aria-label="Docs"\n  items={items}\n  onExpandedChange={(expandedIds, event) => setLast(expandedIds)}\n/>`,
} satisfies ComponentExample

export const treeOnSelect = {
  name: "onSelect",
  description:
    "Called when a row's link is clicked, with the node and the click event. A client-side router calls event.preventDefault() and navigates itself.",
  variants: ["handler"],
  default: "handler",
  preview: () => <ReportingSelectTree />,
  code: () =>
    `<Tree\n  aria-label="Docs"\n  items={items}\n  onSelect={(node, event) => {\n    event.preventDefault()\n    navigate(node.url)\n  }}\n/>`,
} satisfies ComponentExample

/** Every Tree example facet — each one a section of the Tree docs page. */
export const treeExamples = {
  items: treeItems,
  expandedIds: treeExpandedIds,
  defaultExpandedIds: treeDefaultExpandedIds,
  onExpandedChange: treeOnExpandedChange,
  onSelect: treeOnSelect,
} satisfies Record<string, ComponentExample>
