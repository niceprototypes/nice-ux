import { css } from "styled-components"
import { StatusType, ColorPropertyType } from "../types"

/**
 * Status constants
 */
export const STATUS_ACTIVE = "active"
export const STATUS_SUCCESS = "success"
export const STATUS_ERROR = "error"
export const STATUS_WARNING = "warning"
export const STATUS_DEFAULT = "default"
export const STATUS_MUTED = "muted"
export const STATUS_HIGHLIGHTED = "highlighted"
export const STATUS_PRIMARY = "primary"
export const STATUS_SECONDARY = "secondary"

/**
 * Interface for status helpers
 */
interface StatusHelpers {
  isActive: boolean
  isSuccess: boolean
  isError: boolean
  isWarning: boolean
  isDefault: boolean
  isDisabled: boolean
  isHighlighted: boolean
  isPrimary: boolean
  isSecondary: boolean
}

/**
 * Get UI status helpers for a given status
 */
export const getUiStatus = (status: StatusType): StatusHelpers => {
  return {
    isActive: status === STATUS_ACTIVE,
    isSuccess: status === STATUS_SUCCESS,
    isError: status === STATUS_ERROR,
    isWarning: status === STATUS_WARNING,
    isDefault: status === STATUS_DEFAULT,
    isDisabled: status === STATUS_MUTED,
    isHighlighted: status === STATUS_HIGHLIGHTED,
    isPrimary: status === STATUS_PRIMARY,
    isSecondary: status === STATUS_SECONDARY,
  }
}

/**
 * Generate CSS variable reference string
 */
export const getCssVariable = (property: string, value: number, suffix?: string): string => {
  const baseName = `--${property}-${value}`
  return suffix ? `var(${baseName}${suffix})` : `var(${baseName})`
}

/**
 * Apply functional color styling
 */
export const styleFunctionalColor = (colorValue: string, property: ColorPropertyType = "color") => {
  return css`
    ${property}: ${colorValue};
  `
}

/**
 * Type guard for checking if a value is a valid icon size
 */
export const isValidIconSize = (size: any): size is 1 | 2 | 3 | 4 => {
  return [1, 2, 3, 4].includes(size)
}

/**
 * Type guard for checking if a value is a valid status
 */
export const isValidStatus = (status: any): status is StatusType => {
  return [
    STATUS_ACTIVE,
    STATUS_SUCCESS,
    STATUS_ERROR,
    STATUS_WARNING,
    STATUS_DEFAULT,
    STATUS_MUTED,
    STATUS_HIGHLIGHTED,
    STATUS_PRIMARY,
    STATUS_SECONDARY,
  ].includes(status)
}