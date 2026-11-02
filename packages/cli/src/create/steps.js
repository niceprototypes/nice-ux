/**
 * @fileoverview `nicely create`: the base template and one small add-on step per answer.
 *
 * The base (`template/base` plus `base()` here) is a TypeScript Vite SPA on @niceprototypes/app with
 * the plain-URL router. Each step changes the plan: package.json fields, imports and statements in
 * src/main.tsx and vite.config.ts, token map entries, and added files. `render()` turns the plan into
 * files; nothing is written until every step has run.
 *
 * @module create/steps
 */

const fs = require('fs');
const path = require('path');

/** Versions of the npm packages a project can get. */
const VERSIONS = {
  react: '^19.2.0',
  'react-dom': '^19.2.0',
  'styled-components': '^6.1.19',
  vite: '^8.3.1',
  '@vitejs/plugin-react': '^6.1.1',
  typescript: '^6.0.3',
  '@types/react': '^19.2.14',
  '@types/react-dom': '^19.2.3',
  '@types/node': '^24.19.0',
  // Vitest 5 pins its optional peers; with Vitest 4, npm 11 resolves its @vitest/browser-playwright
  // peer to 5.x and crashes when jsdom is installed beside it.
  vitest: '^5.0.5',
  '@vitest/browser-playwright': '^5.0.5',
  // Exact: the version whose Chromium the Playwright cache on this Mac holds.
  playwright: '1.63.0',
  '@playwright/test': '1.63.0',
  jsdom: '^30.1.3',
  oxlint: '^1.86.0',
  eslint: '^8.57.1',
  prettier: '^3.9.10',
  '@typescript-eslint/eslint-plugin': '^6.21.0',
  '@typescript-eslint/parser': '^6.21.0',
  'eslint-config-prettier': '^9.1.2',
  'eslint-plugin-prettier': '^5.5.7',
  'eslint-plugin-react': '^7.37.5',
  'eslint-plugin-react-hooks': '^4.6.2',
  'babel-plugin-react-compiler': '^1.0.0',
  '@rolldown/plugin-babel': '^0.2.0',
  '@babel/core': '^7.29.0',
  'react-router': '^7.18.5',
  '@tanstack/react-router': '^1.170.46',
  'lucide-react': '^1.66.0',
};

/** Each router adapter: its subpath, export and the dependency it needs. */
const ROUTERS = {
  plain: { subpath: 'plain', name: 'plainRouter', dependency: null },
  'react-router': { subpath: 'react-router', name: 'reactRouter', dependency: 'react-router' },
  'tanstack-router': { subpath: 'tanstack-router', name: 'tanstackRouter', dependency: '@tanstack/react-router' },
};

/** The run command of a package script under each package manager. */
const runScript = (pm, script) => (pm === 'npm' ? `npm run ${script}` : `${pm} ${script}`);

