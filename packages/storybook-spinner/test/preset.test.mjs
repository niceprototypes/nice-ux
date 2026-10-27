// Runs against the built dist (npm run build first).
import { test } from "node:test"
import assert from "node:assert/strict"
import { managerHead, previewHead, resolveOptions } from "../dist/preset.js"

const SPINNER_PATH = "M14.8 6.5c.1.5.2 1 .2 1.5 0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 1 0 1.4.1"
const scriptsOf = head => [...head.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1])
const DEFAULT_VT = resolveOptions().viewTransition
const styleOf = head => head.match(/<style id="nsb-preview-css">([\s\S]*?)<\/style>/)[1]

test("heads start with the boot script, ahead of existing head content", async () => {
  for (const hook of [managerHead, previewHead]) {
    const head = await hook("<link rel=stylesheet href=x.css>", {})
    assert.ok(head.startsWith('<script id="nsb-boot-script">'))
    assert.ok(head.trimEnd().endsWith("<link rel=stylesheet href=x.css>"))
  }
})

test("every inline script parses", async () => {
  for (const hook of [managerHead, previewHead]) {
    for (const src of scriptsOf(await hook("", {}))) assert.doesNotThrow(() => new Function(src))
  }
})

test("hold, timeout and viewTransition options are serialised into the boot script", async () => {
  const [boot] = scriptsOf(await managerHead("", { hold: true, timeout: 1234 }))
  assert.match(boot, /"hold":true/)
  assert.match(boot, /"timeout":1234/)
  const [bootDefault] = scriptsOf(await managerHead("", {}))
  assert.match(bootDefault, /"hold":false/)
  assert.match(bootDefault, /"timeout":8000/)
  assert.match(bootDefault, new RegExp(`"viewTransition":${DEFAULT_VT}`))
  for (const viewTransition of [true, false]) {
    const [boot] = scriptsOf(await managerHead("", { viewTransition }))
    assert.match(boot, new RegExp(`"viewTransition":${viewTransition}`))
  }
})

test("invalid options fall back to defaults", () => {
  assert.equal(typeof DEFAULT_VT, "boolean")
  assert.deepEqual(resolveOptions({ hold: "yes", timeout: -1, viewTransition: "no" }), {
    hold: false,
    timeout: 8000,
    viewTransition: DEFAULT_VT,
  })
  assert.deepEqual(resolveOptions(undefined), { hold: false, timeout: 8000, viewTransition: DEFAULT_VT })
  assert.equal(resolveOptions({ viewTransition: false }).viewTransition, false)
  assert.equal(resolveOptions({ viewTransition: true }).viewTransition, true)
})

const vtStyleOf = head => (head.match(/<style id="nsb-vt-css">([\s\S]*?)<\/style>/) || [])[1]

test("viewTransition on: the manager opts in and handles pagereveal", async () => {
  for (const options of DEFAULT_VT ? [{}, { viewTransition: true }] : [{ viewTransition: true }]) {
    const head = await managerHead("", options)
    const css = vtStyleOf(head)
    assert.ok(css, "view transition stylesheet present")
    assert.ok(css.startsWith("@view-transition{navigation:auto}"))
    const [boot] = scriptsOf(head)
    assert.match(boot, /"viewTransition":true/)
    assert.ok(boot.includes('addEventListener("pagereveal"'))
    assert.ok(boot.includes("skipTransition()"))
    assert.match(boot, /const keyEvents = \["keydown", "keyup"\]/)
    assert.ok(boot.includes("window.addEventListener(n, blockKey, true)"))
    assert.ok(boot.includes("window.removeEventListener(n, blockKey, true)"))
  }
})

test("viewTransition off: no opt-in rule and no snapshot config", async () => {
  for (const options of DEFAULT_VT ? [{ viewTransition: false }] : [{}, { viewTransition: false }]) {
    const head = await managerHead("", options)
    assert.equal(vtStyleOf(head), undefined)
    assert.ok(!head.includes("@view-transition"))
    const [boot] = scriptsOf(head)
    assert.match(boot, /"viewTransition":false/)
    assert.ok(!boot.includes('"snapshotId"'))
  }
})

test("the hold and release selectors are present", async () => {
  const css = vtStyleOf(await managerHead("", { viewTransition: true }))
  for (const rule of [
    "html.nsb-vt-hold::view-transition-group(root){animation:none}",
    "html.nsb-vt-hold::view-transition-old(root){animation:nsb-vt-on 3600s linear both}",
    "html.nsb-vt-hold::view-transition-new(root){animation:nsb-vt-off 3600s linear both}",
    "html.nsb-vt-hold::view-transition-new(nsb-boot-snapshot){animation:nsb-vt-on 3600s linear both}",
    "html.nsb-vt-release::view-transition-old(root){animation:nsb-vt-out 180ms ease both}",
    "html.nsb-vt-release::view-transition-new(root){animation:nsb-vt-in 180ms ease both}",
  ]) {
    assert.ok(css.includes(rule), rule)
  }
  const [boot] = scriptsOf(await managerHead("", { viewTransition: true }))
  assert.ok(boot.includes("view-transition-name:nsb-boot-snapshot"))
})

test("the preview head never opts into View Transitions", async () => {
  const head = await previewHead("", {})
  assert.ok(!head.includes("@view-transition"))
  const [boot] = scriptsOf(head)
  assert.match(boot, /"viewTransition":false/)
})

test("no prototype debug output remains", async () => {
  for (const hook of [managerHead, previewHead]) {
    const head = await hook("", { viewTransition: true })
    for (const s of ["FALLBACK OVERLAY", "HELD SNAPSHOT", "nsbvt", "sessionStorage", "vtNoRelease", "vtTimeout"]) {
      assert.ok(!head.includes(s), s)
    }
  }
})

test("the boot overlay is accessible and carries the spinner path", async () => {
  const [boot] = scriptsOf(await managerHead("", {}))
  assert.ok(boot.includes(SPINNER_PATH))
  assert.ok(boot.includes('"role", "progressbar"'))
  assert.ok(boot.includes('"aria-busy", "true"'))
  assert.ok(boot.includes('"aria-label", "Loading Storybook"'))
  assert.ok(!boot.includes("</"), "no raw closing tag inside the inline script")
})

test("the preview spinner carries the spinner path", async () => {
  const [, preview] = scriptsOf(await previewHead("", {}))
  assert.ok(preview.includes(SPINNER_PATH))
})

test("the preview stylesheet suppresses the native loaders and shows the spinner in their place", async () => {
  const css = styleOf(await previewHead("", {}))
  assert.ok(css.includes(".sb-preparing-story,.sb-preparing-docs{display:none!important}"))
  assert.ok(css.includes("#nsb-preview-spinner{display:none}"))
  assert.ok(
    css.includes(
      "body.sb-show-preparing-story:not(.sb-show-main)>#nsb-preview-spinner," +
        "body.sb-show-preparing-docs:not(.sb-show-main)>#nsb-preview-spinner{display:flex!important}"
    )
  )
})

test("nopreview and errordisplay are untouched", async () => {
  for (const hook of [managerHead, previewHead]) {
    const head = await hook("", {})
    assert.ok(!head.includes("sb-nopreview"))
    assert.ok(!head.includes("sb-errordisplay"))
  }
})
