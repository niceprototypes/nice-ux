/**
 * Auto-generated from src/tokens/components/*.json ($breakpoints) — do not edit by hand.
 * Regenerate: npm run build:tokens
 */

import type { ComponentTokenNode } from './componentTokensData.js'

export type ComponentBreakpointTokensData = Record<string, Record<string, { [key: string]: ComponentTokenNode }>>

const componentBreakpointTokensData: ComponentBreakpointTokensData = {
  "app": {
    "tablet": {
      "search": {
        "fontSize": {
          "base": "1em"
        }
      }
    }
  },
  "logo": {
    "tablet": {
      "height": {
        "base": "56px"
      }
    },
    "laptop": {
      "height": {
        "base": "48px"
      }
    }
  }
} as const

export default componentBreakpointTokensData