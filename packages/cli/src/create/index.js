/**
 * @fileoverview `nicely create [name] [--flags]`: scaffolds a Vite SPA on @niceprototypes/app.
 *
 * Asks the questionnaire (questions.js) with @clack/prompts, skipping every question a flag
 * answered; `--yes` takes the remaining defaults without prompting. Then builds the plan (the base
 * template plus one step per answer, steps.js), writes it into a new folder, and runs git init and
 * the install when asked.
 *
 * @module create
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { QUESTIONS, NICE_UX } = require('./questions');
const { STEPS, createPlan, render, runScript } = require('./steps');

/** The value given for a question's flag, or undefined. `--x` / `--no-x` for a confirm. */
function flagValue(argv, question) {
  if (question.type === 'confirm') {
    if (argv.includes(question.flag)) return true;
    if (argv.includes(question.flag.replace(/^--/, '--no-'))) return false;
    return undefined;
  }
  const index = argv.findIndex((token) => token === question.flag || token.startsWith(`${question.flag}=`));
  if (index < 0) return undefined;
  const token = argv[index];
  const raw = token.includes('=') ? token.slice(token.indexOf('=') + 1) : argv[index + 1];
  if (raw === undefined || (raw.startsWith('--') && !token.includes('='))) throw new Error(`${question.flag} needs a value`);
  return question.type === 'multiselect' ? raw.split(',').map((value) => value.trim()).filter(Boolean) : raw;
}

/** Every flag `nicely create` knows, for the unknown-flag check. */
function knownFlags() {
  const flags = new Set(['--yes', '-y']);
  for (const question of QUESTIONS) {
    flags.add(question.flag);
    if (question.type === 'confirm') flags.add(question.flag.replace(/^--/, '--no-'));
  }
  return flags;
}

/** The first argument that is neither a flag nor the value of a flag that takes one. */
function firstPositional(argv) {
  const takesValue = new Set(QUESTIONS.filter((question) => question.type !== 'confirm').map((question) => question.flag));
  for (let index = 0; index < argv.length; index++) {
    const token = argv[index];
    if (takesValue.has(token)) index++;
    else if (!token.startsWith('-')) return token;
  }
  return undefined;
}

/** Checks a select or multiselect value against its options. */
function validate(question, value, answers) {
  if (question.type !== 'select' && question.type !== 'multiselect') return;
  const options = (typeof question.options === 'function' ? question.options(answers) : question.options).map((option) => option.value);
  const values = question.type === 'select' ? [value] : value;
  const unknown = values.filter((item) => !options.includes(item));
  if (unknown.length) throw new Error(`${question.flag}: unknown value ${unknown.join(', ')} (one of: ${options.join(', ')})`);
}

/** The answers: flags first, then prompts (or defaults with --yes), in questionnaire order. */
async function collectAnswers(argv) {
  const unknown = argv.filter((token) => token.startsWith('-') && !knownFlags().has(token.split('=')[0]));
  if (unknown.length) throw new Error(`unknown flag${unknown.length > 1 ? 's' : ''}: ${unknown.join(', ')}`);
  const yes = argv.includes('--yes') || argv.includes('-y');
  // The project name may also come as the first positional argument: `nicely create my-app`.
  const positional = firstPositional(argv);
  const answers = {};
  const missing = [];
  for (const question of QUESTIONS) {
    let value = flagValue(argv, question);
    if (value === undefined && question.id === 'name' && positional) value = positional;
    if (value === undefined) missing.push(question.id);
    else {
      validate(question, value, answers);
      answers[question.id] = value;
    }
  }
  if (missing.length && !yes && !process.stdin.isTTY) {
    throw new Error(`no terminal to ask in: pass --yes for the defaults, or answer with flags (${missing.map((id) => QUESTIONS.find((q) => q.id === id).flag).join(' ')})`);
  }
  const prompts = missing.length && !yes ? await import('@clack/prompts') : null;
  prompts?.intro('nicely create');
  for (const question of QUESTIONS) {
    if (!missing.includes(question.id)) continue;
    if (question.when && !question.when(answers)) {
      answers[question.id] = typeof question.default === 'function' ? question.default(answers) : question.default;
      continue;
    }
    const fallback = typeof question.default === 'function' ? question.default(answers) : question.default;
    if (!prompts) {
      answers[question.id] = fallback;
      continue;
    }
    const options = typeof question.options === 'function' ? question.options(answers) : question.options;
    let value;
    if (question.type === 'text') value = await prompts.text({ message: question.message, placeholder: fallback, defaultValue: fallback });
    if (question.type === 'confirm') value = await prompts.confirm({ message: question.message, initialValue: fallback });
    if (question.type === 'select') value = await prompts.select({ message: question.message, options, initialValue: fallback });
    if (question.type === 'multiselect') value = await prompts.multiselect({ message: question.message, options, initialValues: fallback, required: false });
    if (prompts.isCancel(value)) {
      prompts.cancel('Cancelled.');
      process.exit(1);
    }
    answers[question.id] = value;
  }
  return { answers, prompts };
}

/**
 * Runs `nicely create`.
 * @param {string[]} argv - the arguments after `create`
 * @returns {Promise<number>} exit code
 */
async function runCreate(argv) {
  const { answers, prompts } = await collectAnswers(argv);
  const dir = path.resolve(answers.name);
  if (fs.existsSync(dir) && fs.readdirSync(dir).length) throw new Error(`${dir} is not empty`);
  if (answers.local && !fs.existsSync(path.join(NICE_UX, 'packages/ux/node_modules/@niceprototypes'))) {
    throw new Error(`local mode needs an installed nice-ux checkout at ${NICE_UX} (run pnpm install there)`);
  }

  const plan = createPlan(answers, NICE_UX);
  STEPS.forEach((step) => step(plan));
  const files = render(plan);
  for (const [file, content] of files) {
    const target = path.join(dir, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
  const log = (message) => (prompts ? prompts.log.step(message) : console.log(message));
  log(`Wrote ${files.size} files to ${dir}`);

  for (const { label, command, args } of plan.after) {
    log(label);
    const result = spawnSync(command, args, { cwd: dir, stdio: 'inherit' });
    if (result.status !== 0) throw new Error(`${label} failed (exit ${result.status ?? result.error?.message})`);
  }

  const next = [`cd ${path.relative(process.cwd(), dir) || '.'}`, ...(answers.install ? [] : [`${answers.pm} install`]), runScript(answers.pm, 'dev')];
  if (prompts) prompts.outro(`Next: ${next.join(' && ')}`);
  else console.log(`Next: ${next.join(' && ')}`);
  return 0;
}

module.exports = { runCreate };
