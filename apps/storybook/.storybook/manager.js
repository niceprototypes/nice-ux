// @ts-check
import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import { applyTheme } from "nice-styles"
import { getIconEncoded } from "nice-icons/get-icon-encoded"
import {
  TOGGLE_NAV_EVENT,
  NAV_STATE_EVENT,
  REQUEST_NAV_STATE_EVENT,
  OPEN_IN_EDITOR_EVENT,
  NAV_ACTION_EVENT,
} from "../src/components/Story/StoryNavigation/StoryNavigation.events"
import "./manager.css"

// Seed the initial manager + nice theme from the dark-mode addon's persisted
// choice (its own localStorage key), defaulting to LIGHT — never the OS
// prefers-color-scheme — so Storybook opens light regardless of browser
// settings. The addon takes over once it initializes; see darkMode.current in
// preview.tsx.
const prefersDark = (() => {
  try {
    return JSON.parse(window.localStorage.getItem("sb-addon-themes-3") || "{}").current === "dark"
  } catch {
    return false
  }
})()
const theme = create({
  base: prefersDark ? "dark" : "light",
  brandTitle: "Nice Components",
  brandUrl: "https://niceprototypes.com",
  brandImage: "https://niceprototypes.com/vectors/logo.svg",
  brandTarget: "_self",

  fontBase:
    "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
  fontCode: '"Roboto Mono", "Courier New", serif',
})

addons.setConfig({
  theme,
  // Render top-level sections as collapsible folders instead of always-open
  // roots. Storybook expands only the selected story's ancestors on load, and
  // the default landing story is Basics/Welcome (first in storySort) — so on a
  // fresh load Basics is open and every other section is collapsed.
  sidebar: {
    showRoots: false,
  },
})

// Prefix the browser tab title with "Nice UI / ". Storybook rewrites
// document.title on every navigation (its "{story} ⋅ Storybook" format has no
// prefix config), so watch the <title> element and re-apply the prefix whenever
// it changes. The startsWith guard makes the observer's own write a no-op, so it
// doesn't loop.
const TITLE_PREFIX = "Nice UI / "
const applyTitlePrefix = () => {
  if (!document.title.startsWith(TITLE_PREFIX)) {
    document.title = `${TITLE_PREFIX}${document.title}`
  }
}
const titleEl = document.querySelector("title")
if (titleEl) new MutationObserver(applyTitlePrefix).observe(titleEl, { childList: true })
applyTitlePrefix()

const folderIcon = getIconEncoded("folder-closed")
const middleBranchIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMzAuNi4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogMi4xLjQgQnVpbGQgMTA5KSAgLS0+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5zdDAsIC5zdDEgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgc3Ryb2tlOiAjMDAwOwogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgICBzdHJva2Utd2lkdGg6IDEuNXB4OwogICAgICB9CgogICAgICAuc3QxIHsKICAgICAgICBzdHJva2UtbGluZWNhcDogcm91bmQ7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxsaW5lIGNsYXNzPSJzdDAiIHgxPSIxNiIgeTE9IjMyIiB4Mj0iMTYiLz4KICA8bGluZSBjbGFzcz0ic3QxIiB4MT0iMTYiIHkxPSIxNiIgeDI9IjMxIiB5Mj0iMTYiLz4KPC9zdmc+"
const lastBranchIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMzAuNi4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogMi4xLjQgQnVpbGQgMTA5KSAgLS0+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5zdDAgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgc3Ryb2tlOiAjMDAwOwogICAgICAgIHN0cm9rZS1saW5lY2FwOiByb3VuZDsKICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdDogMTA7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAxLjVweDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBvbHlsaW5lIGNsYXNzPSJzdDAiIHBvaW50cz0iMTYgMCAxNiAxNiAzMSAxNiIvPgo8L3N2Zz4="
const outerBranchIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMzAuNi4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogMi4xLjQgQnVpbGQgMTA5KSAgLS0+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5zdDAgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgc3Ryb2tlOiAjMDAwOwogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgICBzdHJva2Utd2lkdGg6IDEuNXB4OwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8bGluZSBjbGFzcz0ic3QwIiB4MT0iMTYiIHgyPSIxNiIgeTI9IjMyIi8+Cjwvc3ZnPg=="

