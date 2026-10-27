#!/usr/bin/env node
/**
 * generate-catalog — writes the two agent lookup files from nice-ux sources:
 *   manifest/agents/components.txt  one line per component (read whole; the builder's index)
 *   manifest/agents/catalog.json    minified per-component detail (query with jq, never read whole)
 *
 * Sources (read-only):
 *   packages/{p}/package.json                                  name, version, @niceprototypes peers
 *   packages/{p}/src/index.ts                                  public exports
 *   packages/{p}/src/{components|react/components}/{C}/{C}.types.ts   `{C}Props` members, JSDoc, @default
 *   packages/styles/src/generated/types.ts                     token unions (SizeType, GapType, …)
 *   packages/styles/src/tokens/components/{prefix}.json        component token addresses
 *   apps/storybook/stories/Components/**                       docs page and Playground story ids
 *
 * TypeScript comes from the nice-ux root devDependencies. No network.
 * Usage: node manifest/agents/scripts/generate-catalog.mjs [--root path-to-nice-ux]
 */
import { readFileSync, readdirSync, existsSync, writeFileSync, statSync } from "node:fs"
import { join, dirname, resolve, relative } from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"

const scriptDir = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const rootFlag = args.indexOf("--root")
const root = resolve(rootFlag === -1 ? join(scriptDir, "..", "..", "..") : args[rootFlag + 1])
const agentsDir = join(scriptDir, "..")
const ts = createRequire(join(root, "package.json"))("typescript")

const TOKEN_RESERVED_KEYS = ["$themes", "$breakpoints", "$inverse"]
const STATE_PATTERN = /hover|active|focus|disabled|pressed|checked|selected|error|invalid|open|expanded|loading/i
/** Props every component may carry; listed by name only, never per component in components.txt. */
const isCommonProp = name => ["className", "style", "ref", "id", "data-testid"].includes(name) || name.startsWith("aria-")
const COMPONENT_DIRS = ["src/components", "src/react/components"]

const readJson = path => JSON.parse(readFileSync(path, "utf8"))
const isDirectory = path => existsSync(path) && statSync(path).isDirectory()
const lowerFirst = value => value.charAt(0).toLowerCase() + value.slice(1)
const sanitizeStoryId = value => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

/** `export type XType = "a" | "b"` lines from the generated token types. */
function readTokenUnions() {
  const path = join(root, "packages", "styles", "src", "generated", "types.ts")
  const unions = new Map()
  for (const match of readFileSync(path, "utf8").matchAll(/^export type (\w+) = (.+)$/gm)) unions.set(match[1], match[2].trim())
  return unions
}
const tokenUnions = readTokenUnions()

/** First JSDoc paragraph and @default of a node. */
function readJsDoc(node, sourceFile) {
  const docs = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc)
  if (docs.length === 0) return {}
  const doc = docs[docs.length - 1]
  const comment = typeof doc.comment === "string" ? doc.comment : (doc.comment ?? []).map(part => part.text ?? "").join("")
  const description = comment.split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim()
  const defaultTag = (doc.tags ?? []).find(tag => tag.tagName.text === "default")
  const defaultValue = defaultTag
    ? (typeof defaultTag.comment === "string" ? defaultTag.comment : defaultTag.getText(sourceFile).replace(/^@default\s*/, "")).trim()
    : undefined
  return { description: description || undefined, default: defaultValue }
}

