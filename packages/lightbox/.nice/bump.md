[2026-05-27 02:30] patch: Adapt to upstream mode → theme rename.

- LightboxCaption.tsx: `<Typography mode="night">` → `<Typography theme="night">` (×2).
- getLightboxToken / getLightboxTokenKey / getLightboxTokenValue: `variantOrMode` / `mode?` parameters → `variantOrTheme` / `theme?`.

Lightbox itself has no `mode`/`theme` prop today; this is consumer-side adaptation only.