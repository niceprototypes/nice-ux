import * as React from "react"
import Icon from "nice-react-icon"
import Input from "nice-react-input"
import { List, ListItem } from "nice-react-list"
import Popover from "nice-react-popover"
import { StyledChevron } from "./Select.styles"
import type { SelectCustomProps, SelectOnChangeEventType } from "./Select.types"
import { getEdgeIndex } from "../../utilities/getEdgeIndex"
import { getNextIndex } from "../../utilities/getNextIndex"
import { getOptionText } from "../../utilities/getOptionText"
import { getTypeaheadIndex } from "../../utilities/getTypeaheadIndex"
import { optionsFromChildren } from "../../utilities/optionsFromChildren"

/** Typeahead buffer lifetime after the last printable key, in ms. */
const TYPEAHEAD_TIMEOUT = 500

/** Options moved by PageUp / PageDown. */
const PAGE_SIZE = 10

/**
 * WAI-ARIA APG select-only combobox. The trigger is Input rendered read-only
 * with `role="combobox"`; a Popover anchored to the Input control holds a
 * `role="listbox"` List of `role="option"` ListItems. DOM focus stays on the
 * trigger throughout — the active option is conveyed by
 * `aria-activedescendant`. A hidden input carries the value for FormData.
 */
const SelectCustom: React.FC<SelectCustomProps> = ({
  "aria-label": ariaLabel,
  children,
  defaultValue,
  name,
  native: _native,
  onBlur,
  onChange,
  onKeyDown,
  options: optionsProp,
  placeholder,
  ref,
  size = "base",
  status,
  theme,
  value,
  ...rest
}) => {
  const baseId = React.useId()
  const listboxId = `${baseId}-listbox`
  const optionId = (index: number) => `${baseId}-option-${index}`
  const disabled = status === "disabled"

  // Children win over options when both are given (same as native)
  const options = React.useMemo(
    () => (children !== undefined && children !== null ? optionsFromChildren(children) : (optionsProp ?? [])),
    [children, optionsProp]
  )

  // Uncontrolled initial value mirrors a native <select>: "" with a
  // placeholder, otherwise the first enabled option.
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<string>(() => {
    if (defaultValue !== undefined) return defaultValue
    if (placeholder !== undefined) return ""
    const first = getEdgeIndex(options, "first")
    return first === -1 ? "" : options[first].value
  })
  const currentValue = isControlled ? value : internalValue
  const selectedIndex = options.findIndex(option => option.value === currentValue)

  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  // Ids of the <label>s associated with the control (a Field label, or any
  // <label for>), read on open to name the listbox.
  const [labelledBy, setLabelledBy] = React.useState<string | undefined>(undefined)
  const expanded = open && !disabled
  const active = expanded && activeIndex >= 0 && activeIndex < options.length ? activeIndex : -1

  const controlRef = React.useRef<HTMLInputElement | null>(null)
  const chevronRef = React.useRef<HTMLSpanElement | null>(null)
  const search = React.useRef("")
  const searchTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Forward the native input to both the anchor ref and the consumer's ref.
  const setControlNode = React.useCallback(
    (node: HTMLInputElement | null) => {
      controlRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const openAt = (index: number) => {
    if (disabled) return
    const labelIds = Array.from(controlRef.current?.labels ?? [])
      .map(label => label.id)
      .filter(Boolean)
      .join(" ")
    setLabelledBy(labelIds || undefined)
    setActiveIndex(index)
    setOpen(true)
  }

  // Opening without a target index activates the selected option, else the
  // first enabled one.
  const openAtCurrent = () => openAt(selectedIndex >= 0 ? selectedIndex : getEdgeIndex(options, "first"))

  const toggle = () => {
    if (expanded) setOpen(false)
    else openAtCurrent()
  }

  const commit = (index: number, event: SelectOnChangeEventType) => {
    const option = options[index]
    if (!option || option.disabled) return
    if (option.value !== currentValue) {
      if (!isControlled) setInternalValue(option.value)
      onChange?.(option.value, event)
    }
  }

  const typeahead = (key: string) => {
    clearTimeout(searchTimer.current)
    search.current += key.toLowerCase()
    searchTimer.current = setTimeout(() => {
      search.current = ""
    }, TYPEAHEAD_TIMEOUT)
    const from = expanded ? active : selectedIndex
    const match = getTypeaheadIndex(options, search.current, from)
    if (expanded) {
      if (match !== -1) setActiveIndex(match)
    } else {
      openAt(match !== -1 ? match : selectedIndex >= 0 ? selectedIndex : getEdgeIndex(options, "first"))
    }
  }

  React.useEffect(() => () => clearTimeout(searchTimer.current), [])

  // Clicking the read-only control toggles. Input exposes no click handler, so
  // the listener is attached to the native element; the latest toggle is read
  // through a ref so the listener subscribes once.
  const toggleRef = React.useRef(toggle)
  React.useEffect(() => {
    toggleRef.current = toggle
  })
  React.useEffect(() => {
    const node = controlRef.current
    if (!node) return
    const onClick = () => toggleRef.current()
    node.addEventListener("click", onClick)
    return () => node.removeEventListener("click", onClick)
  }, [])

  // Keep the active option in view inside the scrollable listbox.
  React.useEffect(() => {
    if (active < 0) return
    document.getElementById(optionId(active))?.scrollIntoView?.({ block: "nearest" })
    // optionId is derived from baseId, which is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, altKey, ctrlKey, metaKey } = event
    const printable = key.length === 1 && !ctrlKey && !metaKey && !altKey

    if (!expanded) {
      if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " ") {
        event.preventDefault()
        openAtCurrent()
      } else if (key === "Home" || key === "End") {
        event.preventDefault()
        openAt(getEdgeIndex(options, key === "Home" ? "first" : "last"))
      } else if (printable) {
        event.preventDefault()
        typeahead(key)
      }
      return
    }

    switch (key) {
      case "ArrowDown":
        event.preventDefault()
        setActiveIndex(getNextIndex(options, active, 1))
        return
      case "ArrowUp":
        event.preventDefault()
        if (altKey) {
          commit(active, event)
          setOpen(false)
        } else {
          setActiveIndex(getNextIndex(options, active, -1))
        }
        return
      case "Home":
      case "End":
        event.preventDefault()
        setActiveIndex(getEdgeIndex(options, key === "Home" ? "first" : "last"))
        return
      case "PageDown":
      case "PageUp":
        event.preventDefault()
        setActiveIndex(getNextIndex(options, active, key === "PageDown" ? PAGE_SIZE : -PAGE_SIZE))
        return
      case "Enter":
        event.preventDefault()
        commit(active, event)
        setOpen(false)
        return
      case " ":
        event.preventDefault()
        // A space inside a typeahead run ("new york") is part of the search
        if (search.current) {
          typeahead(key)
        } else {
          commit(active, event)
          setOpen(false)
        }
        return
      case "Escape":
        event.preventDefault()
        setOpen(false)
        return
      case "Tab":
        // Focus moves on as usual; the active option is kept (APG)
        commit(active, event)
        setOpen(false)
        return
      default:
        if (printable) {
          event.preventDefault()
          typeahead(key)
        }
    }
  }

  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined

  return (
    <>
      <Input
        {...rest}
        as="input"
        type="text"
        ref={setControlNode}
        readOnly
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={expanded}
        aria-controls={listboxId}
        aria-activedescendant={active >= 0 ? optionId(active) : undefined}
        value={selected ? getOptionText(selected) : ""}
        placeholder={placeholder}
        size={size}
        status={status}
        theme={theme}
        onKeyDown={event => {
          onKeyDown?.(event)
          if (!event.defaultPrevented) handleKeyDown(event as React.KeyboardEvent<HTMLInputElement>)
        }}
        onBlur={event => {
          onBlur?.(event)
          // Focus left the trigger without a selection (option and chevron
          // presses keep focus on the trigger): close without change.
          setOpen(false)
        }}
        end={
          <>
            <input
              type="hidden"
              name={name}
              value={currentValue}
            />
            <StyledChevron
              ref={chevronRef}
              $size={size}
              $native={false}
              aria-hidden="true"
              onMouseDown={event => {
                // Keep focus on the trigger (no blur-close), and focus it if
                // it was not focused yet.
                event.preventDefault()
                if (!disabled) controlRef.current?.focus()
              }}
              onClick={toggle}
            >
              <Icon
                name="carat-bottom"
                size="base"
                // Dimmed with the control's disabled text colour (color:disabled,
                // via the icon.color alias)
                color={disabled ? "disabled" : "base"}
              />
            </StyledChevron>
          </>
        }
      />
      <Popover
        open={expanded}
        onOpenChange={next => {
          if (!next) setOpen(false)
        }}
        anchorRef={controlRef}
        ignoreOutsideRefs={[chevronRef]}
        role="presentation"
        theme={theme}
      >
        <List
          role="listbox"
          id={listboxId}
          scrollable
          size={size}
          aria-labelledby={labelledBy}
          aria-label={labelledBy ? undefined : ariaLabel}
          // Option presses must not move focus off the trigger
          onMouseDown={event => event.preventDefault()}
        >
          {options.map((option, index) => (
            <ListItem
              key={`${index}-${option.value}`}
              id={optionId(index)}
              role="option"
              aria-selected={index === selectedIndex}
              selected={index === selectedIndex}
              active={index === active}
              disabled={option.disabled}
              start={option.start}
              end={option.end}
              onClick={event => {
                if (option.disabled) return
                commit(index, event)
                setOpen(false)
              }}
              onPointerMove={() => {
                if (!option.disabled && index !== active) setActiveIndex(index)
              }}
            >
              {option.label}
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  )
}

export default SelectCustom
