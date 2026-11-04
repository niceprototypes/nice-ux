import styled, { createGlobalStyle, css } from "styled-components"
import { getToken, type FontSizeType } from "@niceprototypes/styles"
import { Scroll } from "@niceprototypes/scroll"

/** The page has no margin: the shell (or, in the bare view, the scene region) fills the viewport. */
export const AppGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

/**
 * The shell: the nav beside the scene region, the viewport's full height, on the theme background.
 * With `$drawer` (below tablet) a grid instead: the header row over one cell, which the scene region
 * fills and the open drawer covers.
 */
export const StyledApp = styled.div<{ $drawer: boolean }>`
  display: ${({ $drawer }) => ($drawer ? "grid" : "flex")};
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
  height: 100dvh;
  background-color: ${getToken("backgroundColor")};
  color: ${getToken("color")};
`

/**
 * The sidebar: the header row over the nav and the scene sidebar side by side, over the footer, the
 * viewport's full height, at least `app.sidebar.minWidth` wide. With `$drawer` (below tablet) it
 * generates no box: the header row and the drawer are the shell grid's own items.
 */
export const StyledAppAside = styled.div<{ $drawer: boolean }>`
  flex: none;
  min-width: ${getToken("app.sidebar.minWidth")};
  display: ${({ $drawer }) => ($drawer ? "contents" : "flex")};
  flex-direction: column;
  min-height: 0;
`

/**
 * The sidebar's header row, above the nav and the scene sidebar, with the nav's padding: the logo
 * (`app.logo.height` tall), then the search and below tablet the menu button at its end, all
 * vertically centred, the large gap apart. Its own bottom padding (the base gap) sets it apart:
 * padding inside the scrolling columns would scroll away, and the rows would slide up against the header.
 */
export const StyledAppHeader = styled.div`
  flex: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${getToken("gap:large")};
  ${getToken("logo.height", { as: "key" })}: ${getToken("app.logo.height")};
  padding: ${getToken("gap:large")};
  padding-block-end: ${getToken("gap")};
`

/**
 * The header row's icon buttons (the search square, the docs link): their icon is
 * `app.header.icon.color`, its hover variant on hover and focus, and their focus ring
 * `app.header.focusRing.color`.
 */
const headerButtonTokens = css`
  ${getToken("button.icon.color", { as: "key" })}: ${getToken("app.header.icon.color")};
  ${getToken("button.icon.color:hover", { as: "key" })}: ${getToken("app.header.icon.color:hover")};
  ${getToken("button.icon.color:focus", { as: "key" })}: ${getToken("app.header.icon.color:hover")};
  ${getToken("button.focusRing.color", { as: "key" })}: ${getToken("app.header.focusRing.color")};
`

/**
 * The search in the header row (`search`), at the row's end: collapsed, a square the small field's
 * height (the search button); `$expanded`, the field, filling the width right of the logo, its width
 * animating between the two. The anchor the results open under. Its text is the nav labels' size
 * (`$size`): it sets that font size and points the field's at `app.search.fontSize`, that size from
 * tablet up and at least 16px below (under 16px iOS zooms in on focus). The button takes the header
 * buttons' tokens; the field's focus border stays `app.search.focusColor` (the border color), and its
 * fill is `app.search.backgroundColor` (pure black at night, pure white by day).
 */
export const StyledAppSearch = styled.div<{ $size: FontSizeType; $expanded: boolean }>`
  flex: 0 1 auto;
  display: flex;
  min-width: 0;
  width: ${({ $expanded }) => ($expanded ? "100%" : getToken("input.size:small"))};
  margin-inline-start: auto;
  transition: width ${getToken("animationDuration")} ${getToken("animationEasing")};
  font-size: ${({ $size }) => getToken("fontSize", $size)};
  ${getToken("input.fontSize", { as: "key" })}: ${getToken("app.search.fontSize")};
  ${getToken("input.focusRing.color", { as: "key" })}: ${getToken("app.search.focusColor")};
  ${getToken("input.backgroundColor:raised", { as: "key" })}: ${getToken("app.search.backgroundColor")};
  ${headerButtonTokens}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/**
 * The docs link in the header row (`docsLink`), after the search: an icon button in the header
 * buttons' tokens. Without a search before it, it takes the row's free space on its start side.
 */
export const StyledAppDocsLink = styled.div`
  flex: none;
  display: flex;
  margin-inline-start: auto;
  ${headerButtonTokens}

  ${StyledAppSearch} + & {
    margin-inline-start: 0;
  }
