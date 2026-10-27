# Build on Nice

For an agent building an app or page with `@niceprototypes/*`. Core (`../README.md`, `../discipline/`) applies. Component index: `components.txt` (read whole). One component's detail: `jq '.packages[].components[]|select(.name=="Button")' catalog.json` (never read catalog.json whole). Live props and Controls: each component's `Playground` story.

## 1. Dependencies

```json
"dependencies": {
  "react": "^19.2.0", "react-dom": "^19.2.0", "styled-components": "^6.1.19",
  "@niceprototypes/styles": "…", "@niceprototypes/flex": "…", "@niceprototypes/ink": "…",
  "@niceprototypes/icon": "…", "@niceprototypes/icon-vendor": "…", "@niceprototypes/button": "…"
}
```

- Inside nice-ux: `"workspace:^"`. Outside: npm ranges once the first `@niceprototypes` release is out (backlog row 2); until then outside apps cannot install them.
- `icon` needs `icon-vendor` installed beside it; install both whenever an icon-bearing component (button, input, …) is used.
- Import components, types and services by name from the umbrella (`import { Button, Flex } from "@niceprototypes/ux"`); the two renamed collisions are `HeadLinkAttributes` and `registerImageVendorResolver`.
- Vite apps outside nice-ux: `createNiceViteConfig` from `@niceprototypes/config-vite` (its README). Inside: `resolve.dedupe: ["react", "react-dom", "styled-components", "@niceprototypes/styles", "@niceprototypes/icon"]` (as `apps/storybook/.storybook/main.ts`).

## 2. App tokens — `src/nice/tokens.ts`

```ts
import { setTokens } from "@niceprototypes/styles"

export const getToken = setTokens({
  brandColor: { primary: { day: "#dc0000", night: "#ff6666" } },  // theme-aware
  gap: { page: { "phone+": "16px", "laptop+": "32px" } },          // responsive
})
```

- One `setTokens` call per app; it returns `getToken` typed for core tokens plus this map.
- Bare `phone` = that band only; `phone+` = phone and up. Value formats: `../read/styles/tokens.md` → "Variant Value Formats".
- No literal sizes in components or `style={{}}`: every size is a token read through `getToken`.

## 3. Entry — `src/main.tsx`

```tsx
import { createRoot } from "react-dom/client"
import { StylesProvider } from "@niceprototypes/styles"  // loads tokens.css
import "@niceprototypes/icon-vendor"                     // registers the Lucide resolver
import "./nice/tokens"
import "@niceprototypes/styles/reset.css"                // optional; after tokens.css
import App from "./App"

createRoot(document.getElementById("root")!).render(<StylesProvider><App /></StylesProvider>)
```

| Concern | API |
|---|---|
| Fonts | `StylesProvider` props `googleFonts` / `adobeFonts` / `links`; default stack uses device fonts |
| Theme | OS `prefers-color-scheme` → `night` by default; pin with `<Theme name="night">`, `applyTheme("night")` or a component's `theme` prop; read with `useTheme()` (needs `<StylesProvider detectTheme>`) |
| Device | `useDevice()` (needs `detectDevice`) |
| Breakpoints | `useBreakpoint`, `withBreakpoints`, `setTokens({ breakpoints })` → `../read/styles/breakpoints.md` |
| Nice icons | `<Icon name="star" />`; legal names: `iconNames` from `@niceprototypes/icon` |
| Lucide icons | `<Icon name="TrendingDown" vendor />`; Button `iconLeft` + `iconVendor`. Owner rules: `../README.md` → Icons |

## 4. Compose

```tsx
import styled from "styled-components"
import Flex from "@niceprototypes/flex"
import Button from "@niceprototypes/button"
import { getToken } from "./nice/tokens"

const Brand = styled.div`color: ${getToken("brandColor", "primary")};`

<Flex direction="column" gap="base"><Button filled iconLeft="star">Go</Button></Flex>
```

- Compose existing components before writing markup; layout through `Flex`, text through `Ink`, images through `Image`.
- Typed values (token variants, statuses, icon names) come from `components.txt` unions or the `.types.ts`, never memory.
- Theme by cascade (`theme` prop, `<Theme>`); never thread `$theme` into styled-components.
- A missing component, prop or token is reported, not hand-built: it is a Nice gap.

## 5. Verify

- `tsc --noEmit` and the app build; then look at the rendered page (headless: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --window-size=900,700 --virtual-time-budget=4000 --screenshot=out.png {url}`).
- A passing build does not prove a token variant exists; the registry validates at runtime.
- Stale output after a package edit: `../discipline/stale-first.md`.