const sidebarGlyphStyle = document.createElement("style")
document.head.appendChild(sidebarGlyphStyle)
sidebarGlyphStyle.textContent = `
  .sidebar-item {
    /* Branch icons */
    &[data-nodetype="group"] > [tabindex] > div:first-child,
    &[data-nodetype="document"] > [tabindex] {
      > div:first-child {
        &::after {
          -webkit-mask-image: url("${outerBranchIcon}");
          mask-image: url("${outerBranchIcon}");
        }
        
        > svg {
          -webkit-mask-image: url("${middleBranchIcon}");
          mask-image: url("${middleBranchIcon}");
        }
      }
    }

    &[data-branch-end="true"] {
      &[data-nodetype="group"] > [tabindex] > div:first-child,
      &[data-nodetype="document"] > [tabindex] {
        > div:first-child {
          > svg {
            -webkit-mask-image: url("${lastBranchIcon}");
            mask-image: url("${lastBranchIcon}");
          }
        }
      }
    }
    
    &[data-selected="true"],
    &[data-selected-group="true"] {
      /* Branch icons */
      &[data-nodetype="group"] > [tabindex] > div:first-child,
      &[data-nodetype="document"] > [tabindex] {
        > div:first-child {
          &::after {
            -webkit-mask-image: url("${lastBranchIcon}");
            mask-image: url("${lastBranchIcon}");
          }
        }
      }
    }
    
    &[data-path-depth="2"] {
      > [tabindex] > div:first-child::before {
        -webkit-mask-image: url("${outerBranchIcon}");
        mask-image: url("${outerBranchIcon}");
      }
    }
    
    /* Folder icons */
    &[data-nodetype="group"] {
      > [tabindex] > div:first-child > svg {
        -webkit-mask-image: url("${folderIcon}");
        mask-image: url("${folderIcon}");
      }
    }
  }
`

