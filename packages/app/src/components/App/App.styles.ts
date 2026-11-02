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
