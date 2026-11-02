import type { CatalogComponentType, CatalogPropType } from "../../catalog"
import { tokenUnions } from "../../catalog"

/** One prop's control: a select of its values, a switch, a number or a text field. */
export type PlaygroundControlType =
  | { prop: CatalogPropType; kind: "select"; options: string[] }
  | { prop: CatalogPropType; kind: "boolean" | "number" | "text" }

/** A prop value the controls hold. */
export type PlaygroundValueType = string | number | boolean | undefined

/** Props the controls leave alone: pass-throughs and handlers. */
const SKIPPED = /^(className|style|ref|id|data-testid|aria-.*|on[A-Z].*)$/

/** The values of a union type: its literals, with token union names expanded; undefined if any part is not a literal. */
const valuesOf = (type: string, seen = new Set<string>()): string[] | undefined => {
  const values: string[] = []
  for (const part of type.split("|").map(piece => piece.trim())) {
    const literal = /^"([^"]*)"$/.exec(part)
    if (literal) values.push(literal[1])
    else if (tokenUnions[part] && !seen.has(part)) {
      const expanded = valuesOf(tokenUnions[part], new Set([...seen, part]))
      if (!expanded) return undefined
      values.push(...expanded)
    } else return undefined
  }
  return values.length ? [...new Set(values)] : undefined
}

/** A prop's control, or undefined when no control can set it (a function, an object). */
export const controlOf = (prop: CatalogPropType): PlaygroundControlType | undefined => {
  if (SKIPPED.test(prop.name)) return undefined
  if (prop.type === "boolean") return { prop, kind: "boolean" }
  if (prop.type === "number") return { prop, kind: "number" }
  if (["string", "React.ReactNode", "ReactNode"].includes(prop.type)) return { prop, kind: "text" }
  const options = valuesOf(prop.type)
  return options ? { prop, kind: "select", options } : undefined
}

/** A prop's starting value: its catalog default when that is a literal; children and required text start as the component's name. */
export const initialOf = (control: PlaygroundControlType, componentName: string): PlaygroundValueType => {
  const fallback = control.prop.default
  if (control.prop.name === "children" || (control.prop.required && control.kind === "text")) return componentName
  if (fallback === undefined) return undefined
  const literal = /^"([^"]*)"$/.exec(fallback)
  if (literal) return literal[1]
  if (fallback === "true" || fallback === "false") return fallback === "true"
  if (/^-?\d+(\.\d+)?$/.test(fallback)) return Number(fallback)
  return undefined
}

/** Whether a component gets a playground: some prop has a control, and every required one does. */
export const hasPlayground = (component: CatalogComponentType): boolean => {
  const controlled = component.props.filter(prop => controlOf(prop))
  return controlled.length > 0 && component.props.every(prop => !prop.required || controlled.includes(prop))
}
