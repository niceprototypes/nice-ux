import styled, { css } from "styled-components"
import { getToken, type FontSizeType } from "@niceprototypes/styles"

/* Geometry. A folder's icon sits at the start of its row; its sub-rows' guide hangs
   from the icon's centre line, runs an arm towards each sub-row and stops `iconGap`
   short of the sub-row's icon or label. `column` is one level's indent. */
const icon = getToken("tree.icon.size")
const iconGap = "0.5em"
const arm = getToken("tree.guide.arm")
const stroke = getToken("tree.guide.width")
const column = `calc(${icon} / 2 + ${arm} + ${iconGap})`
const axis = `calc(${icon} / 2 - ${stroke} / 2)`

const guideColor = getToken("tree.guide.color")
const activeColor = getToken("tree.activeColor")

/* Guide pieces, as background layers in a given colour. */
const fullLine = (color: string) => `linear-gradient(${color}, ${color}) ${axis} 0 / ${stroke} 100% no-repeat`
const upperLine = (color: string) =>
  `linear-gradient(${color}, ${color}) ${axis} 0 / ${stroke} calc(50% + ${stroke} / 2) no-repeat`
const armLine = (color: string) =>
  `linear-gradient(${color}, ${color}) ${axis} 50% / calc(${arm} + ${stroke} / 2) ${stroke} no-repeat`

/** A guide drawn in the indent column to the left of its element: neutral pieces on
    `::before`, the active path's on `::after`, painted over them as the sidebar does. */
const guide = (layer: "before" | "after", background: string) => css`
  &::${layer} {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline-start: calc(-1 * ${column});
    width: ${column};
    background: ${background};
    pointer-events: none;
  }
`

/**
 * The `<nav>` root. Its font size is the label size, so the `em` gap and indent
 * match the labels.
 */
export const StyledTree = styled.nav<{ $size: FontSizeType }>`
  font-size: ${({ $size }) => getToken("fontSize", $size)};
`

/** One level's rows. A nested level is indented one column. */
export const StyledTreeList = styled.ul<{ $nested: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-inline-start: ${({ $nested }) => ($nested ? column : 0)};
`

/**
 * One node: its row and its open sub-rows. A nested node followed by a sibling
 * carries the guide's vertical line down its full height, overlaid in the active
 * colour when the path to the active node passes it.
 */
export const StyledTreeNode = styled.li<{ $nested: boolean; $last: boolean; $passed: boolean }>`
  position: relative;
  margin: 0;
  ${({ $nested, $last }) => $nested && !$last && guide("before", fullLine(guideColor))}
  ${({ $nested, $passed }) => $nested && $passed && guide("after", fullLine(activeColor))}
`

const getRowColor = ({ $onPath, $receded }: { $onPath: boolean; $receded: boolean }) => {
  if ($onPath) return activeColor
  if ($receded) return getToken("tree.inactive.color")
  return getToken("tree.color:base")
}

/**
 * A row. A nested row draws its guide's arm, plus the upper half of the line when it
 * is the last sibling; on the active path both are overlaid in the active colour.
 * Rows on the path take the active colour and weight; with an active node, rows off
 * the path recede until hovered.
 */
export const StyledTreeRow = styled.div<{ $nested: boolean; $last: boolean; $onPath: boolean; $receded: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${iconGap};
  color: ${getRowColor};
  font-weight: ${({ $onPath }) => getToken(`tree.fontWeight:${$onPath ? "active" : "base"}`)};
  ${getToken("icon.color", { as: "key" })}: currentColor;

  ${({ $receded }) =>
    $receded &&
    css`
      &:hover {
        color: ${getToken("tree.color:base")};
      }
    `}

  ${({ $nested, $last }) =>
    $nested && guide("before", $last ? `${armLine(guideColor)}, ${upperLine(guideColor)}` : armLine(guideColor))}
  ${({ $nested, $onPath }) => $nested && $onPath && guide("after", `${armLine(activeColor)}, ${upperLine(activeColor)}`)}
`

/** The row's link, folder button or plain label: icon then label. */
export const StyledTreeTarget = styled.span`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: ${iconGap};
  min-width: 0;
  min-height: ${getToken("tree.row.minHeight")};
  margin: 0;
  padding: ${getToken("tree.row.paddingBlock")} 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: start;
  text-decoration: none;

  &:is(a, button) {
    cursor: pointer;
  }
`

/** Icon slot; keeps its intrinsic size. */
export const StyledTreeIcon = styled.span`
  display: flex;
  flex: none;
`