/** `{C}Props` members of one types file; local aliases resolve one level, token unions are named. */
function readPropsFile(typesPath, componentName) {
  const sourceFile = ts.createSourceFile(typesPath, readFileSync(typesPath, "utf8"), ts.ScriptTarget.Latest, true)
  const aliases = new Map()
  let propsNode
  let propsExtends = []
  const heritage = node => (node.heritageClauses ?? []).flatMap(clause => clause.types.map(type => type.getText(sourceFile)))

  sourceFile.forEachChild(node => {
    if (ts.isTypeAliasDeclaration(node)) {
      aliases.set(node.name.text, node.type.getText(sourceFile))
      if (node.name.text === `${componentName}Props`) propsNode = node.type
    }
    if (ts.isInterfaceDeclaration(node) && node.name.text === `${componentName}Props`) {
      propsNode = node
      propsExtends = heritage(node)
    }
  })
  // Fallback: the file's single `*Props` interface (e.g. SectionLinks → StickySectionLinksProps)
  if (!propsNode) {
    const candidates = sourceFile.statements.filter(node => ts.isInterfaceDeclaration(node) && node.name.text.endsWith("Props"))
    if (candidates.length === 1) {
      propsNode = candidates[0]
      propsExtends = heritage(propsNode)
    }
  }
  if (!propsNode) return null

  let members = []
  const collect = typeNode => {
    if (ts.isTypeLiteralNode(typeNode)) members.push(...typeNode.members)
    else if (ts.isIntersectionTypeNode(typeNode)) typeNode.types.forEach(collect)
    else if (ts.isParenthesizedTypeNode(typeNode)) collect(typeNode.type)
    else propsExtends.push(typeNode.getText(sourceFile))
  }
  if (ts.isInterfaceDeclaration(propsNode)) members = [...propsNode.members]
  else collect(propsNode)

  const props = members
    .filter(member => ts.isPropertySignature(member) && member.name)
    .map(member => {
      const name = member.name.getText(sourceFile).replace(/^["']|["']$/g, "")
      const type = member.type ? member.type.getText(sourceFile).replace(/\s+/g, " ") : "unknown"
      const local = aliases.get(type)?.replace(/\s+/g, " ")
      // `type` = what to pass: a token union name (SizeType) stays named; any other alias is expanded
      const shown = local && !tokenUnions.has(local) ? local : (local ?? type)
      return {
        name,
        type: shown,
        ...(member.questionToken ? {} : { required: true }),
        ...readJsDoc(member, sourceFile),
      }
    })

  const propsName = ts.isInterfaceDeclaration(propsNode) ? propsNode.name.text : `${componentName}Props`
  return { propsName, props, extends: propsExtends.length ? propsExtends : undefined }
}

/** Component token JSON → `prefix.path:variant` addresses plus override axes. */
function readComponentTokens(prefix) {
  const path = join(root, "packages", "styles", "src", "tokens", "components", `${prefix}.json`)
  if (!existsSync(path)) return null
  const source = readJson(path)
  const addresses = []
  const walk = (node, trail) => {
    for (const [key, value] of Object.entries(node)) {
      if (TOKEN_RESERVED_KEYS.includes(key)) continue
      if (value !== null && typeof value === "object") walk(value, [...trail, key])
      else addresses.push(trail.length === 0 ? `${prefix}.${key}:base` : `${prefix}.${trail.join(".")}:${key}`)
    }
  }
  walk(source, [])
  return {
    addresses,
    ...(source.$themes ? { themes: Object.keys(source.$themes) } : {}),
    ...(source.$breakpoints ? { breakpoints: Object.keys(source.$breakpoints) } : {}),
    ...(source.$inverse ? { inverse: true } : {}),
  }
}

/** Storybook titles under stories/Components: MDX `<Meta title>` and CSF `title:` + `export const Playground`. */
function readStories() {
  const storiesRoot = join(root, "apps", "storybook", "stories", "Components")
  const docs = []
  const playgrounds = []
  const walk = directory => {
    if (!isDirectory(directory)) return
    for (const entry of readdirSync(directory)) {
      const path = join(directory, entry)
      if (isDirectory(path)) walk(path)
      else if (entry.endsWith(".mdx")) {
        const match = readFileSync(path, "utf8").match(/<Meta[^>]*\btitle="([^"]+)"/)
        if (match) docs.push(match[1])
      } else if (/\.stories\.tsx?$/.test(entry)) {
        const text = readFileSync(path, "utf8")
        const title = text.match(/\btitle:\s*["']([^"']+)["']/)
        if (title) {
          docs.push(title[1])
          if (/export const Playground\b/.test(text)) playgrounds.push(title[1])
        }
      }
    }
  }
  walk(storiesRoot)
  return { docs, playgrounds }
}
const stories = readStories()
const lastSegment = title => title.split("/").pop()

function readExports(indexPath) {
  if (!existsSync(indexPath)) return []
  const text = readFileSync(indexPath, "utf8")
  const names = new Set()
  for (const match of text.matchAll(/export\s+(type\s+)?\{([^}]+)\}/g)) {
    for (const part of match[2].split(",")) {
      const name = part.trim().split(/\s+as\s+/).pop()?.trim()
      if (name) names.add(match[1] ? `type ${name}` : name)
    }
  }
  return [...names]
}

