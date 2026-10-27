/**
 * `npm run check:data` — validates `src/data/storybook.json` with the same tree
 * logic storybook uses (`src/data/tree.ts`; Node strips the types). Exits 1 and
 * lists every problem when the data is malformed.
 */
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { flatten, buildTree, validate, type DataItem, type DataNode, type DataSettings } from "../src/data/tree.ts"

const file = fileURLToPath(new URL("../src/data/storybook.json", import.meta.url))

/** The parsed file, or exit 1 when it is missing or not valid JSON. */
const read = (): { columns?: unknown; items?: unknown; defaults?: unknown } => {
  try {
    return JSON.parse(readFileSync(file, "utf8"))
  } catch (error) {
    console.error(`check:data — cannot read ${file}: ${(error as Error).message}`)
    return process.exit(1)
  }
}

const data = read()

const schema = JSON.parse(readFileSync(fileURLToPath(new URL("../src/data/storybook.schema.json", import.meta.url)), "utf8"))

/** A JSON-schema property: its allowed values, or its allowed JSON types. */
type Rule = { enum?: unknown[]; type?: string | string[] }

/** The JSON type name of a value, as JSON Schema spells it. */
const typeOf = (value: unknown): string => (value === null ? "null" : Array.isArray(value) ? "array" : typeof value)

/**
 * Problems in the named column sets, checked against the schema's own column
 * definition (required keys, known keys, enums, types) so the rules live in one
 * place.
 */
const validateColumns = (columns: unknown): string[] => {
  if (columns === undefined) return []
  if (typeOf(columns) !== "object") return ['"columns" must be an object']
  const { required = [], properties } = schema.$defs.column as { required?: string[]; properties: Record<string, Rule> }
  const errors: string[] = []
  for (const [name, set] of Object.entries(columns as Record<string, unknown>)) {
    if (!Array.isArray(set) || !set.length) {
      errors.push(`columns.${name}: must be a non-empty array`)
      continue
    }
    const keys = new Set<string>()
    set.forEach((column, index) => {
      const at = `columns.${name}[${index}]`
      if (typeOf(column) !== "object") return void errors.push(`${at}: must be an object`)
      const entry = column as Record<string, unknown>
      for (const key of required) if (!(key in entry)) errors.push(`${at}: missing "${key}"`)
      for (const [key, value] of Object.entries(entry)) {
        const rule = properties[key]
        if (!rule) errors.push(`${at}: unknown key "${key}"`)
        else if (rule.enum && !rule.enum.includes(value)) errors.push(`${at}.${key}: ${JSON.stringify(value)} is not one of ${rule.enum.map(v => JSON.stringify(v)).join(", ")}`)
        else if (rule.type && ![rule.type].flat().includes(typeOf(value))) errors.push(`${at}.${key}: expected ${[rule.type].flat().join(" or ")}, got ${typeOf(value)}`)
      }
      if (typeof entry.key === "string") {
        if (keys.has(entry.key)) errors.push(`${at}: duplicate key "${entry.key}" in this set`)
        keys.add(entry.key)
      }
    })
  }
  return errors
}

/**
 * Problems in each item's own settings: unknown keys and wrong types (from the
 * schema's `settings` definition), a `table` that names no column set, and
 * `widths` keys the item's column set does not have.
 */
const validateSettings = (items: DataItem[], columns: Record<string, { key: string }[]>): string[] => {
  const properties = schema.$defs.settings.properties as Record<string, Rule>
  const errors: string[] = []
  for (const item of items) {
    for (const [key, value] of Object.entries(item.own)) {
      const rule = properties[key]
      if (!rule) errors.push(`${item.title}: unknown setting "${key}"`)
      else if (rule.type && ![rule.type].flat().includes(typeOf(value))) errors.push(`${item.title}.${key}: expected ${[rule.type].flat().join(" or ")}, got ${typeOf(value)}`)
    }
    const { table, widths } = item.settings
    if (typeof table === "string" && !columns[table]) errors.push(`${item.title}: table "${table}" is not a column set`)
    if (typeof table === "string" && columns[table] && typeOf(widths) === "object") {
      const keys = new Set(columns[table].map(column => column.key))
      for (const key of Object.keys(widths as object)) if (!keys.has(key)) errors.push(`${item.title}: widths.${key} — column set "${table}" has no "${key}" column`)
    }
  }
  return errors
}

const structural = [...validateColumns(data.columns), ...validate(data.items, data.defaults ?? {})]
const errors = structural.length
  ? structural
  : validateSettings(flatten(buildTree(data.items as DataNode[], (data.defaults ?? {}) as DataSettings)), (data.columns ?? {}) as Record<string, { key: string }[]>)
if (errors.length) {
  console.error(`check:data — ${errors.length} problem(s) in storybook.json:`)
  for (const error of errors) console.error(`  • ${error}`)
  process.exit(1)
}

const items = flatten(buildTree(data.items as DataNode[], (data.defaults ?? {}) as DataSettings))
const columnSets = Object.keys((data.columns ?? {}) as object).length
console.log(`check:data — ok (${columnSets} column sets, ${items.length} items, ${items.filter(item => item.isFolder).length} folders)`)
