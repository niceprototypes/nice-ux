import * as React from "react"

/**
 * TooltipTriggerType
 *
 * How the tooltip is activated.
 *
 * Values:
 * - "hover": show while the pointer is over the trigger (default)
 * - "click": toggle open/closed on click of the trigger
 */
export type TooltipTriggerType = "hover" | "click"

/**
 * TooltipPositionType
 *
 * Side of the trigger the tooltip bubble is placed on.
 *
 * Values:
 * - "top" (default), "bottom", "left", "right"
 */
export type TooltipPositionType = "top" | "bottom" | "left" | "right"

/**
 * TooltipAnchorType
 *
 * What the bubble is positioned against.
 *
 * Values:
 * - "trigger" (default): anchored to the trigger element's bounding rect
 * - "cursor": anchored to the pointer position captured at activation. The
 *   coordinates ride in on the activating mouse event — no extra listener or
 *   measurement — so there is no added DOM cost (it also skips the trigger's
 *   getBoundingClientRect reflow). One-shot: it does not follow the cursor.
 */
export type TooltipAnchorType = "trigger" | "cursor"

/**
 * TooltipContentType
 *
 * The tooltip's content — text or arbitrary markup shown in the bubble.
 */
export type TooltipContentType = React.ReactNode

/**
 * TooltipDelayType
 *
 * A delay in milliseconds.
 */
export type TooltipDelayType = number

/**
 * TooltipClassNameType
 *
 * CSS class name applied to the trigger wrapper element.
 */
export type TooltipClassNameType = string

/**
 * TooltipProps
 *
 * Complete prop definition for the Tooltip component.
 */
export interface TooltipProps {
  /** Tooltip content shown in the bubble. */
  content: TooltipContentType
  /** The trigger element the tooltip is attached to and activated from. */
  children: React.ReactNode
  /** How the tooltip is activated. @default "hover" */
  trigger?: TooltipTriggerType
  /** Side of the trigger the bubble is placed on. @default "top" */
  position?: TooltipPositionType
  /**
   * What the bubble is anchored to: the trigger's rect, or the pointer position
   * captured at activation. @default "trigger"
   */
  anchor?: TooltipAnchorType
  /** Delay in ms before the tooltip is rendered. @default 0 */
  delayShow?: TooltipDelayType
  /** Delay in ms before the tooltip is unrendered. @default 0 */
  delayHide?: TooltipDelayType
  /** CSS class name applied to the trigger wrapper. */
  className?: TooltipClassNameType
}

// Declaration merging: const + namespace creates an exportable type namespace.
const TooltipTypes = {} as const

namespace TooltipTypes {
  export type Trigger = TooltipTriggerType
  export type Position = TooltipPositionType
  export type Anchor = TooltipAnchorType
  export type Content = TooltipContentType
  export type Delay = TooltipDelayType
  export type ClassName = TooltipClassNameType
  export type Props = TooltipProps
}

export default TooltipTypes
