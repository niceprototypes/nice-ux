import styled from "styled-components"
import { getToken } from "nice-react-styles"
import type { TabsGapType, TabsJustifyContentType, TabsSizeType, TabsVariantType } from "./Tabs.types"

/** Gap between tabs and between the tab list and `end`: the `gap` prop, else the size's token. */
const gapFor = ({ $size, $gap }: { $size: TabsSizeType; $gap?: TabsGapType }) =>
  $gap ? getToken("gap", $gap) : getToken(`tabs.gap:${$size}`)

/**
 * The tab row: the tab list, then the `end` content. `justifyContent` places both along the
 * row. The underline variant draws the row's bottom border.
 */
export const StyledRow = styled.div<{
  $size: TabsSizeType
  $gap?: TabsGapType
  $justifyContent?: TabsJustifyContentType
  $variant: TabsVariantType
}>`
  display: flex;
  align-items: center;
  gap: ${gapFor};
  ${({ $justifyContent }) => $justifyContent && `justify-content: ${$justifyContent};`}
  ${({ $variant }) =>
    $variant === "underline" &&
    `border-bottom: ${getToken("tabs.borderWidth:base")} solid ${getToken("tabs.borderColor:base")};`}
`

export const StyledTabList = styled.div<{ $size: TabsSizeType; $gap?: TabsGapType }>`
  display: flex;
  align-items: stretch;
  gap: ${gapFor};
`

/**
 * One tab. Not a <button>: its label may hold an interactive node (an input), which a
 * button may not contain.
 */
export const StyledTab = styled.div<{
  $size: TabsSizeType
  $selected: boolean
  $disabled: boolean
  $variant: TabsVariantType
}>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ $size }) => getToken(`tabs.padding:${$size}`)};
  font-size: ${({ $size }) => getToken(`tabs.fontSize:${$size}`)};
  color: ${({ $selected }) => getToken(`tabs.color:${$selected ? "selected" : "base"}`)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? getToken("tabs.disabledOpacity:base") : 1)};
  outline: none;

  /* Underline: the selected indicator over the row's bottom border. */
  ${({ $variant, $selected }) =>
    $variant === "underline" &&
    $selected &&
    `
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(-1 * ${getToken("tabs.borderWidth:base")});
      height: ${getToken("tabs.indicator.width:base")};
      background-color: ${getToken("tabs.indicator.color:base")};
    }
  `}

  /* Pill: a rounded border, transparent at rest, colored on hover and when selected. */
  ${({ $variant, $selected, $disabled }) =>
    $variant === "pill" &&
    `
    border: ${getToken("tabs.pill.borderWidth:base")} solid
      ${getToken(`tabs.pill.borderColor:${$selected ? "selected" : "base"}`)};
    border-radius: ${getToken("tabs.pill.borderRadius:base")};
    ${
      !$selected && !$disabled
        ? `
    &:hover {
      border-color: ${getToken("tabs.pill.borderColor:hover")};
    }
    `
        : ""
    }
  `}

  &:focus-visible {
    outline: ${getToken("tabs.focusRing.width:base")} solid ${getToken("tabs.focusRing.color:base")};
    outline-offset: ${getToken("tabs.focusRing.offset:base")};
  }
`
