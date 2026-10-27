import { readFileSync } from 'node:fs'
import path from 'node:path'

/** Virtual module standing in for @niceprototypes/styles' side-effect stylesheet import. */
const NO_TOKENS_IMPORT = '\0nice-config-crxjs:no-tokens-import'

/** `import name from './file.json'`, with or without `with { type: 'json' }`. */
const JSON_DEFAULT_IMPORT = /import\s+([\w$]+)\s+from\s+(['"])(\.{1,2}\/[^'"]+\.json)\2(?:\s+with\s*\{\s*type\s*:\s*['"]json['"]\s*\})?\s*;?/g

/**
 * Vite plugin for CRXJS extensions that consume nice-* packages.
 *
 * - JSON in linked packages: in dev, Vite serves a JSON import as `file.json?import`, and
 *   CRXJS's file writer then copies the raw file from `<root>/@fs/<absolute path>`, which
 *   does not exist for files outside the project (ENOENT, e.g. @niceprototypes/styles' errors.json).
 *   Relative default JSON imports in modules outside the project are inlined as constants,
 *   so no JSON request is left for CRXJS to copy.
 * - Side-effect tokens: @niceprototypes/styles imports `@niceprototypes/styles/tokens.css` for its side
 *   effect. In a content script CRXJS attaches that stylesheet to the host page, putting
 *   Nice tokens and `color-scheme` on the site's :root. The import resolves to an empty
 *   module instead; pages load the tokens themselves (e.g. `@niceprototypes/styles/tokens.css?raw`
 *   into a <style> or a shadow root). `?raw` imports are not affected.
 *
 * @returns {import('vite').Plugin}
 */
export const niceCrxjs = () => {
  let root = ''
  return {
    name: '@niceprototypes/config-crxjs',
    enforce: 'pre',
    configResolved: (config) => {
      root = config.root
    },
    resolveId: (source) => (source === '@niceprototypes/styles/tokens.css' ? NO_TOKENS_IMPORT : null),
    load: (id) => (id === NO_TOKENS_IMPORT ? 'export {}' : null),
    transform: (code, id) => {
      const file = id.split('?')[0]
      if (!path.isAbsolute(file) || file.startsWith(root + path.sep) || !code.includes('.json')) return null
      const inlined = code.replace(
        JSON_DEFAULT_IMPORT,
        (_match, name, _quote, specifier) =>
          `const ${name} = ${readFileSync(path.resolve(path.dirname(file), specifier), 'utf8')};`,
      )
      return inlined === code ? null : inlined
    },
  }
}