`

/**
 * The nav and the scene sidebar over the footer. Tablet and up it generates no box. With `$drawer`
 * (below tablet) it is the drawer: shown only while `$open`, over the scene region in the shell
 * grid's second row, on the theme background. Wider than the viewport (the nav beside a scene
 * sidebar), it scrolls sideways, not the page.
 */
export const StyledAppDrawer = styled.div<{ $drawer: boolean; $open: boolean }>`
  display: ${({ $drawer, $open }) => (!$drawer ? "contents" : $open ? "flex" : "none")};
  flex-direction: column;
  grid-row: 2;
  grid-column: 1;
  min-height: 0;
  overflow-x: auto;
  z-index: ${getToken("zIndex", "medium")};
  background-color: ${getToken("backgroundColor")};
`

/** The nav and the scene sidebar, side by side in the height the footer leaves; under the header row, which spaces them, they have no top padding. */
export const StyledAppColumns = styled.div`
  flex: 1 1 auto;
  display: flex;
  min-height: 0;

  ${StyledAppHeader} + ${StyledAppDrawer} > & > * {
    padding-block-start: 0;
  }
`

/** The nav column: as wide as its rows, scrolling on its own. */
export const StyledAppNav = styled(Scroll)`
  flex: none;
  padding: ${getToken("gap:large")};
  padding-inline-end: calc(2 * ${getToken("gap:large")});
`

/**
 * The scene sidebar, right of the nav: as wide as what a scene portals into it, scrolling on its own,
 * one nav padding from the nav. Empty (docs pages, scenes without one), it takes no space.
 */
export const StyledAppSidebar = styled(Scroll)`
  flex: none;
  padding: ${getToken("gap:large")} ${getToken("gap:large")} ${getToken("gap:large")} 0;

  &:empty {
    display: none;
  }
`

/** The footer's content: the element a scene portals into, with the footer's padding. */
export const StyledAppFooterContent = styled.div`
  padding: ${getToken("app.footer.padding")};
  padding-block-start: 0;
`

/**
 * The sidebar's footer, the width of the nav and the scene sidebar, under a rule. Empty (docs pages,
 * scenes without settings), it takes no space.
 */
export const StyledAppFooter = styled.div`
  flex: none;
  border-block-start: ${getToken("app.footer.rule.width")} solid ${getToken("app.footer.rule.color")};

  &:has(${StyledAppFooterContent}:empty) {
    display: none;
  }
`

/** The footer's drag handle: a pill centred at its top, inside a hit area of the handle's padding. */
export const StyledAppHandle = styled.div`
  display: flex;
  justify-content: center;
  padding-block: ${getToken("app.handle.padding")} ${getToken("app.handle.paddingBottom")};
  cursor: row-resize;
  touch-action: none;

  &::before {
    content: "";
    width: ${getToken("app.handle.width")};
    height: ${getToken("app.handle.height")};
    border-radius: ${getToken("app.handle.height")};
    background-color: ${getToken("app.handle.color")};
  }
`

/**
 * The footer's resizable body: the dragged height, under the handle (which stays put). Shorter than
 * its content, it scrolls vertically; fully open, it is as tall as its content and shows no scrollbar.
 */
export const StyledAppFooterBody = styled(Scroll)`
  overflow-x: hidden;
`

/**
 * The scene region: the rest of the width (the whole viewport in the bare view), on the theme
 * background, focusable so a scene's keys act only while focus is inside it. It is a container,
 * not a control: no focus ring.
 */
export const StyledAppRegion = styled(Scroll).attrs({ axis: "both" })<{ $drawer: boolean }>`
  position: relative;
  background-color: ${getToken("backgroundColor")};
  flex: 1 1 auto;
  grid-row: 2;
  grid-column: 1;
  min-width: 0;
  min-height: ${({ $drawer }) => ($drawer ? "0" : "100dvh")};
  outline: none;
`

/** A markdown or docs section page: its content with the region's padding. */
export const StyledAppDocs = styled.div`
  padding: ${getToken("gap:large")};
`
