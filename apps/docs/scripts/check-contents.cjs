/**
 * Part of `pnpm check:pages` — opens every docs page (from the sidebar) against a running dev
 * server (DOCS_URL, default http://localhost:6020) and fails when its Contents has exactly one
 * top-level row with every other row nested under it: sibling sections read as children of the
 * first, which is a heading-level mismatch or a tree-building bug, not a real hierarchy.
 */
const { chromium } = require("playwright")

const base = (process.env.DOCS_URL ?? "http://localhost:6020").replace(/\/$/, "")

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })
  const problems = []
  await page.goto(`${base}/docs/tokens`, { waitUntil: "domcontentloaded" })
  const links = () => page.evaluate(() => [...document.querySelectorAll("nav a[href^='/docs/']")].map(a => a.getAttribute("href")))
  const urls = new Set(await links())
  for (const url of urls) {
    await page.goto(base + url, { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(1500)
    // Folders open as their pages load: every page in the sidebar gets visited.
    for (const more of await links()) urls.add(more)
    const wrapped = await page.evaluate(() => {
      const top = document.querySelector("nav[aria-label='Contents'] > ul")
      const rows = top ? [...top.children] : []
      return rows.length === 1 && !!rows[0].querySelector("ul") ? rows[0].querySelector("a")?.textContent ?? "" : null
    })
    if (wrapped !== null) problems.push(`${url}: Contents has one top-level row ("${wrapped}") wrapping every other row`)
  }
  await browser.close()
  console.log(problems.length ? problems.join("\n") : `check:contents — ${urls.size} pages, no Contents wraps every row under one`)
  process.exit(problems.length ? 1 : 0)
})()
