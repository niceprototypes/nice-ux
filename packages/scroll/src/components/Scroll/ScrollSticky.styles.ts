import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

/** The bar: fixed to the viewport, or sticky to the top of an element root; slides up while hidden. */
export const StyledScrollSticky = styled.div<{ $top: number; $isHidden: boolean; $contained: boolean }>`
  position: ${({ $contained }) => ($contained ? "sticky" : "fixed")};
  top: ${({ $top }) => $top}px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: ${getToken("scroll.sticky.zIndex")};
  transform: translateY(${({ $isHidden }) => ($isHidden ? "-100%" : "0")});
  transition: transform ${getToken("scroll.sticky.animationDuration")} ${getToken("scroll.sticky.animationEasing")};
  will-change: transform;
`

/** Holds the bar's place in the flow and marks where it starts sticking. */
export const StyledScrollStickySpacer = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  width: 100%;
`
