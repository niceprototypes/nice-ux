type DescriptionSegment = {
  value: string
  code?: boolean
  newLine?: boolean
}

/**
 * Generates a formatted description string for Storybook component documentation.
 *
 * Supports inline code styling and line breaks for complex descriptions.
 *
 * @param segments - Array of description segments (objects or strings) with optional formatting
 * @returns Formatted markdown string for Storybook descriptions
 *
 * @example
 * ```ts
 * const description = generateDescriptionString([
 *   "Use the command",
 *   { value: "npm i nice-styles", code: true },
 *   { value: "to install this package", newLine: true },
 * ])
 * // Returns: "Use the command **`npm i nice-styles`** to install this package\n\n"
 * ```
 */
export function generateDescriptionString(segments: (DescriptionSegment | string)[]): string {
  // Normalize string inputs to DescriptionSegment objects
  const normalizedSegments: DescriptionSegment[] = segments.map(segment =>
    typeof segment === "string" ? { value: segment } : segment
  )

  return normalizedSegments
    .map((segment, index) => {
      let result = ""

      // Add spacing before the segment (except for first segment)
      // Check if previous segment did NOT end with a newLine
      const previousSegment = index > 0 ? normalizedSegments[index - 1] : null
      if (index > 0 && !previousSegment?.newLine) {
        result += " "
      }

      // Format the value with code styling if needed
      if (segment.code) {
        result += `**\`${segment.value}\`**`
      } else {
        result += segment.value
      }

      // Add line break after the segment if needed
      if (segment.newLine) {
        result += "\n\n"
      }

      return result
    })
    .join("")
}