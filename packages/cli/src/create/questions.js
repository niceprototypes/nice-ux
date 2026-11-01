/**
 * @fileoverview The `nicely create` questionnaire (survey 006, Q9), in the order it is asked.
 *
 * Each question is also a flag, so agents scaffold without prompts; `--yes` takes the default of
 * every question no flag answered. A question's `default` may be a function of the answers before it.
 *
 * Types: `text`, `confirm` (flag `--x` / `--no-x`), `select` (one of `options`), `multiselect`
 * (comma-separated values).
 *
 * @module create/questions
 */

const fs = require('fs');
const path = require('path');

/** The nice-ux checkout this CLI runs from (packages/cli/src/create → the repository root). */
const NICE_UX = path.resolve(__dirname, '../../../..');

/** The package manager that ran the CLI (npm_config_user_agent, as create-vite reads it), else npm. */
function detectRunner() {
  const agent = process.env.npm_config_user_agent || '';
  const name = agent.split(' ')[0].split('/')[0];
  return ['npm', 'pnpm', 'yarn', 'bun'].includes(name) ? name : 'npm';
}

/** A project name as a token prefix: lower case, alphanumerics and hyphens. */
const slugOf = (name) => path.basename(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'app';

/** Packages the shell already brings (styles, flex, ink, tree, app). */
const SHELL_PACKAGES = ['styles', 'flex', 'ink', 'tree', 'app'];

/**
 * The extra component packages a project can add: every package in the manifest's components.txt
 * (`Name(package) …` lines) beyond the shell's.
 */
function componentPackages() {
  const file = path.join(NICE_UX, 'manifest/agents/components.txt');
  if (!fs.existsSync(file)) return [];
  const names = fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => /^[A-Z]\w*\(([a-z][\w-]*)\)/.exec(line)?.[1])
    .filter(Boolean);
  return [...new Set(names)].filter((name) => !SHELL_PACKAGES.includes(name)).sort();
}

/** @type {Array<{ id: string, flag: string, message: string, type: string, options?: Array<{ value: string, label: string }>, default: any, group: string }>} */
const QUESTIONS = [
  { group: 'JS/React', id: 'name', flag: '--name', type: 'text', message: 'Project name and folder', default: 'nice-app' },
  { group: 'JS/React', id: 'ts', flag: '--ts', type: 'confirm', message: 'TypeScript?', default: true },
  {
    group: 'JS/React', id: 'pm', flag: '--pm', type: 'select', message: 'Package manager',
    options: ['npm', 'pnpm', 'yarn', 'bun'].map((value) => ({ value, label: value })),
    default: detectRunner,
  },
  {
    group: 'JS/React', id: 'router', flag: '--router', type: 'select', message: 'Router adapter',
    options: [
      { value: 'plain', label: 'Plain URL (no dependency)' },
      { value: 'react-router', label: 'React Router 7' },
      { value: 'tanstack-router', label: 'TanStack Router' },
    ],
    default: 'plain',
  },
  {
    group: 'JS/React', id: 'tests', flag: '--tests', type: 'select', message: 'Tests',
    options: [
      { value: 'vitest-browser', label: 'Vitest browser mode (Chromium)' },
      { value: 'playwright', label: 'Playwright end-to-end' },
      { value: 'jsdom', label: 'Vitest + jsdom' },
      { value: 'none', label: 'None' },
    ],
    default: 'vitest-browser',
  },
  {
    group: 'JS/React', id: 'lint', flag: '--lint', type: 'select', message: 'Lint and format',
    options: [
      { value: 'oxlint', label: 'oxlint' },
      { value: 'eslint-prettier', label: 'config-eslint + config-prettier' },
      { value: 'none', label: 'None' },
    ],
    default: 'oxlint',
  },
  { group: 'JS/React', id: 'reactCompiler', flag: '--react-compiler', type: 'confirm', message: 'React Compiler?', default: false },
  { group: 'JS/React', id: 'install', flag: '--install', type: 'confirm', message: 'Init git and install dependencies?', default: true },
  {
    group: 'Nice', id: 'kind', flag: '--kind', type: 'select', message: 'Project kind',
    options: [
      { value: 'studio', label: 'Scene studio (shell + stories, device frame)' },
      { value: 'app', label: 'App (pages + Tree nav)' },
    ],
    default: 'studio',
  },
  { group: 'Nice', id: 'prefix', flag: '--prefix', type: 'text', message: 'Tokens prefix for setTokens', default: (answers) => slugOf(answers.name) },
  {
    group: 'Nice', id: 'brand', flag: '--brand', type: 'text', message: "Brand colours, up to 4 hex values, comma-separated (empty: Nice's brandColor)",
    default: '',
  },
  {
    group: 'Nice', id: 'fonts', flag: '--fonts', type: 'select', message: 'Fonts',
    options: [
      { value: 'nice', label: 'Nice default stack' },
      { value: 'google', label: 'Google Fonts URL' },
      { value: 'adobe', label: 'Adobe Fonts kit id' },
      { value: 'self-hosted', label: 'Self-hosted folder' },
    ],
    default: 'nice',
  },
  {
    group: 'Nice', id: 'fontSource', flag: '--font-source', type: 'text', message: 'Font source (the URL, kit id or public folder)',
    default: (answers) => (answers.fonts === 'self-hosted' ? 'fonts' : ''),
    when: (answers) => answers.fonts !== 'nice',
  },
  {
    group: 'Nice', id: 'theme', flag: '--theme', type: 'select', message: 'Default theme',
    options: [
      { value: 'os', label: 'Follow the OS' },
      { value: 'day', label: 'Day' },
      { value: 'night', label: 'Night' },
    ],
    default: 'os',
  },
  {
    group: 'Nice', id: 'icons', flag: '--icons', type: 'select', message: 'Icon set',
    options: [
      { value: 'nice', label: 'Nice icons' },
      { value: 'lucide', label: 'Lucide (only for a whole new set; you pick each icon)' },
    ],
    default: 'nice',
  },
  {
    group: 'Nice', id: 'components', flag: '--components', type: 'multiselect', message: 'Extra components (beyond the shell: styles, flex, ink, tree)',
    options: () => componentPackages().map((value) => ({ value, label: value })),
    default: [],
  },
  { group: 'Nice', id: 'local', flag: '--local', type: 'confirm', message: 'Link to this local nice-ux checkout (NICE_LOCAL)?', default: true },
  {
    group: 'Nice', id: 'deploy', flag: '--deploy', type: 'select', message: 'Deploy target',
    options: [
      { value: 'none', label: 'None' },
      { value: 'firebase', label: 'Firebase Hosting' },
      { value: 'static', label: 'Static folder' },
    ],
    default: 'none',
  },
];

module.exports = { QUESTIONS, NICE_UX, slugOf };