/** A JavaScript string literal. */
const literal = (value) => `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/** The URL path of a scene folder key, as @niceprototypes/app builds it (for tests that open scenes). */
const SLUG_SOURCE = `const urlOf = (key: string) =>
  '/frame/stories/' +
  key
    .split('/')
    .slice(key.split('/').indexOf('stories') + 1, -1)
    .map((folder) => folder.replace(/^\\d+(\\.\\d+)*\\s+/, '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    .join('/');`;

/**
 * The plan every step changes.
 * @param {object} answers
 * @param {string} niceUx - the nice-ux checkout
 */
function createPlan(answers, niceUx) {
  return {
    answers,
    niceUx,
    pkg: { name: path.basename(answers.name), private: true, version: '0.0.0', type: 'module', scripts: {}, dependencies: {}, devDependencies: {} },
    /** @niceprototypes/* packages the project imports (package.json entries when not linked locally) */
    nicePackages: new Set(['app', 'styles', 'ink', 'flex', 'tree']),
    files: new Map(),
    main: { imports: [], startup: [], appProps: [] },
    vite: { header: [], imports: ["import react from '@vitejs/plugin-react';"], plugins: ['react()'], config: [] },
    tsconfigPaths: {},
    tokens: { prefixed: [], core: [], imports: new Set(['setTokens']) },
    readme: [],
    after: [],
  };
}

const dev = (plan, ...names) => names.forEach((name) => (plan.pkg.devDependencies[name] = VERSIONS[name]));
const dep = (plan, ...names) => names.forEach((name) => (plan.pkg.dependencies[name] = VERSIONS[name]));

// ── Base ──────────────────────────────────────────────────────────────────────

function base(plan) {
  plan.pkg.scripts = { dev: 'vite', build: 'vite build', preview: 'vite preview', typecheck: 'tsc' };
  dep(plan, 'react', 'react-dom', 'styled-components');
  dev(plan, 'vite', '@vitejs/plugin-react', 'typescript', '@types/react', '@types/react-dom', '@types/node');
  plan.files.set('.nice/surveys/.gitkeep', '');
  plan.files.set('.nice/research/.gitkeep', '');
  plan.readme.push(
    '- `.nice/`: the project\'s notes for agents. Survey and research files go in date folders:',
    '  `.nice/surveys/2026-11-01/<file>.md`, `.nice/research/2026-10-31/<file>.md`. `nicely bump` writes `.nice/bump.md` beside them.',
  );
}

// ── JS/React ──────────────────────────────────────────────────────────────────

/** TypeScript off: runs last; every .ts/.tsx file becomes .js/.jsx with its types removed. */
function typescript(plan) {
  if (plan.answers.ts) return;
  plan.toJavaScript = true;
  delete plan.pkg.devDependencies.typescript;
  delete plan.pkg.scripts.typecheck;
}

function packageManager(plan) {
  plan.readme.unshift(`Run \`${runScript(plan.answers.pm, 'dev')}\`.`);
}

function router(plan) {
  const { subpath, name, dependency } = ROUTERS[plan.answers.router];
  plan.routerName = name;
  plan.routerImport = `import { ${name} } from '@niceprototypes/app/adapters/${subpath}';`;
  plan.main.imports.push(plan.routerImport);
  if (dependency) {
    dep(plan, dependency);
    plan.routerDependency = dependency;
    // One copy of the router: the adapter, resolved from the nice-ux checkout in local mode, takes the project's.
    plan.vite.config.push(`resolve: { dedupe: [${literal(dependency)}] },`);
  }
}

function tests(plan) {
  const { tests: kind, pm } = plan.answers;
  if (kind === 'none') return;
  const wrapperImport = plan.wrapper ? `import { SceneWrapper } from './app/SceneWrapper';\n` : '';
  const wrapperProp = plan.wrapper ? ' wrapper={SceneWrapper}' : '';
  const renderTest = (environmentNote) => `import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, test } from 'vitest';
import App from '@niceprototypes/app';
${plan.routerImport}

import '@niceprototypes/styles/tokens.css';
${plan.tokens.prefixed.length || plan.tokens.core.length ? "import './app/tokens';\n" : ''}${wrapperImport}
// One test per scene, from the same glob as src/main.tsx. Each opens the scene in the app's bare
// view (/frame/stories/…) ${environmentNote} and fails on any error it throws or reports.
const scenes = import.meta.glob<{ default: ComponentType }>('./stories/**/index.tsx');

${SLUG_SOURCE}

test.each(Object.keys(scenes))('%s renders without errors', async (key) => {
  const errors: unknown[] = [];
  const onError = (event: ErrorEvent) => errors.push(event.error ?? event.message);
  const consoleError = console.error;
  console.error = (...args: unknown[]) => errors.push(args);
  window.addEventListener('error', onError);
  window.history.replaceState(null, '', urlOf(key));
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  try {
    root.render(<App scenes={scenes} router={${plan.routerName}}${wrapperProp} />);
    await expect.poll(() => container.querySelector('[tabindex="-1"]')?.childElementCount ?? 0).toBeGreaterThan(0);
    expect(errors).toEqual([]);
  } finally {
    root.unmount();
    container.remove();
    window.removeEventListener('error', onError);
    console.error = consoleError;
  }
});
`;
  if (kind === 'vitest-browser') {
    dev(plan, 'vitest', '@vitest/browser-playwright', 'playwright');
    plan.pkg.scripts.test = 'vitest run';
    plan.vite.header.push('/// <reference types="vitest/config" />');
    plan.vite.imports.push("import { playwright } from '@vitest/browser-playwright';");
    plan.vite.config.push(
      "// src/stories.test.tsx renders every scene in Chromium (Vitest browser mode on Playwright).",
      "test: { browser: { enabled: true, headless: true, provider: playwright({}), instances: [{ browser: 'chromium' }] } },",
    );
    plan.files.set('src/stories.test.tsx', renderTest('in Chromium'));
  }
  if (kind === 'jsdom') {
    dev(plan, 'vitest', 'jsdom');
    plan.pkg.scripts.test = 'vitest run';
    plan.vite.header.push('/// <reference types="vitest/config" />');
    plan.vite.config.push("// src/stories.test.tsx renders every scene in jsdom.", "test: { environment: 'jsdom' },");
    plan.files.set('src/stories.test.tsx', renderTest('in jsdom'));
  }
  if (kind === 'playwright') {
    dev(plan, '@playwright/test');
    plan.pkg.scripts.test = 'playwright test';
    plan.files.set(
      'playwright.config.ts',
      `import { defineConfig, devices } from '@playwright/test';

// e2e/scenes.spec.ts opens every scene on the dev server, which Playwright starts.
export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: 'http://localhost:5199' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: { command: ${literal(`${runScript(pm, 'dev')} -- --port 5199 --strictPort`)}, url: 'http://localhost:5199', reuseExistingServer: true },
});
`,
    );
    plan.files.set(
      'e2e/scenes.spec.ts',
      `import { globSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// One test per scene folder under src/stories: its bare view (/frame/stories/…) renders without page errors.
const keys = globSync('src/stories/**/index.tsx');

${SLUG_SOURCE}

for (const key of keys) {
  test(\`\${key} renders without errors\`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(urlOf(key));
    await expect(page.locator('[tabindex="-1"] > *').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}
`,
    );
  }
}

function lint(plan) {
  const { lint: kind, local } = plan.answers;
  if (kind === 'oxlint') {
    dev(plan, 'oxlint');
    plan.pkg.scripts.lint = 'oxlint';
  }
  if (kind === 'eslint-prettier') {
    // The Nice configs are private packages: they come from the nice-ux checkout.
    plan.pkg.devDependencies['@niceprototypes/config-eslint'] = `file:${path.join(plan.niceUx, 'packages/config-eslint')}`;
    plan.pkg.devDependencies['@niceprototypes/config-prettier'] = `file:${path.join(plan.niceUx, 'packages/config-prettier')}`;
    dev(
      plan,
      'eslint',
      'prettier',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
    );
    plan.pkg.prettier = '@niceprototypes/config-prettier';
    plan.pkg.scripts.lint = 'eslint src';
    plan.pkg.scripts.format = 'prettier --write src';
    plan.files.set('.eslintrc.cjs', 'module.exports = require("@niceprototypes/config-eslint")\n');
    // The generated files are written in one style; the project's Prettier config sets its own.
    const exec = { npm: ['npx'], pnpm: ['pnpm', 'exec'], yarn: ['yarn'], bun: ['bunx'] }[plan.answers.pm];
    plan.format = { label: 'prettier --write src', command: exec[0], args: [...exec.slice(1), 'prettier', '--write', 'src'] };
    if (!local) plan.readme.push('- Lint: config-eslint and config-prettier are private; they link to the nice-ux checkout.');
    if (!plan.answers.install) plan.readme.push(`- Lint: run \`${runScript(plan.answers.pm, 'format')}\` once after installing; the generated files are not in the Prettier style yet.`);
  }
}

function reactCompiler(plan) {
  if (!plan.answers.reactCompiler) return;
  dev(plan, 'babel-plugin-react-compiler', '@rolldown/plugin-babel', '@babel/core');
  plan.vite.imports[0] = "import react, { reactCompilerPreset } from '@vitejs/plugin-react';";
  plan.vite.imports.push("import babel from '@rolldown/plugin-babel';");
  plan.vite.plugins.push('babel({ presets: [reactCompilerPreset()] })');
}

function install(plan) {
  if (!plan.answers.install) return;
  plan.after.push({ label: 'git init', command: 'git', args: ['init', '-q'] });
  plan.after.push({ label: `${plan.answers.pm} install`, command: plan.answers.pm, args: ['install'] });
  if (plan.format) plan.after.push(plan.format);
}

// ── Nice ──────────────────────────────────────────────────────────────────────

/** The sample scene or page: one Nice heading and line, through Ink in a Flex. */
const sample = (component, title, line) => `import Flex from '@niceprototypes/flex';
import Ink from '@niceprototypes/ink';

/** ${title}: the default export is what the app renders for this folder. */
const ${component} = () => (
  <Flex direction="column" gap="small" padding="large">
    <Ink as="h1" size="larger" weight="semibold">
      ${title}
    </Ink>
    <Ink as="p">${line}</Ink>
  </Flex>
);

export default ${component};
`;

function kind(plan) {
  if (plan.answers.kind === 'app') {
    plan.files.set('src/stories/1 Home/1 Welcome/index.tsx', sample('Welcome', 'Welcome', 'A page: src/stories/1 Home/1 Welcome/index.tsx.'));
    plan.readme.push('- Pages: `src/stories/<N Section>/<N Page>/index.tsx` (default export). Folder names are the nav; numbers order them.');
    return;
  }
  plan.wrapper = true;
  plan.files.set('src/stories/1 Studio/1 First scene/index.tsx', sample('FirstScene', 'First scene', 'A scene: src/stories/1 Studio/1 First scene/index.tsx.'));
  plan.tokens.prefixed.push(
    "// The device frame's sizes (SceneWrapper.tsx), picked by the URL's ?device=.",
    "frameWidth: { phone: '402px', tablet: '834px', desktop: '1440px' },",
    "frameHeight: { phone: '874px', tablet: '1194px', desktop: '900px' },",
  );
  plan.files.set(
    'src/app/SceneWrapper.tsx',
    `import type { ComponentProps } from 'react';
import type { AppWrapperType } from '@niceprototypes/app';
import Flex from '@niceprototypes/flex';

import { getToken } from './tokens';

const DEVICES = ['phone', 'tablet', 'desktop'] as const;
type Device = (typeof DEVICES)[number];

/** Every scene sits in a device frame: the URL's ?device= (phone, tablet, desktop; desktop by default). */
export const SceneWrapper: AppWrapperType = ({ children, search }: ComponentProps<AppWrapperType>) => {
  const requested = search.get('device') as Device;
  const device: Device = DEVICES.includes(requested) ? requested : 'desktop';
  return (
    <Flex justifyContent="center" padding="large">
      <Flex
        direction="column"
        style={{
          width: getToken(\`${plan.answers.prefix}.frameWidth:\${device}\`),
          height: getToken(\`${plan.answers.prefix}.frameHeight:\${device}\`),
          maxWidth: '100%',
          overflow: 'hidden',
          border: \`\${getToken('borderWidth')} solid \${getToken('borderColor')}\`,
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
`,
  );
  plan.main.imports.push("import { SceneWrapper } from './app/SceneWrapper';");
  plan.main.appProps.push('wrapper={SceneWrapper}');
  plan.readme.push(
    '- Scenes: `src/stories/<N Story>/<N Chapter>/<N.M Scene>/index.tsx`, or `<N Chapter>/index.tsx` for a one-scene chapter (default export).',
    '  Folder names are the nav, the URL and the only metadata; numbers order them. `/stories/<path>` is a scene, `/frame/stories/<path>` the scene alone; `?device=` picks the frame.',
  );
}

function prefix(plan) {
  plan.readme.push(`- Tokens: \`src/app/tokens.ts\`, prefix \`${plan.answers.prefix}\`; CSS reads \`var(--np--${plan.answers.prefix}--{group}--{variant})\`, TypeScript its \`getToken\`.`);
}

function brand(plan) {
  const colours = plan.answers.brand.split(',').map((value) => value.trim()).filter(Boolean).slice(0, 4);
  const invalid = colours.filter((value) => !/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value));
  if (invalid.length) throw new Error(`--brand takes hex colours (got ${invalid.join(', ')})`);
  if (!colours.length) return;
  plan.tokens.prefixed.push(`brand: { ${colours.map((value, index) => `'${index + 1}': ${literal(value)}`).join(', ')} },`);
}

/** The families a Google Fonts css2 URL loads (`family=Inter:wght@…` → Inter). */
const googleFamilies = (url) =>
  [...new URL(url).searchParams.getAll('family')].map((family) => family.split(':')[0].replace(/\+/g, ' '));

function fonts(plan) {
  const { fonts: source, fontSource } = plan.answers;
  if (source === 'nice') return;
  if (!fontSource) throw new Error(`--fonts ${source} needs --font-source (the URL, kit id or folder)`);
  let call;
  if (source === 'google') {
    call = `googleFonts: ${literal(fontSource)}`;
    const families = googleFamilies(fontSource).map((family) => `'${family}'`).join(', ');
    plan.tokens.imports.add('getToken as getCoreToken');
    plan.tokens.core.push(`fontFamily: { base: \`${families}, \${getCoreToken('fontFamily', { as: 'value' })}\`, heading: \`${families}, \${getCoreToken('fontFamily', { as: 'value' })}\` },`);
  }
  if (source === 'adobe') {
    call = `adobeFonts: ${literal(fontSource)}`;
    plan.readme.push('- Fonts: the Adobe kit loads in `src/app/fonts.ts`; set its families as `fontFamily` in `src/app/tokens.ts`.');
  }
  if (source === 'self-hosted') {
    const folder = fontSource.replace(/^\/+|\/+$/g, '');
    call = `links: [{ rel: 'stylesheet', href: ${literal(`/${folder}/fonts.css`)} }]`;
    plan.files.set(`public/${folder}/fonts.css`, `/* @font-face rules for the font files in this folder (public/${folder}). */\n`);
    plan.readme.push(`- Fonts: put the files and their @font-face rules in \`public/${folder}/\`; set the families as \`fontFamily\` in \`src/app/tokens.ts\`.`);
  }
  plan.files.set('src/app/fonts.ts', `import { injectFonts } from '@niceprototypes/styles';\n\ninjectFonts({ ${call} });\n`);
  plan.main.imports.push("import './app/fonts';");
}

function theme(plan) {
  if (plan.answers.theme === 'os') return;
  plan.main.imports.push("import { applyTheme } from '@niceprototypes/styles';");
  plan.main.startup.push(`applyTheme(${literal(plan.answers.theme)});`);
}

function icons(plan) {
  if (plan.answers.icons === 'nice') plan.nicePackages.add('icon');
  else dep(plan, 'lucide-react');
}

function components(plan) {
  plan.answers.components.forEach((name) => plan.nicePackages.add(name));
}

/** Local mode: @niceprototypes/* from the checkout (vite.config.ts, tsconfig paths); otherwise from npm. */
function local(plan) {
  const ux = path.join(plan.niceUx, 'packages/ux/node_modules/@niceprototypes');
  if (plan.answers.local) {
    plan.pkg.devDependencies['@niceprototypes/config-vite'] = `file:${path.join(plan.niceUx, 'packages/config-vite')}`;
    plan.tsconfigPaths = { '@niceprototypes/*': [`${ux}/*`], '@niceprototypes/app/adapters/*': [`${ux}/app/dist/adapters/*`] };
    // Local mode keeps the Nice packages out of pre-bundling, so Vite finds what they import
    // (styled-components, the router) only once a page runs, and reloads it: a first test run fails on that reload.
    const include = ['styled-components', ...(plan.routerDependency ? [plan.routerDependency] : [])];
    plan.vite.config.unshift(`optimizeDeps: { include: [${include.map(literal).join(', ')}] },`);
    plan.readme.push(`- Nice packages resolve from ${plan.niceUx} (local mode, \`vite.config.ts\`); \`NICE_LOCAL=\` turns it off once they are on npm.`);
    return;
  }
  plan.pkg.devDependencies['@niceprototypes/config-vite'] = `^${versionOf(plan, 'config-vite')}`;
  plan.readme.push('- Nice packages install from npm (not published yet: install fails until the first release).');
}

function deploy(plan) {
  const { deploy: target, pm } = plan.answers;
  if (target === 'firebase') {
    plan.files.set('firebase.json', `${JSON.stringify({ hosting: { public: 'dist', ignore: ['firebase.json', '**/.*', '**/node_modules/**'], rewrites: [{ source: '**', destination: '/index.html' }] } }, null, 2)}\n`);
    plan.files.set('.firebaserc', `${JSON.stringify({ projects: { default: plan.pkg.name } }, null, 2)}\n`);
    plan.pkg.scripts.deploy = `${runScript(pm, 'build')} && firebase deploy --only hosting`;
    plan.readme.push('- Deploy: `firebase deploy --only hosting` (set the project id in `.firebaserc`).');
  }
  if (target === 'static') {
    // A static host serves 404.html for unknown paths: the app's index takes every route.
    plan.pkg.scripts.build = 'vite build && cp dist/index.html dist/404.html';
    plan.readme.push('- Deploy: upload `dist/` to any static host; `404.html` serves every route.');
  }
}

/** The version of a nice-ux package in the checkout. */
function versionOf(plan, name) {
  return JSON.parse(fs.readFileSync(path.join(plan.niceUx, 'packages', name, 'package.json'), 'utf8')).version;
}

/** Steps in order: the base, then one per answer. Kind runs before tests (its wrapper is tested). */
const STEPS = [base, packageManager, router, kind, prefix, brand, fonts, theme, icons, components, local, tests, lint, reactCompiler, deploy, install, typescript];

// ── Render ────────────────────────────────────────────────────────────────────

function renderTokens(plan) {
  const { prefixed, core, imports } = plan.tokens;
  if (!prefixed.length && !core.length) return;
  const lines = [`import { ${[...imports].join(', ')} } from '@niceprototypes/styles';`, ''];
  if (prefixed.length) {
    lines.push(
      `/** The project's tokens, prefix \`${plan.answers.prefix}\`: CSS reads var(--np--${plan.answers.prefix}--{group}--{variant}). */`,
      'export const getToken = setTokens(',
      '  {',
      ...prefixed.map((line) => `    ${line}`),
      '  },',
      `  ${literal(plan.answers.prefix)},`,
      ');',
    );
  }
  if (core.length) {
    if (prefixed.length) lines.push('');
    lines.push('// The app\'s one unprefixed map: overrides of Nice\'s core tokens.', 'setTokens({', ...core.map((line) => `  ${line}`), '});');
  }
  plan.files.set('src/app/tokens.ts', `${lines.join('\n')}\n`);
  // Before every other startup import except the token stylesheet, so its overrides follow it.
  plan.main.imports.unshift("import './app/tokens';");
}

function renderMain(plan) {
  const props = ['scenes={scenes}', `router={${plan.routerName}}`, ...plan.main.appProps].join(' ');
  return `import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@niceprototypes/app';
import '@niceprototypes/styles/tokens.css';
${plan.main.imports.join('\n')}
${plan.main.startup.length ? `\n${plan.main.startup.join('\n')}\n` : ''}
/** Every scene: an index.tsx two or three folders under src/stories (the folders are the nav). */
const scenes = import.meta.glob<{ default: ComponentType }>('./stories/**/index.tsx');

createRoot(document.getElementById('root')!).render(<App ${props} />);
`;
}

function renderVite(plan) {
  const localLine = plan.answers.local
    ? `// Local mode: every @niceprototypes/* import resolves to this nice-ux checkout, with one copy of React
// and styled-components (this app's). \`NICE_LOCAL=\` (empty) turns it off once the packages are on npm.
const local = process.env.NICE_LOCAL ?? ${literal(plan.niceUx)};
`
    : '';
  const options = plan.answers.local ? '{ appRoot: import.meta.dirname, local: local || undefined }' : '{ appRoot: import.meta.dirname }';
  return `${plan.vite.header.map((line) => `${line}\n`).join('')}${plan.vite.imports.join('\n')}
import { defineConfig, mergeConfig } from 'vite';
import { createNiceViteConfig } from '@niceprototypes/config-vite';

${localLine}
export default defineConfig(
  mergeConfig(createNiceViteConfig(${options}), {
    plugins: [${plan.vite.plugins.join(', ')}],
${plan.vite.config.map((line) => `    ${line}`).join('\n')}
  }),
);
`;
}

function renderTsconfig(plan) {
  const compilerOptions = {
    target: 'es2023',
    lib: ['ES2023', 'DOM', 'DOM.Iterable'],
    module: 'esnext',
    moduleResolution: 'bundler',
    jsx: 'react-jsx',
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    verbatimModuleSyntax: true,
    types: ['vite/client', 'node'],
    ...(Object.keys(plan.tsconfigPaths).length && { paths: plan.tsconfigPaths }),
  };
  const include = ['src', 'vite.config.ts', ...(plan.answers.tests === 'playwright' ? ['playwright.config.ts', 'e2e'] : [])];
  return `${JSON.stringify({ compilerOptions, include }, null, 2)}\n`;
}

function renderReadme(plan) {
  return `# ${plan.pkg.name}

A Vite SPA on \`@niceprototypes/app\`: a Tree nav of the folders under \`src/stories\` beside the scene
region. Made with \`nicely create\`.

${plan.readme[0]}

${plan.readme.slice(1).join('\n')}
`;
}

/** Every file of the project, from the template and the plan: path → content. */
function render(plan) {
  renderTokens(plan);
  for (const name of plan.nicePackages) {
    if (!plan.answers.local) plan.pkg.dependencies[`@niceprototypes/${name}`] = `^${versionOf(plan, name)}`;
  }
  const files = new Map();
  const templateDir = path.resolve(__dirname, '../../template/base');
  const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      const relative = path.relative(templateDir, full).replace(/(^|\/)_gitignore$/, '$1.gitignore');
      files.set(relative, fs.readFileSync(full, 'utf8').replace(/\{\{name\}\}/g, plan.pkg.name));
    });
  walk(templateDir);
  for (const [file, content] of plan.files) files.set(file, content);
  files.set('src/main.tsx', renderMain(plan));
  files.set('vite.config.ts', renderVite(plan));
  files.set('tsconfig.json', renderTsconfig(plan));
  files.set('README.md', renderReadme(plan));
  files.set('package.json', `${JSON.stringify(plan.pkg, null, 2)}\n`);
  return plan.toJavaScript ? toJavaScript(files) : files;
}

/** TypeScript off: every .ts/.tsx file transpiled to .js/.jsx, tsconfig.json dropped, references renamed. */
function toJavaScript(files) {
  const ts = require('typescript');
  const out = new Map();
  for (const [file, content] of files) {
    if (file === 'tsconfig.json' || file.endsWith('.d.ts')) continue;
    if (!/\.tsx?$/.test(file)) {
      out.set(file, content.replace('/src/main.tsx', '/src/main.jsx'));
      continue;
    }
    const { outputText } = ts.transpileModule(content, {
      compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.Preserve, verbatimModuleSyntax: false },
      fileName: file,
    });
    const renamed = file.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');
    out.set(renamed, outputText.replace(/\.\/stories\/\*\*\/index\.tsx/g, './stories/**/index.jsx').replace(/src\/stories\/\*\*\/index\.tsx/g, 'src/stories/**/index.jsx'));
  }
  return out;
}

module.exports = { STEPS, createPlan, render, runScript };
