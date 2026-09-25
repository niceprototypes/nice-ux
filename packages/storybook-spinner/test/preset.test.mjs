// Runs against the built dist (npm run build first).
import { test } from "node:test"
import assert from "node:assert/strict"
import { managerHead, previewHead, resolveOptions } from "../dist/preset.js"

const SPINNER_PATH = "M14.8 6.5c.1.5.2 1 .2 1.5 0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 1 0 1.4.1"
const scriptsOf = head => [...head.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1])
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

test("hold and timeout options are serialised into the boot script", async () => {
  const [boot] = scriptsOf(await managerHead("", { hold: true, timeout: 1234 }))
  assert.match(boot, /"hold":true/)
  assert.match(boot, /"timeout":1234/)
  const [bootDefault] = scriptsOf(await managerHead("", {}))
  assert.match(bootDefault, /"hold":false/)
  assert.match(bootDefault, /"timeout":8000/)
})

test("invalid options fall back to defaults", () => {
  assert.deepEqual(resolveOptions({ hold: "yes", timeout: -1 }), { hold: false, timeout: 8000 })
  assert.deepEqual(resolveOptions(undefined), { hold: false, timeout: 8000 })
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
