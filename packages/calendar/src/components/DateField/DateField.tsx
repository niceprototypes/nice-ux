import * as React from "react"
import Icon from "nice-react-icon"
import Input from "nice-react-input"
import Popover from "nice-react-popover"
import { useLocale } from "nice-react-styles"
import { StyledDateFieldTrigger } from "./DateField.styles"
import type { DateFieldProps } from "./DateField.types"
import type { CalendarDateType } from "../Calendar/Calendar.types"
import { Calendar } from "../Calendar"
import { isoToUtcDate } from "../../utilities/isoToUtcDate"
import { parseIsoDate } from "../../utilities/parseIsoDate"

const TRIGGER_LABEL = "Choose date"

/**
 * DateField
 *
 * Picker-only date field (v1): nice-react-input rendered read-only, showing the
 * value formatted with `Intl.DateTimeFormat(locale, { dateStyle: "medium" })`,
 * with a calendar button in Input's `end` slot that opens a Popover (anchored
 * to the Input control) containing a Calendar. The public value is an ISO
 * `YYYY-MM-DD` string; a hidden `<input name={name}>` carries it for native
 * FormData — the visible input has no name.
 *
 * On open, focus moves to the calendar's tabbable day. Selecting a date sets
 * the value and closes the popover; Escape or an outside pointerdown closes it.
 * Focus returns to the Input control (Popover's behaviour). Label, description
 * and error wiring inside a nice-react-field `Field` come from Input.
 *
 * @example
 * ```tsx
 * <Field label="Start date">
 *   <DateField name="start" value={start} onChange={setStart} min="2026-01-01" />
 * </Field>
 * ```
 */
const DateField: React.FC<DateFieldProps> = ({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  isDateDisabled,
  locale: localeProp,
  name,
  ref,
  size = "base",
  status = "base",
  theme,
  ...inputProps
}) => {
  const { locale: contextLocale } = useLocale()
  const locale = localeProp ?? contextLocale
  const popoverId = React.useId()
  const disabled = status === "disabled"

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<CalendarDateType | null>(defaultValue)
  const currentRaw = isControlled ? value : internalValue
  const iso = parseIsoDate(currentRaw) ? (currentRaw as CalendarDateType) : null

  const [open, setOpen] = React.useState(false)
  const controlRef = React.useRef<HTMLInputElement | null>(null)
  const popoverRef = React.useRef<HTMLDivElement | null>(null)
  // Open state at the trigger's pointerdown. Popover dismisses on any
  // pointerdown outside itself and its anchor (the Input control), which
  // includes this trigger — so by click time an open popover has already been
  // asked to close, and the click must not reopen it.
  const openAtPointerDown = React.useRef<boolean | null>(null)

  // Forward the native input to both the anchor ref and the consumer's ref.
  const setControlNode = React.useCallback(
    (node: HTMLInputElement | null) => {
      controlRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const displayFormat = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC", calendar: "gregory" }),
    [locale]
  )
  const display = iso ? displayFormat.format(isoToUtcDate(iso)) : ""

  // Move focus into the calendar once the popover is positioned (it renders
  // hidden until Popover's layout effect measures it).
  React.useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => {
      popoverRef.current?.querySelector<HTMLButtonElement>('[role="grid"] button[tabindex="0"]')?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  const select = (date: CalendarDateType) => {
    if (!isControlled) setInternalValue(date)
    onChange?.(date)
    setOpen(false)
  }

  const trigger = (
    <>
      <StyledDateFieldTrigger
        type="button"
        aria-label={TRIGGER_LABEL}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        disabled={disabled}
        onPointerDown={() => {
          openAtPointerDown.current = open
        }}
        onClick={() => {
          const wasOpen = openAtPointerDown.current ?? open
          openAtPointerDown.current = null
          setOpen(!wasOpen)
        }}
      >
        <Icon name="calendar" />
      </StyledDateFieldTrigger>
      <input type="hidden" name={name} value={iso ?? ""} />
    </>
  )

  return (
    <>
      <Input
        {...inputProps}
        as="input"
        type="text"
        ref={setControlNode}
        value={display}
        readOnly
        size={size}
        status={status}
        theme={theme}
        end={trigger}
      />
      <Popover
        open={open && !disabled}
        onOpenChange={setOpen}
        anchorRef={controlRef}
        id={popoverId}
        ref={popoverRef}
        aria-label={TRIGGER_LABEL}
        theme={theme}
      >
        <Calendar
          value={iso}
          onChange={select}
          min={min}
          max={max}
          isDateDisabled={isDateDisabled}
          locale={locale}
          size={size}
        />
      </Popover>
    </>
  )
}

export default DateField
