import styled from "styled-components"
import { getToken, type SizeType } from "@niceprototypes/styles"

interface StyledListItemProps {
  $size: SizeType
  $selected: boolean
  $active: boolean
  $disabled: boolean
}

/**
 * The item row: start slot, content, end slot in a flex row separated by
 * `list.gap`. Padding comes from `list.padding.block` / `list.padding.inline`
 * at the List's size. Background: active wins over selected (so the
 * keyboard highlight stays visible on a selected item); colour: disabled
 * wins over selected; otherwise both inherit from the List.
 */
export const StyledListItem = styled.li<StyledListItemProps>`
  display: flex;
  align-items: center;
  gap: ${getToken("list.gap:base")};
  margin: 0;
  padding-block: ${({ $size }) => getToken(`list.padding.block:${$size}`)};
  padding-inline: ${({ $size }) => getToken(`list.padding.inline:${$size}`)};
  background-color: ${({ $active, $selected }) =>
    $active
      ? getToken("list.backgroundColor:active")
      : $selected
        ? getToken("list.backgroundColor:selected")
        : "transparent"};
  color: ${({ $disabled, $selected }) =>
    $disabled ? getToken("list.color:disabled") : $selected ? getToken("list.color:selected") : "inherit"};
`

/** Start slot; keeps its intrinsic size. */
export const StyledListItemStart = styled.span`
  display: flex;
  flex: none;
  align-items: center;
`

/** Main content; takes the remaining inline space and may shrink. */
export const StyledListItemContent = styled.span`
  flex: 1 1 auto;
  min-inline-size: 0;
`

/** End slot; keeps its intrinsic size. */
export const StyledListItemEnd = styled.span`
  display: flex;
  flex: none;
  align-items: center;
`
