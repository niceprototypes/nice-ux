import styled, { createGlobalStyle } from "styled-components"
import { getToken } from "@niceprototypes/styles"

/** The page has no margin: the shell (or, in the bare view, the scene region) fills the viewport. */
export const AppGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

/** The shell: the nav beside the scene region, the viewport's full height, on the theme background. */
export const StyledApp = styled.div`
  display: flex;
  height: 100dvh;
  background-color: ${getToken("backgroundColor")};
  color: ${getToken("color")};
`

/** The sidebar: the nav and the scene sidebar side by side over the footer, the viewport's full height. */
export const StyledAppAside = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  min-height: 0;
`

/** The nav and the scene sidebar, side by side in the height the footer leaves. */
export const StyledAppColumns = styled.div`
  flex: 1 1 auto;
  display: flex;
  min-height: 0;
`

/** The nav column: as wide as its rows, scrolling on its own. */
export const StyledAppNav = styled.div`
  flex: none;
  overflow-y: auto;
  padding: ${getToken("gap:large")};
`

/**
 * The scene sidebar, right of the nav: as wide as what a scene portals into it, scrolling on its own,
 * one nav padding from the nav. Empty (docs pages, scenes without one), it takes no space.
 */
export const StyledAppSidebar = styled.div`
  flex: none;
  overflow-y: auto;
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

/** The footer's resizable body: the dragged height, clipping the content below it. */
export const StyledAppFooterBody = styled.div`
  overflow: hidden;
`

/**
 * The scene region: the rest of the width (the whole viewport in the bare view), on the theme
 * background, focusable so a scene's keys act only while focus is inside it. It is a container,
 * not a control: no focus ring.
 */
export const StyledAppRegion = styled.div`
  position: relative;
  background-color: ${getToken("backgroundColor")};
  flex: 1 1 auto;
  min-width: 0;
  min-height: 100dvh;
  overflow: auto;
  outline: none;
`

/** A docs page: the markdown's text with the region's padding. */
export const StyledAppDocs = styled.div`
  padding: ${getToken("gap:large")};
`
