/**
 * Generates CSS variable reference string
 * @param property - The CSS variable property name
 * @param value - The value to append to the property
 * @param suffix - Optional suffix to append
 * @returns CSS var() reference string
 */
const getCssVariable = (property: string, value: number, suffix?: string): string => {
  const baseName = `--${property}-${value}`
  return suffix ? `var(${baseName}${suffix})` : `var(${baseName})`
}

export default getCssVariable
