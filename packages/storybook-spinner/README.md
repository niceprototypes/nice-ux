# nice-storybook-spinner

A Storybook addon that replaces Storybook's loading states with the Nice
spinner:

- **Boot overlay:** a full-viewport spinner painted at document start in the
  manager (and in `iframe.html` opened on its own), in the theme the user last
  chose, removed once the first story or docs page has rendered.
- **Snapshot mode:** on same-origin navigations of the manager (links,
  `location.assign`, back / forward) in browsers with cross-document View
  Transitions, the previous page stays on screen with the spinner over it
  instead of the opaque overlay, then cross-fades to the rendered page.
- **Preview spinner:** inside the preview iframe, Storybook's native loaders
  (the grey docs skeleton and the story spinner) never show; the Nice spinner
  shows in their place while a story or docs page is preparing.

The spinner is the real `<Icon name="spinner" size="larger" />` from
`nice-react-icon`, rendered to static markup when the package is built. Its
size, stroke width, animation duration and the day/night background and colour
come from `nice-styles` tokens, also at build time. The published package has no
dependencies.

## Install

```bash
npm install -D nice-storybook-spinner
```

Requires (peer): `storybook` ≥ 10.

## Usage

`.storybook/main.ts`:

```ts
const config = {
  addons: [
    "storybook-dark-mode",
    "nice-storybook-spinner",
  ],
}
export default config
```

With options:

```ts
addons: [
  { name: "nice-storybook-spinner", options: { hold: false, timeout: 8000, viewTransition: true } },
]
```

| Option           | Type      | Default | Description |
|------------------|-----------|---------|-------------|
| `hold`           | `boolean` | `false` | Keep the boot overlay (or the held snapshot) up for good. |
| `timeout`        | `number`  | `8000`  | Release after this many ms, whatever the readiness signals say. |
| `viewTransition` | `boolean` | `true`  | Snapshot mode (see below). `false` keeps only the opaque overlay: no `@view-transition` rule is injected and `pagereveal` is not handled. |

## Hold for styling

To keep the boot overlay on screen while styling it, use any of these (the
first one present wins). Hold keeps whichever mode is active up: the opaque
overlay, or in snapshot mode the held snapshot with the spinner over it.

1. Query parameter: `?nsbHold=1` (or `true`) holds, `?nsbHold=0` (or `false`) releases.
2. localStorage: `localStorage.setItem("nice-storybook-spinner:hold", "true")`
   holds, `"false"` releases.
3. The preset option `hold: true`.

`window.__NSB` is a read-only debug view of the overlay: `{ theme, hold, mode, removed }`,
where `mode` is `"overlay"` or `"snapshot"` and `removed` is the signal that took
it down (empty while it is up).

## How it works

The addon is a preset with two hooks. Both put their markup first in the head,
so it runs before any other head content is fetched or parsed.

**`managerHead`** inlines the boot overlay script. It:

- resolves the theme synchronously from storybook-dark-mode's localStorage
  store (`sb-addon-themes-3`): the stored mode when the user chose it explicitly,
  otherwise day;
- mounts the overlay on `<html>` before `<body>` exists;
- removes it after `storyRendered` or `docsRendered`, then `document.fonts.ready`
  (capped at 1s), then two animation frames, so the first frame without the
  overlay is a rendered page;
- removes it immediately on `storyErrored`, `storyThrewException` or
  `storyMissing`, so Storybook's error display is never covered;
- removes it after `timeout` ms regardless.

**Snapshot mode** (`viewTransition`, manager only). `managerHead` also injects a
stylesheet with `@view-transition { navigation: auto }`, which opts the manager
into cross-document View Transitions. The boot script listens for `pagereveal`;
when the event carries a `viewTransition`, it:

- removes the opaque overlay;
- holds the transition: `::view-transition-old(root)` stays at full opacity and
  the live new page stays invisible (long no-op animations, with
  `::view-transition-group(root)` not animated);
- shows the spinner (token size and theme colour, no background) above the
  snapshot under its own `view-transition-name`;
- blocks `keydown` / `keyup` in the capture phase. The browser already blocks
  pointer and wheel input during the transition, but not the keyboard, which
  would otherwise move focus into the hidden page.

It is released by the same signals as the overlay (and by `timeout`) with a
180ms cross-fade to the rendered page, after which `skipTransition()` runs as a
safety net. The preview iframe is part of the snapshot and needs no opt-in.

Snapshot mode needs cross-document View Transitions: Chrome / Edge 126+ and
Safari 18.2+. It is not used on a first visit or on a reload (browsers do not
run a View Transition for either; measured in Chromium 139 and WebKit 26), nor
in other browsers; those get the opaque overlay.

**`previewHead`** adds, inside the preview iframe:

- a stylesheet that hides `.sb-preparing-story` and `.sb-preparing-docs` for
  good, and shows `#nsb-preview-spinner` exactly when Storybook would show its
  loader (`body.sb-show-preparing-story` / `body.sb-show-preparing-docs` without
  `sb-show-main`);
- a script that mounts `#nsb-preview-spinner` as the first child of `<body>`
  as soon as `<body>` exists, themed like the overlay and following
  storybook-dark-mode's `DARK_MODE` event afterwards;
- the boot overlay script, which acts only when `iframe.html` is opened
  top-level (it hides the native loaders and the preview spinner while it is up).

`.sb-nopreview` and `.sb-errordisplay` are never touched.

## Accessibility

Both spinners carry `role="progressbar"` and `aria-busy="true"`, labelled
"Loading Storybook" (boot overlay) and "Loading story" (preview). Under
`prefers-reduced-motion: reduce` the rotation slows to one turn every 2s.

## Development

`npm run build` regenerates `src/generated/spinner.ts` from `nice-react-icon`
and `nice-styles` (the `prebuild` step, `npm run generate`) and bundles with
tsup. The generated file is committed. `npm test` runs the tests against `dist`.

## License

MIT. Copyright (c) 2026 Nice Prototypes.
