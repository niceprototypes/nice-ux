[2026-05-27 00:00] major: Rename `mode` prop → `theme` prop; consume renamed `Theme` component and `ThemeType` from nice-react-styles; inline `getInvertedMode` (service removed upstream).

- Prop `mode?: ModeType` → `theme?: ThemeType` on `ButtonProps`
- Namespace entry `ButtonTypes.Mode` → `ButtonTypes.Theme`
- Internal usage in `Button.tsx`: `mode` destructure → `theme`; `<Mode name={mode}>` wrap → `<Theme name={theme}>`; `getInvertedMode(mode, status)` removed and inlined as a pass-through (the call was a no-op whenever `status` was defined, which it always was due to the `status = "primary"` default).
- `getButtonToken`, `getButtonTokenKey`, `getButtonTokenValue`: `mode` parameter → `theme`; `variantOrMode` parameter → `variantOrTheme`.

Consumer migration: every call site passing `mode={…}` to `<Button>` must rename to `theme={…}`. Every call to `getButtonToken(name, variant, mode)` must use `theme` as the third argument's positional value (signature is unchanged).