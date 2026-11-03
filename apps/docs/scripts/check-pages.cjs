/**
 * `pnpm check:pages` — opens every docs page (from the sidebar) in headless Chromium, in both
 * themes, against a running dev server (DOCS_URL, default http://localhost:6020), and fails when
 * a page logs an error or renders a one-line install command (npm i / npm install / pnpm add /
 * yarn add) as a code block instead of an inline chip.
 */
const { chromium } = require("playwright")

const base = process.env.DOCS_URL ?? "http://localhost:6020"
const INSTALL = /^(npm (i|install)|pnpm (add|i|install)|yarn add)\b/

;(async () => {
  const browser = await chromium.launch()
  const problems = []
  let pages = 0
  for (const dark of [false, true]) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, colorScheme: dark ? "dark" : "light" })
    await page.goto(`${base}/docs/tokens`, { waitUntil: "networkidle" })
    const urls = new Set(await page.evaluate(() => [...document.querySelectorAll("nav a[href^='/docs/']")].map(a => a.getAttribute("href"))))
    for (const url of urls) {
      const errors = []
      const onError = error => errors.push(error.message)
      const onConsole = message => message.type() === "error" && errors.push(message.text())
      page.on("pageerror", onError)
      page.on("console", onConsole)
      await page.goto(base + url, { waitUntil: "networkidle" })
      await page.waitForTimeout(500)
      // Folders open as their pages load: every page in the sidebar gets visited.
      for (const more of await page.evaluate(() => [...document.querySelectorAll("nav a[href^='/docs/']")].map(a => a.getAttribute("href")))) urls.add(more)
      const blocks = await page.evaluate(
        pattern => [...document.querySelectorAll("pre.shiki")].map(pre => pre.textContent.trim()).filter(text => !text.includes("\n") && new RegExp(pattern).test(text)),
        INSTALL.source,
      )
      blocks.forEach(text => errors.push(`install line as a block: ${text}`))
      page.off("pageerror", onError)
      page.off("console", onConsole)
      if (errors.length) problems.push(`${dark ? "dark" : "light"} ${url}: ${errors.map(error => error.slice(0, 160)).join(" | ")}`)
    }
    pages = urls.size
    await page.close()
  }
  await browser.close()
  console.log(problems.length ? problems.join("\n") : `check:pages — ${pages} pages, both themes, no problems`)
  process.exit(problems.length ? 1 : 0)
})()
