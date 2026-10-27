import Button from "@niceprototypes/button"
import type { ReactNode } from "react"
import type { ComponentExample } from "../../../components/demos/Components"

// Each variant's props; the tab row also forwards role, aria-selected, tabIndex and id to the root.
const selectedVariants: Record<string, { code: string; preview: ReactNode }> = {
  none: {
    code: `<Button>Option</Button>`,
    preview: <Button onClick={() => {}}>Option</Button>,
  },
  selected: {
    code: `<Button selected aria-pressed>Option</Button>`,
    preview: <Button onClick={() => {}} selected aria-pressed>Option</Button>,
  },
  "selected, filled": {
    code: `<Button selected filled aria-pressed>Option</Button>`,
    preview: <Button onClick={() => {}} selected filled aria-pressed>Option</Button>,
  },
  "pill, ghost when not selected": {
    code: `<Button borderRadius="rounded" ghost selected={active} aria-pressed={active}>Option</Button>`,
    preview: <Button onClick={() => {}} borderRadius="rounded" ghost selected aria-pressed>Option</Button>,
  },
  tab: {
    code: `<Button role="tab" id="tab-1" selected={active} aria-selected={active} tabIndex={active ? 0 : -1}>Tab</Button>`,
    preview: <Button onClick={() => {}} role="tab" id="button-selected-tab" selected aria-selected tabIndex={0}>Tab</Button>,
  },
}

export const buttonSelected = {
  name: "selected",
  description:
    "A persistent selected look for toggle groups, pill filters and tabs. A selected button is never ghosted (selected overrides ghost in every state), and an unfilled one takes its border from the button.selected.borderColor token; a filled one keeps its transparent border, and an explicit borderColor prop still wins. It sets no ARIA attribute: pass aria-pressed for a toggle, or role=\"tab\" with aria-selected for a tab. role, aria-selected, tabIndex and id are forwarded to the root element (a disabled button keeps tabIndex -1 or its native disabled).",
  variants: Object.keys(selectedVariants),
  default: "none",
  preview: (variant) => selectedVariants[variant].preview,
  code: (variant) => selectedVariants[variant].code,
} satisfies ComponentExample
