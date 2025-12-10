import { getToken } from "nice-styles"
import { createComponentTokens } from "nice-react-styles"

const ButtonTokenMap = {
  "border-radius-small": getToken("borderRadius", "small").var,
  "border-radius-base": getToken("borderRadius", "base").var,
  "border-radius-large": getToken("borderRadius", "large").var,
  "status-primary-base-background-color": getToken("foregroundColor").var,
  "status-primary-base-border-color": getToken("foregroundColor").var,
  "status-primary-base-foreground-color": "#fff",
  "status-primary-disabled-background-color": "#ddd",
  "status-primary-disabled-border-color": "#ddd",
  "status-primary-disabled-foreground-color": "#888",
  "status-primary-error-background-color": getToken("foregroundColor", "error").var,
  "status-primary-error-border-color": getToken("foregroundColor", "error").var,
  "status-primary-error-foreground-color": "#fff",
  "status-primary-success-background-color": getToken("foregroundColor", "success").var,
  "status-primary-success-border-color": getToken("foregroundColor", "success").var,
  "status-primary-success-foreground-color": "#fff",
  "status-primary-warning-background-color": getToken("foregroundColor", "warning").var,
  "status-primary-warning-border-color": getToken("foregroundColor", "warning").var,
  "status-primary-warning-foreground-color": "#fff",
  "status-secondary-base-background-color": "transparent",
  "status-secondary-base-border-color": getToken("foregroundColor").var,
  "status-secondary-base-foreground-color": getToken("foregroundColor").var,
  "status-secondary-disabled-background-color": "transparent",
  "status-secondary-disabled-border-color": "#ddd",
  "status-secondary-disabled-foreground-color": "#888",
  "status-secondary-error-background-color": "transparent",
  "status-secondary-error-border-color": getToken("foregroundColor", "error").var,
  "status-secondary-error-foreground-color": getToken("foregroundColor", "error").var,
  "status-secondary-success-background-color": "transparent",
  "status-secondary-success-border-color": getToken("foregroundColor", "success").var,
  "status-secondary-success-foreground-color": getToken("foregroundColor", "success").var,
  "status-secondary-warning-background-color": "transparent",
  "status-secondary-warning-border-color": getToken("foregroundColor", "warning").var,
  "status-secondary-warning-foreground-color": getToken("foregroundColor", "warning").var,
}

export const { tokens: ButtonTokens, getToken: getButtonToken } = createComponentTokens(
  "button",
  ButtonTokenMap
)
