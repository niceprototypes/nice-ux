import { createConfiguration } from '@niceprototypes/config-rollup'

/** The package entry and one subpath entry per router adapter (package.json `exports`). */
const entries = {
  index: 'src/index.ts',
  'adapters/plain': 'src/adapters/plain.tsx',
  'adapters/react-router': 'src/adapters/react-router.tsx',
  'adapters/tanstack-router': 'src/adapters/tanstack-router.tsx',
}

// One standard configuration per entry, its outputs renamed from index to the entry's path. Each
// adapter imports only types from the shell, so no code is shared between the bundles.
export default Object.entries(entries).flatMap(([name, input]) => {
  const [code, declarations] = createConfiguration({ input, dtsInput: `dist/types/${name}.d.ts`, clean: false })
  code.output = code.output.map((output) => ({ ...output, file: output.file.replace('index', name) }))
  declarations.output = [{ file: `dist/${name}.d.ts`, format: 'esm' }]
  return [code, declarations]
})
