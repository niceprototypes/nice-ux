# @niceprototypes/ux

Every Nice UI React package from one import.

```tsx
import { Button, Flex, Icon } from "@niceprototypes/ux"
```

Names two packages both export keep the plain name for the foundation package (styles, icon); the other is re-exported as `HeadLinkAttributes` and `registerImageVendorResolver`.

## Vendor icons

The package is `sideEffects: false`, so bundlers drop `@niceprototypes/icon-vendor`'s registration even though it is re-exported. Import it once at the app entry to render vendor icons:

```tsx
// main.tsx
import "@niceprototypes/icon-vendor"
```

```tsx
<Icon name="TrendingDown" vendor />
```
