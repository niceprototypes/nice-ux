#!/usr/bin/env node

/**
 * @file watch-deps.js
 * @description Dynamically runs `npm run dev` for all linked nice-* dependencies.
 *
 * This script reads package.json, finds all dependencies using `file:` protocol
 * that point to nice-* packages, and runs their dev scripts concurrently.
 *
 * @usage
 *   node scripts/watch-deps.js
 *
 * @note This replaces manual watch:* scripts in package.json
 */

import { readFileSync } from "fs"
import { spawn } from "child_process"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, "..")

const packageJson = JSON.parse(
  readFileSync(join(rootDir, "package.json"), "utf-8")
)

/**
 * Extract all file: dependencies pointing to nice-* packages
 * @returns {Array<{name: string, path: string}>}
 */
const getLinkedPackages = () => {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }
  const linked = []

  for (const [name, version] of Object.entries(deps)) {
    if (typeof version === "string" && version.startsWith("file:")) {
      const relativePath = version.replace("file:", "")
      linked.push({ name, path: join(rootDir, relativePath) })
    }
  }

  return linked
}

const packages = getLinkedPackages()

if (packages.length === 0) {
  console.log("No linked packages found.")
  process.exit(0)
}

console.log(`Watching ${packages.length} linked packages:\n`)
packages.forEach(pkg => console.log(`  - ${pkg.name}`))
console.log("")

const colors = [
  "\x1b[36m", // cyan
  "\x1b[33m", // yellow
  "\x1b[35m", // magenta
  "\x1b[32m", // green
  "\x1b[34m", // blue
  "\x1b[31m", // red
]
const reset = "\x1b[0m"

packages.forEach((pkg, index) => {
  const color = colors[index % colors.length]
  const label = pkg.name.replace("nice-", "").padEnd(20)

  const child = spawn("npm", ["run", "dev"], {
    cwd: pkg.path,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  })

  const prefix = `${color}[${label}]${reset} `

  child.stdout.on("data", data => {
    const lines = data.toString().split("\n").filter(Boolean)
    lines.forEach(line => process.stdout.write(`${prefix}${line}\n`))
  })

  child.stderr.on("data", data => {
    const lines = data.toString().split("\n").filter(Boolean)
    lines.forEach(line => process.stderr.write(`${prefix}${line}\n`))
  })

  child.on("error", err => {
    console.error(`${prefix}Failed to start: ${err.message}`)
  })

  child.on("exit", code => {
    if (code !== 0 && code !== null) {
      console.log(`${prefix}Exited with code ${code}`)
    }
  })
})

process.on("SIGINT", () => {
  console.log("\nStopping all watchers...")
  process.exit(0)
})