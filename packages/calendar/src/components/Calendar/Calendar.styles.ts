import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"
import type { SizeType } from "@niceprototypes/styles"

/**
 * Root: header (navigation + heading) above the grid, separated by the
 * calendar gap.
 */
export const StyledCalendar = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: ${getToken("calendar.gap:base")};
  color: ${getToken("calendar.color:base")};
  background-color: ${getToken("calendar.backgroundColor:base")};
`

/**
 * Header row: previous button, month/year heading, next button. Flex on the
 * inline axis, so the order mirrors under RTL.
 */
export const StyledCalendarHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${getToken("calendar.gap:base")};
`

/**
 * Month/year heading (the `aria-live="polite"` label of the grid).
 */
export const StyledCalendarHeading = styled.div`
  flex: 1 1 auto;
  text-align: center;
  font-weight: ${getToken("fontWeight", "semibold")};
`

/**
 * The grid table. Fixed layout with the calendar gap between cells.
 */
export const StyledCalendarGrid = styled.table`
  border-collapse: separate;
  border-spacing: ${getToken("calendar.gap:base")};
  margin: 0;
`

/**
 * Weekday column header (short name; full name in `abbr`).
 */
export const StyledCalendarColumnHeader = styled.th`
  padding: 0;
  font-weight: ${getToken("fontWeight", "base")};
  color: ${getToken("calendar.color:base")};
  text-align: center;
`

/**
 * Grid cell. Holds a day button, or nothing for days outside the month.
 */
export const StyledCalendarCell = styled.td<{ $size: SizeType }>`
  padding: 0;
  width: ${({ $size }) => getToken(`calendar.cell.size:${$size}`)};
  height: ${({ $size }) => getToken(`calendar.cell.size:${$size}`)};
  text-align: center;
`

/**
 * Native day button. States map onto calendar.* colour tokens: today gets the
 * today colour and border, selected the selected fill, disabled the disabled
 * colour. The keyboard focus ring uses the today colour (the link colour, as
 * Button's ring does).
 */
export const StyledCalendarDay = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $size: SizeType
  $today: boolean
  $selected: boolean
  $disabled: boolean
}>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: ${({ $size }) => getToken(`calendar.cell.size:${$size}`)};
  height: ${({ $size }) => getToken(`calendar.cell.size:${$size}`)};
  font: inherit;
  line-height: 1;
  border-style: solid;
  border-width: ${getToken("borderWidth", "base")};
  border-radius: ${getToken("borderRadius", "base")};
  outline: none;
  -webkit-tap-highlight-color: transparent;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-color: ${({ $today }) => ($today ? getToken("calendar.borderColor:today") : "transparent")};
  background-color: ${({ $selected }) =>
    getToken(`calendar.backgroundColor:${$selected ? "selected" : "base"}`)};
  color: ${({ $today, $selected, $disabled }) =>
    getToken(`calendar.color:${$disabled ? "disabled" : $selected ? "selected" : $today ? "today" : "base"}`)};

  &:focus-visible {
    outline: ${getToken("borderWidth", "large")} solid ${getToken("calendar.color:today")};
    outline-offset: ${getToken("borderWidth", "base")};
  }
`
