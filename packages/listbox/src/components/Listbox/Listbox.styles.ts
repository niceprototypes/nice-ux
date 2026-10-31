import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

/**
 * The listbox root: a column of options inset by `gap:smaller`, so each
 * option's rounded highlight clears the surface edge. A keyboard-focused
 * Listbox shows the focus-ring outline.
 */
export const StyledListbox = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: ${getToken("gap", "smaller")};
  color: ${getToken("color", "base")};

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: ${getToken("listbox.focusRing.width")} solid ${getToken("listbox.focusRing.color")};
  }
`

interface StyledListboxOptionProps {
  $active: boolean
  $selected: boolean
  $disabled: boolean
}

const getBackgroundColor = ({ $active, $selected }: StyledListboxOptionProps) => {
  if ($active && $selected) return getToken("listbox.selected.backgroundColor:active")
  if ($active) return getToken("listbox.backgroundColor:active")
  if ($selected) return getToken("listbox.selected.backgroundColor")
  return "transparent"
}

const getColor = ({ $disabled, $selected }: StyledListboxOptionProps) => {
  if ($disabled) return getToken("color", "disabled")
  if ($selected) return getToken("listbox.selected.color")
  return "inherit"
}

/**
 * One option row: start slot, label, end slot. Active (keyboard or pointer)
 * and selected are background states; selected and disabled also set the
 * text colour, which the Ink label inherits.
 */
export const StyledListboxOption = styled.li<StyledListboxOptionProps>`
  display: flex;
  align-items: center;
  gap: ${getToken("gap", "small")};
  margin: 0;
  padding-block: ${getToken("gap", "small")};
  padding-inline: ${getToken("gap", "base")};
  border-radius: ${getToken("borderRadius", "small")};
  background-color: ${getBackgroundColor};
  color: ${getColor};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  user-select: none;
`

/** Start / end slot; keeps its intrinsic size. */
export const StyledListboxOptionSlot = styled.span`
  display: flex;
  flex: none;
  align-items: center;
`

/** Label; takes the remaining inline space and may shrink. */
export const StyledListboxOptionLabel = styled.span`
  flex: 1 1 auto;
  min-inline-size: 0;
`

/** An option group: its title over its options. */
export const StyledListboxGroup = styled.li`
  margin: 0;
`

/** A group's title, inset like an option; keyboard travel never lands on it. */
export const StyledListboxGroupTitle = styled.div`
  padding-block: ${getToken("gap", "small")};
  padding-inline: ${getToken("gap", "base")};
  color: ${getToken("listbox.groupTitle.color")};
  user-select: none;
`

/** A group's options, a column like the root's. */
export const StyledListboxGroupOptions = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`
