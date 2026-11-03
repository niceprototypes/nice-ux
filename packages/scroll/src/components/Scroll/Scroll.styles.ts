import styled, { css } from "styled-components"
import { getToken } from "@niceprototypes/styles"
import type { ScrollAxisType } from "./Scroll.types"

/** The overflow property each axis sets. */
const overflowProperty: Record<ScrollAxisType, string> = {
  x: "overflow-x",
  y: "overflow-y",
  both: "overflow",
}

/** `scrollbar-width` per `showScrollbar`: unset reads the project default. */
const scrollbarWidth = (showScrollbar: boolean | undefined): string =>
  showScrollbar === undefined
    ? getToken("scroll.scrollbarWidth")
    : getToken(`scroll.scrollbarWidth:${showScrollbar ? "shown" : "hidden"}`)

/**
 * The scroll container. `scrollbar-width` hides or shows the scrollbar; browsers without it
 * (WebKit before Safari 18.2, Chromium before 121) hide it through `::-webkit-scrollbar`
 * unless `showScrollbar` is set, since they cannot read the token.
 */
export const StyledScroll = styled.div<{ $axis: ScrollAxisType; $showScrollbar?: boolean }>`
  ${({ $axis }) => overflowProperty[$axis]}: auto;
  scrollbar-width: ${({ $showScrollbar }) => scrollbarWidth($showScrollbar)};

  ${({ $showScrollbar }) =>
    !$showScrollbar &&
    css`
      @supports not (scrollbar-width: none) {
        &::-webkit-scrollbar {
          display: none;
        }
      }
    `}
`
