interface ToSourceOptions {
  children?: string
  raw?: Record<string, string>
}

export const toSource = (
  tag: string,
  props: Record<string, unknown>,
  options: ToSourceOptions = {}
): string => {
  const { children, raw = {} } = options

  const entries = Object.entries(props).filter(
    ([, value]) => value !== undefined && value !== false
  )

  const propStrs = entries.map(([key, value]) => {
    if (typeof value === "string") return `${key}="${value}"`
    if (typeof value === "number") return `${key}={${value}}`
    if (typeof value === "boolean") return key
    return `${key}={${JSON.stringify(value)}}`
  })

  for (const [key, expr] of Object.entries(raw)) {
    propStrs.push(`${key}={${expr}}`)
  }

  const hasChildren = children !== undefined

  if (propStrs.length === 0) {
    return hasChildren ? `<${tag}>\n  ${children}\n</${tag}>` : `<${tag} />`
  }

  const isMultiLine =
    propStrs.length > 2 || propStrs.some(s => s.includes("\n"))

  if (!isMultiLine && !hasChildren) {
    return `<${tag} ${propStrs.join(" ")} />`
  }

  const indentedProps = propStrs
    .map(s =>
      s
        .split("\n")
        .map((l, i) => (i === 0 ? `  ${l}` : `  ${l}`))
        .join("\n")
    )
    .join("\n")

  const openProps = `<${tag}\n${indentedProps}`
  if (hasChildren) {
    const indented = children
      .split("\n")
      .map(l => `  ${l}`)
      .join("\n")
    return `${openProps}\n>\n${indented}\n</${tag}>`
  }
  return `${openProps}\n/>`
}
