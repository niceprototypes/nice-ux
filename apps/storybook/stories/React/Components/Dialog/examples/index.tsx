// Dialog example configs — one ComponentExample per facet, shaped like Button's
// (src/dataTables/data/tables/componentDemoTable). Key order in `dialogExamples` is the
// Dialog/Docs-page order; each Dialog/<facet>.mdx renders one entry.
import { useState } from "react"
import Dialog from "nice-react-dialog"
import Button from "nice-react-button"
import Ink from "nice-react-ink"
import type { ComponentExample } from "./examples.types"

export type { ComponentExample, ExampleVariant } from "./examples.types"

type DemoDialogProps = {
  label: string
  title: string
  description?: string
  withActions?: boolean
  closeOnBackdropClick?: boolean
  theme?: string
  body?: string
}

/** A trigger Button that opens a controlled Dialog; onClose and Cancel close it. */
const DemoDialog = ({ label, title, description, withActions, closeOnBackdropClick, theme, body }: DemoDialogProps) => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <Dialog
        open={open}
        onClose={close}
        title={title}
        description={description}
        closeOnBackdropClick={closeOnBackdropClick}
        theme={theme}
        actions={
          withActions ? (
            <>
              <Button onClick={close}>Cancel</Button>
              <Button filled onClick={close}>
                Delete
              </Button>
            </>
          ) : undefined
        }
      >
        {body ? <Ink>{body}</Ink> : null}
        {withActions ? null : <Button onClick={close}>Close</Button>}
      </Dialog>
    </>
  )
}

export const dialogTitle = {
  name: "title",
  description: "Heading of the dialog, rendered in an h2 that labels the dialog through aria-labelledby. Required.",
  variants: ["text"],
  default: "text",
  preview: () => <DemoDialog label="Open" title="Delete invoice?" />,
  code: () =>
    `const [open, setOpen] = useState(false)\n\n<Dialog open={open} onClose={() => setOpen(false)} title="Delete invoice?">\n  …\n</Dialog>`,
} satisfies ComponentExample

export const dialogDescription = {
  name: "description",
  description: "Supporting text under the title, rendered in a p that describes the dialog through aria-describedby.",
  variants: ["none", "text"],
  default: "none",
  preview: variant => (
    <DemoDialog
      label="Open"
      title="Delete invoice?"
      description={variant === "text" ? "This cannot be undone." : undefined}
    />
  ),
  code: variant =>
    variant === "text"
      ? `<Dialog\n  open={open}\n  onClose={close}\n  title="Delete invoice?"\n  description="This cannot be undone."\n>\n  …\n</Dialog>`
      : `<Dialog open={open} onClose={close} title="Delete invoice?">\n  …\n</Dialog>`,
} satisfies ComponentExample

export const dialogActions = {
  name: "actions",
  description: "Footer content after the body, typically buttons, aligned to the end of the row.",
  variants: ["none", "buttons"],
  default: "none",
  preview: variant => <DemoDialog label="Open" title="Delete invoice?" withActions={variant === "buttons"} />,
  code: variant =>
    variant === "buttons"
      ? `<Dialog\n  open={open}\n  onClose={close}\n  title="Delete invoice?"\n  actions={\n    <>\n      <Button onClick={close}>Cancel</Button>\n      <Button filled onClick={close}>Delete</Button>\n    </>\n  }\n/>`
      : `<Dialog open={open} onClose={close} title="Delete invoice?">\n  …\n</Dialog>`,
} satisfies ComponentExample

export const dialogCloseOnBackdropClick = {
  name: "closeOnBackdropClick",
  description: "Whether a click on the backdrop calls onClose. Escape always calls onClose.",
  variants: ["true", "false"],
  default: "true",
  preview: variant => (
    <DemoDialog label="Open" title="Unsaved changes" closeOnBackdropClick={variant === "true"} />
  ),
  code: variant =>
    variant === "false"
      ? `<Dialog open={open} onClose={close} title="Unsaved changes" closeOnBackdropClick={false}>\n  …\n</Dialog>`
      : `<Dialog open={open} onClose={close} title="Unsaved changes">\n  …\n</Dialog>`,
} satisfies ComponentExample

export const dialogOpen = {
  name: "open",
  description:
    "Whether the dialog is shown as a modal. Dialog is controlled: it calls showModal() while open is true, mounts its content only while open, and closes only when the parent sets open to false.",
  variants: ["toggle"],
  default: "toggle",
  preview: () => <DemoDialog label="Open" title="Delete invoice?" />,
  code: () =>
    `const [open, setOpen] = useState(false)\n\n<Button onClick={() => setOpen(true)}>Open</Button>\n<Dialog open={open} onClose={() => setOpen(false)} title="Delete invoice?">\n  …\n</Dialog>`,
} satisfies ComponentExample

export const dialogOnClose = {
  name: "onClose",
  description:
    "Called on Escape, on a backdrop click (when closeOnBackdropClick) and on a native close the parent did not request. Set open to false in it; Dialog does not close itself.",
  variants: ["setOpen(false)"],
  default: "setOpen(false)",
  preview: () => <DemoDialog label="Open" title="Unsaved changes" />,
  code: () => `<Dialog open={open} onClose={() => setOpen(false)} title="Unsaved changes">\n  …\n</Dialog>`,
} satisfies ComponentExample

export const dialogChildren = {
  name: "children",
  description: "The dialog body, rendered between the title / description and the actions.",
  variants: ["text"],
  default: "text",
  preview: () => (
    <DemoDialog
      label="Open"
      title="Delete invoice?"
      body="Invoice 2026-114 and its payment history will be removed."
    />
  ),
  code: () =>
    `<Dialog open={open} onClose={close} title="Delete invoice?">\n  <Ink>Invoice 2026-114 and its payment history will be removed.</Ink>\n</Dialog>`,
} satisfies ComponentExample

export const dialogTheme = {
  name: "theme",
  description: "Pins token resolution to a theme instead of following the color-scheme media query.",
  variants: ["day", "night"],
  default: "day",
  preview: variant => (
    <DemoDialog
      label={variant}
      title="Delete invoice?"
      theme={variant}
    />
  ),
  code: variant => `<Dialog open={open} onClose={close} title="Delete invoice?" theme="${variant}">\n  …\n</Dialog>`,
} satisfies ComponentExample

/** Every Dialog example facet — key order is the Dialog/Docs-page order. */
export const dialogExamples = {
  title: dialogTitle,
  description: dialogDescription,
  actions: dialogActions,
  closeOnBackdropClick: dialogCloseOnBackdropClick,
  open: dialogOpen,
  onClose: dialogOnClose,
  children: dialogChildren,
  theme: dialogTheme,
} satisfies Record<string, ComponentExample>

/** Dialog facets in Docs-page order. */
export const dialogExampleList: ComponentExample[] = Object.values(dialogExamples)