// Tag each sidebar item with its depth — the count of labeled ancestors, so a
// top-level section is 0, a component under it is 1, its stories are 2. The tree
// is a flat, depth-first list where each item names its parent via
// data-parent-id; walk that chain up starting from the item's PARENT (the item
// itself is not counted, or every depth would be off by one). Re-runs whenever
// the tree re-renders or the selection changes; the observer watches childList
// plus the data-selected attribute. Our own writes (data-path-depth / …) are
// outside that filter, so they don't re-trigger it.
const tagSidebarPaths = () => {
  const items = [...document.querySelectorAll(".sidebar-item")]
  const byId = new Map(items.map(el => [el.getAttribute("data-item-id"), el]))

  const depths = items.map((item) => {
    let depth = 0
    for (
      let cur = byId.get(item.getAttribute("data-parent-id"));
      cur;
      cur = byId.get(cur.getAttribute("data-parent-id"))
    ) {
      const hasLabel = !!(cur.firstElementChild?.textContent ?? "").trim()
      if (hasLabel) depth += 1
    }
    return depth
  })

  items.forEach((item, i) => {
    item.setAttribute("data-path-depth", String(depths[i]))
    // data-branch-end: "true" when the next item in the flat list is at a
    // different depth — or there is no next item — i.e. no same-depth sibling
    // follows this row, so it ends its branch run. An EXPANDED group is never a
    // branch end: its own children render directly beneath it, so the branch
    // continues through it even though the next row is deeper. A document row's
    // first [tabindex] child is its <a>, which carries no aria-expanded, so
    // documents and collapsed groups both fall through to the depth rule.
    const next = depths[i + 1]
    const expanded =
      item.querySelector(":scope > [tabindex]")?.getAttribute("aria-expanded") === "true"
    item.setAttribute(
      "data-branch-end",
      String(!expanded && (next === undefined || next !== depths[i])),
    )
  })

  // The open story's id, read from the manager URL rather than the tree. Collapsing
  // a folder removes its rows from the DOM outright, so on a collapsed branch NO
  // row carries data-selected even though a story is still open — the sidebar
  // simply cannot answer the question. The URL keeps holding it either way.
  const path = new URLSearchParams(window.location.search).get("path") ?? ""
  const selectedId = path.match(/^\/(?:story|docs)\/(.+)$/)?.[1] ?? null

  // data-has-selected: on .sidebar-container, not the rows — "true" whenever a
  // story is open at all. It no longer stands in for a collapsed branch (the ids
  // below handle that); it guards the genuinely empty case, so a route that
  // resolves to no story doesn't read as "every row is off the path". Reached from
  // a row rather than by id so it still resolves if the wrapper markup shifts.
  const container =
    items[0]?.closest(".sidebar-container") ?? document.querySelector(".sidebar-container")
  container?.setAttribute("data-has-selected", String(selectedId !== null))

  const selectedIndex = items.findIndex(el => el.getAttribute("data-selected") === "true")
  const selectedGroupId = selectedIndex === -1 ? null : items[selectedIndex].getAttribute("data-parent-id")

  // data-selected-depth: on .sidebar-container — how deep the open story sits. No
  // row can know this, and the branch line needs it: a row DEEPER than the
  // selection is never on the path to it, so its marker belongs in the outer
  // gutter. Rows cannot tell that case apart on their own, because a depth-1
  // selection makes its "group" the depth-0 section, which sweeps every depth-2
  // row in unrelated folders into data-selected-group-item.
  container?.setAttribute(
    "data-selected-depth",
    selectedIndex === -1 ? "" : String(depths[selectedIndex]),
  )

  // data-selected-group: "true" on just the ancestor GROUPS on the path to the
  // selection (Components, Components/Button) — these render as selected, whereas a mere
  // before-selected sibling (Button) does not. Storybook owns data-selected on the
  // active leaf; overloading it here would fight its state and loop the observer,
  // so the path folders carry their own attribute. Ancestry is a prefix test, not a
  // parent walk: story ids are hierarchical (components-button-as--docs sits under
  // components-button under components), so a group is an ancestor when the
  // selection's id continues its own. That holds whether or not the group is open,
  // which a walk over rendered rows cannot do — a collapsed Scenarios still knows
  // the open story is inside it. The flagged depth-0 row is the section that bounds
  // data-before-selected below.
  let section = null
  items.forEach((item, i) => {
    const id = item.getAttribute("data-item-id")
    const isAncestor =
      !!selectedId &&
      !!id &&
      item.getAttribute("data-nodetype") === "group" &&
      selectedId.startsWith(`${id}-`)
    item.setAttribute("data-selected-group", String(isAncestor))
    if (isAncestor && depths[i] === 0) section = item
  })

  // data-before-selected: "true" only on the rows INSIDE the selection's own
  // top-level section that render above it — i.e. strictly between that
  // data-path-depth="0" data-selected-group row and the selected row. The sidebar
  // is a flat, depth-first list of only the expanded rows, so that span is just an
  // index range; no tree walk needed. Within it everything qualifies: the deeper
  // ancestor groups, the earlier siblings at every level, and the expanded contents
  // of those earlier siblings. Everything outside the section is false — earlier
  // sections and their open rows included — as is the section row itself, which
  // carries data-selected-group instead. A depth-0 selection has no containing
  // section, so nothing is flagged; nor is anything with no selection at all.
  const sectionIndex = section ? items.indexOf(section) : -1
  items.forEach((item, i) => {
    item.setAttribute(
      "data-before-selected",
      String(sectionIndex !== -1 && i > sectionIndex && i < selectedIndex),
    )
  })

  // data-selected-group-item: "true" on every row inside the selection's immediate
  // group, above it and below it alike — the selection's peers. Selecting
  // Components/Icon/color flags Docs, animation and animationDuration as well as
  // name through vendor, then stops at Image where Icon's run ends. The list is
  // depth-first, so the group's run is contiguous: it opens after the group row and
  // closes at the first following row no deeper than the group itself. Nodetype is
  // never consulted, so a sibling that is a group folder qualifies too, along with
  // its expanded contents. The group row and the selected row are both excluded —
  // they carry data-selected-group and data-selected. Nothing is flagged when there
  // is no selection, or the selection is a top-level section with no group.
  const groupEl = selectedGroupId === null ? undefined : byId.get(selectedGroupId)
  const groupIndex = groupEl ? items.indexOf(groupEl) : -1
  let groupEnd = -1
  if (groupIndex !== -1) {
    const groupDepth = depths[groupIndex]
    groupEnd = items.length
    for (let j = selectedIndex + 1; j < items.length; j++) {
      if (depths[j] <= groupDepth) {
        groupEnd = j
        break
      }
    }
  }
  items.forEach((item, i) => {
    item.setAttribute(
      "data-selected-group-item",
      String(groupIndex !== -1 && i > groupIndex && i < groupEnd && i !== selectedIndex),
    )
  })
}
new MutationObserver(tagSidebarPaths).observe(document.body, {
  childList: true,
  subtree: true,
  // Selection changes flip data-selected without adding/removing nodes, so watch
  // that attribute too — otherwise data-before-selected wouldn't update on navigate.
  // aria-expanded is watched for the same reason: collapsing a folder normally
  // removes its rows (a childList change), but this keeps data-branch-end — which
  // reads that flag — correct even when it moves on its own.
  attributes: true,
  attributeFilter: ["data-selected", "aria-expanded"],
})
tagSidebarPaths()

