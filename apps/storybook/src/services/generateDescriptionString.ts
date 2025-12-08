type DescriptionSegment = {
  value: string
  code?: boolean
  newLine?: boolean
}

interface GenerateDescriptionOptions {
  links?: string[]
  setup?: (DescriptionSegment | string)[]
  usage?: (DescriptionSegment | string)[]
}

/**
 * Generates a formatted description string for Storybook component documentation.
 *
 * @param packageName - The npm package name (e.g., "nice-styles", "nice-icons")
 * @param options - Configuration object with links, setup, and usage arrays
 * @returns Formatted markdown string for Storybook descriptions
 *
 * @example
 * ```ts
 * const description = generateDescriptionString("nice-icons", {
 *   links: ["[Component](/docs/components-icon--docs)"],
 *   setup: [
 *     { value: 'import CheckIcon from "nice-icons/check.svg"', code: true, newLine: true },
 *   ],
 *   usage: [
 *     { value: '<img src={CheckIcon} alt="check"/>', code: true },
 *   ],
 * })
 * ```
 */
export function generateDescriptionString(
  packageName: string,
  options: GenerateDescriptionOptions = {}
): string {
  const { links = [], setup = [], usage = [] } = options

  const segments: (DescriptionSegment | string)[] = []

  // Build links section
  segments.push("Links")
  segments.push("\u2002\u2192\u2002")

  // Add extra links if provided
  if (links.length > 0) {
    links.forEach(link => {
      segments.push({ value: link })
      segments.push("\u2002")
    })
  }

  // Add Code and Package links
  segments.push({
    value: `[Code](https://github.com/niceprototypes/${packageName})`,
  })
  segments.push("\u2002")
  segments.push({
    value: `[Package](https://www.npmjs.com/package/${packageName})`,
    newLine: true,
  })
  segments.push({ value: "\u2002", newLine: true })

  // Build setup section
  segments.push({ value: "Setup", newLine: true })
  segments.push({ value: `npm i ${packageName}`, code: true, newLine: true })

  // Add additional setup items
  if (setup.length > 0) {
    segments.push(...setup)
  }

  // Add usage section
  if (usage.length > 0) {
    segments.push({ value: "\u2002", newLine: true })
    segments.push({ value: "Usage", newLine: true })
    segments.push(...usage)
  }

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