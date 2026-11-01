// `nicely create` with flags only (no prompts, no install): the files each answer adds.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const nicely = path.join(__dirname, '..', 'nicely');

/** Scaffolds into a fresh temporary folder; returns a reader of its files. */
function create(...flags) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'nicely-create-'));
  const result = spawnSync(process.execPath, [nicely, 'create', 'app', '--no-install', '--yes', ...flags], { cwd: parent, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr + result.stdout);
  const dir = path.join(parent, 'app');
  return { read: (file) => fs.readFileSync(path.join(dir, file), 'utf8'), exists: (file) => fs.existsSync(path.join(dir, file)) };
}

test('defaults: a TypeScript scene studio on the plain router, Vitest browser tests, oxlint, .nice folders', () => {
  const app = create();
  assert.match(app.read('src/main.tsx'), /import \{ plainRouter \} from '@niceprototypes\/app\/adapters\/plain'/);
  assert.match(app.read('src/main.tsx'), /wrapper=\{SceneWrapper\}/);
  assert.ok(app.exists('src/stories/1 Studio/1 First scene/index.tsx'));
  assert.ok(app.exists('src/stories.test.tsx'));
  assert.ok(app.exists('.nice/surveys/.gitkeep') && app.exists('.nice/research/.gitkeep'));
  const pkg = JSON.parse(app.read('package.json'));
  assert.equal(pkg.scripts.lint, 'oxlint');
  assert.match(pkg.devDependencies['@niceprototypes/config-vite'], /^file:/);
});

for (const [router, name, dependency] of [
  ['react-router', 'reactRouter', 'react-router'],
  ['tanstack-router', 'tanstackRouter', '@tanstack/react-router'],
]) {
  test(`--router ${router}: its adapter, its dependency, one copy of it`, () => {
    const app = create('--router', router);
    assert.match(app.read('src/main.tsx'), new RegExp(`import \\{ ${name} \\} from '@niceprototypes/app/adapters/${router}'`));
    assert.ok(JSON.parse(app.read('package.json')).dependencies[dependency]);
    assert.match(app.read('vite.config.ts'), new RegExp(`dedupe: \\['${dependency.replace('/', '\\/')}'\\]`));
  });
}

test('--no-ts --kind app --theme night: JavaScript pages, the theme applied, no tsconfig', () => {
  const app = create('--no-ts', '--kind', 'app', '--theme', 'night');
  assert.ok(!app.exists('tsconfig.json'));
  assert.match(app.read('index.html'), /src\/main\.jsx/);
  assert.match(app.read('src/main.jsx'), /applyTheme\('night'\)/);
  assert.ok(app.exists('src/stories/1 Home/1 Welcome/index.jsx'));
});

test('an unknown value or flag fails with the allowed values', () => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'nicely-create-'));
  const result = spawnSync(process.execPath, [nicely, 'create', 'app', '--router', 'next', '--yes'], { cwd: parent, encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stdout + result.stderr, /plain, react-router, tanstack-router/);
});