// Mirror storybook-dark-mode into the manager's <html data-theme="night|day"> so
// nice-styles' [data-theme] cascade themes the manager chrome (sidebar/toolbar) —
// the manager-side equivalent of the bridge preview.tsx runs for the canvas.
// nice-styles keys theming on [data-theme], not the addon's body.light/.dark, so
// without this the sidebar's nice tokens never flip on toggle. Seed from the OS
// preference, then follow the toggle over the channel.
const syncTheme = (isDark) => applyTheme(isDark ? "night" : "day")
syncTheme(prefersDark)

addons.register("nice/theme-sync", () => {
  addons.getChannel().on(DARK_MODE_EVENT_NAME, syncTheme)
})

// Unbind the sidebar search shortcut. Hiding the field in manager-sidebar.css is
// not enough on its own: cmd/ctrl-K leaves fullscreen and force-shows the sidebar
// before it focuses the input, so those side effects would still fire against a
// hidden target. An empty key list never matches an event, which is how Storybook
// itself represents "no shortcut". It persists to localStorage, and this reapplies
// it on every load.
addons.register("nice/disable-search", (api) => {
  api.setShortcut("search", [])
})

// Bridge the preview-side StoryNavigation's sidebar toggle to the manager. The navigation bar
// runs in the preview iframe and can't touch the manager-owned sidebar directly,
// so it drives it over the addons channel.
addons.register("nice/story-navigation", (api) => {
  const channel = addons.getChannel()
  const emitState = () => channel.emit(NAV_STATE_EVENT, api.getIsNavShown())

  channel.on(TOGGLE_NAV_EVENT, () => {
    // Emit the intended next state (getIsNavShown may not reflect the toggle
    // synchronously), so the navigation bar's icon flips deterministically.
    const next = !api.getIsNavShown()
    api.toggleNav()
    channel.emit(NAV_STATE_EVENT, next)
  })
  channel.on(REQUEST_NAV_STATE_EVENT, emitState)

  // Open the current story/docs source in the local editor. Only the manager
  // knows the file (importPath); the dev server does the actual opening, so this
  // is a no-op in a static (built) Storybook.
  channel.on(OPEN_IN_EDITOR_EVENT, () => {
    const file = api.getCurrentStoryData()?.importPath
    if (file) api.openInEditor({ file })
  })

  // Settings menu — map each preview-side action to the manager api. Mirrors
  // Storybook's built-in gear menu (minus the sidebar toggle, which the bar owns).
  const ACTIONS = {
    "about": () => api.changeSettingsTab("about"),
    "shortcuts": () => api.changeSettingsTab("shortcuts"),
    "toggle-toolbar": () => api.toggleToolbar(),
    "toggle-panel": () => api.togglePanel(),
    "prev-component": () => api.jumpToComponent(-1),
    "next-component": () => api.jumpToComponent(1),
    "prev-story": () => api.jumpToStory(-1),
    "next-story": () => api.jumpToStory(1),
    "collapse-all": () => api.collapseAll(),
  }
  channel.on(NAV_ACTION_EVENT, (action) => ACTIONS[action]?.())
})
