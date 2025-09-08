import { css } from "styled-components"

export const getCssVariable = (property: string, value: number, suffix?: string) => {
  const baseName = `--${property}-${value}`
  return suffix ? `var(${baseName}${suffix})` : `var(${baseName})`
}

export const styleAntialiasing = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`