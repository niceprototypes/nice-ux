/**
 * `pnpm check:pages` — opens every docs page (from the sidebar) in headless Chromium, in both
 * themes, against a running dev server (DOCS_URL, default http://localhost:6020), and fails when
 * a page logs an error or renders a one-line install command (npm i / npm install / pnpm add /
 * yarn add) as a code block instead of an inline chip, or links nowhere: an internal href or
 * hash that opens no page or anchor, or a link without an href (WelcomeLink, ArrowLink) that
 * navigates to no page when clicked. Each page is checked once its DOM is in and has settled,
 * not when the network goes idle: a demo image from another origin may never finish, and a
 * failed load from another origin is not the site's error.
 */
const { chromium } = require("playwright")

const base = process.env.DOCS_URL ?? "http://localhost:6020"
const INSTALL = /^(npm (i|install)|pnpm (add|i|install)|yarn add)\b/

;(async () => {
  const browser = await chromium.launch()
  const problems = []
  const linkChecks = []
  let pages = 0
  for (const dark of [false, true]) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, colorScheme: dark ? "dark" : "light" })
    await page.goto(`${base}/docs/tokens`, { waitUntil: "domcontentloaded" })
    const urls = new Set(await page.evaluate(() => [...document.querySelectorAll("nav a[href^='/docs/']")].map(a => a.getAttribute("href"))))
    for (const url of urls) {
      const errors = []
      const onError = error => errors.push(error.message)
      // A resource from another origin (a demo image service) that fails to load is not the site's error.
      const onConsole = message =>
        message.type() === "error" && !(message.text().startsWith("Failed to load resource") && !message.location().url.startsWith(base)) && errors.push(message.text())
      page.on("pageerror", onError)
      page.on("console", onConsole)
      await page.goto(base + url, { waitUntil: "domcontentloaded" })
      await page.waitForTimeout(1500)
      // Folders open as their pages load: every page in the sidebar gets visited.
      for (const more of await page.evaluate(() => [...document.querySelectorAll("nav a[href^='/docs/']")].map(a => a.getAttribute("href")))) urls.add(more)
      const blocks = await page.evaluate(
        pattern => [...document.querySelectorAll("pre.shiki")].map(pre => pre.textContent.trim()).filter(text => !text.includes("\n") && new RegExp(pattern).test(text)),
        INSTALL.source,
      )
      blocks.forEach(text => errors.push(`install line as a block: ${text}`))
      if (!dark) {
        // Links in the page (not the sidebar): hrefs are checked once every page is known; anchors now.
        const { hrefs, missingAnchors, scripted } = await page.evaluate(() => {
          const main = document.querySelector("section")?.closest("div[tabindex]") ?? document.body
          const anchors = [...main.querySelectorAll("a[href]")].filter(a => !a.closest("nav"))
          const hrefs = anchors.map(a => a.getAttribute("href")).filter(href => /^\/(?!\/)|^\?/.test(href))
          const missingAnchors = anchors.map(a => a.getAttribute("href")).filter(href => href.startsWith("#") && href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1))))
          const scripted = [...main.querySelectorAll("[role=link]:not([href]), a:not([href])")].filter(el => !el.closest("nav")).length
          return { hrefs, missingAnchors, scripted }
        })
        hrefs.forEach(href => linkChecks.push({ from: url, href }))
        missingAnchors.forEach(href => errors.push(`anchor without a target: ${href}`))
        // Each link without an href is clicked and must open a page.
        for (let index = 0; index < scripted; index++) {
          const target = page.locator("[role=link]:not([href]), a:not([href])").filter({ hasNot: page.locator("nav") }).nth(index)
          if ((await target.evaluate(el => !!el.closest("nav")))) continue
          const label = (await target.innerText()).split("\n")[0].slice(0, 40)
          await target.click()
          await page.waitForTimeout(1500)
          const landed = new URL(page.url()).pathname
          const opened = await page.evaluate(() => !!document.querySelector("section"))
          if (landed === url || !opened) errors.push(`link goes nowhere: "${label}" (at ${landed})`)
          await page.goto(base + url, { waitUntil: "domcontentloaded" })
          await page.waitForTimeout(500)
        }
      }
      page.off("pageerror", onError)
      page.off("console", onConsole)
      if (errors.length) problems.push(`${dark ? "dark" : "light"} ${url}: ${errors.map(error => error.slice(0, 160)).join(" | ")}`)
    }
    pages = urls.size
    await page.close()
  }
  // Each internal href, once: it must end on a sidebar page (after any redirect).
  {
    const page = await browser.newPage()
    for (const { from, href } of linkChecks.filter((check, index, all) => all.findIndex(other => other.href === check.href) === index)) {
      await page.goto(base + href, { waitUntil: "domcontentloaded" })
      await page.waitForTimeout(800)
      const landed = new URL(page.url()).pathname
      const pageExists = await page.evaluate(() => !!document.querySelector("section"))
      if (!pageExists || !landed.startsWith("/docs/")) problems.push(`dead link on ${from}: ${href} (lands on ${landed})`)
    }
    await page.close()
  }
  await browser.close()
  console.log(problems.length ? problems.join("\n") : `check:pages — ${pages} pages, both themes, no problems`)
  process.exit(problems.length ? 1 : 0)
})()
