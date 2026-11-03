/**
 * Part of `pnpm check:pages` — opens one page of each type (MDX, component, Tokens, Reset) against a
 * running dev server (DOCS_URL, default http://localhost:6020) at the narrower viewports, in both
 * themes, and fails when the sections column is narrower than MIN_SECTIONS_WIDTH or an inline code
 * chip is cut off by a clipping ancestor. Guards the layout from squeezing the sections between the
 * sidebar and the columns beside them.
 */
const { chromium } = require("playwright")

const base = (process.env.DOCS_URL ?? "http://localhost:6020").replace(/\/$/, "")
const PAGES = ["/docs/onboarding/welcome", "/docs/components/forms/button", "/docs/tokens", "/docs/onboarding/reset"]
const VIEWPORTS = [1280, 1000, 700]
const MIN_SECTIONS_WIDTH = 320

;(async () => {
  const browser = await chromium.launch()
  const problems = []
  for (const width of VIEWPORTS) {
    for (const dark of [false, true]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: dark ? "dark" : "light" })
      for (const url of PAGES) {
        await page.goto(base + url, { waitUntil: "domcontentloaded" })
        await page.waitForTimeout(1500)
        const { sections, clipped } = await page.evaluate(() => {
          const section = document.querySelector("section")
          if (!section) return { sections: 0, clipped: [] }
          // The sections column: the section's ancestor that sits beside the page's aside columns.
          let column = section
          while (column.parentElement && ![...column.parentElement.children].some(child => child.tagName === "ASIDE")) column = column.parentElement
          const cutOff = code => {
            const box = code.getBoundingClientRect()
            if (code.scrollWidth > code.clientWidth + 1) return true
            for (let element = code.parentElement; element && element !== document.body; element = element.parentElement) {
              if (getComputedStyle(element).overflowX === "visible") continue
              const bounds = element.getBoundingClientRect()
              if (box.right > bounds.right + 1 || box.left < bounds.left - 1) return true
            }
            return false
          }
          const chips = [...column.querySelectorAll("code")].filter(code => !code.closest("pre"))
          return { sections: column.getBoundingClientRect().width, clipped: chips.filter(cutOff).map(code => code.textContent.slice(0, 40)) }
        })
        const where = `${width}px ${dark ? "dark" : "light"} ${url}`
        if (sections < MIN_SECTIONS_WIDTH) problems.push(`${where}: sections column ${Math.round(sections)}px, under ${MIN_SECTIONS_WIDTH}px`)
        if (clipped.length) problems.push(`${where}: ${clipped.length} code chips cut off (${clipped.slice(0, 3).join(", ")})`)
      }
      await page.close()
    }
  }
  await browser.close()
  console.log(problems.length ? problems.join("\n") : `check:widths — ${PAGES.length} pages at ${VIEWPORTS.join("/")}px, both themes, sections column at least ${MIN_SECTIONS_WIDTH}px, no chip cut off`)
  process.exit(problems.length ? 1 : 0)
})()
