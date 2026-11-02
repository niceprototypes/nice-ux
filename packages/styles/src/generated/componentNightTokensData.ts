/**
 * Auto-generated from src/tokens/components/*.json ($themes.night) — do not edit by hand.
 * Regenerate: npm run build:tokens
 */

import type { ComponentTokenNode } from './componentTokensData.js'

export type ComponentNightTokensData = Record<string, { [key: string]: ComponentTokenNode }>

const componentNightTokensData: ComponentNightTokensData = {
  "app": {},
  "button": {},
  "calendar": {},
  "card": {},
  "checkbox": {},
  "code": {
    "syntaxColor": {
      "base": "hsla(210, 6%, 82%, 1)",
      "keyword": "hsla(228, 85%, 78%, 1)",
      "string": "hsla(152, 60%, 68%, 1)",
      "tag": "hsla(268, 80%, 80%, 1)",
      "constant": "hsla(198, 75%, 75%, 1)",
      "comment": "hsla(210, 4%, 60%, 1)"
    }
  },
  "dialog": {},
  "field": {},
  "icon": {},
  "image": {},
  "ink": {},
  "input": {},
  "lightbox": {},
  "line": {},
  "list": {},
  "listbox": {},
  "logo": {
    "color": {
      "base": "var(--np--color--night)"
    }
  },
  "popover": {},
  "radio": {},
  "select": {},
  "tabs": {},
  "tile": {},
  "toggle": {},
  "tree": {}
} as const

export default componentNightTokensData