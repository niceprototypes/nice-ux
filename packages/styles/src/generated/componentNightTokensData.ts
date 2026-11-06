/**
 * Auto-generated from src/tokens/components/*.json ($themes.night) — do not edit by hand.
 * Regenerate: npm run build:tokens
 */

import type { ComponentTokenNode } from './componentTokensData.js'

export type ComponentNightTokensData = Record<string, { [key: string]: ComponentTokenNode }>

const componentNightTokensData: ComponentNightTokensData = {
  "app": {
    "search": {
      "backgroundColor": {
        "base": "hsla(0, 0%, 0%, 1)"
      }
    }
  },
  "button": {},
  "calendar": {},
  "card": {},
  "checkbox": {},
  "code": {
    "syntaxColor": {
      "neutral": "hsla(225, 4%, 82%, 1)",
      "green": "hsla(155, 64%, 69%, 1)",
      "cyan": "hsla(195, 69%, 77%, 1)",
      "blue": "hsla(216, 85%, 76%, 1)",
      "purple": "hsla(278, 84%, 80%, 1)"
    }
  },
  "contents": {},
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
  "tooltip": {},
  "tree": {}
} as const

export default componentNightTokensData