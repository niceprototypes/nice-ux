import * as React from "react"
import type { ThemeType } from "nice-react-styles"

/**
 * PopoverPositionType
 *
 * Side of the anchor the popover is placed on.
 *
 * Values:
 * - "top": above the anchor
 * - "bottom": below the anchor (default)
 * - "left": to the left of the anchor
 * - "right": to the right of the anchor
 */
export type PopoverPositionType = "top" | "bottom" | "left" | "right"

/**
 * PopoverAlignType
 *
 * Alignment of the popover along the anchor's cross axis. For "top" / "bottom"
 * the cross axis is horizontal; for "left" / "right" it is vertical. Physical
 * (left-to-right, top-to-bottom) in v1 — not direction-aware.
 *
 * Values:
 * - "start": popover's leading edge flush with the anchor's leading edge (left / top) (default)
 * - "center": popover centered on the anchor
 * - "end": popover's trailing edge flush with the anchor's trailing edge (right / bottom)
 */
export type PopoverAlignType = "start" | "center" | "end"

/**
 * PopoverOffsetType
 *
 * Gap in px between the anchor and the popover along the main axis.
 */
export type PopoverOffsetType = number

/**
 * PopoverAnchorRectType
 *
 * Viewport-relative rectangle of the anchor. A `DOMRect` from
 * `getBoundingClientRect()` satisfies it.
 */
export type PopoverAnchorRectType = Pick<DOMRect, "top" | "right" | "bottom" | "left" | "width" | "height">

/**
 * PopoverAnchorPointType
 *
 * Viewport-relative point to anchor to (e.g. a pointer's clientX / clientY).
 * Treated as a zero-size rectangle.
 */
export type PopoverAnchorPointType = { x: number; y: number }

/**
 * PopoverAnchorType
 *
 * What `computeAnchorPosition` positions against: an anchor rectangle or a point.
 */
export type PopoverAnchorType = PopoverAnchorRectType | PopoverAnchorPointType

/**
 * PopoverCoordinatesType
 *
 * Inline style values for a `position: fixed` element. `top` / `left` place the
 * anchor point; `transform` shifts the element so its edge sits against it.
 */
export type PopoverCoordinatesType = { top: number; left: number; transform: string }

/**
 * PopoverOpenType
 *
 * Whether the popover is rendered. Controlled by the consumer.
 */
export type PopoverOpenType = boolean

/**
 * PopoverOnOpenChangeType
 *
 * Called when the popover requests a change of its open state. v1 only
 * requests `false` (Escape, pointerdown outside popover, anchor and
 * `ignoreOutsideRefs`).
 */
export type PopoverOnOpenChangeType = (open: boolean) => void

/**
 * PopoverAnchorRefType
 *
 * Ref to the element the popover is positioned against. Also excluded from
 * outside-pointerdown dismissal, and receives focus back on close.
 */
export type PopoverAnchorRefType = React.RefObject<HTMLElement | null>

/**
 * PopoverIgnoreOutsideRefsType
 *
 * Refs to elements that do not count as "outside" for pointerdown dismissal,
 * in addition to the popover and the anchor. Use it for a trigger that sits
 * beside the anchor (e.g. a date field's calendar button), so pressing it does
 * not dismiss the popover before the trigger's own toggle runs.
 */
export type PopoverIgnoreOutsideRefsType = ReadonlyArray<React.RefObject<HTMLElement | null>>

/**
 * PopoverRoleType
 *
 * ARIA role applied to the popover element.
 */
export type PopoverRoleType = React.AriaRole

/**
 * PopoverRefType
 *
 * Ref to the rendered popover element (React 19 ref-as-prop).
 */
export type PopoverRefType = React.Ref<HTMLDivElement>

/**
 * PopoverThemeType
 *
 * Re-export of ThemeType from nice-styles.
 * Pin token resolution to a specific theme.
 * Extensible for consumer-defined custom themes.
 */
export type PopoverThemeType = ThemeType

/**
 * PopoverClassNameType
 *
 * CSS class name applied to the popover element.
 */
export type PopoverClassNameType = string

/**
 * PopoverProps
 *
 * Complete prop definition for the Popover component.
 */
export interface PopoverProps {
  /** Whether the popover is rendered. */
  open: PopoverOpenType
  /** Called with `false` on Escape or pointerdown outside the popover, anchor and `ignoreOutsideRefs`. */
  onOpenChange?: PopoverOnOpenChangeType
  /** Element the popover is positioned against. */
  anchorRef: PopoverAnchorRefType
  /** Elements where a pointerdown does not dismiss the popover (besides the popover and anchor). */
  ignoreOutsideRefs?: PopoverIgnoreOutsideRefsType
  /** Side of the anchor the popover is placed on. @default "bottom" */
  position?: PopoverPositionType
  /** Alignment along the anchor's cross axis. @default "start" */
  align?: PopoverAlignType
  /** Popover content. */
  children?: React.ReactNode
  /** ARIA role of the popover element. @default "dialog" */
  role?: PopoverRoleType
  /** Accessible name of the popover. */
  "aria-label"?: string
  /** Id of the element that labels the popover. */
  "aria-labelledby"?: string
  /** Id of the popover element (e.g. for the anchor's `aria-controls`). */
  id?: string
  /** Ref to the popover element. */
  ref?: PopoverRefType
  /** CSS class name applied to the popover element. */
  className?: PopoverClassNameType
  /** Pin token resolution to a specific theme instead of responding to media query. */
  theme?: PopoverThemeType
}

// Declaration merging: const + namespace creates an exportable type namespace.
const PopoverTypes = {} as const

namespace PopoverTypes {
  export type Position = PopoverPositionType
  export type Align = PopoverAlignType
  export type Offset = PopoverOffsetType
  export type AnchorRect = PopoverAnchorRectType
  export type AnchorPoint = PopoverAnchorPointType
  export type Anchor = PopoverAnchorType
  export type Coordinates = PopoverCoordinatesType
  export type Open = PopoverOpenType
  export type OnOpenChange = PopoverOnOpenChangeType
  export type AnchorRef = PopoverAnchorRefType
  export type IgnoreOutsideRefs = PopoverIgnoreOutsideRefsType
  export type Role = PopoverRoleType
  export type Ref = PopoverRefType
  export type Theme = PopoverThemeType
  export type ClassName = PopoverClassNameType
  export type Props = PopoverProps
}

export default PopoverTypes
