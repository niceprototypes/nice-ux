import { getToken } from "nice-styles"
import { createTokens, TokenResult } from "nice-react-styles"
import type { ButtonStatusType, ButtonStateType } from "./types"

export const ButtonTokenMap = {
  height: {
    name: "height",
    items: {
      smaller: getToken("cellHeight", "smaller").var,
      small: getToken("cellHeight", "small").var,
      base: getToken("cellHeight").var,
      large: getToken("cellHeight", "large").var,
      larger: getToken("cellHeight", "larger").var,
    }
  },
  spacing: {
    name: "spacing",
    items: {
      smaller: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
      small: `calc(${getToken("cellHeight", "small").var} / 2)`,
      base: `calc(${getToken("cellHeight", "base").var} / 2)`,
      large: `calc(${getToken("cellHeight", "large").var} / 2)`,
      larger: `calc(${getToken("cellHeight", "larger").var} / 2)`,
    }
  },
  borderRadius: {
    name: "border-radius",
    items: {
      small: getToken("borderRadius", "small").var,
      base: getToken("borderRadius", "base").var,
      large: getToken("borderRadius", "large").var,
    }
  },
  statusPrimaryBase: {
    name: "status-primary-base",
    items: {
      backgroundColor: getToken("foregroundColor").var,
      borderColor: getToken("foregroundColor").var,
      foregroundColor: "#fff",
    }
  },
  statusPrimaryDisabled: {
    name: "status-primary-disabled",
    items: {
      backgroundColor: "#ddd",
      borderColor: "#ddd",
      foregroundColor: "#888",
    }
  },
  statusPrimaryError: {
    name: "status-primary-error",
    items: {
      backgroundColor: getToken("foregroundColor", "error").var,
      borderColor: getToken("foregroundColor", "error").var,
      foregroundColor: "#fff",
    }
  },
  statusPrimarySuccess: {
    name: "status-primary-success",
    items: {
      backgroundColor: getToken("foregroundColor", "success").var,
      borderColor: getToken("foregroundColor", "success").var,
      foregroundColor: "#fff",
    }
  },
  statusPrimaryWarning: {
    name: "status-primary-warning",
    items: {
      backgroundColor: getToken("foregroundColor", "warning").var,
      borderColor: getToken("foregroundColor", "warning").var,
      foregroundColor: "#fff",
    }
  },
  statusSecondaryBase: {
    name: "status-secondary-base",
    items: {
      backgroundColor: "transparent",
      borderColor: getToken("foregroundColor").var,
      foregroundColor: getToken("foregroundColor").var,
    }
  },
  statusSecondaryDisabled: {
    name: "status-secondary-disabled",
    items: {
      backgroundColor: "transparent",
      borderColor: "#ddd",
      foregroundColor: "#888",
    }
  },
  statusSecondaryError: {
    name: "status-secondary-error",
    items: {
      backgroundColor: "transparent",
      borderColor: getToken("foregroundColor", "error").var,
      foregroundColor: getToken("foregroundColor", "error").var,
    }
  },
  statusSecondarySuccess: {
    name: "status-secondary-success",
    items: {
      backgroundColor: "transparent",
      borderColor: getToken("foregroundColor", "success").var,
      foregroundColor: getToken("foregroundColor", "success").var,
    }
  },
  statusSecondaryWarning: {
    name: "status-secondary-warning",
    items: {
      backgroundColor: "transparent",
      borderColor: getToken("foregroundColor", "warning").var,
      foregroundColor: getToken("foregroundColor", "warning").var,
    }
  },
} as const

export const { GlobalStyles: ButtonStyles, getComponentToken: getButtonToken } = createTokens(
  "button",
  ButtonTokenMap
)

/**
 * Helper to capitalize first letter
 */
function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>
}

/**
 * Status color property variants
 */
type StatusColorProperty = "backgroundColor" | "borderColor" | "foregroundColor"

/**
 * Compound status token keys
 */
type StatusTokenKey = `status${Capitalize<ButtonStatusType>}${Capitalize<ButtonStateType>}`

/**
 * Helper function to get status color tokens dynamically
 * Constructs the compound token name from status and state
 *
 * @example
 * getButtonStatusToken("primary", "base", "backgroundColor")
 * // Returns token for --button--status-primary-base--background-color
 */
export function getButtonStatusToken(
  status: ButtonStatusType,
  state: ButtonStateType,
  property: StatusColorProperty
): TokenResult {
  const tokenKey = `status${capitalize(status)}${capitalize(state)}` as StatusTokenKey
  return getButtonToken(tokenKey, property)
}