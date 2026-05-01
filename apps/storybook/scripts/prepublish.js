#!/usr/bin/env node

/**
 * @file prepublish.js
 * @description Pre-publish validation script for Nice Prototypes ecosystem packages.
 *
 * This script validates that a Nice package is ready for npm publication by:
 * 1. Verifying the package directory exists at ~/nice/{packageName}
 * 2. Checking for git changes (uncommitted changes or unpushed commits)
 *    - If no changes exist, exits early to avoid unnecessary npm/build operations
 * 3. Checking that no `file:` protocol references exist in package.json dependencies
 *    (these are used during local development via nice-toolkit but break for consumers)
 * 4. Running `npm install` to ensure dependencies resolve correctly
 * 5. Running `npm run build` to verify the package compiles without errors
 *
 * @usage
 *   node scripts/prepublish.js <package-name>
 *
 * @example
 *   # Validate nice-react-icon before publishing
 *   node scripts/prepublish.js react-icon
 *
 *   # Validate nice-react-flex before publishing
 *   node scripts/prepublish.js react-flex
 *
 * @exitCodes
 *   0 - Package is ready for publishing OR no changes to publish
 *   1 - Validation failed (missing directory, file: refs found, install/build error)
 *
 * @note Run this AFTER unlinking local packages with `npx nice-toolkit --unlink`
 *       to ensure the package.json has proper npm version references.
 */

import { readFileSync, existsSync } from "fs"
import { execSync } from "child_process"
import { join } from "path"
import { homedir } from "os"

/** @type {string|undefined} Package name from CLI argument (without 'nice-' prefix) */
const packageName = process.argv[2]

if (!packageName) {
  console.error("Error: Package name required")
  console.error("Usage: node scripts/prepublish.js <package-name>")
  console.error("Example: node scripts/prepublish.js react-icon")
  process.exit(1)
}

/** @type {string} Absolute path to the target package directory */
const packageDir = join(homedir(), "nice", packageName)

// Validate package directory exists
if (!existsSync(packageDir)) {
  console.error(`Error: Package directory not found: ${packageDir}`)
  process.exit(1)
}

/** @type {string} Absolute path to the package's package.json */
const packageJsonPath = join(packageDir, "package.json")

// Validate package.json exists
if (!existsSync(packageJsonPath)) {
  console.error(`Error: package.json not found in ${packageDir}`)
  process.exit(1)
}

console.log(`Checking nice-${packageName} for publish readiness...`)

/**
 * Checks if the package has any git changes that would warrant a new publish.
 * Returns true if there are uncommitted changes or unpushed commits.
 *
 * @returns {boolean} Whether the package has changes to publish
 */
const hasGitChanges = () => {
  try {
    // Check for uncommitted changes (staged or unstaged)
    const status = execSync("git status --porcelain", {
      cwd: packageDir,
      encoding: "utf-8",
    }).trim()

    if (status.length > 0) {
      return true
    }

    // Check for unpushed commits by comparing local HEAD to remote tracking branch
    try {
      const unpushed = execSync("git log @{u}..HEAD --oneline", {
        cwd: packageDir,
        encoding: "utf-8",
      }).trim()

      return unpushed.length > 0
    } catch {
      // No upstream branch configured - check if there are any local commits
      // that haven't been pushed by comparing to origin/main or origin/master
      try {
        const unpushedMain = execSync(
          "git log origin/main..HEAD --oneline 2>/dev/null || git log origin/master..HEAD --oneline 2>/dev/null",
          {
            cwd: packageDir,
            encoding: "utf-8",
            shell: true,
          }
        ).trim()

        return unpushedMain.length > 0
      } catch {
        // Can't determine remote state, assume there may be changes
        return true
      }
    }
  } catch {
    // Not a git repo or git not available - proceed with validation
    return true
  }
}

// Skip validation if no git changes exist
if (!hasGitChanges()) {
  console.log(`\nNo git changes detected in nice-${packageName}.`)
  console.log("Skipping publish validation - nothing to publish.")
  process.exit(0)
}

console.log("Git changes detected, proceeding with validation...\n")

/** @type {Object} Parsed package.json contents */
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

/**
 * Scans a dependency object for `file:` protocol references.
 *
 * During local development, nice-toolkit rewrites dependencies to use
 * `file:` paths for seamless cross-package development. These references
 * must be reverted to proper npm semver versions before publishing,
 * otherwise consumers will get broken packages that reference non-existent
 * local paths.
 *
 * @param {Object<string, string>|undefined} deps - Dependency object from package.json
 * @param {string} depType - Type of dependency ('dependencies', 'devDependencies', 'peerDependencies')
 * @returns {Array<{name: string, version: string, depType: string}>} Array of found file: references
 */
const checkForFileRefs = (deps, depType) => {
  if (!deps) return []
  const fileRefs = []
  for (const [name, version] of Object.entries(deps)) {
    if (typeof version === "string" && version.startsWith("file:")) {
      fileRefs.push({ name, version, depType })
    }
  }
  return fileRefs
}

/**
 * @type {Array<{name: string, version: string, depType: string}>}
 * Aggregated list of all file: references found across all dependency types
 */
const fileRefs = [
  ...checkForFileRefs(packageJson.dependencies, "dependencies"),
  ...checkForFileRefs(packageJson.devDependencies, "devDependencies"),
  ...checkForFileRefs(packageJson.peerDependencies, "peerDependencies"),
]

// Fail if any file: references are found - these break published packages
if (fileRefs.length > 0) {
  console.error("\nError: Found file: references in package.json")
  console.error(
    "These must be changed to proper npm versions before publishing:\n"
  )
  for (const ref of fileRefs) {
    console.error(`  ${ref.depType}: "${ref.name}": "${ref.version}"`)
  }
  console.error("\nPublishing with file: references will break for consumers.")
  process.exit(1)
}

console.log("No file: references found.")

// Run npm install to verify dependencies resolve from npm registry
console.log(`\nRunning npm install in ${packageDir}...`)
try {
  execSync("npm install", { cwd: packageDir, stdio: "inherit" })
} catch (error) {
  console.error("Error: npm install failed")
  process.exit(1)
}

// Run build to verify the package compiles successfully
console.log(`\nRunning npm run build in ${packageDir}...`)
try {
  execSync("npm run build", { cwd: packageDir, stdio: "inherit" })
} catch (error) {
  console.error("Error: npm run build failed")
  process.exit(1)
}

console.log(`\nnice-${packageName} is ready for publishing.`)