const packagesRoot = join(root, "packages")
const packages = readdirSync(packagesRoot)
  .filter(directory => !directory.startsWith("storybook-") && existsSync(join(packagesRoot, directory, "package.json")))
  .sort()
  .map(directory => {
    const packageRoot = join(packagesRoot, directory)
    const manifest = readJson(join(packageRoot, "package.json"))
    const components = COMPONENT_DIRS.flatMap(componentDir => {
      const componentsRoot = join(packageRoot, componentDir)
      if (!isDirectory(componentsRoot)) return []
      return readdirSync(componentsRoot)
        .filter(name => existsSync(join(componentsRoot, name, `${name}.types.ts`)))
        .map(name => {
          const typesPath = join(componentsRoot, name, `${name}.types.ts`)
          const parsed = readPropsFile(typesPath, name)
          const tokens = readComponentTokens(lowerFirst(name))
          const props = parsed?.props ?? []
          const docsTitle = stories.docs.find(title => lastSegment(title) === name)
          const playgroundTitle = stories.playgrounds.find(title => lastSegment(title) === name)
          const states = [
            ...props.filter(prop => prop.type === "boolean").map(prop => `prop:${prop.name}`),
            ...new Set((tokens?.addresses ?? []).flatMap(address => address.split(/[.:]/).filter(part => STATE_PATTERN.test(part))).map(part => `token:${part}`)),
          ]
          return {
            name,
            types: relative(root, typesPath),
            propsType: parsed?.propsName ?? null,
            ...(parsed?.extends ? { extends: parsed.extends } : {}),
            props: props.filter(prop => !isCommonProp(prop.name)),
            common: props.filter(prop => isCommonProp(prop.name)).map(prop => prop.name),
            states,
            tokens,
            docs: docsTitle ? `${sanitizeStoryId(docsTitle)}--docs` : null,
            playground: playgroundTitle ? `${sanitizeStoryId(playgroundTitle)}--playground` : null,
          }
        })
    })
    return {
      package: manifest.name,
      directory: `packages/${directory}`,
      version: manifest.version,
      private: manifest.private || undefined,
      nicePeers: Object.keys(manifest.peerDependencies ?? {}).filter(name => name.startsWith("@niceprototypes/")),
      exports: readExports(join(packageRoot, "src", "index.ts")),
      components,
    }
  })

const allComponents = packages.flatMap(entry => entry.components.map(component => ({ ...component, package: entry.package })))
const usedUnions = [...tokenUnions.keys()].filter(name => allComponents.some(component => component.props.some(prop => prop.type.includes(name))))

const catalog = {
  $comment: "GENERATED by manifest/agents/scripts/generate-catalog.mjs; do not edit. Query with jq; never read whole.",
  generatedAt: new Date().toISOString(),
  storybook: { local: "http://localhost:6006/?path=/docs/", deployed: "https://niceprototypes.com/ui/?path=/docs/" },
  commonProps: "className style ref id data-testid aria-*",
  tokenAddressFormat: 'getToken("{prefix}.{group.path}:{variant}") from @niceprototypes/styles',
  tokenUnions: Object.fromEntries(usedUnions.map(name => [name, tokenUnions.get(name)])),
  packages: packages.filter(entry => entry.components.length || !entry.private),
}
writeFileSync(join(agentsDir, "catalog.json"), JSON.stringify(catalog) + "\n")

/** components.txt shorthand: functions → fn, ReactNode → node, prose defaults dropped (catalog.json keeps all three). */
const shortType = type => (type.includes("=>") ? "fn" : type.replace(/React\.ReactNode/g, "node").replace(/ \| /g, "|"))
const shortDefault = value => (value && !/\s/.test(value) ? `=${value}` : "")
const propText = prop => `${prop.name}${prop.required ? "" : "?"}:${shortType(prop.type)}${shortDefault(prop.default)}`
const lines = [
  "# GENERATED by manifest/agents/scripts/generate-catalog.mjs; do not edit.",
  "# Component(package) [story id] props. `?` optional, `=x` default. Common props omitted: className style ref id data-testid aria-*.",
  "# Detail: jq '.packages[].components[]|select(.name==\"Button\")' manifest/agents/catalog.json",
  "",
  "## Token unions",
  ...usedUnions.map(name => `${name} = ${tokenUnions.get(name)}`),
  "",
  "## Components",
  ...allComponents.map(component => {
    const story = component.playground ?? component.docs
    return `${component.name}(${component.package.replace("@niceprototypes/", "")})${story ? ` [${story}]` : ""} ${component.props.map(propText).join(" ")}`
  }),
]
writeFileSync(join(agentsDir, "components.txt"), lines.join("\n") + "\n")

const missingStory = allComponents.filter(component => !component.docs).map(component => component.name)
const missingPlayground = allComponents.filter(component => !component.playground).length
console.log(`catalog: ${packages.length} packages, ${allComponents.length} components; ${missingPlayground} without a Playground`)
if (missingStory.length) console.log(`  no storybook page: ${missingStory.join(", ")}`)
