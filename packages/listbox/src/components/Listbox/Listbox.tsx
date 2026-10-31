import * as React from "react"
import Ink from "@niceprototypes/ink"
import { Theme } from "@niceprototypes/styles"
import {
  StyledListbox,
  StyledListboxOption,
  StyledListboxOptionLabel,
  StyledListboxOptionSlot,
} from "./Listbox.styles"
import type { ListboxOnChangeEventType, ListboxProps } from "./Listbox.types"
import { getListboxEdgeIndex } from "../../services/getListboxEdgeIndex"
import { getListboxNextIndex } from "../../services/getListboxNextIndex"
import { getListboxOptionId } from "../../services/getListboxOptionId"
import { getListboxTypeaheadIndex } from "../../services/getListboxTypeaheadIndex"
import { useListboxTypeahead } from "../../services/useListboxTypeahead"

/** Options moved by PageUp / PageDown. */
const PAGE_SIZE = 10

/**
 * Listbox
 *
 * Controlled WAI-ARIA listbox: a `<ul role="listbox">` of `role="option"`
 * rows with `aria-selected`, labels set through Ink. Focusable (default): a
 * tab stop that keeps DOM focus on the list and names the active option with
 * `aria-activedescendant`. With `focusable={false}` a combobox keeps focus and
 * drives `activeValue`; option presses do not take focus.
 *
 * @example
 * ```tsx
 * const [fruit, setFruit] = React.useState("apple")
 *
 * <Listbox
 *   aria-label="Fruit"
 *   options={[{ value: "apple", label: "Apple" }, { value: "pear", label: "Pear" }]}
 *   value={fruit}
 *   onChange={setFruit}
 * />
 * ```
 */
const Listbox: React.FC<ListboxProps> = ({
  options,
  value,
  onChange,
  activeValue: activeValueProp,
  onActiveChange,
  focusable = true,
  size = "base",
  theme,
  id: idProp,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ref,
}) => {
  const generatedId = React.useId()
  const id = idProp ?? generatedId
  const typeahead = useListboxTypeahead()

  const [internalActiveValue, setInternalActiveValue] = React.useState<string | null>(null)
  const activeValue = activeValueProp !== undefined ? activeValueProp : internalActiveValue
  const activeIndex =
    activeValue === null ? -1 : options.findIndex(option => option.value === activeValue && !option.disabled)
  const selectedIndex = value === undefined ? -1 : options.findIndex(option => option.value === value)

  const activate = (index: number) => {
    const next = index >= 0 ? options[index].value : null
    if (next === activeValue) return
    if (activeValueProp === undefined) setInternalActiveValue(next)
    onActiveChange?.(next)
  }

  const choose = (index: number, event: ListboxOnChangeEventType) => {
    const option = options[index]
    if (!option || option.disabled) return
    onChange?.(option.value, event)
  }

  // Where keyboard travel starts when nothing is active: the selected option,
  // else the first enabled one.
  const startIndex = () =>
    selectedIndex >= 0 && !options[selectedIndex].disabled ? selectedIndex : getListboxEdgeIndex(options, "first")

  const search = (key: string) => {
    const match = getListboxTypeaheadIndex(options, typeahead.type(key), activeIndex >= 0 ? activeIndex : selectedIndex)
    if (match !== -1) activate(match)
  }

  // Keep the active option in view inside a scrolling ancestor.
  React.useEffect(() => {
    if (activeIndex < 0) return
    document.getElementById(getListboxOptionId(id, activeIndex))?.scrollIntoView?.({ block: "nearest" })
  }, [activeIndex, id])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const { key, altKey, ctrlKey, metaKey } = event
    const move = (delta: number) => activate(activeIndex < 0 ? startIndex() : getListboxNextIndex(options, activeIndex, delta))

    switch (key) {
      case "ArrowDown":
        event.preventDefault()
        move(1)
        return
      case "ArrowUp":
        event.preventDefault()
        move(-1)
        return
      case "PageDown":
      case "PageUp":
        event.preventDefault()
        move(key === "PageDown" ? PAGE_SIZE : -PAGE_SIZE)
        return
      case "Home":
      case "End":
        event.preventDefault()
        activate(getListboxEdgeIndex(options, key === "Home" ? "first" : "last"))
        return
      case "Enter":
        event.preventDefault()
        choose(activeIndex, event)
        return
      case " ":
        event.preventDefault()
        // A space inside a typeahead run ("new york") is part of the search
        if (typeahead.isTyping()) search(key)
        else choose(activeIndex, event)
        return
      default:
        if (key.length === 1 && !ctrlKey && !metaKey && !altKey) {
          event.preventDefault()
          search(key)
        }
    }
  }

  const listbox = (
    <StyledListbox
      ref={ref}
      id={id}
      role="listbox"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...(focusable
        ? {
            tabIndex: 0,
            "aria-activedescendant": activeIndex >= 0 ? getListboxOptionId(id, activeIndex) : undefined,
            onKeyDown: handleKeyDown,
            onFocus: () => {
              if (activeIndex < 0) activate(startIndex())
            },
            onBlur: () => activate(-1),
          }
        : {
            // The controlling element keeps focus through option presses
            onMouseDown: (event: React.MouseEvent<HTMLUListElement>) => event.preventDefault(),
          })}
    >
      {options.map((option, index) => (
        <StyledListboxOption
          key={`${index}-${option.value}`}
          id={getListboxOptionId(id, index)}
          role="option"
          aria-selected={index === selectedIndex}
          aria-disabled={option.disabled ? "true" : undefined}
          $active={index === activeIndex}
          $selected={index === selectedIndex}
          $disabled={!!option.disabled}
          onClick={event => {
            if (option.disabled) return
            activate(index)
            choose(index, event)
          }}
          onPointerMove={() => {
            if (!option.disabled && index !== activeIndex) activate(index)
          }}
        >
          {option.start !== undefined && option.start !== null ? (
            <StyledListboxOptionSlot>{option.start}</StyledListboxOptionSlot>
          ) : null}
          <StyledListboxOptionLabel>
            <Ink size={size}>{option.label}</Ink>
          </StyledListboxOptionLabel>
          {option.end !== undefined && option.end !== null ? (
            <StyledListboxOptionSlot>{option.end}</StyledListboxOptionSlot>
          ) : null}
        </StyledListboxOption>
      ))}
    </StyledListbox>
  )

  return theme ? <Theme name={theme}>{listbox}</Theme> : listbox
}

export default Listbox
