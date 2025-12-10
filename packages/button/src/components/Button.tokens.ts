import { getToken } from "nice-styles"
import { createComponentTokens } from "nice-react-styles"

const ButtonTokenMap = {
  "primary-base-background-color": getToken("foregroundColor").var,
  "primary-base-border-color": getToken("foregroundColor").var,
  "primary-base-foreground-color": "#fff",
  "primary-disabled-background-color": "#ddd",
  "primary-disabled-border-color": "#bbb",
  "primary-disabled-foreground-color": "#888",
  "primary-error-background-color": getToken("foregroundColor", "error").var,
  "primary-error-border-color": getToken("foregroundColor", "error").var,
  "primary-error-foreground-color": "#fff",
  "primary-success-background-color": getToken("foregroundColor", "success").var,
  "primary-success-border-color": getToken("foregroundColor", "success").var,
  "primary-success-foreground-color": "#fff",
  "primary-warning-background-color": getToken("foregroundColor", "warning").var,
  "primary-warning-border-color": getToken("foregroundColor", "warning").var,
  "primary-warning-foreground-color": "#fff",
  "secondary-base-background-color": "transparent",
  "secondary-base-border-color": getToken("foregroundColor").var,
  "secondary-base-foreground-color": getToken("foregroundColor").var,
  "secondary-disabled-background-color": "transparent",
  "secondary-disabled-border-color": "#888",
  "secondary-disabled-foreground-color": "#888",
  "secondary-error-background-color": "transparent",
  "secondary-error-border-color": getToken("foregroundColor", "error").var,
  "secondary-error-foreground-color": getToken("foregroundColor", "error").var,
  "secondary-success-background-color": "transparent",
  "secondary-success-border-color": getToken("foregroundColor", "success").var,
  "secondary-success-foreground-color": getToken("foregroundColor", "success").var,
  "secondary-warning-background-color": "transparent",
  "secondary-warning-border-color": getToken("foregroundColor", "warning").var,
  "secondary-warning-foreground-color": getToken("foregroundColor", "warning").var,
}

export const { tokens: ButtonTokens, getToken: getButtonToken } = createComponentTokens(
  "button",
  ButtonTokenMap
)
