// Fails when a publishable component package, or any export of one, is not reachable from
// @niceprototypes/ux. Reads the built declarations, so it covers values and types.
import { test } from "node:test"
import assert from "node:assert/strict"
import * as fs from "node:fs"
import * as path from "node:path"
import { createRequire } from "node:module"
import ts from "typescript"

const require = createRequire(import.meta.url)
const uxDirectory = path.resolve(import.meta.dirname, "..")
const packagesDirectory = path.dirname(uxDirectory)

// Names two packages both export; the umbrella re-exports the second under a qualified name
const renamedExports = {
  "@niceprototypes/head": { LinkAttributes: "HeadLinkAttributes" },
  "@niceprototypes/image": { registerVendorResolver: "registerImageVendorResolver" },
}

// Publishable React packages, minus Storybook add-ons and the umbrella itself
const componentPackages = fs
  .readdirSync(packagesDirectory)
  .map(folder => path.join(packagesDirectory, folder, "package.json"))
  .filter(manifestPath => fs.existsSync(manifestPath))
  .map(manifestPath => JSON.parse(fs.readFileSync(manifestPath, "utf-8")))
  .filter(manifest => !manifest.private && manifest.peerDependencies?.react)
  .map(manifest => manifest.name)
  .filter(name => name !== "@niceprototypes/ux" && !name.startsWith("@niceprototypes/storybook-"))

const uxManifest = JSON.parse(fs.readFileSync(path.join(uxDirectory, "package.json"), "utf-8"))
const uxDependencies = { ...uxManifest.dependencies, ...uxManifest.peerDependencies }

const resolveTypes = name =>
  path.join(path.dirname(require.resolve(`${name}/package.json`, { paths: [uxDirectory] })), "dist", "index.d.ts")

const uxTypesPath = path.join(uxDirectory, "dist", "index.d.ts")
const packageTypesPaths = Object.fromEntries(componentPackages.map(name => [name, resolveTypes(name)]))
const program = ts.createProgram([uxTypesPath, ...Object.values(packageTypesPaths)], {
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  skipLibCheck: true,
  noEmit: true,
})
const checker = program.getTypeChecker()

const getExports = filePath => {
  const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(filePath))
  const resolve = symbol => (symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol)
  return new Map(checker.getExportsOfModule(moduleSymbol).map(symbol => [symbol.escapedName, resolve(symbol)]))
}

const uxExports = getExports(uxTypesPath)

test("finds the component packages", () => {
  assert.ok(componentPackages.length > 0)
})

for (const name of componentPackages) {
  test(`${name} is reachable from @niceprototypes/ux`, () => {
    assert.ok(name in uxDependencies, `${name} is missing from the umbrella's dependencies`)

    const unreachable = []
    for (const [exportName, symbol] of getExports(packageTypesPaths[name])) {
      if (exportName === "default") {
        // The default export must also be reachable by name
        if (![...uxExports.values()].includes(symbol)) unreachable.push("default")
        continue
      }
      const uxName = renamedExports[name]?.[exportName] ?? exportName
      if (uxExports.get(uxName) !== symbol) unreachable.push(uxName)
    }
    assert.deepEqual(unreachable, [], `${name} exports not reachable from @niceprototypes/ux`)
  })
}
