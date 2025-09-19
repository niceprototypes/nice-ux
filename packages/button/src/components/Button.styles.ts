import styled from "styled-components"
import { ButtonProps, ButtonTheme } from "../types"
import { getCssVariable } from "../utils"
import { getStateStyles, getStatusStyles } from "../services/buttonHelpers"


/**
 * Inner wrapper for button content
 */
export const ButtonInner = styled.div`
  margin: calc(${props => props.theme?.cssVariables?.borderWidth || "var(--border-width-1)"} * -1)
          calc(${props => props.theme?.cssVariables?.borderWidth || "var(--border-width-1)"} * -1) 0;
`

/**
 * Main button element with all styling
 */
export const ButtonOuter = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith("$"),
})<{
  $size: number
  $state?: ButtonProps["state"]
  $status?: ButtonProps["status"]
  $disabled?: boolean
  $fullWidth?: boolean
  $hasIcon?: boolean
  $theme?: ButtonTheme
}>`
  /* Reset browser button styles */
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  /* Button-specific styles */
  display: block;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  height: ${({ $size }) => getCssVariable("cell-height", $size)};
  font-weight: 500;
  border: ${({ $theme }) => $theme?.cssVariables?.borderWidth || "var(--border-width-1)"} solid
         ${({ $theme }) => $theme?.cssVariables?.borderColor || "var(--border-color-default)"};
  border-radius: calc(${({ $size }) => getCssVariable("cell-height", $size)} / 2);
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  text-align: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  /* Smooth transitions */
  transition: all 0.15s ease-in-out;

  /* Focus styles */
  &:focus-visible {
    outline: 2px solid var(--color-focus, #3b82f6);
    outline-offset: 2px;
  }

  /* Hover styles */
  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  /* Active styles */
  &:active:not(:disabled) {
    transform: translateY(0);
  }

  /* Apply status styles */
  ${({ $status, $theme }) => getStatusStyles($status, $theme)}

  /* Apply state styles */
  ${({ $state, $theme }) => getStateStyles($state, $theme)}
`

/**
 * Text content wrapper
 */
export const ButtonText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`