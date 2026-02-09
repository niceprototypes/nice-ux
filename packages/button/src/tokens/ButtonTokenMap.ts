import { createTokens, mapCoreToken, getToken, type ComponentTokens } from "nice-react-styles"

export const ButtonTokenMap = {
  size: mapCoreToken("cellHeight"),
  spacing: {
    smaller: `calc(${getToken("cellHeight", "smaller").var} / 2)`,
    small: `calc(${getToken("cellHeight", "small").var} / 2)`,
    base: `calc(${getToken("cellHeight", "base").var} / 2)`,
    large: `calc(${getToken("cellHeight", "large").var} / 2)`,
    larger: `calc(${getToken("cellHeight", "larger").var} / 2)`,
  },
  borderRadius: mapCoreToken("borderRadius"),
  statusPrimaryBase: {
    backgroundColor: getToken("foregroundColor").var,
    borderColor: getToken("foregroundColor").var,
    foregroundColor: "#fff",
  },
  statusPrimaryDisabled: {
    backgroundColor: "#ddd",
    borderColor: "#ddd",
    foregroundColor: "#888",
  },
  statusPrimaryError: {
    backgroundColor: getToken("foregroundColor", "error").var,
    borderColor: getToken("foregroundColor", "error").var,
    foregroundColor: "#fff",
  },
  statusPrimarySuccess: {
    backgroundColor: getToken("foregroundColor", "success").var,
    borderColor: getToken("foregroundColor", "success").var,
    foregroundColor: "#fff",
  },
  statusPrimaryWarning: {
    backgroundColor: getToken("foregroundColor", "warning").var,
    borderColor: getToken("foregroundColor", "warning").var,
    foregroundColor: "#fff",
  },
  statusSecondaryBase: {
    backgroundColor: "transparent",
    borderColor: getToken("foregroundColor").var,
    foregroundColor: getToken("foregroundColor").var,
  },
  statusSecondaryDisabled: {
    backgroundColor: "transparent",
    borderColor: "#ddd",
    foregroundColor: "#888",
  },
  statusSecondaryError: {
    backgroundColor: "transparent",
    borderColor: getToken("foregroundColor", "error").var,
    foregroundColor: getToken("foregroundColor", "error").var,
  },
  statusSecondarySuccess: {
    backgroundColor: "transparent",
    borderColor: getToken("foregroundColor", "success").var,
    foregroundColor: getToken("foregroundColor", "success").var,
  },
  statusSecondaryWarning: {
    backgroundColor: "transparent",
    borderColor: getToken("foregroundColor", "warning").var,
    foregroundColor: getToken("foregroundColor", "warning").var,
  },
} as const

export const buttonTokens: ComponentTokens<typeof ButtonTokenMap> = createTokens(ButtonTokenMap, "button")
