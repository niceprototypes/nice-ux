import * as React from "react"
import type { ThemeType } from "@niceprototypes/styles"

/**
 * DialogOpenType
 *
 * Whether the dialog is shown as a modal. Controlled by the consumer.
 */
export type DialogOpenType = boolean

/**
 * DialogOnCloseType
 *
 * Called when the dialog requests to close: Escape, a backdrop click (when
 * `closeOnBackdropClick`), or a native close the consumer did not request
 * (e.g. a `<form method="dialog">` submit).
 */
export type DialogOnCloseType = () => void

/**
 * DialogTitleType
 *
 * Heading content. Rendered in an `<h2>` that labels the dialog through
 * `aria-labelledby`.
 */
export type DialogTitleType = React.ReactNode

/**
 * DialogDescriptionType
 *
 * Supporting text under the title. Rendered in a `<p>` that describes the
 * dialog through `aria-describedby`.
 */
export type DialogDescriptionType = React.ReactNode

/**
 * DialogActionsType
 *
 * Footer content, typically buttons. Rendered after the body, aligned to the
 * end of the row.
 */
export type DialogActionsType = React.ReactNode

/**
 * DialogCloseOnBackdropClickType
 *
 * Whether a click on the backdrop calls `onClose`.
 */
export type DialogCloseOnBackdropClickType = boolean

/**
 * DialogRefType
 *
 * Ref to the rendered `<dialog>` element (React 19 ref-as-prop).
 */
export type DialogRefType = React.Ref<HTMLDialogElement>

/**
 * DialogThemeType
 *
 * Re-export of ThemeType from @niceprototypes/styles.
 * Pin token resolution to a specific theme.
 * Extensible for consumer-defined custom themes.
 */
export type DialogThemeType = ThemeType

/**
 * DialogProps
 *
 * Complete prop definition for the Dialog component.
 */
export interface DialogProps {
  /** Whether the dialog is shown as a modal. */
  open: DialogOpenType
  /** Called on Escape, backdrop click (when `closeOnBackdropClick`) and unrequested native close. */
  onClose?: DialogOnCloseType
  /** Heading that labels the dialog. */
  title: DialogTitleType
  /** Supporting text that describes the dialog. */
  description?: DialogDescriptionType
  /** Dialog body. */
  children?: React.ReactNode
  /** Footer content, e.g. buttons. */
  actions?: DialogActionsType
  /** Whether a backdrop click calls `onClose`. @default true */
  closeOnBackdropClick?: DialogCloseOnBackdropClickType
  /** Id of the dialog element (e.g. for the trigger's `aria-controls`). */
  id?: string
  /** Ref to the dialog element. */
  ref?: DialogRefType
  /** Pin token resolution to a specific theme instead of responding to media query. */
  theme?: DialogThemeType
}

// Declaration merging: const + namespace creates an exportable type namespace.
const DialogTypes = {} as const

namespace DialogTypes {
  export type Open = DialogOpenType
  export type OnClose = DialogOnCloseType
  export type Title = DialogTitleType
  export type Description = DialogDescriptionType
  export type Actions = DialogActionsType
  export type CloseOnBackdropClick = DialogCloseOnBackdropClickType
  export type Ref = DialogRefType
  export type Theme = DialogThemeType
  export type Props = DialogProps
}

export default DialogTypes
